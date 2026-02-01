import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Share2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ShareLinksTable } from "@/components/share-links-table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard/share-links/")({
	component: ShareLinksPage,
});

function ShareLinksPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Share Links"
					description="Manage and monitor all your share links"
				/>
				<Button asChild>
					<Link to="/dashboard/groups">
						<Plus className="mr-2 h-4 w-4" />
						Create New Link
					</Link>
				</Button>
			</div>

			<div className="rounded-lg border bg-card p-6">
				<div className="flex items-center gap-2 mb-4">
					<Share2 className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">All Share Links</h3>
				</div>
				<ShareLinksTable />
			</div>
		</div>
	);
}
