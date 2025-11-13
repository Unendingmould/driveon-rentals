import { renderEmailShell } from "./base";

interface OrderApprovedArgs {
  recipientName: string;
  orderId: string;
  truckName: string;
  nextStep: string;
  dashboardUrl: string;
}

export function orderApprovedTemplate({
  recipientName,
  orderId,
  truckName,
  nextStep,
  dashboardUrl,
}: OrderApprovedArgs) {
  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      Great news—your order <strong>${orderId}</strong> for <strong>${truckName}</strong> has been approved. Our team is now
      preparing the next steps so you can hit the road without delay.
    </p>
    <div style="background:#dcfce7;border-radius:12px;padding:16px;margin:24px 0;">
      <p style="margin-top:0;"><strong>What happens next?</strong></p>
      <p>${nextStep}</p>
    </div>
    <p>
      Keep an eye on your
      <a href="${dashboardUrl}" target="_blank" rel="noopener noreferrer">Dashboard</a> for dispatch scheduling and any
      documents that need your approval.
    </p>
  `;

  return renderEmailShell({
    heading: "Your order is approved",
    preheader: "We’re lining up your truck and will share dispatch details soon.",
    body,
  });
}
