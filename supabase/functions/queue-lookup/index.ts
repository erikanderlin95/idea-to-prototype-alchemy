import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mobile_number, clinic_id, action } = await req.json();

    // Validate required parameters
    if (!mobile_number || typeof mobile_number !== "string") {
      return new Response(
        JSON.stringify({ error: "mobile_number is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!clinic_id || typeof clinic_id !== "string") {
      return new Response(
        JSON.stringify({ error: "clinic_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate mobile number format (basic validation - digits and optional + prefix)
    const mobileRegex = /^\+?[0-9]{8,15}$/;
    if (!mobileRegex.test(mobile_number.replace(/\s/g, ""))) {
      return new Response(
        JSON.stringify({ error: "Invalid mobile number format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for bypassing RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Normalize mobile number (remove spaces)
    const normalizedMobile = mobile_number.replace(/\s/g, "");

    if (action === "get_queue_position") {
      // Get the user's queue entry by mobile number
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

      // Get total waiting count and position (only queue_number, no personal data)
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

      // Calculate position in queue
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
      // Simple check if user has an active queue entry (for ClinicCard status)
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
      // Return only non-personal queue data for display (queue numbers, no names/phones)
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

    return new Response(
      JSON.stringify({ error: "Invalid action. Use: get_queue_position, check_active_entry, or get_public_queue_list" }),
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