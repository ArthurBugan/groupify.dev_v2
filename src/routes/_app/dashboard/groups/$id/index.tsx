"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { ChannelsTable } from "@/components/channels-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { GroupDetails } from "@/components/group-details";
import { Button } from "@/components/ui/button";
import { Toast, ToastProvider } from "@/components/ui/toast";

export const Route = createFileRoute("/_app/dashboard/groups/$id/")({
	component: GroupDetailPage,
});

function GroupDetailPage({ params }: { params: { id: string } }) {
	const [toasts, setToasts] = useState<any[]>([]);
	const { id } = Route.useParams();

	const groupName =
		id === "1"
			? "Gaming Channels"
			: id === "2"
				? "Tech Reviews"
				: id === "3"
					? "Cooking Tutorials"
					: id === "4"
						? "Fitness & Health"
						: "Group Details";

	// Check for settings saved notification
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const settingsSaved = urlParams.get("settings-saved");

		if (settingsSaved === "true") {
			setToasts([
				...toasts,
				{
					id: Date.now(),
					title: "Settings Applied",
					description: "Your group settings have been applied to this view.",
				},
			]);

			// Remove the query parameter without refreshing the page
			const newUrl = window.location.pathname;
			window.history.replaceState({}, document.title, newUrl);

			// Auto-dismiss toast after 3 seconds
			setTimeout(() => {
				setToasts((prevToasts) =>
					prevToasts.filter((toast) => toast.id !== Date.now()),
				);
			}, 3000);
		}
	}, []);

	return (
		<div className="space-y-6">
			<ToastProvider>
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						title={toast.title}
						description={toast.description}
						onClose={() =>
							setToasts((prevToasts) =>
								prevToasts.filter((t) => t.id !== toast.id),
							)
						}
					/>
				))}
			</ToastProvider>

			<div className="flex items-center justify-between">
				<DashboardHeader
					title={groupName}
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
