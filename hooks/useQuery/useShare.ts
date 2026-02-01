import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";
import type { Channel } from "./useChannels";
import { toast } from "sonner";
import { getRouter } from "@/router";

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

interface GenerateShareLinkVariables {
	id: string;
	linkType: string;
	permission: string;
}

interface GenerateShareLinkResponseData {
	shareLink: string;
}

interface ShareLinkResponse {
	message: string;
	data?: ConsumedShareLinkResponse;
	errors?: ConsumedShareLinkResponse[];
	success?: boolean;
}

// Query function to fetch a single share link with consumed details
const getShareLink = async (id: string): Promise<ShareLinkResponse> => {
	const response = await apiClient.get<ShareLinkResponse>(
		`/api/v2/share-link/${id}`,
	);
	return response;
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

	return useMutation<ApiResponse<GenerateShareLinkResponseData>, Error, GenerateShareLinkVariables>({
		mutationFn: generateShareLink,
		onSuccess: (data) => {
      console.log(data)
      toast.success("Success", {
        description: data.message,
      });
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
		},
	});
};

export function useShareLink(id: string) {
	return useQuery<ShareLinkResponse, Error>({
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
): Promise<ShareLinkResponse> => {
	const response = await apiClient.post<ApiResponse<ShareLinkResponse>>(
		`/api/v2/share-link/${variables.linkType}/${variables.linkCode}`,
	);
	return response.data;
};

export const useConsumeShareLink = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ShareLinkResponse,
		Error,
		ConsumeShareLinkVariables
	>({
		mutationFn: consumeShareLink,
		onSuccess: async (data, variables) => {
      const router = getRouter();
			await toast.success("Success", {
        description: `You successfully joined ${variables?.linkType === "copy" ? "group" : "collaboration"} as ${data?.data?.permission}`,
			});
			queryClient.invalidateQueries({
        queryKey: queryKeys.shareLink(variables.linkCode),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
      router.navigate({ to: `/dashboard/groups/${data?.data?.groupId}` });
		},
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
	});
};

export { generateShareLink, consumeShareLink };
