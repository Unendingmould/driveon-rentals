import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useOrders } from "@/hooks/useDriveonData";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import { Loader2, Truck, Clock, CheckCircle2, AlertTriangle, XCircle, Package } from "lucide-react";
import type { OrderWithRelations } from "@/types/driveon";

// Helper to determine if an order is current or past
function isCurrentOrder(status: string): boolean {
  return ["pending_approval", "pending_review", "approved", "dispatched"].includes(status);
}

function buildStatusBadge(status: string) {
  const mapping: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" | "success" } & { icon: React.ReactNode }> = {
    pending_approval: { label: "Pending approval", variant: "secondary", icon: <Clock className="h-3.5 w-3.5" /> },
    pending_review: { label: "Payment under review", variant: "outline", icon: <Loader2 className="h-3.5 w-3.5 animate-spin" /> },
    approved: { label: "Approved", variant: "default", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    dispatched: { label: "Dispatched", variant: "success", icon: <Truck className="h-3.5 w-3.5" /> },
    delivered: { label: "Delivered", variant: "success", icon: <Package className="h-3.5 w-3.5" /> },
    completed: { label: "Completed", variant: "outline", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    cancelled: { label: "Cancelled", variant: "destructive", icon: <XCircle className="h-3.5 w-3.5" /> },
  };

  return mapping[status] ?? { label: status.replace(/_/g, " "), variant: "outline", icon: null };
}

function OrderCard({ order }: { order: OrderWithRelations }) {
  const badge = buildStatusBadge(order.status);

  const totalPaid = useMemo(
    () => (order.order_payments ?? []).reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0),
    [order.order_payments]
  );

  const truckDetails = [
    order.truck?.mileage ? `${order.truck.mileage.toLocaleString()} miles` : null,
    order.truck?.model_year,
    order.truck?.condition,
  ].filter(Boolean).join(" • ");

  return (
    <Card className="border-border/70 bg-white">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-xl text-foreground">{order.truck?.title ?? "Truck order"}</CardTitle>
            {truckDetails && (
              <p className="text-sm text-muted-foreground">{truckDetails}</p>
            )}
            <CardDescription className="text-xs">
              {order.order_type === "purchase" ? "Purchase" : "Rental"} • Placed {new Date(order.placed_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={badge.variant as "default" | "secondary" | "outline" | "destructive" | undefined} className="flex items-center gap-1">
            {badge.icon}
            <span className="capitalize">{badge.label}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Payment Summary</p>
            <div className="space-y-1 text-muted-foreground">
              <p>Paid: ${totalPaid.toLocaleString()}</p>
              <p>Total: ${Number(order.total_amount).toLocaleString()}</p>
              {totalPaid < Number(order.total_amount) && (
                <p className="text-xs text-amber-600">
                  Balance: ${(Number(order.total_amount) - totalPaid).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Status Update</p>
            <p className="text-muted-foreground">
              {order.status === "pending_approval" && "Reviewing your application. Expect update within 24 hours."}
              {order.status === "pending_review" && "Payment under review by our finance team."}
              {order.status === "approved" && "Approved! Dispatch scheduling in progress."}
              {order.status === "dispatched" && "Truck dispatched. Check email for delivery updates."}
              {order.status === "delivered" && "Truck delivered successfully."}
              {order.status === "completed" && "Order completed."}
              {order.status === "cancelled" && "This order was cancelled."}
              {!["pending_approval", "pending_review", "approved", "dispatched", "delivered", "completed", "cancelled"].includes(order.status) && "Status updates will appear here."}
            </p>
          </div>
        </div>

        {(order.order_payments?.length ?? 0) > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            <p className="font-semibold text-foreground">Payment History</p>
            <div className="space-y-2">
              {order.order_payments!.map((payment) => (
                <div key={payment.id} className="flex flex-wrap items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-3 text-xs">
                  <span className="text-foreground font-semibold">${Number(payment.amount).toLocaleString()}</span>
                  <span className="text-muted-foreground">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {payment.status.replace(/_/g, " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MyTrucks() {
  const { session, isLoading } = useSessionContext();
  usePageTitle("My Trucks");

  const userId = session?.user.id;
  useRealtimeOrders(userId);

  const { data: orders, isLoading: ordersLoading, isError, refetch } = useOrders(userId, {
    enabled: !isLoading && Boolean(userId),
  });

  // Separate current and past orders
  const currentOrders = useMemo(() => orders?.filter(order => isCurrentOrder(order.status)) ?? [], [orders]);
  const pastOrders = useMemo(() => orders?.filter(order => !isCurrentOrder(order.status)) ?? [], [orders]);

  if (!session && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center bg-background px-6 text-center">
          <Card className="max-w-md border border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Sign in to view your trucks</CardTitle>
              <CardDescription>Access order history, payment updates, and dispatch notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="btn-cta w-full">
                <Link to="/auth?mode=signin" state={{ from: { pathname: "/my-trucks" } }}>
                  Go to login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 md:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">My Trucks</h1>
            <p className="text-muted-foreground max-w-2xl">
              View your current active orders and past rental/purchase history. Track payments, approvals, and deliveries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => refetch()} disabled={ordersLoading}>
                {ordersLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
              </Button>
              <Button asChild className="btn-cta">
                <Link to="/trucks">Browse trucks</Link>
              </Button>
            </div>
          </header>

          {ordersLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : !orders || orders.length === 0 ? (
            <Card className="border border-border/60 bg-white text-center py-16">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">No trucks yet</CardTitle>
                <CardDescription>
                  You haven't rented or purchased any trucks yet. Browse our inventory to get started.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button asChild className="btn-cta">
                  <Link to="/trucks">Explore trucks</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="current" className="gap-2">
                  <Truck className="h-4 w-4" />
                  Current ({currentOrders.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="gap-2">
                  <Package className="h-4 w-4" />
                  Past ({pastOrders.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="space-y-6 mt-6">
                {currentOrders.length === 0 ? (
                  <Card className="border border-border/60 bg-white text-center py-12">
                    <CardHeader>
                      <CardTitle className="text-xl">No current orders</CardTitle>
                      <CardDescription>
                        All your active orders will appear here. Browse trucks to start a new order.
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                      <Button asChild className="btn-cta">
                        <Link to="/trucks">Browse trucks</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  currentOrders.map((order) => <OrderCard key={order.id} order={order} />)
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-6 mt-6">
                {pastOrders.length === 0 ? (
                  <Card className="border border-border/60 bg-white text-center py-12">
                    <CardHeader>
                      <CardTitle className="text-xl">No past orders</CardTitle>
                      <CardDescription>
                        Your completed, delivered, or cancelled orders will appear here.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  pastOrders.map((order) => <OrderCard key={order.id} order={order} />)
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
