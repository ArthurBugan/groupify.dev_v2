import { createFileRoute } from "@tanstack/react-router";
import { AllWebsitesTable } from "@/components/all-websites-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_app/dashboard/websites/")({
	component: WebsitesPage,
});

function WebsitesPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="All Websites"
					description="View and manage all websites"
				/>
			</div>
			<Card>
				<CardContent className="pt-6">
					<AllWebsitesTable />
				</CardContent>
			</Card>
		</div>
	);
}
