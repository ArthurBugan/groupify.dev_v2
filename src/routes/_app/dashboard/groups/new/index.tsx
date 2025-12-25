"use client";

import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import { GroupForm, type GroupFormData } from "@/components/group-form";
import { useCreateGroup, useGroups } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/new/")({
	component: NewGroupPage,
	validateSearch: (search: Record<string, unknown>) => ({
		parentId: (search.parentId as string) || undefined,
	}),
});

function NewGroupPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/_app/dashboard/groups/new/" });
	const { data: groupsData, isLoading: isGroupsLoading } = useGroups({
		limit: 100,
	});
	const createGroupMutation = useCreateGroup();

	const handleSubmit = async (data: GroupFormData) => {
		try {
			// Prepare group data with parent group if selected
			const groupData = {
				name: data.name,
				description: data.description,
				category: data.category,
				icon: data.icon,
				...(data.parentId &&
					data.parentId !== "none" && { parentId: data.parentId }),
			};

			// Create group using the mutation
			await createGroupMutation.mutateAsync(groupData);

			toast.success("Success", {
				description: "Group created successfully!",
			});

			navigate({ to: "/dashboard/groups" });
		} catch (error) {
			console.error("Error creating group:", error);
			toast.error("Error", {
				description: error.message || "Failed to create group. Please try again.",
			});
		}
	};

	return (
		<GroupForm
			onSubmit={handleSubmit}
			groups={groupsData?.data || []}
			isLoading={isGroupsLoading || createGroupMutation.isPending}
			title="Create New Group"
			description="Create a new YouTube channel group"
			submitLabel="Create Group"
			parentId={search.parentId}
		/>
	);
}
