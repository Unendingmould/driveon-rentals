import { renderEmailShell } from "./base";

interface OrderDispatchedArgs {
  recipientName: string;
  orderId: string;
  truckName: string;
  trackingLink?: string;
  etaDescription?: string;
}

export function orderDispatchedTemplate({
  recipientName,
  orderId,
  truckName,
  trackingLink,
  etaDescription,
}: OrderDispatchedArgs) {
  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      Your truck <strong>${truckName}</strong> is officially on the move! Dispatch for order <strong>${orderId}</strong>
      is underway and our drivers are keeping everything on schedule.
    </p>
    <div style="background:#e0f2fe;border-radius:12px;padding:16px;margin:24px 0;">
      <p style="margin-top:0;"><strong>Arrival details</strong></p>
      <p>${etaDescription ?? "Our dispatcher will reach out shortly with an exact arrival window."}</p>
      ${
        trackingLink
          ? `<p>Follow the journey here: <a href="${trackingLink}" target="_blank" rel="noopener noreferrer">Track dispatch</a></p>`
          : ""
      }
    </div>
    <p>
      Make sure an authorized contact is available to receive the vehicle and sign any final paperwork.
      If plans change, let us know so we can adjust routing.
    </p>
  `;

  return renderEmailShell({
    heading: "Your truck has been dispatched",
    preheader: "The keys are practically in your hands—let’s get you rolling.",
    body,
  });
}
