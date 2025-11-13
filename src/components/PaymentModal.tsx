import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export interface PaymentModalFormValues {
  amount: number;
  provider: string;
  reference?: string;
  proofFile?: File | null;
  notes?: string;
}

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAmount: number;
  currency?: string;
  onSubmit: (values: PaymentModalFormValues) => Promise<void>;
  submitting?: boolean;
}

const PROVIDER_PRESETS = ["Bank Transfer", "Card Payment", "Wire", "Crypto"];

export function PaymentModal({
  open,
  onOpenChange,
  defaultAmount,
  currency = "USD",
  onSubmit,
  submitting,
}: PaymentModalProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [provider, setProvider] = useState<string>(PROVIDER_PRESETS[0]);
  const [reference, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setAmount(defaultAmount);
      setProvider(PROVIDER_PRESETS[0]);
      setReference("");
      setNotes("");
      setFile(null);
    }
  }, [open, defaultAmount]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount || !Number.isFinite(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    await onSubmit({ amount, provider, reference, proofFile: file, notes });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit payment proof</DialogTitle>
          <DialogDescription>
            Upload your transfer receipt or supporting document so our team can verify your payment.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ({currency})</Label>
              <Input
                id="amount"
                type="number"
                min={1}
                step="0.01"
                value={amount}
                onChange={(event) => {
                  const parsed = Number(event.target.value);
                  setAmount(Number.isFinite(parsed) ? parsed : 0);
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Payment provider</Label>
              <Input
                id="provider"
                list="payment-providers"
                placeholder="Bank transfer, Stripe, Flutterwave..."
                value={provider}
                onChange={(event) => setProvider(event.target.value)}
                required
              />
              <datalist id="payment-providers">
                {PROVIDER_PRESETS.map((preset) => (
                  <option key={preset} value={preset} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Payment reference (optional)</Label>
              <Input
                id="reference"
                placeholder="Transaction reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional context about this payment"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof">Upload proof (PDF, PNG, JPG)</Label>
              <Input
                id="proof"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" className="btn-cta" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
