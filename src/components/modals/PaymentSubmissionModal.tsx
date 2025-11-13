import { useState } from "react";
import { X, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { OrderWithRelations } from "@/types/driveon";

interface PaymentSubmissionModalProps {
  order: OrderWithRelations;
  onClose: () => void;
}

export default function PaymentSubmissionModal({ order, onClose }: PaymentSubmissionModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Payment Submitted!",
      description: "Your payment proof has been submitted for verification. We'll update you within 24 hours.",
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="relative bg-white dark:bg-card rounded-2xl border-2 border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Submit Payment</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Order: {order.id.slice(0, 8)} • {order.truck?.title}
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Crypto (Bitcoin, Ethereum, etc.)</SelectItem>
                  <SelectItem value="cashapp">Cash App</SelectItem>
                  <SelectItem value="zelle">Zelle</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference">Transaction Reference / ID *</Label>
              <Input
                id="reference"
                type="text"
                required
                placeholder="Enter transaction ID or reference number"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

            {/* Receipt Upload */}
            <div className="space-y-2">
              <Label htmlFor="receipt">Upload Receipt / Proof *</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="receipt"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  {file ? (
                    <>
                      <Check className="h-8 w-8 text-green-600" />
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Click to change file
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground">
                        Click to upload receipt
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, PDF (Max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about this payment..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">${Number(order.total_amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-medium">
                  ${(order.order_payments ?? [])
                    .filter((p) => p.status === "verified")
                    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground font-semibold">Remaining:</span>
                <span className="font-bold text-primary">
                  $
                  {(
                    Number(order.total_amount) -
                    (order.order_payments ?? [])
                      .filter((p) => p.status === "verified")
                      .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-cta"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Payment"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
