import { useQuery } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";

export interface Video {
	id: string;
	externalId: string;
	title: string;
	description: string;
	thumbnail: string;
	publishedAt: string;
	channelId: string;
	groupId: string;
	contentType: string;
	url: string;
	viewsCount?: number;
	durationSeconds?: number;
}

export interface GroupVideosResponse {
	data: Video[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

interface GroupVideosParams {
	page?: number;
	limit?: number;
	search?: string;
}

const getGroupVideos = async (
	groupId: string,
	params: GroupVideosParams = {},
): Promise<GroupVideosResponse> => {
	const searchParams: Record<string, string | number | boolean | undefined> =
		{};
	if (params.page !== undefined) searchParams.page = params.page;
	if (params.limit !== undefined) searchParams.limit = params.limit;
	if (params.search !== undefined) searchParams.search = params.search;

	const response = await apiClient.get<GroupVideosResponse>(
		`/api/v3/groups/${groupId}/videos`,
		searchParams,
	);
	return response;
};

export const useGroupVideos = (
	groupId: string,
	params: GroupVideosParams = {},
) => {
	return useQuery<GroupVideosResponse, Error>({
		queryKey: queryKeys.groupVideos(groupId, params),
		queryFn: () => getGroupVideos(groupId, params),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!groupId,
	});
};

export { getGroupVideos };
