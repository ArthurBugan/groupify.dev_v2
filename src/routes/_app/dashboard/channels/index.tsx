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
			<div className="flex justify-center">
				<ins className="adsbygoogle"
					style={{ "display": "inline-block", "width": "728px", "height": "90px" }}
					data-ad-client="ca-pub-4077364511521347"
					data-ad-slot="5153442110">
				</ins>
			</div>
			<AllChannelsTable />
		</div>
	);
}
