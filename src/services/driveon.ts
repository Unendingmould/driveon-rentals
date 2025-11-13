import { supabase } from "@/lib/supabaseClient";
import {
  TruckImageRecord,
  TruckRecord,
  TruckWithAssets,
  ServiceRecord,
  PaymentOptionRecord,
  TestimonialRecord,
  FaqRecord,
  OrderRecord,
  OrderPaymentRecord,
  OrderPaymentStatus,
  OrderWithRelations,
  UserTruckActivityRecord,
  AdminPaymentReview,
  CryptoAsset,
} from "@/types/driveon";
import {
  sendOrderCreatedEmail,
  sendPaymentProofSubmittedEmail,
} from "@/services/emailNotifications";

const DRIVEON_SCHEMA = "driveon";
const KNOWN_BUCKETS = [
  "user-uploads",
  "strickk proof upload and profile photos",
  "strickk proof uploads",
  "strickk-proof-uploads",
] as const;
const DEFAULT_BUCKET = "user-uploads";
const PROOF_BUCKET = "strickk proof uploads";

const driveonClient = supabase.schema(DRIVEON_SCHEMA);

function buildStoragePublicUrl(storagePath: string | null): string | null {
  if (!storagePath) return null;
  if (/^https?:\/\//i.test(storagePath)) {
    return storagePath;
  }

  const segments = storagePath.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  let bucket = segments[0];
  let path = segments.slice(1).join("/");

  if (!KNOWN_BUCKETS.includes(bucket as (typeof KNOWN_BUCKETS)[number]) || !path) {
    bucket = DEFAULT_BUCKET;
    path = storagePath;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl ?? null;
}

function mapTruckImages(records: TruckImageRecord[] | null | undefined) {
  if (!records) return [];
  return records
    .map((image) => ({
      id: image.id,
      url: buildStoragePublicUrl(image.storage_path),
      alt: image.alt_text,
      isPrimary: image.is_primary,
      sortOrder: image.sort_order ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

type RawTruck = TruckRecord & { truck_images?: TruckImageRecord[] };

function mapTruck(record: RawTruck): TruckWithAssets {
  return {
    ...record,
    images: mapTruckImages(record.truck_images),
  };
}

export async function fetchTruckBySlug(slug: string): Promise<TruckWithAssets | null> {
  const { data, error } = await driveonClient
    .from("trucks")
    .select("*, truck_images(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116" || error.code === "PGRST117") {
      return null;
    }
    console.error("Failed to load truck by slug", error);
    throw new Error(error.message);
  }

  return data ? mapTruck(data as RawTruck) : null;
}

export async function fetchTrucks(): Promise<TruckWithAssets[]> {
  const { data, error } = await driveonClient
    .from("trucks")
    .select("*, truck_images(*)")
    .eq("status", "available")
    .order("is_primary", { ascending: false, foreignTable: "truck_images" })
    .order("sort_order", { ascending: true, foreignTable: "truck_images" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load trucks", error);
    throw new Error(error.message);
  }

  return ((data ?? []) as RawTruck[]).map(mapTruck);
}

export async function fetchServices(): Promise<ServiceRecord[]> {
  const { data, error } = await driveonClient
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: true });

  if (error) {
    console.error("Failed to load services", error);
    throw new Error(error.message);
  }

  return (data ?? []) as ServiceRecord[];
}

export async function fetchPaymentOptions(): Promise<PaymentOptionRecord[]> {
  const { data, error } = await driveonClient
    .from("payment_options")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: true });

  if (error) {
    console.error("Failed to load payment options", error);
    throw new Error(error.message);
  }

  return (data ?? []) as PaymentOptionRecord[];
}

export async function fetchTestimonials(): Promise<TestimonialRecord[]> {
  const { data, error } = await driveonClient
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load testimonials", error);
    throw new Error(error.message);
  }

  return (data ?? []) as TestimonialRecord[];
}

export async function fetchFaqs(): Promise<FaqRecord[]> {
  const { data, error } = await driveonClient
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: true });

  if (error) {
    console.error("Failed to load FAQs", error);
    throw new Error(error.message);
  }

  return (data ?? []) as FaqRecord[];
}

export async function fetchOrdersForUser(userId: string): Promise<OrderWithRelations[]> {
  const { data: orders, error } = await driveonClient
    .from("orders")
    .select("*, order_events(*), order_payments(*)")
    .eq("user_id", userId)
    .order("placed_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Failed to load orders", error);
    throw new Error(error.message);
  }

  const truckIds = Array.from(new Set((orders ?? []).map((order) => order.truck_id).filter(Boolean)));
  let trucksById: Record<string, Partial<TruckRecord>> = {};
  if (truckIds.length > 0) {
    const { data: trucks, error: trucksError } = await driveonClient
      .from("trucks")
      .select("id, title, make, model, slug, status")
      .in("id", truckIds);

    if (trucksError) {
      console.error("Failed to load related trucks", trucksError);
      throw new Error(trucksError.message);
    }

    trucksById = (trucks ?? []).reduce<Record<string, Partial<TruckRecord>>>((acc, truck) => {
      acc[truck.id] = truck;
      return acc;
    }, {});
  }

  const statusFromEventType = (eventType: string | null | undefined): string | null => {
    if (!eventType) return null;
    const mapping: Record<string, string> = {
      order_approved: "approved",
      order_dispatched: "dispatched",
      order_completed: "completed",
      order_cancelled: "cancelled",
      payment_verified: "approved",
      payment_failed: "pending_review",
    };
    return mapping[eventType] ?? null;
  };

  const statusUpdatePromises: Promise<unknown>[] = [];

  const normalizedOrders = (orders ?? []).map((order) => {
    const sortedEvents = [...(order.order_events ?? [])].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const latestStatus = statusFromEventType(sortedEvents[0]?.event_type);

    if (latestStatus && latestStatus !== order.status) {
      statusUpdatePromises.push(
        (async () => {
          await driveonClient
            .from("orders")
            .update({ status: latestStatus, updated_at: new Date().toISOString() })
            .eq("id", order.id);

          if (latestStatus === "dispatched" && order.truck_id) {
            await driveonClient
              .from("trucks")
              .update({ status: "dispatched", updated_at: new Date().toISOString() })
              .eq("id", order.truck_id);
          }
        })()
      );
    }

    return {
      ...order,
      order_events: sortedEvents,
    };
  });

  if (statusUpdatePromises.length > 0) {
    await Promise.allSettled(statusUpdatePromises);
  }

  return normalizedOrders.map((order) => ({
    ...order,
    truck: trucksById[order.truck_id] ?? null,
    order_payments: order.order_payments ?? [],
    order_events: order.order_events ?? [],
  }));
}

export async function fetchUserActivity(userId: string): Promise<UserTruckActivityRecord[]> {
  const { data, error } = await driveonClient
    .from("user_truck_activity")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Failed to load user activity", error);
    throw new Error(error.message);
  }

  return (data ?? []) as UserTruckActivityRecord[];
}

export interface CreateOrderInput {
  userId: string;
  truckId: string;
  orderType: OrderRecord["order_type"];
  rentalTerm?: string | null;
  totalAmount: number;
  currency?: string;
  notes?: string | null;
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRecord> {
  const { data, error } = await driveonClient
    .from("orders")
    .insert({
      user_id: input.userId,
      truck_id: input.truckId,
      order_type: input.orderType,
      rental_term: input.orderType === "rental" ? input.rentalTerm ?? null : null,
      status: "pending_approval",
      total_amount: input.totalAmount,
      currency: input.currency ?? "USD",
      placed_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create order", error);
    throw new Error(error.message);
  }

  const order = data as OrderRecord;

  if (input.notes && input.notes.trim().length > 0) {
    await driveonClient.from("order_events").insert({
      order_id: order.id,
      event_type: "order_note",
      description: input.notes.trim(),
    });
  }

  const { data: truckRow } = await driveonClient
    .from("trucks")
    .select("title")
    .eq("id", input.truckId)
    .single();

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, first_name, last_name")
    .eq("id", input.userId)
    .single();

  if (profile?.email) {
    await sendOrderCreatedEmail({
      to: profile.email,
      recipientName: profile.full_name ?? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim(),
      orderId: order.id,
      orderType: order.order_type,
      truckName: truckRow?.title ?? "your truck",
      totalAmount: order.total_amount ?? 0,
      currency: order.currency ?? "USD",
    });
  }

  return order;
}

export interface SubmitPaymentInput {
  orderId: string;
  amount: number;
  provider: string;
  currency?: string;
  reference?: string | null;
  proofFile?: File | null;
  notes?: string | null;
}

async function uploadPaymentProof(file: File, orderId: string): Promise<string> {
  const extension = file.name.split(".").pop() ?? "bin";
  const filename = `${crypto.randomUUID()}-${Date.now()}.${extension}`;
  const storagePath = `payment-proofs/${orderId}/${filename}`;

  const { error } = await supabase.storage.from(PROOF_BUCKET).upload(storagePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    console.error("Failed to upload payment proof", error);
    throw new Error(error.message);
  }

  return `${PROOF_BUCKET}/${storagePath}`;
}

export async function submitPaymentProof(input: SubmitPaymentInput): Promise<OrderPaymentRecord> {
  let proofPath: string | null = null;

  if (input.proofFile) {
    proofPath = await uploadPaymentProof(input.proofFile, input.orderId);
  }

  const metadata: Record<string, unknown> | null = (() => {
    if (!proofPath && !input.notes) return null;
    const payload: Record<string, unknown> = {};
    if (proofPath) {
      payload.proof_path = proofPath;
      payload.proof_bucket = PROOF_BUCKET;
      payload.proof_uploaded_at = new Date().toISOString();
      payload.proof_url = buildStoragePublicUrl(proofPath);
    }
    if (input.notes) {
      payload.notes = input.notes;
    }
    return payload;
  })();

  const { data: orderRow, error: orderFetchError } = await driveonClient
    .from("orders")
    .select("truck_id, user_id")
    .eq("id", input.orderId)
    .single();

  if (orderFetchError) {
    console.error("Failed to locate order for payment", orderFetchError);
    throw new Error(orderFetchError.message);
  }

  const { data, error } = await driveonClient
    .from("order_payments")
    .insert({
      order_id: input.orderId,
      amount: input.amount,
      currency: input.currency ?? "USD",
      provider: input.provider,
      status: "submitted",
      payment_reference: input.reference ?? null,
      metadata,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to submit payment", error);
    throw new Error(error.message);
  }

  await driveonClient.from("order_events").insert({
    order_id: input.orderId,
    event_type: "payment_submitted",
    description: `Payment submitted via ${input.provider}`,
    payload: metadata,
  });

  await driveonClient
    .from("orders")
    .update({ status: "pending_review", updated_at: new Date().toISOString() })
    .eq("id", input.orderId);

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, first_name, last_name")
    .eq("id", orderRow?.user_id)
    .single();

  if (profile?.email) {
    await sendPaymentProofSubmittedEmail({
      to: profile.email,
      recipientName: profile.full_name ?? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim(),
      orderId: input.orderId,
      amount: input.amount,
      currency: input.currency ?? "USD",
      provider: input.provider,
    });
  }

  if (orderRow?.truck_id) {
    await driveonClient
      .from("trucks")
      .update({ status: "reserved", updated_at: new Date().toISOString() })
      .eq("id", orderRow.truck_id);
  }

  return data as OrderPaymentRecord;
}
