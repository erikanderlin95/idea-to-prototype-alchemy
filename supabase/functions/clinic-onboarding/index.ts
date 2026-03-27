import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clinicName, contactPerson, phone, clinicType, website } = await req.json();

    const recipientEmail = Deno.env.get("CLINIC_ONBOARDING_EMAIL");
    if (!recipientEmail) {
      throw new Error("CLINIC_ONBOARDING_EMAIL not configured");
    }

    const emailBody = `
New Clinic Onboarding Request

Clinic Name: ${clinicName}
Contact Person: ${contactPerson}
Phone / WhatsApp: ${phone}
Clinic Type: ${clinicType}
Website / Booking Link: ${website || "Not provided"}

Submitted at: ${new Date().toISOString()}
    `.trim();

    // Use Supabase's built-in email via the Auth admin API or a simple fetch to a mail service
    // For now, log and store. In production, integrate with an email provider.
    console.log("Clinic onboarding submission:", emailBody);
    console.log("Would send to:", recipientEmail);

    // Send via Resend or similar - for MVP, we'll use a simple approach
    // Try sending via the Lovable API
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (LOVABLE_API_KEY) {
      const PROJECT_ID = Deno.env.get("SUPABASE_URL")?.match(/\/\/([^.]+)/)?.[1] || "";
      
      // Store the submission data for reference
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      await supabaseAdmin.from("clinic_onboarding_requests").insert({
        clinic_name: clinicName,
        contact_person: contactPerson,
        phone: phone,
        clinic_type: clinicType,
        website: website || null,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
