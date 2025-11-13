import { renderEmailShell } from "./base";

interface PaymentProofSubmittedArgs {
  recipientName: string;
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  dashboardUrl: string;
}

export function paymentProofSubmittedTemplate({
  recipientName,
  orderId,
  amount,
  currency,
  provider,
  dashboardUrl,
}: PaymentProofSubmittedArgs) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      Thanks for submitting your payment confirmation for order <strong>${orderId}</strong>. Our finance
      specialists will review and update your order status shortly.
    </p>
    <div style="background:#ecfeff;border-radius:12px;padding:16px;margin:24px 0;">
      <p><strong>Submitted details</strong></p>
      <p>Amount: ${formattedAmount}</p>
      <p>Provider: ${provider}</p>
    </div>
    <p>
      We’ll email you as soon as the review is complete. You can also monitor updates anytime on the
      <a href="${dashboardUrl}" target="_blank" rel="noopener noreferrer">My Trucks</a> page.
    </p>
  `;

  return renderEmailShell({
    heading: "Payment proof received",
    preheader: "We’ll let you know once finance reviews your payment.",
    body,
  });
}
