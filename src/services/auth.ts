import { supabase } from "@/lib/supabaseClient";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface TrucksOnFlexSignInPayload {
  email: string;
  password: string;
}

export interface TrucksOnFlexSignUpMetadata {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  street_address?: string;
}

export interface TrucksOnFlexSignUpPayload extends TrucksOnFlexSignInPayload {
  emailRedirectTo?: string;
  metadata?: TrucksOnFlexSignUpMetadata;
}

export async function signInWithEmail(
  payload: TrucksOnFlexSignInPayload,
  client: SupabaseClient | typeof supabase = supabase
) {
  return client.auth.signInWithPassword(payload);
}

export async function signUpWithEmail(
  payload: TrucksOnFlexSignUpPayload,
  client: SupabaseClient | typeof supabase = supabase
) {
  const { email, password, emailRedirectTo, metadata } = payload;
  return client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: metadata,
    },
  });
}

export async function signOut(client: SupabaseClient | typeof supabase = supabase) {
  return client.auth.signOut();
}
