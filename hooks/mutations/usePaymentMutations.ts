import { useMutation } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { toast } from "sonner";

// Types
export interface CreateCheckoutSessionRequest {
  plan_name: string;
  user_id: string;
}

export interface CheckoutSessionResponse {
  session_id: string;
  checkout_url: string;
}

// API function to create checkout session
const createCheckoutSession = async (
  data: CreateCheckoutSessionRequest
): Promise<CheckoutSessionResponse> => {
  const response = await apiClient.post<ApiResponse<CheckoutSessionResponse>>(
    "/api/v3/payments",
    data
  );
  return response.data;
};

// React Query mutation hook for creating checkout sessions
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (data: CreateCheckoutSessionRequest) => createCheckoutSession(data),
    onSuccess: (data) => {
      toast.success("Checkout session created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create checkout session", {
        description: error.message || "Please try again later.",
      });
    },
  });
};