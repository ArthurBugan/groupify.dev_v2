import { useQuery } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";
import rybbit from "@rybbit/js";

// Types for the User
export interface User {
	id: string;
	email: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	planName: string;
	maxChannels: number;
	maxGroups: number;
	canCreateSubgroups: boolean;
	priceMonthly: number;
	priceYearly: number;
	subscriptionStartDate: string;
	subscriptionEndDate: string;
	groupCount: number;
	channelCount: number;
	canAddChannel: boolean;
	canAddGroup: boolean;
}

// Query function to fetch the current user
const getUser = async (): Promise<User> => {
	const response = await apiClient.get<ApiResponse<User>>("api/v3/me");
	const identifyOptions = {
		profileId: response.data.id,
		email: response.data.email,
		properties: {
			tier: response.data.planName,
		},
	};
	await rybbit.identify(response.data.id, identifyOptions);
	return response.data;
};

// React Query hook for fetching the current user
export function useUser() {
	return useQuery({
		queryKey: queryKeys.me(),
		queryFn: () => getUser(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export { getUser };
