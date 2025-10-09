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
			<AllAnimesTable />
		</div>
	)
}
