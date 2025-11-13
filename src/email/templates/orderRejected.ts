import { renderEmailShell } from "./base";

interface OrderRejectedArgs {
  recipientName: string;
  orderId: string;
  truckName: string;
  reason: string;
  supportEmail?: string;
}

export function orderRejectedTemplate({
  recipientName,
  orderId,
  truckName,
  reason,
  supportEmail = "hello@trucksonflex.com",
}: OrderRejectedArgs) {
  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      We’re sorry—after reviewing your request, we can’t move forward with order <strong>${orderId}</strong> for
      <strong>${truckName}</strong> at this time.
    </p>
    <div style="background:#fee2e2;border-radius:12px;padding:16px;margin:24px 0;">
      <p style="margin-top:0;"><strong>Why was it declined?</strong></p>
      <p>${reason}</p>
    </div>
    <p style="color:#475569;">
      If you believe this decision was made in error or you have updated documentation, reply to this email or contact us at
      <a href="mailto:${supportEmail}">${supportEmail}</a>. We’re happy to review again.
    </p>
  `;

  return renderEmailShell({
    heading: "An update on your order",
    preheader: "We couldn’t approve your request today. Let’s talk about next steps.",
    body,
  });
}
