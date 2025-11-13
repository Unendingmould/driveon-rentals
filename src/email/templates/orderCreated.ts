import { renderEmailShell } from "./base";

type OrderType = "purchase" | "rental";

interface OrderCreatedArgs {
  recipientName: string;
  orderId: string;
  orderType: OrderType;
  truckName: string;
  totalAmount: number;
  currency: string;
  dashboardUrl: string;
}

export function orderCreatedTemplate({
  recipientName,
  orderId,
  orderType,
  truckName,
  totalAmount,
  currency,
  dashboardUrl,
}: OrderCreatedArgs) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(totalAmount);

  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      Thanks for choosing Trucksonflex! We’ve received your ${orderType === "purchase" ? "purchase" : "rental"} request
      for <strong>${truckName}</strong> (order <strong>${orderId}</strong>).
    </p>
    <div style="background:#f8fafc;border-radius:12px;padding:16px;margin:24px 0;">
      <p style="margin-top:0;"><strong>Order summary</strong></p>
      <p>Truck: ${truckName}</p>
      <p>Type: ${orderType === "purchase" ? "Purchase" : "Rental"}</p>
      <p>Total value: ${formattedAmount}</p>
    </div>
    <p>
      Our specialists are reviewing your order. You can follow every update and upload payment proof from your
      <a href="${dashboardUrl}" target="_blank" rel="noopener noreferrer">Dashboard</a>.
    </p>
    <p style="color:#475569;">Need help? Reply to this email or call +1 (800) 555-0147.</p>
  `;

  return renderEmailShell({
    heading: "We’ve received your order",
    preheader: "Sit tight while our team reviews the details and confirms availability.",
    body,
  });
}
