import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function GroupList() {
	// Mock data - in a real app, this would come from your database
	const groups = [
		{ id: "1", name: "Gaming Channels", channelCount: 8, category: "Gaming" },
		{ id: "2", name: "Tech Reviews", channelCount: 12, category: "Technology" },
		{ id: "3", name: "Cooking Tutorials", channelCount: 6, category: "Food" },
		{ id: "4", name: "Fitness & Health", channelCount: 9, category: "Fitness" },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Groups</CardTitle>
				<CardDescription>You have {groups.length} total groups</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{groups.map((group) => (
						<div key={group.id} className="flex items-center justify-between">
							<div className="space-y-1">
								<Link
									to={`/dashboard/groups/${group.id}`}
									className="font-medium hover:underline"
								>
									{group.name}
								</Link>
								<div className="flex items-center gap-2">
									<Badge variant="outline">{group.category}</Badge>
									<span className="text-xs text-muted-foreground">
										{group.channelCount} channels
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
