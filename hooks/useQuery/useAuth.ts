import { type ApiResponse, apiClient } from "@/hooks/api/api-client";

type LoginCredentials = {
	email: string;
	password: string;
};

type LoginResponse = {
	user: {
		id: string;
		email: string;
		name: string;
	};
	token?: string;
};

type ForgotPasswordRequest = {
	email: string;
	encrypted_password: string;
};

type ForgotPasswordResponse = {
	message: string;
	success: boolean;
};

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

// Types for auth queries
export type AuthUser = {
	id: string;
	email: string;
	name: string;
};

export type AuthResponse = {
	user: AuthUser;
	authenticated: boolean;
};

// Query functions for authentication state
const getCurrentUser = async (): Promise<AuthResponse> => {
	const response = await apiClient.get<ApiResponse<AuthResponse>>("/user/me");

	return response.data;
};

const checkAuthStatus = async (): Promise<{ authenticated: boolean }> => {
	const response =
		await apiClient.get<ApiResponse<{ authenticated: boolean }>>(
			"/auth/status",
		);

	return response.data;
};

export { getCurrentUser, checkAuthStatus };

export {
	loginUser,
	forgotPassword,
	type LoginCredentials,
	type LoginResponse,
	type ForgotPasswordRequest,
	type ForgotPasswordResponse,
};
