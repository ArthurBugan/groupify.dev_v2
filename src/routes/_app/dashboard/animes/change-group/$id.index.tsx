"use client";

import {
	createFileRoute,
	Link,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { ArrowLeft, Save, Youtube } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { IconViewer } from "@/components/icon-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGroups } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute(
	"/_app/dashboard/animes/change-group/$id/",
)({
	component: ChangeGroupPage,
});

function ChangeGroupPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState("");

	const { data: anime, isLoading: isAnimeLoading } = useAnime(id);
	const patchAnime = useUpdateAnime();

	useEffect(() => {
		if (anime) {
			setSelectedGroup(anime.groupId || "");
		}
	}, [anime]);

	const { data: groups, isLoading: isGroupsLoading } = useGroups();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		if (channel && selectedGroup !== channel.groupId) {
			await patchChannel.mutateAsync({
				id: channel.id,
				data: { id: channel.id, groupId: selectedGroup },
			})
		}

		setIsLoading(false);
		navigate({
			to: "/dashboard/channels",
		})
	}

	if (isChannelLoading || isGroupsLoading) {
		return <div>Loading channel details...</div>;
	}

	if (!channel || !groups) {
		return <div>Channel or groups not found.</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Change Group"
					description="Move channel to a different group"
				/>
				<Button variant="outline" size="sm" asChild>
					<Link to="/dashboard/channels">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Channels
					</Link>
				</Button>
			</div>

			<Card>
				<CardContent className="pt-6">
					<div className="flex items-center gap-4 mb-6">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src={channel.thumbnail || "/placeholder.svg"}
								alt={channel.name}
							/>
							<AvatarFallback>
								<Youtube className="h-8 w-8" />
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-lg font-medium">{channel.name}</h3>
							<p className="text-sm text-muted-foreground">{channel.url}</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<h3 className="text-sm font-medium mb-3">
								Select a group for this channel:
							</h3>
							<RadioGroup
								value={selectedGroup}
								onValueChange={setSelectedGroup}
							>
								<div className="grid gap-6">
									{groups.data.map((group) => (
										<div
											key={group.id}
											className="flex items-center space-x-3 space-y-0"
										>
											<RadioGroupItem
												value={group.id}
												id={"group-${group.id}"}
											/>
											<Label
												htmlFor={"group-${group.id}"}
												className="flex items-center gap-3 cursor-pointer"
											>
												<IconViewer icon={group.icon ?? ""} />
												<div>
													<p className="font-medium">{group.name}</p>
													<p className="text-xs text-muted-foreground">
														{group.category}
													</p>
												</div>
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>
						</div>

						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								type="button"
								onClick={() => router.history.back()}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="outline"
								disabled={isLoading || selectedGroup === channel.groupId}
							>
								{isLoading ? (
									"Saving..."
								) : (
									<>
										<Save className="mr-2 h-4 w-4" />
										Save Changes
									</>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
