import { ReactNode, useEffect, useState } from "react";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";

interface SupabaseProviderProps {
  children: ReactNode;
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [initialSession, setInitialSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession()
      .then(({ data }) => {
        if (isMounted) {
          setInitialSession(data.session ?? null);
        }
      })
      .catch((error) => {
        console.error("Failed to get initial session:", error);
        if (isMounted) {
          setInitialSession(null);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setInitialSession(session ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession ?? undefined}>
      {children}
    </SessionContextProvider>
  );
}
