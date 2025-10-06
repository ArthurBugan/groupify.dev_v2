"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { GroupForm, type GroupFormData } from "@/components/group-form";
import {
	useGroup,
	useGroups,
	useUpdateGroup,
} from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/$id/edit/")({
	component: GroupEditPage,
});

function GroupEditPage() {
	const router = useNavigate();
	const { id } = Route.useParams();
	const { data: groupData } = useGroup(id);
	const { data: groupsData } = useGroups();
	const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup();

	const availableParentGroups = groupsData?.data || [];

	const handleSubmit = async (data: GroupFormData) => {
		try {
			await updateGroup({
				id,
				data: {
					name: data.name,
					description: data.description,
					category: data.category,
					icon: data.icon,
					parentId: data.parentId,
				},
			});

			router({ to: "/dashboard/groups/$id", params: { id } });
		} catch (error) {
			console.error("Error updating group:", error);
			// Error toast is already handled by the mutation
		}
	};

	return (
		<GroupForm
			initialData={
				groupData
					? {
							name: groupData.name,
							description: groupData.description,
							category: groupData.category,
							icon: groupData.icon,
							parentId: groupData.parentId || undefined,
						}
					: undefined
			}
			groups={availableParentGroups}
			isLoading={isUpdating}
			onSubmit={handleSubmit}
			title="Edit Group"
			description="Update your channel group details"
			submitLabel="Save Changes"
			cancelPath=".."
		/>
	);
}
