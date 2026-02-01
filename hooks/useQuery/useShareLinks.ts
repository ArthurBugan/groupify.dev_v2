import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { getRouter } from "@/router";
import type { Channel } from "./useChannels";

export interface ShareLink {
	id: string;
	group_id: string;
	linkCode: string;
	linkType: string;
	permission?: string;
	createdAt?: string;
	expiresAt?: string;
}

export interface ConsumedShareLinkResponse {
	groupId: string;
	groupName: string;
	groupDescription: string | null;
	linkType: string;
	permission: string | null;
	channelCount: number;
	channels: Channel[];
}

interface GenerateShareLinkVariables {
	id: string;
	linkType: string;
	permission: string;
}

interface GenerateShareLinkResponseData {
	shareLink: string;
}

interface ShareLinksResponse {
	data: ShareLink[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

interface ShareLinksParams {
	page?: number;
	limit?: number;
	search?: string;
}

// Query function to fetch all share links
const getShareLinks = async (
	params: ShareLinksParams = {},
): Promise<ShareLinksResponse> => {
	const searchParams: Record<string, string | number | boolean | undefined> =
		{};
	if (params.page !== undefined) searchParams.page = params.page;
	if (params.limit !== undefined) searchParams.limit = params.limit;
	if (params.search !== undefined) searchParams.search = params.search;

	const response = await apiClient.get<ShareLinksResponse>(
		"/api/v3/share-links",
		searchParams,
	);
	return response;
};

// Query function to fetch a single share link with consumed details
const getShareLink = async (id: string): Promise<ConsumedShareLinkResponse> => {
	const response = await apiClient.get<ApiResponse<ConsumedShareLinkResponse>>(
		`/api/v3/share-links/${id}`,
	);
	return response.data;
};

const generateShareLink = async (
	variables: GenerateShareLinkVariables,
): Promise<ApiResponse<GenerateShareLinkResponseData>> => {
	const response = await apiClient.post<
		ApiResponse<GenerateShareLinkResponseData>
	>(`/api/v3/share-links`, {
		groupId: variables.id,
		linkType: variables.linkType,
		permission: variables.permission,
	});
	return response;
};

export const useShareLinks = (params: ShareLinksParams = {}) => {
	return useQuery<ShareLinksResponse, Error>({
		queryKey: queryKeys.shareLinks(params),
		queryFn: () => getShareLinks(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useGenerateShareLink = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ApiResponse<GenerateShareLinkResponseData>,
		Error,
		GenerateShareLinkVariables
	>({
		mutationFn: generateShareLink,
		onSuccess: (data) => {
			console.log(data);
			toast.success("Success", {
				description: data.message,
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.shareLinks() });
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
		},
	});
};

export function useShareLink(id: string) {
	return useQuery<ConsumedShareLinkResponse, Error>({
		queryKey: queryKeys.shareLink(id),
		queryFn: () => getShareLink(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

interface ConsumeShareLinkVariables {
	linkCode: string;
	linkType: string;
}

const consumeShareLink = async (
	variables: ConsumeShareLinkVariables,
): Promise<ConsumedShareLinkResponse> => {
	const response = await apiClient.post<ApiResponse<ConsumedShareLinkResponse>>(
		`/api/v3/share-links/${variables.linkType}/${variables.linkCode}`,
	);
	return response.data;
};

export const useConsumeShareLink = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ConsumedShareLinkResponse,
		Error,
		ConsumeShareLinkVariables
	>({
		mutationFn: consumeShareLink,
		onSuccess: async (data, variables) => {
			const router = getRouter();
			await toast.success("Success", {
				description: `You successfully joined ${variables?.linkType === "copy" ? "group" : "collaboration"} as ${data?.permission}`,
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.shareLink(variables.linkCode),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.shareLinks() });
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
			router.navigate({ to: `/dashboard/groups/${data?.groupId}` });
		},
		onError: (error) => {
			const isExpired = error.message.toLowerCase().includes("expired");
			toast.error(isExpired ? "Link Expired" : "Error", {
				description: isExpired
					? "This share link has expired and is no longer valid."
					: error.message,
			});
		},
	});
};

interface DeleteShareLinkVariables {
	id: string;
}

const deleteShareLink = async (
	variables: DeleteShareLinkVariables,
): Promise<void> => {
	await apiClient.delete(`/api/v3/share-links/${variables.id}`);
};

export const useDeleteShareLink = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, DeleteShareLinkVariables>({
		mutationFn: deleteShareLink,
		onSuccess: () => {
			toast.success("Share link deleted successfully", {
				description: "The share link has been removed.",
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.shareLinks() });
		},
		onError: (error) => {
			toast.error("Failed to delete share link", {
				description: error.message,
			});
		},
	});
};

export { generateShareLink, consumeShareLink, getShareLinks, getShareLink };
