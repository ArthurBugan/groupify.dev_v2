"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { ChannelsTable } from "@/components/channels-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { GroupDetails } from "@/components/group-details";
import { Button } from "@/components/ui/button";
import { useGroup } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/$id/")({
	component: GroupDetailPage,
});

function GroupDetailPage() {
	const { id } = Route.useParams();
	const { data: group } = useGroup(id);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const settingsSaved = urlParams.get("settings-saved");

		if (settingsSaved === "true") {
			toast.info("Settings Applied", {
				description: "Your group settings have been applied to this view.",
			});
			// Remove the query parameter without refreshing the page
			const newUrl = window.location.pathname;
			window.history.replaceState({}, document.title, newUrl);
		}
	}, []);

	if (!group) {
		return null;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={group.name}
					description="Manage channels in this group"
				/>
				<Button variant="outline" type="button" asChild>
					<Link to={"/dashboard/groups/$id/add-channel"} params={{ id: id }}>
						<Plus className="mr-2 h-4 w-4" />
						Add Channel
					</Link>
				</Button>
			</div>
			<GroupDetails id={id} />
			<div className="mt-6">
				<h2 className="text-xl font-semibold mb-4">Channels in this group</h2>
				<ChannelsTable groupId={id} />
			</div>
		</div>
	);
}
