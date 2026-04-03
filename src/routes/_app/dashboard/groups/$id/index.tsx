"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Home, Play, Plus, Users } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { ChannelsTable } from "@/components/channels-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { GroupDetails } from "@/components/group-details";
import { GroupVideosList } from "@/components/group-videos-list";
import { IconViewer } from "@/components/icon-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useGroup,
	useGroups,
	useSyncGroupVideos,
} from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/$id/")({
	component: GroupDetailPage,
});

function GroupDetailPage() {
	const { id } = Route.useParams();
	const { data: group } = useGroup(id);
	const { data: groupsData } = useGroups({ limit: 100 });
	const syncVideos = useSyncGroupVideos();
	const syncedIdRef = useRef<string | null>(null);

	const breadcrumbs = useMemo(() => {
		if (!group || !groupsData?.data) return [];

		const crumbs: (typeof group)[] = [];
		let current: typeof group | undefined = group;

		while (current) {
			crumbs.unshift(current);
			if (current.parentId) {
				current = groupsData.data.find((g) => g.id === current!.parentId);
			} else {
				current = undefined;
			}
		}

		return crumbs;
	}, [group, groupsData]);

	type GroupType = NonNullable<typeof group>;

	const childGroups = useMemo(() => {
		if (!groupsData?.data || !group) return [];

		const getAllDescendants = (parentId: string): GroupType[] => {
			const directChildren = groupsData.data.filter(
				(g) => g.parentId === parentId,
			);
			const descendants: GroupType[] = [];
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
				onError: () => {
					toast.error("Failed to start video sync");
				},
			});
		}
	}, [id, syncVideos]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const settingsSaved = urlParams.get("settings-saved");

		if (settingsSaved === "true") {
			toast.info("Settings Applied", {
				description: "Your group settings have been applied to this view.",
			});
			// Remove the query parameter without refreshing the page
			const newUrl = window.location.pathname;
			window.history.replaceState({}, document.title, newUrl);
		}
	}, []);

	if (!group) {
		return null;
	}

	return (
		<div className="space-y-6">
			{breadcrumbs.length > 0 && (
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard/groups">
								<Home className="h-4 w-4" />
							</BreadcrumbLink>
						</BreadcrumbItem>
						{breadcrumbs.map((crumb, index) => (
							<>
								<BreadcrumbSeparator key={`sep-${crumb.id}`}>
									<ChevronRight className="h-4 w-4" />
								</BreadcrumbSeparator>
								<BreadcrumbItem key={crumb.id}>
									{index === breadcrumbs.length - 1 ? (
										<span className="font-medium">{crumb.name}</span>
									) : (
										<BreadcrumbLink href={`/dashboard/groups/${crumb.id}`}>
											{crumb.name}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			)}
			{childGroups.length > 0 && (
				<div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
					{childGroups.map((child) => (
						<Link
							key={child.id}
							to="/dashboard/groups/$id"
							params={{ id: child.id }}
							className="flex items-center gap-2 p-3 border rounded-lg hover:bg-accent transition-colors"
						>
							<Avatar className="h-5 w-5">
								<IconViewer icon={child.icon || "folder"} />
								<AvatarFallback>
									<Users className="h-3 w-3" />
								</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<p className="font-medium truncate">{child.name}</p>
								<p className="text-xs text-muted-foreground">
									{child.channelCount} channels
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
			<GroupDetails id={id} />
			<Tabs defaultValue="channels" className="space-y-4">
				<TabsList>
					<TabsTrigger value="channels" className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						Channels
						<Badge variant="secondary" className="ml-1">
							{group.channels?.length || 0}
						</Badge>
					</TabsTrigger>
					<TabsTrigger value="videos" className="flex items-center gap-2">
						<Play className="h-4 w-4" />
						Videos
					</TabsTrigger>
				</TabsList>
				<TabsContent value="channels">
					<ChannelsTable groupId={id} />
				</TabsContent>
				<TabsContent value="videos">
					<GroupVideosList groupId={id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
