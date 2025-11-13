import { accountWelcomeTemplate } from "@/email/templates/accountWelcome";
import { orderCreatedTemplate } from "@/email/templates/orderCreated";
import { orderApprovedTemplate } from "@/email/templates/orderApproved";
import { orderRejectedTemplate } from "@/email/templates/orderRejected";
import { orderDispatchedTemplate } from "@/email/templates/orderDispatched";
import { paymentProofSubmittedTemplate } from "@/email/templates/paymentProofSubmitted";
import { sendEmail } from "@/services/email";

function getBaseUrl() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  const fallback = import.meta.env.VITE_APP_BASE_URL ?? "https://trucksonflex.com";
  return String(fallback).replace(/\/$/, "");
}

function fallbackName(name?: string | null, email?: string | null): string {
  const trimmed = name?.trim();
  if (trimmed) return trimmed;
  return email ?? "there";
}

export async function sendWelcomeEmail({
  to,
  recipientName,
  verifyPath = "/auth?mode=signin&verified=1",
}: {
  to: string;
  recipientName?: string | null;
  verifyPath?: string;
}) {
  const baseUrl = getBaseUrl();
  const html = accountWelcomeTemplate({
    recipientName: fallbackName(recipientName, to),
    verifyUrl: `${baseUrl}${verifyPath}`,
  });

  await sendEmail({
    to,
    subject: "Welcome to Trucksonflex",
    html,
  });
}

export async function sendOrderCreatedEmail({
  to,
  recipientName,
  orderId,
  orderType,
  truckName,
  totalAmount,
  currency = "USD",
}: {
  to: string;
  recipientName?: string | null;
  orderId: string;
  orderType: "purchase" | "rental";
  truckName: string;
  totalAmount: number;
  currency?: string;
}) {
  const baseUrl = getBaseUrl();
  const html = orderCreatedTemplate({
    recipientName: fallbackName(recipientName, to),
    orderId,
    orderType,
    truckName,
    totalAmount,
    currency,
    dashboardUrl: `${baseUrl}/dashboard`,
  });

  await sendEmail({
    to,
    subject: `We received your Trucksonflex ${orderType === "purchase" ? "purchase" : "rental"} order`,
    html,
  });
}

export async function sendPaymentProofSubmittedEmail({
  to,
  recipientName,
  orderId,
  amount,
  currency = "USD",
  provider,
}: {
  to: string;
  recipientName?: string | null;
  orderId: string;
  amount: number;
  currency?: string;
  provider: string;
}) {
  const baseUrl = getBaseUrl();
  const html = paymentProofSubmittedTemplate({
    recipientName: fallbackName(recipientName, to),
    orderId,
    amount,
    currency,
    provider,
    dashboardUrl: `${baseUrl}/my-trucks`,
  });

  await sendEmail({
    to,
    subject: "We received your payment proof",
    html,
  });
}

export async function sendOrderApprovedEmail({
  to,
  recipientName,
  orderId,
  truckName,
  nextStep,
}: {
  to: string;
  recipientName?: string | null;
  orderId: string;
  truckName: string;
  nextStep: string;
}) {
  const baseUrl = getBaseUrl();
  const html = orderApprovedTemplate({
    recipientName: fallbackName(recipientName, to),
    orderId,
    truckName,
    nextStep,
    dashboardUrl: `${baseUrl}/my-trucks`,
  });

  await sendEmail({
    to,
    subject: "Your Trucksonflex order is approved",
    html,
  });
}

export async function sendOrderRejectedEmail({
  to,
  recipientName,
  orderId,
  truckName,
  reason,
  supportEmail,
}: {
  to: string;
  recipientName?: string | null;
  orderId: string;
  truckName: string;
  reason: string;
  supportEmail?: string;
}) {
  const html = orderRejectedTemplate({
    recipientName: fallbackName(recipientName, to),
    orderId,
    truckName,
    reason,
    supportEmail,
  });

  await sendEmail({
    to,
    subject: "Update on your Trucksonflex order",
    html,
  });
}

export async function sendOrderDispatchedEmail({
  to,
  recipientName,
  orderId,
  truckName,
  trackingLink,
  etaDescription,
}: {
  to: string;
  recipientName?: string | null;
  orderId: string;
  truckName: string;
  trackingLink?: string;
  etaDescription?: string;
}) {
  const html = orderDispatchedTemplate({
    recipientName: fallbackName(recipientName, to),
    orderId,
    truckName,
    trackingLink,
    etaDescription,
  });

  await sendEmail({
    to,
    subject: "Your Trucksonflex truck is on the way",
    html,
  });
}
