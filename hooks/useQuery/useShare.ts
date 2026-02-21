import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { getRouter } from "@/router";
import type { Channel } from "./useChannels";

export interface ShareLink {
	id: string;
	groupId: string;
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

interface ShareLinkApiResponse {
	success: boolean;
	data: ConsumedShareLinkResponse;
	message: string | null;
	errors: string | null;
}

interface GenerateShareLinkVariables {
	id: string;
	linkType: string;
	permission: string;
}

interface GenerateShareLinkResponseData {
	shareLink: string;
}

const getShareLink = async (id: string): Promise<ConsumedShareLinkResponse> => {
	const response = await apiClient.get<ShareLinkApiResponse>(
		`/api/v2/share-link/${id}`,
	);
	return response.data;
};

const generateShareLink = async (
	variables: GenerateShareLinkVariables,
): Promise<ApiResponse<GenerateShareLinkResponseData>> => {
	const response = await apiClient.post<
		ApiResponse<GenerateShareLinkResponseData>
	>(`/api/v2/share-link`, {
		groupId: variables.id,
		linkType: variables.linkType,
		permission: variables.permission,
	});
	return response;
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
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
		},
	});
};

export function useShareLink(id: string) {
	return useQuery<ConsumedShareLinkResponse, Error>({
		queryKey: queryKeys.shareLink(id),
		queryFn: () => getShareLink(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}

interface ConsumeShareLinkVariables {
	linkCode: string;
	linkType: string;
}

const consumeShareLink = async (
	variables: ConsumeShareLinkVariables,
): Promise<ConsumedShareLinkResponse> => {
	const response = await apiClient.post<ShareLinkApiResponse>(
		`/api/v2/share-link/${variables.linkType}/${variables.linkCode}`,
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
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
			router.navigate({ to: `/dashboard/groups/${data?.groupId}` });
		},
		onError: (error) => {
			toast.error("Error", {
				description: error.message,
			});
		},
	});
};

export { generateShareLink, consumeShareLink };
