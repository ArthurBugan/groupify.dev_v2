import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { GroupsTable } from "@/components/groups-table";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGroups } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/")({
	component: GroupsPage,
});

function GroupsPage() {
	const { isLoading, error } = useGroups({
		page: 1,
		limit: 25,
	});

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<DashboardHeader
						title="Groups"
						description="Manage your YouTube channel groups"
					/>
					<Button variant="outline" type="button" asChild>
						<Link to="/dashboard/groups/new" search={{ parentId: "" }}>
							<Plus className="mr-2 h-4 w-4" />
							New Group
						</Link>
					</Button>
				</div>
				<Card>
					<CardContent className="flex items-center justify-center py-12">
						<div className="flex items-center space-x-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span className="text-sm text-muted-foreground">
								Loading groups...
							</span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<DashboardHeader
						title="Groups"
						description="Manage your YouTube channel groups"
					/>
					<Button variant="outline" type="button" asChild>
						<Link to="/dashboard/groups/new" search={{ parentId: "" }}>
							<Plus className="mr-2 h-4 w-4" />
							New Group
						</Link>
					</Button>
				</div>
				<Card>
					<CardHeader>
						<CardTitle className="text-red-600">Error Loading Groups</CardTitle>
						<CardDescription>
							{error.message || "Failed to load groups. Please try again."}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Groups"
					description="Manage your YouTube channel groups"
				/>
				<Button variant="outline" type="button" asChild>
					<Link to="/dashboard/groups/new" search={{ parentId: "" }}>
						<Plus className="mr-2 h-4 w-4" />
						New Group
					</Link>
				</Button>
			</div>
			<GroupsTable />
		</div>
	);
}
