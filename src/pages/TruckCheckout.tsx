import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  useCreateOrderMutation,
  usePaymentOptions,
  useSubmitPaymentMutation,
  useTruck,
  useUserActivity,
} from "@/hooks/useDriveonData";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentModal, PaymentModalFormValues } from "@/components/PaymentModal";
import { Loader2, Shield, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderRecord } from "@/types/driveon";

const PLAN_PRESETS: Array<{
  id: string;
  label: string;
  description: string;
  orderType: OrderRecord["order_type"];
  rentalTerm?: string;
  badge?: string;
}> = [
  {
    id: "purchase",
    label: "Buy outright",
    description: "Pay the full amount and get dispatch ready documentation within 48 hours.",
    orderType: "purchase",
    badge: "Own it",
  },
  {
    id: "rent-to-own",
    label: "Rent-to-own",
    description: "Weekly installments with ownership transfer once the balance is settled.",
    orderType: "rental",
    rentalTerm: "rent_to_own",
    badge: "Popular",
  },
  {
    id: "weekly-rental",
    label: "Weekly rental",
    description: "Flexible short-term plan with maintenance support included.",
    orderType: "rental",
    rentalTerm: "weekly",
  },
];

function formatCurrency(amount: number | null | undefined) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TruckCheckout() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSessionContext();

  const { data: truck, isLoading, isError } = useTruck(slug);
  const { data: paymentOptions } = usePaymentOptions();
  const createOrderMutation = useCreateOrderMutation(session?.user.id);
  const submitPaymentMutation = useSubmitPaymentMutation(session?.user.id);
  useUserActivity(session?.user.id); // prime cache so dashboard stays in sync

  const [selectedPlan, setSelectedPlan] = useState<string>(PLAN_PRESETS[0].id);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [lastOrderAmount, setLastOrderAmount] = useState<number>(0);

  const outstandingAmount = useMemo(() => {
    if (!truck) return 0;
    const preset = PLAN_PRESETS.find((p) => p.id === selectedPlan);
    if (!preset) return 0;

    if (preset.orderType === "purchase") {
      return truck.total_amount ?? truck.monthly_rate ?? truck.weekly_rate ?? 0;
    }

    if (preset.rentalTerm === "rent_to_own" || preset.rentalTerm === "weekly") {
      return truck.weekly_rate ?? truck.monthly_rate ?? 0;
    }

    return truck.weekly_rate ?? truck.monthly_rate ?? 0;
  }, [truck, selectedPlan]);

  useEffect(() => {
    if (!showPaymentModal) {
      setLastOrderAmount(outstandingAmount);
    }
  }, [showPaymentModal, outstandingAmount]);

  usePageTitle(truck ? `${truck.title} Checkout` : "Checkout");

  const plan = useMemo(() => PLAN_PRESETS.find((preset) => preset.id === selectedPlan) ?? PLAN_PRESETS[0], [selectedPlan]);

  const pricingSummary = useMemo(() => {
    if (!truck) {
      return { amountDue: 0, secondary: null as string | null };
    }

    if (plan.orderType === "purchase") {
      return {
        amountDue: outstandingAmount,
        secondary: truck.weekly_rate ? `${formatCurrency(truck.weekly_rate)} recommended weekly savings` : null,
      };
    }

    if (plan.rentalTerm === "rent_to_own") {
      return {
        amountDue: outstandingAmount,
        secondary: truck.monthly_rate ? `${formatCurrency(truck.monthly_rate)} monthly installments` : null,
      };
    }

    if (plan.rentalTerm === "weekly") {
      return {
        amountDue: outstandingAmount,
        secondary: truck.monthly_rate ? `${formatCurrency(truck.monthly_rate)} monthly cap` : null,
      };
    }

    return { amountDue: outstandingAmount, secondary: null };
  }, [truck, plan, outstandingAmount]);

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      toast({
        title: "Authentication required",
        description: "Sign in to continue with checkout.",
        variant: "destructive",
      });
      navigate("/auth", { state: { from: { pathname: window.location.pathname } } });
      return;
    }

    if (!truck) {
      toast({
        title: "Truck not available",
        description: "We could not load the selected truck. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const order = await createOrderMutation.mutateAsync({
        userId: session.user.id,
        truckId: truck.id,
        orderType: plan.orderType,
        rentalTerm: plan.rentalTerm,
        totalAmount: pricingSummary.amountDue,
        notes: notes.trim().length > 0 ? notes.trim() : null,
      });

      toast({
        title: "Order created",
        description: "You can now submit your payment proof for review.",
      });

      setActiveOrderId(order.id);
      setLastOrderAmount(pricingSummary.amountDue);
      setShowPaymentModal(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Unable to create order",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitPayment = async (values: PaymentModalFormValues) => {
    if (!session || !activeOrderId) {
      toast({
        title: "No order selected",
        description: "Please create an order before submitting a payment.",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitPaymentMutation.mutateAsync({
        orderId: activeOrderId,
        amount: values.amount,
        provider: values.provider,
        reference: values.reference ?? null,
        proofFile: values.proofFile ?? null,
        notes: values.notes ?? null,
      });

      toast({
        title: "Payment submitted",
        description: "Payment proof received! We’ll email you once it’s reviewed.",
      });
      setShowPaymentModal(false);
      setActiveOrderId(null);
      navigate("/my-trucks");
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Please retry.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pb-24 pt-28 md:pt-24 md:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">Checkout</CardTitle>
                <CardDescription>
                  Complete your order by selecting a plan, reviewing payment instructions, and submitting proof.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {isLoading ? (
                  <div className="grid gap-6">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-36 w-full" />
                  </div>
                ) : !truck ? (
                  <Card className="border border-border/60 bg-white text-center py-12">
                    <CardHeader>
                      <CardTitle className="text-xl">Truck not found</CardTitle>
                      <CardDescription>
                        This truck is no longer available. Browse our inventory for other options.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="btn-cta">
                        <Link to="/trucks">Browse trucks</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-2xl font-semibold text-foreground">{truck.title}</h2>
                      <p className="text-muted-foreground">
                        {[truck.make, truck.model, truck.model_year ? `(${truck.model_year})` : null]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <Label>Select a plan</Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        {PLAN_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            className={cn(
                              "text-left rounded-xl border p-5 transition-all",
                              "hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              selectedPlan === preset.id
                                ? "border-primary bg-primary/5 shadow-lg"
                                : "border-border"
                            )}
                            onClick={() => setSelectedPlan(preset.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{preset.label}</h3>
                              {preset.badge ? <Badge>{preset.badge}</Badge> : null}
                            </div>
                            <p className="text-sm text-muted-foreground">{preset.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form className="space-y-6" onSubmit={handlePlaceOrder}>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes for TrucksOnFlex team (optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Share delivery preferences, financing details, or questions."
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="btn-cta px-8 py-3" disabled={createOrderMutation.isPending}>
                        {createOrderMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating order…
                          </>
                        ) : (
                          "Place order"
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Payment instructions</CardTitle>
                <CardDescription>
                  Submit payment proof after transferring the amount shown. Our team reviews within 1 business day.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                <div className="flex items-start gap-4">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Transfer details</p>
                    <p>
                      Bank: TrucksOnFlex Fleet Solutions<br />
                      Account: 0002345678 (USD)<br />
                      Memo: Include your email and truck title
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Security first</p>
                    <p>We verify every submission before dispatch. Unverified payments remain in pending status.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Review timeline</p>
                    <p>Expect a confirmation email once approved. Rentals receive dispatch instructions immediately.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {paymentOptions && paymentOptions.length > 0 ? (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="uppercase tracking-wide text-foreground font-semibold text-sm">Supported methods</p>
                    <div className="flex flex-wrap gap-2">
                      {paymentOptions.map((option) => (
                        <Badge key={option.id} variant="secondary">
                          {option.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardFooter>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : truck ? (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between text-foreground">
                      <span>Plan</span>
                      <span className="font-medium">{plan.label}</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <span>Amount due now</span>
                      <span className="text-lg font-semibold">{formatCurrency(pricingSummary.amountDue)}</span>
                    </div>
                    {pricingSummary.secondary ? (
                      <div className="flex items-start justify-between">
                        <span>Next payments</span>
                        <span className="max-w-[60%] text-right">{pricingSummary.secondary}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <Badge variant="outline">Pending payment</Badge>
                    </div>
                  </div>
                ) : (
                  <p>Summary will appear once a truck is selected.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Need help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Reach us at support@trucksonflex.com or +234-800-TRUCKS for assistance with financing questions.</p>
                <p>We can also provide digital invoices or custom payment plans upon request.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={(open) => {
          setShowPaymentModal(open);
          if (!open) {
            setActiveOrderId(null);
          }
        }}
        defaultAmount={activeOrderId ? pricingSummary.amountDue || lastOrderAmount : outstandingAmount}
        currency="USD"
        onSubmit={handleSubmitPayment}
        submitting={submitPaymentMutation.isPending}
      />
    </div>
  );
}
