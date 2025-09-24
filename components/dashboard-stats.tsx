import {
	Activity,
	FolderKanban,
	Share2,
	TrendingUp,
	Youtube,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Groups</CardTitle>
					<FolderKanban className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">12</div>
					<div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+2
						</span>
						from last month
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Channels</CardTitle>
					<Youtube className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">45</div>
					<div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+5
						</span>
						from last month
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Shared Groups</CardTitle>
					<Share2 className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">7</div>
					<div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+3
						</span>
						from last month
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Channels</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">32</div>
					<div className="flex items-center text-xs text-muted-foreground">
						<span className="text-green-500 flex items-center mr-1">
							<TrendingUp className="mr-1 h-3 w-3" />
							+8
						</span>
						posted this week
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
