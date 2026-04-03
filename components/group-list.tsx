"use client";

import { useNavigate } from "@tanstack/react-router";
import { FolderKanban, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradePlanModal } from "@/components/upgrade-plan-modal";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { useUser } from "@/hooks/useQuery/useUser";
import { cn } from "@/lib/utils";

export function GroupList() {
	const navigate = useNavigate();
	const { data: groupsData, isLoading } = useGroups({
		limit: 5,
	});
	const { data: user } = useUser();
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

	const groups = groupsData?.data || [];

	const handleCreateGroup = () => {
		if (user?.canAddGroup === false) {
			setUpgradeModalOpen(true);
		} else {
			navigate({
				to: "/dashboard/groups/new",
				search: { parentId: undefined },
			});
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (groups.length === 0) {
		return (
			<div className="text-center py-8">
				<div className="bg-muted/50 rounded-lg p-6 mb-4">
					<FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
					<h3 className="font-semibold mb-1">No groups yet</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Start organizing your YouTube channels into groups
					</p>
				</div>
				<Button size="sm" onClick={handleCreateGroup}>
					<Plus className="h-4 w-4 mr-1" />
					Create Your First Group
				</Button>
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

	return (
		<div className="space-y-3">
			{groups.slice(0, 5).map((group) => (
				<button
					key={group.id}
					type="button"
					className={cn(
						"flex items-center justify-between p-3 rounded-lg transition-all duration-200 w-full text-left",
						"hover:bg-muted/50 border border-transparent hover:border-border/50 bg-transparent",
					)}
					onClick={() => navigate({ to: `/dashboard/groups/${group.id}` })}
				>
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/10 to-pink-500/10">
							<FolderKanban className="h-5 w-5 text-red-500" />
						</div>
						<div className="space-y-0.5">
							<span className="font-medium hover:text-red-600 transition-colors line-clamp-1 block">
								{group.name}
							</span>
							<div className="flex items-center gap-2">
								{group.category && (
									<Badge variant="outline" className="text-xs">
										{group.category}
									</Badge>
								)}
								<span className="text-xs text-muted-foreground">
									{group.channelCount || 0} channels
								</span>
							</div>
						</div>
					</div>
				</button>
			))}
		</div>
	);
}
