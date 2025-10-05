import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/utils/queryKeys";

// Types for groups
export interface Group {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	channels?: Channel[];
	createdAt: string;
	updatedAt: string;
}

export interface Channel {
	id: string;
	name: string;
	channelId: string;
	thumbnail?: string;
	subscriberCount?: number;
	category?: string;
}

export interface GroupsResponse {
	data: Group[];
	pagination: {
		total: number;
		page: number;
		limit: number;
	};
}

// Query function to fetch all groups
const getGroups = async (params?: {
	page?: number;
	limit?: number;
	search?: string;
}): Promise<GroupsResponse> => {
	const response = await apiClient.get<ApiResponse<GroupsResponse>>(
		"api/v2/groups",
		params
	);
	return response.data;
};

// Query function to fetch a single group by ID
const getGroup = async (id: string): Promise<Group> => {
	const response = await apiClient.get<ApiResponse<Group>>(
		`api/v2/groups/${id}`
	);
	return response.data;
};

// React Query hooks
export function useGroups(params?: {
	page?: number;
	limit?: number;
	search?: string;
}) {
	return useQuery({
		queryKey: queryKeys.groups(),
		queryFn: () => getGroups(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export function useGroup(id: string) {
	return useQuery({
		queryKey: queryKeys.group(id),
		queryFn: () => getGroup(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export { getGroups, getGroup };