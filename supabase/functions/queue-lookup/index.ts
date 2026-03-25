import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { mobile_number, clinic_id, action, patient_name, visit_type, estimated_wait_time, verification_code, verification_id, device_fingerprint } = body;

    // Validate required parameters
    if (!clinic_id || typeof clinic_id !== "string") {
      return new Response(
        JSON.stringify({ error: "clinic_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Some actions don't need mobile_number
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

    // ─── REQUEST OTP (step 1 of join) ───
    if (action === "request_otp") {
      if (!patient_name || !patient_name.trim()) {
        return new Response(
          JSON.stringify({ error: "patient_name is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check for existing active queue entry
      const { data: existingEntry } = await supabase
        .from("queue_entries")
        .select("id, queue_number")
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

      // Cooldown: check if they left/cancelled within last 5 minutes
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
        const cooldownMs = 5 * 60 * 1000; // 5 minutes
        if (Date.now() - updatedAt.getTime() < cooldownMs) {
          const remainingSecs = Math.ceil((cooldownMs - (Date.now() - updatedAt.getTime())) / 1000);
          return new Response(
            JSON.stringify({ error: `Please wait ${Math.ceil(remainingSecs / 60)} minute(s) before re-joining`, code: "COOLDOWN" }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      // Expire old pending verifications for this mobile+clinic
      await supabase
        .from("queue_verifications")
        .update({ status: "expired" })
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", normalizedMobile)
        .eq("status", "pending");

      // Generate OTP and create verification record
      const otp = generateOTP();
      const { data: verification, error: verError } = await supabase
        .from("queue_verifications")
        .insert({
          clinic_id,
          mobile_number: normalizedMobile,
          patient_name: patient_name.trim(),
          visit_type: visit_type || "General Consultation",
          verification_code: otp,
          status: "pending",
          device_fingerprint: device_fingerprint || null,
          ip_address: clientIp,
        })
        .select("id, verification_code, expires_at")
        .single();

      if (verError) {
        console.error("Error creating verification:", verError);
        return new Response(
          JSON.stringify({ error: "Failed to create verification" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Return OTP for on-screen display (free method - soft verification)
      return new Response(
        JSON.stringify({
          verification_id: verification.id,
          otp: verification.verification_code,
          expires_at: verification.expires_at,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── VERIFY OTP (step 2 of join) ───
    if (action === "verify_otp") {
      if (!verification_id || !verification_code) {
        return new Response(
          JSON.stringify({ error: "verification_id and verification_code are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch verification record
      const { data: ver, error: fetchError } = await supabase
        .from("queue_verifications")
        .select("*")
        .eq("id", verification_id)
        .eq("clinic_id", clinic_id)
        .single();

      if (fetchError || !ver) {
        return new Response(
          JSON.stringify({ error: "Verification not found", code: "NOT_FOUND" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check expired
      if (ver.status !== "pending" || new Date(ver.expires_at) < new Date()) {
        await supabase.from("queue_verifications").update({ status: "expired" }).eq("id", verification_id);
        return new Response(
          JSON.stringify({ error: "Verification expired. Please try again.", code: "EXPIRED" }),
          { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check max attempts (3)
      if (ver.attempts >= 3) {
        await supabase.from("queue_verifications").update({ status: "failed" }).eq("id", verification_id);
        return new Response(
          JSON.stringify({ error: "Too many attempts. Please try again.", code: "MAX_ATTEMPTS" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Increment attempts
      await supabase
        .from("queue_verifications")
        .update({ attempts: ver.attempts + 1 })
        .eq("id", verification_id);

      // Check code
      if (ver.verification_code !== verification_code.trim()) {
        return new Response(
          JSON.stringify({ error: "Incorrect code. Please try again.", code: "WRONG_CODE", attempts_left: 2 - ver.attempts }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // ✅ Verified — create queue entry
      // Double-check no active entry was created in the meantime
      const { data: doubleCheck } = await supabase
        .from("queue_entries")
        .select("id")
        .eq("clinic_id", clinic_id)
        .eq("mobile_number", ver.mobile_number)
        .eq("status", "waiting")
        .limit(1)
        .maybeSingle();

      if (doubleCheck) {
        await supabase.from("queue_verifications").update({ status: "verified", verified_at: new Date().toISOString() }).eq("id", verification_id);
        return new Response(
          JSON.stringify({ error: "You already have an active queue entry", code: "ALREADY_IN_QUEUE" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

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

      const { data: newEntry, error: insertError } = await supabase
        .from("queue_entries")
        .insert({
          clinic_id,
          queue_number: nextQueueNumber,
          mobile_number: ver.mobile_number,
          patient_name: ver.patient_name,
          visit_type: ver.visit_type,
          status: "waiting",
          estimated_wait_time: estimated_wait_time || 15,
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

      // Mark verification as verified
      await supabase
        .from("queue_verifications")
        .update({ status: "verified", verified_at: new Date().toISOString() })
        .eq("id", verification_id);

      return new Response(
        JSON.stringify({ entry: newEntry, verified: true }),
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

      const { error: leadError } = await supabase
        .from("booking_leads")
        .insert({
          clinic_id,
          clinic_name,
          patient_name: patient_name.trim(),
          mobile_number: normalizedMobile,
          booking_type,
          source: "marketplace",
        });

      if (leadError) {
        console.error("Error saving booking lead:", leadError);
        return new Response(
          JSON.stringify({ error: "Failed to save lead" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── EXISTING ACTIONS (unchanged) ───

    if (action === "get_queue_position") {
      const { data: myEntry, error: entryError } = await supabase
        .from("queue_entries")
        .select("id, queue_number, status, patient_name, visit_type, created_at, updated_at, estimated_wait_time")
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

    if (action === "check_active_entry") {
      const { data, error } = await supabase
        .from("queue_entries")
        .select("id, queue_number, status, patient_name, visit_type")
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

    // Legacy join_queue action (kept for backwards compatibility but now should use request_otp + verify_otp)
    if (action === "join_queue") {
      const { data: currentQueue } = await supabase
        .from("queue_entries")
        .select("queue_number")
        .eq("clinic_id", clinic_id)
        .eq("status", "waiting")
        .order("queue_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextQueueNumber = (currentQueue?.queue_number || 0) + 1;

      const { data: newEntry, error: insertError } = await supabase
        .from("queue_entries")
        .insert({
          clinic_id,
          queue_number: nextQueueNumber,
          mobile_number: normalizedMobile,
          patient_name: patient_name || null,
          visit_type: visit_type || "General Consultation",
          status: "waiting",
          estimated_wait_time: estimated_wait_time || 15,
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
