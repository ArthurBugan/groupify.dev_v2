import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";
import type { Pagination } from "./types";
import { toast } from "sonner";

export interface Website {
	id: string;
	name: string;
	url: string;
	thumbnail?: string;
	groupId: string;
	groupName?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface WebsitesResponse {
	data: Website[];
	pagination: Pagination;
}

export const getWebsites = async (params?: {
	page?: number;
	limit?: number;
	search?: string;
}): Promise<WebsitesResponse> => {
	const response = await apiClient.get<WebsitesResponse>(
		"/api/v3/websites",
		params,
	);
	return response;
};

export function useWebsites(params?: {
	page?: number;
	limit?: number;
	search?: string;
}) {
	return useQuery({
		queryKey: queryKeys.websites(params),
		queryFn: () => getWebsites(params),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}

export function useInfiniteWebsites(params?: {
	limit?: number;
	search?: string;
}) {
	return useInfiniteQuery({
		queryKey: queryKeys.infiniteWebsites(params),
		queryFn: ({ pageParam = 1 }) => getWebsites({ ...params, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (!lastPage.pagination.next) return undefined;
			return lastPage.pagination.page + 1;
		},
	});
}

export const deleteWebsite = async ({ websiteId }: { websiteId: string }) => {
	await apiClient.delete(`/api/v2/channels/${websiteId}`);
};

export function useDeleteWebsiteMutation() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, { websiteId: string }>({
		mutationFn: ({ websiteId }) => deleteWebsite({ websiteId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.websites() });
		},
		onError: (error) => {
			toast.error("Error", {
				description:
					error.message || "Failed to delete website. Please try again.",
			});
		},
	});
}
