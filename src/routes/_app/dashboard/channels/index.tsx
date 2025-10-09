import { createFileRoute } from "@tanstack/react-router";
import { AllChannelsTable } from "@/components/all-channels-table";
import { DashboardHeader } from "@/components/dashboard-header";

export const Route = createFileRoute("/_app/dashboard/channels/")({
	component: ChannelsPage,
});

function ChannelsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="All Channels"
					description="View and manage all YouTube channels"
				/>
			</div>
			<AllChannelsTable />
		</div>
	);
}
