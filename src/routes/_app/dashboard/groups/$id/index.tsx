"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Home, Play, Users } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { ChannelsTable } from "@/components/channels-table";
import { GroupDetails } from "@/components/group-details";
import { GroupVideosList } from "@/components/group-videos-list";
import { IconViewer } from "@/components/icon-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useGroup,
	useGroups,
	useSyncGroupVideos,
} from "@/hooks/useQuery/useGroups";
import { useGroupVideos } from "@/hooks/useQuery/useGroupVideos";

export const Route = createFileRoute("/_app/dashboard/groups/$id/")({
	component: GroupDetailPage,
});

function GroupDetailPage() {
	const { id } = Route.useParams();
	const { data: group } = useGroup(id);
	const { data: groupsData } = useGroups({ limit: 100 });
	const { data: videosData } = useGroupVideos(id, { limit: 1 });
	const syncVideos = useSyncGroupVideos();
	const syncedIdRef = useRef<string | null>(null);

	const videoCount = videosData?.pagination?.total || 0;

	const breadcrumbs = useMemo(() => {
		if (!group || !groupsData?.data) return [];
		const crumbs: (typeof group)[] = [];
		let current: typeof group | undefined = group;
		while (current) {
			crumbs.unshift(current);
			current = groupsData.data.find((g) => g.id === current!.parentId);
		}
		return crumbs;
	}, [group, groupsData]);

	const childGroups = useMemo(() => {
		if (!groupsData?.data || !group) return [];
		const getAllDescendants = (parentId: string): (typeof group)[] => {
			const directChildren = groupsData.data.filter(
				(g) => g.parentId === parentId,
			);
			const descendants: (typeof group)[] = [];
			for (const child of directChildren) {
				if (child) {
					descendants.push(child);
					descendants.push(...getAllDescendants(child.id));
				}
			}
			return descendants;
		};
		return getAllDescendants(id);
	}, [groupsData, id, group]);

	useEffect(() => {
		if (syncedIdRef.current !== id) {
			syncedIdRef.current = id;
			syncVideos.mutate(id, {
				onError: () => toast.error("Failed to sync videos"),
			});
		}
	}, [id, syncVideos]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("settings-saved") === "true") {
			toast.info("Settings Applied", {
				description: "Your group settings have been applied.",
			});
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, []);

	if (!group) return null;

	return (
		<div className="space-y-4">
			{/* Breadcrumb */}
			{breadcrumbs.length > 0 && (
				<div className="flex items-center gap-1 text-sm">
					<Link
						to="/dashboard/groups"
						className="hover:text-red-500 transition-colors"
					>
						Home
					</Link>
					{breadcrumbs.map((crumb, index) => (
						<>
							<ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
							{index === breadcrumbs.length - 1 ? (
								<span className="font-medium">{crumb.name}</span>
							) : (
								<Link
									to="/dashboard/groups/$id"
									params={{ id: crumb.id }}
									className="hover:text-red-500 transition-colors"
								>
									{crumb.name}
								</Link>
							)}
						</>
					))}
				</div>
			)}

			{/* Child Groups */}
			{childGroups.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
					{childGroups.map((child) => (
						<Link
							key={child.id}
							to="/dashboard/groups/$id"
							params={{ id: child.id }}
							className="flex items-center gap-2 p-2.5 border rounded-lg hover:bg-accent/50 transition-colors"
						>
							<Avatar className="h-6 w-6">
								<IconViewer icon={child.icon || "folder"} />
								<AvatarFallback>
									<Users className="h-3 w-3 text-muted-foreground" />
								</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<p className="font-medium text-sm truncate">{child.name}</p>
								<p className="text-xs text-muted-foreground">
									{child.channelCount} channels
								</p>
							</div>
						</Link>
					))}
				</div>
			)}

			{/* Group Details */}
			<GroupDetails id={id} />

			{/* Tabs */}
			<Tabs defaultValue="channels" className="space-y-4">
				<TabsList className="grid grid-cols-2 w-auto bg-muted/30">
					<TabsTrigger
						value="channels"
						className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 flex items-center gap-2"
					>
						<Users className="h-3.5 w-3.5" /> Channels
						<Badge variant="secondary" className="ml-1">
							{group.channels?.length || 0}
						</Badge>
					</TabsTrigger>
					<TabsTrigger
						value="videos"
						className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 flex items-center gap-2"
					>
						<Play className="h-3.5 w-3.5" /> Videos
						<Badge variant="secondary" className="ml-1">
							{videoCount}
						</Badge>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="channels" className="mt-0">
					<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
						<ChannelsTable groupId={id} />
					</div>
				</TabsContent>

				<TabsContent value="videos" className="mt-0">
					<GroupVideosList groupId={id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
