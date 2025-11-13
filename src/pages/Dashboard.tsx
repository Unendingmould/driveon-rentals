import { useMemo } from "react";
import { Loader2, Wallet, TrendingUp, Activity, Clock, Truck, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useOrders, useUserActivity } from "@/hooks/useDriveonData";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import type { OrderWithRelations } from "@/types/driveon";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function describeStatus(status: string) {
  const map: Record<string, string> = {
    pending_approval: "bg-slate-100 text-slate-700",
    pending_review: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    dispatched: "bg-indigo-100 text-indigo-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
  };
  return map[status] ?? "bg-slate-100 text-slate-700";
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function OrderSummary({ order }: { order: OrderWithRelations }) {
  const totalPaid = (order.order_payments ?? []).reduce((sum, payment) => {
    if (payment.status === "verified") {
      return sum + Number(payment.amount ?? 0);
    }
    return sum;
  }, 0);

  return (
    <Card className="border-border/70">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">
              {order.truck?.title ?? "TrucksOnFlex Truck"}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Order {order.id.slice(0, 8)} • {order.order_type === "rental" ? "Rental" : "Purchase"}
            </CardDescription>
          </div>
          <Badge className={`${describeStatus(order.status)} capitalize`}>{order.status.replace(/_/g, " ")}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <p className="font-medium text-foreground">Placed</p>
            <p>{formatDate(order.placed_at)}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Total amount</p>
            <p>{currencyFormatter.format(Number(order.total_amount ?? 0))}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Paid to date</p>
            <p>{currencyFormatter.format(totalPaid)}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Payment due</p>
            <p>{order.payment_due_at ? formatDate(order.payment_due_at) : "—"}</p>
          </div>
        </div>

        {(order.order_payments?.length ?? 0) > 0 && (
          <div className="pt-4 border-t border-border/60">
            <p className="mb-3 font-medium text-foreground">Recent payments</p>
            <div className="space-y-3">
              {order.order_payments!.map((payment) => (
                <div key={payment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/60 px-3 py-2">
                  <span className="text-foreground font-medium">{currencyFormatter.format(Number(payment.amount ?? 0))}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{payment.provider}</span>
                    <span>•</span>
                    <span className="capitalize">{payment.status.replace(/_/g, " ")}</span>
                    {payment.payment_reference && (
                      <>
                        <span>•</span>
                        <span>{payment.payment_reference}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { session } = useSessionContext();
  const userId = session?.user.id;
  const { data: orders, isLoading: ordersLoading } = useOrders(userId);
  const { data: activity, isLoading: activityLoading } = useUserActivity(userId);
  useRealtimeOrders(userId);

  const firstName = useMemo(() => {
    const meta: any = session?.user?.user_metadata ?? {};
    const name: string = meta.full_name || meta.name || session?.user?.email || "there";
    const base = name.includes("@") ? name.split("@")[0] : name;
    const parts = base.trim().split(/\s+/);
    return parts[0] || "there";
  }, [session?.user]);

  const totals = useMemo(() => {
    const dataset = orders ?? [];
    const totalSpend = dataset.reduce((sum, order) => sum + Number(order.total_amount ?? 0), 0);
    const totalPaid = dataset.reduce(
      (sum, order) =>
        sum + (order.order_payments ?? []).reduce((acc, payment) => acc + Number(payment.amount ?? 0), 0),
      0
    );

    const reservedOrders = dataset.filter((order) => order.status === "pending_review").length;
    const approvedOrders = dataset.filter((order) => order.status === "approved").length;
    const dispatchedOrders = dataset.filter((order) => order.status === "dispatched").length;

    return {
      totalOrders: dataset.length,
      totalSpend,
      totalPaid,
      reservedOrders,
      approvedOrders,
      dispatchedOrders,
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pb-24 pt-28 md:pt-24 md:ml-64">
        <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-foreground">Welcome back, {firstName}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Track your rentals, purchases, and recent TrucksOnFlex activity from your personalized dashboard.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total orders</CardTitle>
                <Wallet className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totals.totalOrders}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime spend</CardTitle>
                <TrendingUp className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{currencyFormatter.format(totals.totalSpend)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Payments logged</CardTitle>
                <Activity className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{currencyFormatter.format(totals.totalPaid)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting review</CardTitle>
                <Clock className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totals.reservedOrders}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved trucks</CardTitle>
                <ShieldCheck className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totals.approvedOrders}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Dispatched trucks</CardTitle>
                <Truck className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totals.dispatchedOrders}</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Orders</h2>
                <Button variant="outline" className="rounded-full" disabled>
                  Export coming soon
                </Button>
              </div>
              {ordersLoading ? (
                <div className="flex items-center justify-center rounded-xl border border-border/60 py-16 text-muted-foreground">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading orders…
                </div>
              ) : (orders?.length ?? 0) === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 py-16 text-center text-muted-foreground">
                  No orders yet. Once you rent or purchase a truck, your agreement details will appear here.
                </div>
              ) : (
                <div className="space-y-6">
                  {orders!.map((order) => (
                    <OrderSummary key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>

            <Card className="h-fit border-border/70">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Recent activity</CardTitle>
                <CardDescription>
                  The latest interactions tied to your account across the TrucksOnFlex platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading activity…
                  </div>
                ) : (activity?.length ?? 0) === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-6 text-center text-sm text-muted-foreground">
                    No activity yet. Explore trucks, submit applications, or complete payments to see updates here.
                  </div>
                ) : (
                  <ul className="space-y-4 text-sm">
                    {activity!.map((event) => (
                      <li key={event.id} className="rounded-lg border border-border/60 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold text-foreground capitalize">{event.activity_type}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(event.created_at)}</span>
                        </div>
                        {event.notes && <p className="mt-2 text-muted-foreground">{event.notes}</p>}
                        {event.metadata && Object.keys(event.metadata).length > 0 && (
                          <pre className="mt-3 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground overflow-x-auto">
                            {JSON.stringify(event.metadata, null, 2)}
                          </pre>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
