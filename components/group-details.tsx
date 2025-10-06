import { Link } from "@tanstack/react-router";
import { Pencil, Share2 } from "lucide-react";
import { IconViewer } from "@/components/icon-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGroup } from "@/hooks/useQuery/useGroups";

interface GroupDetailsProps {
	id: string;
}

export function GroupDetails({ id }: GroupDetailsProps) {
	const { data: group } = useGroup(id);

	if (!group) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted/50">
							<IconViewer
								icon={group.icon || ""}
								className="h-6 w-6 text-muted-foreground"
							/>
						</div>
						<div>
							<div className="flex items-center gap-2">
								{group.parentId && (
									<Link
										to={`/dashboard/groups/$id`}
										params={{ id: group.parentId ?? "" }}
										className="text-sm text-muted-foreground hover:underline"
									>
										{group.parentId} /
									</Link>
								)}
								<CardTitle>{group.name}</CardTitle>
							</div>
							<CardDescription>{group.description}</CardDescription>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary">{group.category}</Badge>
						<Button variant="outline" size="sm" asChild>
							<Link to={"/dashboard/groups/$id/edit"} params={{ id: group.id }}>
								<Pencil className="mr-2 h-4 w-4" />
								Edit Group
							</Link>
						</Button>
						<Button variant="outline" size="sm" asChild>
							<Link
								to={`/dashboard/groups/$id/share`}
								params={{ id: group.id }}
							>
								<Share2 className="mr-2 h-4 w-4" />
								Share
							</Link>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">Created</p>
						<p>{group.createdAt}</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Channels
						</p>
						<p>0</p>
						{/* <p>{group.channelCount}</p> */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
