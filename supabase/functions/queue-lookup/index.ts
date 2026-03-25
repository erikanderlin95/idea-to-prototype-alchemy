import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateCheckInCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { mobile_number, clinic_id, action, patient_name, visit_type, estimated_wait_time, device_fingerprint } = body;

    if (!clinic_id || typeof clinic_id !== "string") {
      return new Response(
        JSON.stringify({ error: "clinic_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const needsMobile = !["get_public_queue_list"].includes(action);
    if (needsMobile) {
      if (!mobile_number || typeof mobile_number !== "string") {
        return new Response(
          JSON.stringify({ error: "mobile_number is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const mobileRegex = /^\+?[0-9]{8,15}$/;
      if (!mobileRegex.test(mobile_number.replace(/\s/g, ""))) {
        return new Response(
          JSON.stringify({ error: "Invalid mobile number format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const normalizedMobile = mobile_number ? mobile_number.replace(/\s/g, "") : "";
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";

    // ─── JOIN QUEUE (simplified - no OTP, with anti-spam) ───
    if (action === "join_queue") {
      if (!patient_name || !patient_name.trim()) {
        return new Response(
          JSON.stringify({ error: "patient_name is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Anti-spam: Check for existing active queue entry
      const { data: existingEntry } = await supabase
        .from("queue_entries")
        .select("id, queue_number, check_in_code")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .eq("status", "waiting")
        .limit(1)
        .maybeSingle();

      if (existingEntry) {
        return new Response(
          JSON.stringify({ error: "You already have an active queue entry at this clinic", code: "ALREADY_IN_QUEUE" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Anti-spam: Cooldown - check if they left/cancelled within last 5 minutes
      const { data: recentEntry } = await supabase
        .from("queue_entries")
        .select("id, updated_at")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .in("status", ["checked_in", "cancelled"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (recentEntry) {
        const updatedAt = new Date(recentEntry.updated_at);
        const cooldownMs = 5 * 60 * 1000;
        if (Date.now() - updatedAt.getTime() < cooldownMs) {
          const remainingSecs = Math.ceil((cooldownMs - (Date.now() - updatedAt.getTime())) / 1000);
          return new Response(
            JSON.stringify({ error: `Please wait ${Math.ceil(remainingSecs / 60)} minute(s) before re-joining`, code: "COOLDOWN" }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      // Anti-spam: Rate limit by IP - max 5 queue joins per IP in last 10 minutes
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: ipEntries } = await supabase
        .from("queue_verifications")
        .select("id")
        .eq("ip_address", clientIp)
        .gte("created_at", tenMinutesAgo);

      if (ipEntries && ipEntries.length >= 5) {
        return new Response(
          JSON.stringify({ error: "Too many attempts. Please try again shortly.", code: "RATE_LIMITED" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Log the join attempt for rate limiting
      await supabase.from("queue_verifications").insert({
        clinic_id,
        mobile_number: normalizedMobile,
        patient_name: patient_name.trim(),
        visit_type: visit_type || "General Consultation",
        verification_code: "DIRECT",
        status: "verified",
        verified_at: new Date().toISOString(),
        device_fingerprint: device_fingerprint || null,
        ip_address: clientIp,
      });

      // Get next queue number
      const { data: currentQueue } = await supabase
        .from("queue_entries")
        .select("queue_number")
        .eq("clinic_id", clinic_id)
        .eq("status", "waiting")
        .order("queue_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextQueueNumber = (currentQueue?.queue_number || 0) + 1;
      const checkInCode = generateCheckInCode();

      const { data: newEntry, error: insertError } = await supabase
        .from("queue_entries")
        .insert({
          clinic_id,
          queue_number: nextQueueNumber,
          mobile_number: normalizedMobile,
          patient_name: patient_name.trim(),
          visit_type: visit_type || "General Consultation",
          status: "waiting",
          estimated_wait_time: estimated_wait_time || 15,
          check_in_code: checkInCode,
          user_id: null,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting queue entry:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to join queue" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ entry: newEntry }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── SAVE BOOKING LEAD ───
    if (action === "save_booking_lead") {
      if (!patient_name?.trim() || !normalizedMobile) {
        return new Response(
          JSON.stringify({ error: "patient_name and mobile_number are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const clinic_name = body.clinic_name || null;
      const booking_type = body.booking_type || "external";
      const redirect_type = body.redirect_type || "web";
      const redirect_url = body.redirect_url || null;

      // Generate case_id: CQ-YYYYMMDD-XXXX
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let suffix = "";
      for (let i = 0; i < 4; i++) suffix += chars.charAt(Math.floor(Math.random() * chars.length));
      const caseId = `CQ-${dateStr}-${suffix}`;

      const { data: leadData, error: leadError } = await supabase
        .from("booking_leads")
        .insert({
          clinic_id,
          clinic_name,
          patient_name: patient_name.trim(),
          mobile_number: normalizedMobile,
          booking_type,
          source: body.source || "marketplace",
          case_id: caseId,
          status: "initiated",
          redirect_type,
          redirect_url,
        })
        .select("id, case_id")
        .single();

      if (leadError) {
        console.error("Error saving booking lead:", leadError);
        return new Response(
          JSON.stringify({ error: "Failed to save lead" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, case_id: caseId, lead_id: leadData?.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── GET QUEUE POSITION ───
    if (action === "get_queue_position") {
      const { data: myEntry, error: entryError } = await supabase
        .from("queue_entries")
        .select("id, queue_number, status, patient_name, visit_type, created_at, updated_at, estimated_wait_time, check_in_code")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .in("status", ["waiting", "checked_in", "serving", "served"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (entryError) {
        console.error("Error fetching queue entry:", entryError);
        return new Response(
          JSON.stringify({ error: "Failed to fetch queue entry" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!myEntry) {
        return new Response(
          JSON.stringify({ entry: null, position: null, total_waiting: 0 }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: waitingEntries, error: waitingError } = await supabase
        .from("queue_entries")
        .select("id, queue_number")
        .eq("clinic_id", clinic_id)
        .eq("status", "waiting")
        .order("queue_number", { ascending: true });

      if (waitingError) {
        console.error("Error fetching waiting entries:", waitingError);
        return new Response(
          JSON.stringify({ error: "Failed to fetch queue data" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const position = myEntry.status === "waiting"
        ? (waitingEntries?.findIndex((e) => e.id === myEntry.id) ?? -1) + 1
        : 0;

      return new Response(
        JSON.stringify({
          entry: myEntry,
          position: position > 0 ? position : null,
          total_waiting: waitingEntries?.length || 0,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── CHECK ACTIVE ENTRY ───
    if (action === "check_active_entry") {
      const { data, error } = await supabase
        .from("queue_entries")
        .select("id, queue_number, status, patient_name, visit_type, check_in_code")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .eq("status", "waiting")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error checking queue entry:", error);
        return new Response(
          JSON.stringify({ error: "Failed to check queue status" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ entry: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── GET PUBLIC QUEUE LIST ───
    if (action === "get_public_queue_list") {
      const { data: waitingList, error } = await supabase
        .from("queue_entries")
        .select("id, queue_number, status, visit_type, created_at")
        .eq("clinic_id", clinic_id)
        .eq("status", "waiting")
        .order("queue_number", { ascending: true });

      if (error) {
        console.error("Error fetching queue list:", error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch queue list" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ queue: waitingList || [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── CANCEL QUEUE ───
    if (action === "cancel_queue") {
      const { data: entry, error: findError } = await supabase
        .from("queue_entries")
        .select("id")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .eq("status", "waiting")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (findError) {
        return new Response(
          JSON.stringify({ error: "Failed to find queue entry" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!entry) {
        return new Response(
          JSON.stringify({ error: "No active queue entry found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: updateError } = await supabase
        .from("queue_entries")
        .update({ status: "cancelled" })
        .eq("id", entry.id);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: "Failed to cancel queue entry" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Queue entry cancelled" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── CHECK IN ───
    if (action === "check_in") {
      const { data: entry, error: findError } = await supabase
        .from("queue_entries")
        .select("id, status")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .eq("status", "waiting")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (findError) {
        return new Response(
          JSON.stringify({ error: "Failed to find queue entry" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!entry) {
        return new Response(
          JSON.stringify({ error: "No active queue entry found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: updateError } = await supabase
        .from("queue_entries")
        .update({ status: "checked_in" })
        .eq("id", entry.id);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: "Failed to check in" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Checked in successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Queue lookup error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
