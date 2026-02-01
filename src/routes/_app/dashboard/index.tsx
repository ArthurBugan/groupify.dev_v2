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
import { useEffect } from "react";
import { z } from "zod";
import { DashboardStats } from "@/components/dashboard-stats";
import { GroupList } from "@/components/group-list";
import { RecentActivity } from "@/components/recent-activity";
import { SharedGroupsOverview } from "@/components/shared-groups-overview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useQuery/useUser";
import { cn } from "@/lib/utils";

const dashboardParams = z.object({
	origin: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/_app/dashboard/")({
	component: DashboardPage,
	validateSearch: zodValidator(dashboardParams),
});

function WelcomeSection({ user }: { user: any }) {
	const navigate = useNavigate();
	const currentHour = new Date().getHours();
	const greeting =
		currentHour < 12
			? "Good morning"
			: currentHour < 18
				? "Good afternoon"
				: "Good evening";

	return (
		<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-pink-600 text-white shadow-xl">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
			<div className="relative p-6 md:p-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<Avatar className="h-12 w-12 border-2 border-white/20">
								<AvatarImage src={undefined} />
								<AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
									{user?.username?.charAt(0).toUpperCase() ||
										user?.email?.charAt(0).toUpperCase() ||
										"U"}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="text-2xl md:text-3xl font-bold">
									{greeting},{" "}
									{user?.username || user?.email?.split("@")[0] || "User"}!
								</h1>
								<p className="text-white/80 text-sm md:text-base">
									Here's what's happening with your groups today
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button
							variant="secondary"
							size="sm"
							className="bg-white/20 border-white/30 text-white hover:bg-white/30"
							onClick={() =>
								navigate({
									to: "/dashboard/groups/new",
									search: { parentId: undefined },
								})
							}
						>
							<Plus className="h-4 w-4 mr-1" />
							New Group
						</Button>
						<Button
							variant="secondary"
							size="sm"
							className="bg-white/20 border-white/30 text-white hover:bg-white/30"
							onClick={() => navigate({ to: "/dashboard/share-links" })}
						>
							<Share2 className="h-4 w-4 mr-1" />
							Share Links
						</Button>
					</div>
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
			description: "Organize your channels",
			icon: Plus,
			href: "/dashboard/groups/new",
			color: "from-blue-500 to-blue-600",
			search: { parentId: undefined },
		},
		{
			title: "View Channels",
			description: "Manage all channels",
			icon: Users,
			href: "/dashboard/channels",
			color: "from-green-500 to-green-600",
			search: undefined,
		},
		{
			title: "Share Links",
			description: "Manage shared access",
			icon: Share2,
			href: "/dashboard/share-links",
			color: "from-purple-500 to-purple-600",
			search: undefined,
		},
		{
			title: "Upgrade Plan",
			description: "Get more features",
			icon: Sparkles,
			href: "/dashboard/settings/billing",
			color: "from-amber-500 to-orange-600",
			search: undefined,
		},
	];

	return (
		<div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
			{actions.map((action) => (
				<button
					type="button"
					key={action.title}
					onClick={() =>
						navigate({
							to: action.href,
							search: action.search,
						})
					}
					className="group relative overflow-hidden rounded-xl bg-card border p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left"
				>
					<div
						className={cn(
							"absolute top-0 right-0 w-16 h-16 bg-gradient-to-br opacity-10 rounded-bl-3xl transition-opacity group-hover:opacity-20",
							action.color,
						)}
					/>
					<div className="relative">
						<div
							className={cn(
								"w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3",
								action.color,
							)}
						>
							<action.icon className="h-5 w-5 text-white" />
						</div>
						<h3 className="font-semibold text-sm">{action.title}</h3>
						<p className="text-xs text-muted-foreground mt-0.5">
							{action.description}
						</p>
					</div>
				</button>
			))}
		</div>
	);
}

function DashboardPage() {
	const { origin } = Route.useSearch();
	const { data: user } = useUser();

	useEffect(() => {
		if (user) {
			try {
				localStorage.setItem("user", JSON.stringify(user));
			} catch (_) {}
		}
	}, [user]);

	useEffect(() => {
		if (origin) {
			(async () => {
				const decodedCookie = decodeURIComponent(document.cookie);
				const ca = decodedCookie.split(";");

				const token = ca.find((c) => c.includes("auth-token"))?.trim?.() || "";

				await sendToBackgroundViaRelay({
					extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
					name: "save-auth" as never,
					body: {
						token: token,
					},
				});
			})();
		}
	}, [origin]);

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			{user && <WelcomeSection user={user} />}

			{/* Quick Actions */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Quick Actions</h2>
				</div>
				<QuickActions />
			</section>

			{/* Stats Section */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5 text-red-500" />
						<h2 className="text-lg font-semibold">Overview</h2>
					</div>
				</div>
				<DashboardStats />
			</section>

			{/* Main Content Tabs */}
			<section className="space-y-4">
				<Tabs defaultValue="groups" className="space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex items-center gap-2">
							<Users className="h-5 w-5 text-red-500" />
							<h2 className="text-lg font-semibold">Your Groups</h2>
						</div>
					</div>

					<TabsContent value="groups" className="space-y-4 mt-0">
						<div className="grid gap-6 lg:grid-cols-3">
							<div className="lg:col-span-2">
								<Card className="h-full">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-between">
											<div>
												<CardTitle className="text-base">
													Recent Groups
												</CardTitle>
												<CardDescription>
													Your recently updated groups
												</CardDescription>
											</div>
											<Button variant="ghost" size="sm" asChild>
												<Link to="/dashboard/groups">
													View All
													<ArrowRight className="h-4 w-4 ml-1" />
												</Link>
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<GroupList />
									</CardContent>
								</Card>
							</div>
							<div>
								<Card className="h-full">
									<CardHeader className="pb-3">
										<CardTitle className="text-base">Recent features</CardTitle>
										<CardDescription>
											Check the features groupify can provide
										</CardDescription>
									</CardHeader>
									<CardContent>
										<RecentActivity />
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="shared" className="mt-0">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle>Shared Groups</CardTitle>
										<CardDescription>
											Groups that have been shared with you
										</CardDescription>
									</div>
									<Badge
										variant="secondary"
										className="bg-red-100 text-red-700"
									>
										<Share2 className="h-3 w-3 mr-1" />
										Shared Access
									</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<SharedGroupsOverview />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
