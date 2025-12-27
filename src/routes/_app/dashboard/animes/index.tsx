import { createFileRoute } from "@tanstack/react-router";
import { AllAnimesTable } from "@/components/all-animes-table";
import { DashboardHeader } from "@/components/dashboard-header";

export const Route = createFileRoute("/_app/dashboard/animes/")({
	component: AnimeChannelsPage,
});

function AnimeChannelsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="All Animes"
					description="View and manage all animes"
				/>
			</div>
			<div className="flex justify-center">
				<ins className="adsbygoogle"
					style={{ "display": "inline-block", "width": "728px", "height": "90px" }}
					data-ad-client="ca-pub-4077364511521347"
					data-ad-slot="5153442110">
				</ins>
			</div>
			<AllAnimesTable />
		</div>
	)
}
