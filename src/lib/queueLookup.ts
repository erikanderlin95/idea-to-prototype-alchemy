import { supabase } from "@/integrations/supabase/client";

/**
 * Direct fetch to the queue-lookup edge function.
 * Avoids supabase-js `functions.invoke` which console.errors on non-2xx,
 * triggering the Lovable runtime error overlay (blank screen).
 * Returns { data, error, status } where non-2xx bodies are still parsed.
 */
export async function callQueueLookup(body: Record<string, unknown>): Promise<{
  data: any;
  error: any;
  status: number;
}> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/queue-lookup`;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token || anonKey;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    let json: any = null;
    try { json = await res.json(); } catch { /* ignore */ }
    if (!res.ok) {
      return { data: json, error: json ?? { error: `HTTP ${res.status}` }, status: res.status };
    }
    return { data: json, error: null, status: res.status };
  } catch (err: any) {
    return { data: null, error: { error: err?.message || "Network error" }, status: 0 };
  }
}
