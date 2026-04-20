"use client";

import { sendToBackgroundViaRelay } from "@plasmohq/messaging";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import {
	ArrowRight,
	Plus,
	Share2,
	Sparkles,
	TrendingUp,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { DashboardStats } from "@/components/dashboard-stats";
import { GroupList } from "@/components/group-list";
import { RecentActivity } from "@/components/recent-activity";
import { SharedGroupsOverview } from "@/components/shared-groups-overview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpgradePlanModal } from "@/components/upgrade-plan-modal";
import { YouTubeConnectModal } from "@/components/youtube-connect-modal";
import { useUser } from "@/hooks/useQuery/useUser";
import { useDashboardTotal } from "@/hooks/useQuery/useDashboard";

const dashboardParams = z.object({
	origin: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/_app/dashboard/")({
	component: DashboardPage,
	validateSearch: zodValidator(dashboardParams),
});

function WelcomeSection({
	user,
	onNewGroup,
}: {
	user: any;
	onNewGroup: () => void;
}) {
	const currentHour = new Date().getHours();
	const greeting =
		currentHour < 12
			? "Good morning"
			: currentHour < 18
				? "Good afternoon"
				: "Good evening";

	return (
		<div className="rounded-xl border bg-gradient-to-r from-red-500/5 to-pink-500/5 p-4 md:p-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
				<div className="flex items-center gap-3">
					<Avatar className="h-10 w-10 border">
						<AvatarImage src={undefined} />
						<AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white text-sm font-semibold">
							{user?.username?.charAt(0).toUpperCase() ||
								user?.email?.charAt(0).toUpperCase() ||
								"U"}
						</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-lg md:text-xl font-semibold">
							{greeting},{" "}
							{user?.username || user?.email?.split("@")[0] || "User"}!
						</h1>
						<p className="text-sm text-muted-foreground hidden md:block">
							Here's what's happening with your groups today
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					<Button size="sm" variant="secondary" onClick={onNewGroup}>
						<Plus className="h-3.5 w-3.5 mr-1.5" /> New Group
					</Button>
					<Button size="sm" variant="secondary" asChild>
						<Link to="/dashboard/share-links">
							<Share2 className="h-3.5 w-3.5 mr-1.5" /> Share Links
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

function QuickActions() {
	const navigate = useNavigate();

	const actions = [
		{
			title: "Create Group",
			desc: "Organize channels",
			icon: Plus,
			href: "/dashboard/groups/new",
		},
		{
			title: "View Channels",
			desc: "Manage all",
			icon: Users,
			href: "/dashboard/channels",
		},
		{
			title: "Share Links",
			desc: "Manage access",
			icon: Share2,
			href: "/dashboard/share-links",
		},
		{
			title: "Upgrade Plan",
			desc: "Get more features",
			icon: Sparkles,
			href: "/dashboard/settings/billing",
		},
	];

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
			{actions.map((a) => (
				<button
					key={a.title}
					onClick={() => navigate({ to: a.href })}
					className="group rounded-xl border bg-card p-3 hover:border-red-500/30 transition-colors text-left"
				>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform">
							<a.icon className="h-4 w-4 text-white" />
						</div>
					</div>
					<h3 className="font-medium text-sm">{a.title}</h3>
					<p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
				</button>
			))}
		</div>
	);
}

function DashboardPage() {
	const { origin } = Route.useSearch();
	const { data: user } = useUser();
	const { data: dashboardData } = useDashboardTotal();
	const [upgradeModalType, setUpgradeModalType] = useState<
		"channel" | "group" | null
	>(null);
	const [showYouTubeModal, setShowYouTubeModal] = useState(false);
	const [hasSeenYouTubeModal, setHasSeenYouTubeModal] = useState(false);

	const youtubeChannels = dashboardData?.youtubeChannels ?? 0;

	useEffect(() => {
		if (user) localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		if (origin) {
			const token =
				document.cookie
					.split(";")
					.find((c) => c.includes("auth-token"))
					?.trim() || "";
			sendToBackgroundViaRelay({
				extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
				name: "save-auth" as never,
				body: { token },
			});
		}
	}, [origin]);

	useEffect(() => {
		if (!hasSeenYouTubeModal && youtubeChannels === 0 && user) {
			setShowYouTubeModal(true);
			setHasSeenYouTubeModal(true);
		}
	}, [youtubeChannels, user, hasSeenYouTubeModal]);

	return (
		<div className="space-y-6">
			{upgradeModalType && (
				<UpgradePlanModal
					open={true}
					onOpenChange={(open) => !open && setUpgradeModalType(null)}
					type={upgradeModalType}
				/>
			)}
			<YouTubeConnectModal
				open={showYouTubeModal}
				onOpenChange={setShowYouTubeModal}
			/>

			{user && (
				<WelcomeSection
					user={user}
					onNewGroup={() =>
						user?.canAddGroup === false ? setUpgradeModalType("group") : null
					}
				/>
			)}

			<section className="space-y-2">
				<h2 className="text-sm font-semibold">Quick Actions</h2>
				<QuickActions />
			</section>

			<section className="space-y-2">
				<div className="flex items-center gap-2 text-sm font-semibold">
					<TrendingUp className="h-4 w-4 text-red-500" /> Overview
				</div>
				<DashboardStats />
			</section>

			<Tabs defaultValue="groups" className="space-y-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2 text-sm font-semibold">
						<Users className="h-4 w-4 text-red-500" /> Your Groups
					</div>
					<TabsList className="grid grid-cols-2 w-auto bg-muted/30">
						<TabsTrigger
							value="groups"
							className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500"
						>
							Groups
						</TabsTrigger>
						<TabsTrigger
							value="shared"
							className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500"
						>
							Shared
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="groups" className="space-y-4 mt-0">
					<div className="grid lg:grid-cols-3 gap-4">
						<div className="lg:col-span-2 rounded-xl border bg-card/50 backdrop-blur-sm p-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold text-sm">Recent Groups</h3>
								<Button size="sm" variant="ghost" asChild>
									<Link to="/dashboard/groups">
										<ArrowRight className="h-3.5 w-3.5 mr-1" /> All
									</Link>
								</Button>
							</div>
							<GroupList />
						</div>
						<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
							<h3 className="font-semibold text-sm mb-3">Recent Features</h3>
							<RecentActivity />
						</div>
					</div>
				</TabsContent>

				<TabsContent value="shared" className="mt-0">
					<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-semibold text-sm">Shared Groups</h3>
							<Badge variant="secondary" className="gap-1">
								<Share2 className="h-3 w-3" /> Shared Access
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground mb-4">
							Groups shared with you
						</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
