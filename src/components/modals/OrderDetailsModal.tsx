import { X, Download, FileText, Package, Truck as TruckIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OrderWithRelations } from "@/types/driveon";

interface OrderDetailsModalProps {
  order: OrderWithRelations;
  onClose: () => void;
}

const statusSteps = [
  { key: "pending_review", label: "Pending Review", icon: FileText },
  { key: "approved", label: "Approved", icon: CheckCircle2 },
  { key: "dispatched", label: "Dispatched", icon: TruckIcon },
  { key: "completed", label: "Completed", icon: Package },
];

function describeStatus(status: string) {
  const map: Record<string, string> = {
    pending_approval: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
    pending_review: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dispatched: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };
  return map[status] ?? "bg-slate-100 text-slate-700";
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const totalPaid = (order.order_payments ?? []).reduce((sum, payment) => {
    if (payment.status === "verified") {
      return sum + Number(payment.amount ?? 0);
    }
    return sum;
  }, 0);

  const currentStatusIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="relative bg-white dark:bg-card rounded-2xl border-2 border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-card border-b border-border p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Order #{order.id.slice(0, 8)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Truck Info */}
            <div className="bg-muted/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-4">
                {/* Truck image placeholder - will show when truck data is fully loaded */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-muted flex items-center justify-center">
                  <TruckIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {order.truck?.title ?? "TrucksOnFlex Truck"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.order_type === "rental" ? "Rental" : "Purchase"}
                  </p>
                  <Badge className={`${describeStatus(order.status)} mt-2 capitalize`}>
                    {order.status.replace(/_/g, " ")}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Timeline</h3>
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = currentStatusIndex >= index;
                  const isCurrent = currentStatusIndex === index;

                  return (
                    <div key={step.key} className="flex gap-4 relative pb-8 last:pb-0">
                      {/* Connector Line */}
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`absolute left-5 top-12 w-0.5 h-full -ml-px ${
                            isCompleted ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-border text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-semibold ${
                            isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-muted-foreground mt-1">Current status</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Summary */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Financial Summary</h3>
              <div className="bg-muted/30 rounded-xl p-4 sm:p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Total:</span>
                  <span className="font-semibold">${Number(order.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-semibold text-green-600">${totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-semibold text-foreground">Balance Due:</span>
                  <span className="font-bold text-primary text-lg">
                    ${(Number(order.total_amount) - totalPaid).toLocaleString()}
                  </span>
                </div>
                {order.payment_due_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Payment Due:</span>
                    <span className="font-medium">{formatDate(order.payment_due_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment History */}
            {(order.order_payments?.length ?? 0) > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Payment History</h3>
                <div className="space-y-3">
                  {order.order_payments!.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-background"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          ${Number(payment.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {payment.provider} • {payment.payment_reference}
                        </p>
                      </div>
                      <Badge
                        className={
                          payment.status === "verified"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium text-foreground">{order.id.slice(0, 16)}...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Placed On</p>
                  <p className="font-medium text-foreground">{formatDate(order.placed_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Type</p>
                  <p className="font-medium text-foreground capitalize">{order.order_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-foreground capitalize">
                    {order.status.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <FileText className="h-4 w-4" />
                View Contract
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
