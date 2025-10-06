import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { toast } from "@/hooks/use-toast";
import { queryKeys } from "@/hooks/utils/queryKeys";

// Types for group mutations
export interface CreateGroupRequest {
	name: string;
	description?: string;
	icon?: string;
	channelIds?: string[];
}

export interface CreateGroupResponse {
	group: {
		id: string;
		name: string;
		description?: string;
		icon?: string;
		createdAt: string;
		updatedAt: string;
	};
	message: string;
}

export interface UpdateGroupRequest {
	name?: string;
	description?: string;
	icon?: string;
	channelIds?: string[];
}

export interface UpdateGroupResponse {
	group: {
		id: string;
		name: string;
		description?: string;
		icon?: string;
		updatedAt: string;
	};
	message: string;
}

export interface DeleteGroupResponse {
	success: boolean;
	message: string;
}

// API functions
const createGroup = async (
	data: CreateGroupRequest,
): Promise<CreateGroupResponse> => {
	const response = await apiClient.post<ApiResponse<CreateGroupResponse>>(
		"/groups",
		data,
	);
	return response.data;
};

const updateGroup = async ({
	id,
	data,
}: {
	id: string;
	data: UpdateGroupRequest;
}): Promise<UpdateGroupResponse> => {
	const response = await apiClient.put<ApiResponse<UpdateGroupResponse>>(
		`/groups/${id}`,
		data,
	);
	return response.data;
};

const deleteGroup = async (id: string): Promise<DeleteGroupResponse> => {
	const response = await apiClient.delete<ApiResponse<DeleteGroupResponse>>(
		`/groups/${id}`,
	);
	return response.data;
};

// Mutation hooks
export function useCreateGroupMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createGroup,
		onSuccess: (data) => {
			toast({
				title: "Success",
				description: data.message || "Group created successfully",
			});
			// Invalidate and refetch groups query
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message || "Failed to create group",
				variant: "destructive",
			});
		},
	});
}

export function useUpdateGroupMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateGroup,
		onSuccess: (data, variables) => {
			toast({
				title: "Success",
				description: data.message || "Group updated successfully",
			});
			// Invalidate and refetch groups and specific group queries
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
			queryClient.invalidateQueries({
				queryKey: queryKeys.group(variables.id),
			});
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message || "Failed to update group",
				variant: "destructive",
			});
		},
	});
}

export function useDeleteGroupMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteGroup,
		onSuccess: (data) => {
			toast({
				title: "Success",
				description: data.message || "Group deleted successfully",
			});
			// Invalidate and refetch groups query
			queryClient.invalidateQueries({ queryKey: queryKeys.groups() });
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message || "Failed to delete group",
				variant: "destructive",
			});
		},
	});
}

export { createGroup, updateGroup, deleteGroup };
