import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
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
import { UpgradePlanModal } from "@/components/upgrade-plan-modal";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { useUser } from "@/hooks/useQuery/useUser";

export const Route = createFileRoute("/_app/dashboard/groups/")({
	component: GroupsPage,
});

function GroupsPage() {
	const navigate = useNavigate();
	const { isLoading, error } = useGroups({
		page: 1,
		limit: 25,
	});
	const { data: user } = useUser();
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

	const handleNewGroup = () => {
		if (user?.canAddGroup === false) {
			setUpgradeModalOpen(true);
		} else {
			navigate({ to: "/dashboard/groups/new", search: { parentId: "" } });
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<DashboardHeader
						title="Groups"
						description="Manage your YouTube channel groups"
					/>
					<Button
						className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
						type="button"
						onClick={handleNewGroup}
					>
						<Plus className="mr-2 h-4 w-4" />
						New Group
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
					<Button
						className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
						type="button"
						onClick={handleNewGroup}
					>
						<Plus className="mr-2 h-4 w-4" />
						New Group
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
				<Button
					className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
					type="button"
					onClick={handleNewGroup}
				>
					<Plus className="mr-2 h-4 w-4" />
					New Group
				</Button>
			</div>
			<Card>
				<CardContent className="pt-6">
					<div className="flex justify-center py-4">
						<ins
							className="adsbygoogle"
							style={{
								display: "inline-block",
								width: "728px",
								height: "90px",
							}}
							data-ad-client="ca-pub-4077364511521347"
							data-ad-slot="5153442110"
						></ins>
					</div>
					<GroupsTable />
				</CardContent>
			</Card>
			{user?.canAddGroup === false && (
				<UpgradePlanModal
					open={upgradeModalOpen}
					onOpenChange={setUpgradeModalOpen}
					type="group"
				/>
			)}
		</div>
	);
}
