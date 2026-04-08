import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Share2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { IconViewer } from "@/components/icon-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ShareLinksTable } from "@/components/share-links-table";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { useState } from "react";

export const Route = createFileRoute("/_app/dashboard/share-links/")({
	component: ShareLinksPage,
});

function ShareLinksPage() {
	const navigate = useNavigate();
	const { data: groupsData } = useGroups({ limit: 100 });
	const [open, setOpen] = useState(false);

	const groups = groupsData?.data || [];

	const handleSelectGroup = (groupId: string) => {
		setOpen(false);
		navigate({ to: "/dashboard/groups/$id/share", params: { id: groupId } });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Share Links"
					description="Manage and monitor all your share links"
				/>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="secondary">
							<Plus className="mr-2 h-4 w-4" />
							Create New Link
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Select a Group</DialogTitle>
							<DialogDescription>
								Choose a group to create a share link for.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-2 py-4">
							{groups.length === 0 ? (
								<p className="text-center text-muted-foreground py-4">
									No groups found. Create a group first.
								</p>
							) : (
								groups.map((group) => (
									<button
										key={group.id}
										type="button"
										onClick={() => handleSelectGroup(group.id)}
										className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors text-left"
									>
										<Avatar className="h-8 w-8">
											<IconViewer icon={group.icon || "folder"} />
											<AvatarFallback>
												<Share2 className="h-4 w-4" />
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<p className="font-medium truncate">{group.name}</p>
											<p className="text-xs text-muted-foreground">
												{group.channelCount} channels
											</p>
										</div>
									</button>
								))
							)}
						</div>
					</DialogContent>
				</Dialog>
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
