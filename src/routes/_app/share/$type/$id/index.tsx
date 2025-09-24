"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Copy, FolderKanban, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ShareLinkPageProps {
	params: {
		type: string; // "collaborate" or "copy"
		id: string; // group id
	};
}

const shareSearchSchema = z.object({
	permission: z.enum(["view", "edit"]),
});

type ShareSchema = z.infer<typeof shareSearchSchema>;

export const Route = createFileRoute("/_app/share/$type/$id/")({
	validateSearch: (search) => shareSearchSchema.parse(search),
	component: ShareLinkPage,
});

function ShareLinkPage({ params }: ShareLinkPageProps) {
	const { id } = Route.useParams();
	const router = useNavigate();
	const { permission } = Route.useSearch();

	const [isLoading, setIsLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [group, setGroup] = useState<any>(null);
	const [error, setError] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");
	const [newGroupName, setNewGroupName] = useState("");
	const [success, setSuccess] = useState(false);

	// Mock groups for the select dropdown
	const userGroups = [
		{ id: "101", name: "My Tech Channels" },
		{ id: "102", name: "Gaming Favorites" },
		{ id: "103", name: "Educational Content" },
	];

	// Fetch group data - in a real app, this would come from your API
	useEffect(() => {
		const fetchGroup = async () => {
			setIsLoading(true);
			setError("");

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Mock data - in a real app, you would validate the share link and fetch the group
				const mockGroups = {
					"1": {
						id: "1",
						name: "Gaming Channels",
						description:
							"A collection of gaming channels covering reviews, gameplay, and esports.",
						category: "Gaming",
						channelCount: 8,
						channels: [
							{ name: "GamersUnite", subscribers: "780K" },
							{ name: "GameReviews", subscribers: "450K" },
							// More channels would be here
						],
					},
					"2": {
						id: "2",
						name: "Tech Reviews",
						description:
							"A collection of technology review channels covering gadgets, software, and tech news.",
						category: "Technology",
						channelCount: 12,
						channels: [
							{ name: "TechReviewPro", subscribers: "1.2M" },
							{ name: "GadgetGuru", subscribers: "450K" },
							// More channels would be here
						],
					},
					"3": {
						id: "3",
						name: "Cooking Tutorials",
						description:
							"Channels that focus on cooking recipes, techniques, and food reviews.",
						category: "Food",
						channelCount: 6,
						channels: [
							{ name: "ChefMaster", subscribers: "320K" },
							{ name: "CookingWithJoy", subscribers: "180K" },
							// More channels would be here
						],
					},
					"4": {
						id: "4",
						name: "Fitness & Health",
						description:
							"Workout tutorials, health tips, and fitness journey channels.",
						category: "Fitness",
						channelCount: 9,
						channels: [
							{ name: "FitLife", subscribers: "550K" },
							{ name: "WorkoutDaily", subscribers: "320K" },
							// More channels would be here
						],
					},
				};

				if (mockGroups[id]) {
					setGroup(mockGroups[id]);
				} else {
					setError("Group not found or link is invalid");
				}
			} catch (err) {
				setError("Failed to load group data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchGroup();
	}, [id]);

	const handleJoinCollaboration = async () => {
		setIsProcessing(true);

		// Simulate API call to join as collaborator
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setSuccess(true);
		setIsProcessing(false);

		// Redirect after a delay
		setTimeout(() => {
			router({ to: "/dashboard/groups/$id", params: { id: id } });
		}, 2000);
	};

	const handleCopyGroup = async () => {
		setIsProcessing(true);

		// Simulate API call to copy group
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setSuccess(true);
		setIsProcessing(false);

		// Redirect after a delay
		setTimeout(() => {
			router({ to: "/dashboard" });
		}, 2000);
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center">Loading...</CardTitle>
						<CardDescription className="text-center">
							Fetching group information...
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center text-destructive">
							Error
						</CardTitle>
						<CardDescription className="text-center">{error}</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button
							className="w-full"
							onClick={() => router({ to: "/dashboard" })}
						>
							Go to Dashboard
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	if (success) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
							<Check className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<CardTitle className="text-center">Success!</CardTitle>
						<CardDescription className="text-center">
							{params.type === "collaborate"
								? `You have successfully joined "${group.name}" as a collaborator.`
								: `You have successfully copied "${group.name}" to your account.`}
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<p className="text-center text-sm text-muted-foreground w-full">
							Redirecting you to the dashboard...
						</p>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>
						{params.type === "collaborate"
							? "Join Collaboration"
							: "Copy Group"}
					</CardTitle>
					<CardDescription>
						{params.type === "collaborate"
							? `You've been invited to collaborate on "${group.name}"`
							: `Copy all channels from "${group.name}" to your account`}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="font-medium">{group.name}</h3>
							<Badge>{group.category}</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{group.description}</p>
					</div>

					<Separator />

					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-sm text-muted-foreground">Channels</span>
							<span className="font-medium">{group.channelCount}</span>
						</div>

						<div className="max-h-32 overflow-y-auto border rounded-md p-2">
							<div className="space-y-1">
								{group.channels.map((channel: any, index: number) => (
									<div key={index} className="flex justify-between text-sm">
										<span>{channel.name}</span>
										<span className="text-muted-foreground">
											{channel.subscribers}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{params.type === "collaborate" ? (
						<Alert>
							<Users className="h-4 w-4" />
							<AlertDescription>
								You will join as a{" "}
								{permission === "view"
									? "viewer"
									: permission === "edit"
										? "editor"
										: "admin"}
								.
								{permission === "view"
									? " You will be able to view the group but not make changes."
									: permission === "edit"
										? " You will be able to add, remove, and edit channels."
										: " You will have full control over the group and can invite others."}
							</AlertDescription>
						</Alert>
					) : (
						<div className="space-y-4">
							<Alert>
								<Copy className="h-4 w-4" />
								<AlertDescription>
									This will copy all {group.channelCount} channels to your
									account.
								</AlertDescription>
							</Alert>

							<div className="space-y-2">
								<Label>Copy to</Label>
								<Select value={selectedGroup} onValueChange={setSelectedGroup}>
									<SelectTrigger>
										<SelectValue placeholder="Select destination" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="new">Create new group</SelectItem>
										{userGroups.map((g) => (
											<SelectItem key={g.id} value={g.id}>
												{g.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{selectedGroup === "new" && (
								<div className="space-y-2">
									<Label htmlFor="new-group-name">New Group Name</Label>
									<div className="flex gap-2">
										<FolderKanban className="h-10 w-10 text-muted-foreground" />
										<Input
											id="new-group-name"
											placeholder="Enter group name"
											value={newGroupName}
											onChange={(e) => setNewGroupName(e.target.value)}
										/>
									</div>
								</div>
							)}
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => router({ to: "/dashboard" })}
					>
						Cancel
					</Button>
					<Button
						onClick={
							params.type === "collaborate"
								? handleJoinCollaboration
								: handleCopyGroup
						}
						disabled={
							isProcessing ||
							(params.type === "copy" &&
								selectedGroup === "new" &&
								!newGroupName)
						}
					>
						{isProcessing
							? params.type === "collaborate"
								? "Joining..."
								: "Copying..."
							: params.type === "collaborate"
								? "Join Group"
								: "Copy Channels"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
