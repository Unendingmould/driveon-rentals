export interface TruckRecord {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  model_year: number | null;
  mileage: number | null;
  engine: string | null;
  transmission: string | null;
  vin: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  suspension: string | null;
  axles: string | null;
  condition: string | null;
  warranty: string | null;
  weekly_rate: number | null;
  monthly_rate: number | null;
  status: string;
  short_description: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface TruckImageRecord {
  id: string;
  truck_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number | null;
  is_primary: boolean;
  created_at: string;
}

export interface TruckWithAssets extends TruckRecord {
  images: Array<{ id: string; url: string | null; alt: string | null; isPrimary: boolean; sortOrder: number }>;
}

export interface ServiceRecord {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  sort_order: number | null;
  is_active: boolean;
  created_at: string;
}

export interface PaymentOptionRecord {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  sort_order: number | null;
  is_active: boolean;
  created_at: string;
}

export interface TestimonialRecord {
  id: string;
  author_name: string;
  author_role: string | null;
  location: string | null;
  quote: string;
  rating: number | null;
  avatar_url: string | null;
  is_featured: boolean;
  sort_order: number | null;
  created_at: string;
}

export interface FaqRecord {
  id: string;
  category: string | null;
  question: string;
  answer: string;
  sort_order: number | null;
  is_active: boolean;
  created_at: string;
}

export interface OrderRecord {
  id: string;
  user_id: string;
  truck_id: string;
  order_type: "purchase" | "rental";
  status: string;
  total_amount: number;
  currency: string;
  rental_term: string | null;
  payment_due_at: string | null;
  placed_at: string;
  updated_at: string;
}

export type OrderPaymentStatus = "submitted" | "under_review" | "verified" | "rejected";

export interface OrderPaymentRecord {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  provider: string;
  status: OrderPaymentStatus;
  payment_reference: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface OrderEventRecord {
  id: string;
  order_id: string;
  event_type: string;
  description: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
}

export interface UserTruckActivityRecord {
  id: string;
  user_id: string;
  truck_id: string;
  activity_type: "view" | "favorite" | "purchase" | "rental" | "payment";
  order_id: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface OrderWithRelations extends OrderRecord {
  truck?: Pick<TruckRecord, "id" | "title" | "make" | "model" | "slug"> | null;
  order_payments?: OrderPaymentRecord[];
  order_events?: OrderEventRecord[];
}

export interface AdminPaymentReview {
  payment_id: string;
  order_id: string;
  amount: number;
  payment_currency: string;
  provider: string;
  payment_status: OrderPaymentStatus;
  payment_reference: string | null;
  payment_metadata: Record<string, unknown> | null;
  payment_created_at: string;
  payment_updated_at: string;
  user_id: string;
  user_email: string | null;
  order_status: string;
  order_type: OrderRecord["order_type"];
  total_amount: number;
  order_currency: string;
  truck_id: string | null;
  truck_title: string | null;
  truck_slug: string | null;
  truck_status: string | null;
}

export interface CryptoAsset {
  id: string;
  asset_code: string;
  asset_name: string;
  wallet_address: string;
  qr_code_url: string | null;
  network: string;
  description: string | null;
  minimum_deposit: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// Financing Application type (for custom table)
export interface FinancingApplicationRecord {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  employment_status: string;
  employer: string | null;
  monthly_income: number;
  years_employed: number | null;
  financing_type: string;
  financing_amount: number;
  payment_plan: string;
  down_payment: number | null;
  credit_score_range: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
