import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";

// Types
export type LoginCredentials = {
	email: string;
	password: string;
};

export type LoginResponse = {
	user: {
		id: string;
		email: string;
		name: string;
	};
	token?: string;
};

export type ForgotPasswordRequest = {
	email: string;
	encrypted_password: string;
};

export type ForgotPasswordResponse = {
	message: string;
	success: boolean;
};

// API Functions
const loginUser = async (
	credentials: LoginCredentials,
): Promise<LoginResponse> => {
	const response = await apiClient.post<ApiResponse<LoginResponse>>(
		"/authorize",
		credentials,
	);

	if (response.data.token) {
		localStorage.setItem("authToken", response.data.token);
		apiClient.setAuthToken(response.data.token);
	}

	return response.data;
};

const forgotPassword = async (
	data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
	const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
		"/forget-password",
		data,
	);

	return response.data;
};

// Mutation Hooks
export const useLoginMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
		onSuccess: (data) => {
			// Handle successful login
			console.log("Login successful:", data);

			// Store user data in localStorage or context
			localStorage.setItem("user", JSON.stringify(data.user));
			if (data.token) {
				localStorage.setItem("authToken", data.token);
			}

			navigate({ to: "/dashboard" });
		},
		onError: (error) => {
			console.error("Login failed:", error);
			throw error; // Re-throw to let component handle the error
		},
	});
};

export const useForgotPasswordMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
		onSuccess: (data, variables) => {
			// Handle successful forgot password request
			console.log("Forgot password request successful:", data);

			// Navigate to success page with email parameter
			navigate({
				to: "/forgot-password/success/$email",
				params: { email: encodeURIComponent(variables.email) },
			});
		},
		onError: (error) => {
			console.error("Forgot password request failed:", error);
			throw error; // Re-throw to let component handle the error
		},
	});
};

// Export API functions for direct use if needed
export { loginUser, forgotPassword };
