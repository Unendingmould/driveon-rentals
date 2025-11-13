import { supabase } from "@/lib/supabaseClient";

interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(payload: SendEmailPayload) {
  const { data, error } = await supabase.functions.invoke("send-email", {
    body: payload,
  });

  if (error) {
    console.error("sendEmail error", error);
    throw new Error(error.message);
  }

  return data;
}
