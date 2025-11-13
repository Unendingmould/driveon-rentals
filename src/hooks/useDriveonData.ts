import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Country, State, City } from "country-state-city";
import {
  fetchFaqs,
  fetchPaymentOptions,
  fetchServices,
  fetchTestimonials,
  fetchTrucks,
  fetchTruckBySlug,
  fetchOrdersForUser,
  fetchUserActivity,
  createOrder,
  submitPaymentProof,
} from "@/services/driveon";
import {
  FaqRecord,
  PaymentOptionRecord,
  ServiceRecord,
  TestimonialRecord,
  TruckWithAssets,
  OrderRecord,
  OrderPaymentRecord,
  OrderWithRelations,
  UserTruckActivityRecord,
} from "@/types/driveon";

export const driveonKeys = {
  trucks: ["driveon", "trucks"] as const,
  truck: (slug: string) => ["driveon", "truck", slug] as const,
  services: ["driveon", "services"] as const,
  paymentOptions: ["driveon", "payment-options"] as const,
  testimonials: ["driveon", "testimonials"] as const,
  faqs: ["driveon", "faqs"] as const,
  orders: (userId: string) => ["driveon", "orders", userId] as const,
  activity: (userId: string) => ["driveon", "activity", userId] as const,
  geo: ["driveon", "geo"] as const,
};

export function useTrucks() {
  return useQuery<TruckWithAssets[]>({
    queryKey: driveonKeys.trucks,
    queryFn: fetchTrucks,
  });
}

export function useGeoDirectory() {
  return useQuery({
    queryKey: driveonKeys.geo,
    queryFn: async () => {
      const allowedCountries = ["US", "CA", "GB"];
      const countries = Country.getAllCountries().filter((country) => allowedCountries.includes(country.isoCode));

      const payload = countries
        .map((country) => {
          const states = State.getStatesOfCountry(country.isoCode)
            .map((state) => {
              const cities = City.getCitiesOfState(country.isoCode, state.isoCode)
                .map((city) => city.name)
                .sort((a, b) => a.localeCompare(b));
              return {
                code: state.isoCode,
                name: state.name,
                cities,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

          return {
            code: country.isoCode,
            name: country.name,
            states,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      return payload;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useTruck(slug: string | undefined) {
  return useQuery<TruckWithAssets | null>({
    queryKey: slug ? driveonKeys.truck(slug) : ["driveon", "truck", "unknown"],
    queryFn: async () => {
      if (!slug) return null;
      return fetchTruckBySlug(slug);
    },
    enabled: Boolean(slug),
  });
}

export function useServices() {
  return useQuery<ServiceRecord[]>({
    queryKey: driveonKeys.services,
    queryFn: fetchServices,
  });
}

export function usePaymentOptions() {
  return useQuery<PaymentOptionRecord[]>({
    queryKey: driveonKeys.paymentOptions,
    queryFn: fetchPaymentOptions,
  });
}

export function useTestimonials() {
  return useQuery<TestimonialRecord[]>({
    queryKey: driveonKeys.testimonials,
    queryFn: fetchTestimonials,
  });
}

export function useFaqs() {
  return useQuery<FaqRecord[]>({
    queryKey: driveonKeys.faqs,
    queryFn: fetchFaqs,
  });
}

export function useOrders(
  userId: string | undefined,
  options?: { enabled?: boolean; refetchInterval?: number }
) {
  return useQuery<OrderWithRelations[]>({
    queryKey: userId ? driveonKeys.orders(userId) : ["driveon", "orders", "anon"],
    queryFn: async () => {
      if (!userId) return [];
      return fetchOrdersForUser(userId);
    },
    enabled: Boolean(userId) && (options?.enabled ?? true),
    refetchInterval: options?.refetchInterval,
  });
}

export function useUserActivity(userId: string | undefined) {
  return useQuery<UserTruckActivityRecord[]>({
    queryKey: userId ? driveonKeys.activity(userId) : ["driveon", "activity", "anon"],
    queryFn: async () => {
      if (!userId) return [];
      return fetchUserActivity(userId);
    },
    enabled: Boolean(userId),
  });
}

export function useCreateOrderMutation(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
      }
      queryClient.invalidateQueries({ queryKey: driveonKeys.activity(userId ?? "") });
    },
  });
}

export function useSubmitPaymentMutation(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPaymentProof,
    onSuccess: (payment) => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: driveonKeys.orders(userId) });
      }
      if (payment.order_id && userId) {
        queryClient.invalidateQueries({ queryKey: driveonKeys.activity(userId) });
      }
    },
  });
}
