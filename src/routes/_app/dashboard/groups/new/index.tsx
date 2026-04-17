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
	validateSearch: (search) => ({
		parentId: (search.parentId as string) || undefined,
	}),
});

function NewGroupPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/_app/dashboard/groups/new/" });
	const { data: groupsData, isLoading } = useGroups({ limit: 100 });
	const createMutation = useCreateGroup();

	const handleSubmit = async (data: GroupFormData) => {
		try {
			await createMutation.mutateAsync({
				name: data.name,
				description: data.description,
				category: data.category,
				icon: data.icon,
				parentId: data.parentId || undefined,
				enableGroupshelf: data.enableGroupshelf,
			});
			navigate({ to: "/dashboard/groups" });
		} catch (error: any) {
			toast.error("Error", {
				description:
					error?.message || "Failed to create group. Please try again.",
			});
		}
	};

	return (
		<GroupForm
			onSubmit={handleSubmit}
			groups={groupsData?.data || []}
			isLoading={isLoading || createMutation.isPending}
			title="Create Group"
			description="Organize your YouTube channels into groups"
			submitLabel="Create"
			parentId={search.parentId}
		/>
	);
}
