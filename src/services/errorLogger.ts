import { supabase } from "@/lib/supabaseClient";

interface LogFrontEndErrorOptions {
  context: string;
  error?: unknown;
  extra?: Record<string, unknown>;
}

function normalizeErrorMessage(error: unknown): { message: string | null; stack: string | null } {
  if (error instanceof Error) {
    return {
      message: error.message ?? error.toString(),
      stack: error.stack ?? null,
    };
  }

  if (typeof error === "string") {
    return { message: error, stack: null };
  }

  if (error && typeof (error as any).toString === "function") {
    return { message: (error as any).toString(), stack: null };
  }

  return { message: null, stack: null };
}

export async function logFrontEndError({ context, error, extra }: LogFrontEndErrorOptions): Promise<void> {
  try {
    if (typeof window === "undefined") return;

    const { message, stack } = normalizeErrorMessage(error);

    const path = window.location?.pathname ?? null;
    const userAgent = window.navigator?.userAgent ?? null;

    const payload = {
      path,
      user_agent: userAgent,
      message,
      stack,
      context: {
        context,
        ...extra,
      },
    } as const;

    await supabase
      .schema("driveon")
      .from("front_end_errors")
      .insert(payload);
  } catch (logError) {
    // Do not let logging failures break the app
    console.warn("[logFrontEndError] Failed to log error", logError);
  }
}
