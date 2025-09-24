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

export { loginUser, type LoginCredentials, type LoginResponse };
