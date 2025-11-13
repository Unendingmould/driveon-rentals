import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { driveonKeys } from "@/hooks/useDriveonData";

export function useRealtimeOrders(userId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`driveon-orders-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "driveon",
          table: "orders",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
          queryClient.invalidateQueries({ queryKey: driveonKeys.activity(userId) });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "driveon",
          table: "order_payments",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "driveon",
          table: "order_events",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
          queryClient.invalidateQueries({ queryKey: driveonKeys.activity(userId) });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "driveon",
          table: "trucks",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);
}
