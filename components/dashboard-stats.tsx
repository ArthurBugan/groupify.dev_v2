import {
	Activity,
	FolderKanban,
	Loader2,
	Share2,
	TrendingUp,
	Youtube,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardTotal } from "@/hooks/useQuery/useDashboard";

export function DashboardStats() {
	const { data, isLoading } = useDashboardTotal();
	const groups = data?.groups ?? 0;
	const channels = data?.channels ?? 0;
	const youtubeChannels = data?.youtubeChannels ?? 0;
	const sharedGroups = data?.sharedGroups ?? 0;
	const animeChannels = data?.animeChannels ?? 0;

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Groups</CardTitle>
					<FolderKanban className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Loader2 className="text-2xl mb-2 animate-spin text-muted-foreground" />
					) : (
						<div className="text-2xl font-bold">{groups}</div>
					)}
					{/* <div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+2
						</span>
						from last month
					</div> */}
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Channels</CardTitle>
					<Youtube className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Loader2 className="text-2xl mb-2 animate-spin text-muted-foreground" />
					) : (
						<div className="text-2xl font-bold">{channels}</div>
					)}
					{/* <div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+5
						</span>
						from last month
					</div> */}
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Shared Groups</CardTitle>
					<Share2 className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Loader2 className="text-2xl mb-2 animate-spin text-muted-foreground" />
					) : (
						<div className="text-2xl font-bold">{sharedGroups}</div>
					)}
					{/* <div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+3
						</span>
						from last month
					</div> */}
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Youtube Channels
					</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Loader2 className="text-2xl mb-2 animate-spin text-muted-foreground" />
					) : (
						<div className="text-2xl font-bold">{youtubeChannels}</div>
					)}
					{/* <div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+8
						</span>
						posted this week
					</div> */}
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Anime Channels
					</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<Loader2 className="text-2xl mb-2 animate-spin text-muted-foreground" />
					) : (
						<div className="text-2xl font-bold">{animeChannels}</div>
					)}
					{/* <div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+8
						</span>
						posted this week
					</div> */}
				</CardContent>
			</Card>
		</div>
	);
}
