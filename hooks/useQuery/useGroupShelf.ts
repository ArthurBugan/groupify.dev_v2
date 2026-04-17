import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";

export interface GroupShelf {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	channelCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface GroupShelfResponse {
	data: GroupShelf[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const getGroupShelves = async (params?: {
	page?: number;
	limit?: number;
	search?: string;
}): Promise<GroupShelfResponse> => {
	const response = await apiClient.get<GroupShelfResponse>(
		"api/v3/groups/shelf",
		params,
	);
	return response;
};

const copyShelf = async (shelfId: string): Promise<GroupShelf> => {
	const response = await apiClient.post<GroupShelf>(
		`api/v3/groups/shelf/copy/${shelfId}`,
		{},
	);
	return response;
};

export function useGroupShelves(params?: {
	page?: number;
	limit?: number;
	search?: string;
}) {
	return useQuery({
		queryKey: queryKeys.groupShelves(params),
		queryFn: () => getGroupShelves(params),
		staleTime: 0,
		gcTime: 10 * 60 * 1000,
		refetchOnMount: true,
	});
}

export function useCopyShelf() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (shelfId: string) => copyShelf(shelfId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.groupShelves() });
			toast.success("Group shelf copied", {
				description: "The group shelf has been copied successfully.",
			});
		},
		onError: (error: Error) => {
			toast.error("Failed to copy group shelf", {
				description: error.message || "Please try again later.",
			});
		},
	});
}
