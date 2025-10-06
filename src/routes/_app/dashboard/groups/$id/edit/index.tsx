"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, Save } from "lucide-react";
import React, { use, useEffect, useId, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
	IconPicker,
	IconPickerContent,
	IconPickerTrigger,
	IconViewer,
} from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface GroupEditPageProps {
	params: {
		id: string;
	};
}

export const Route = createFileRoute("/_app/dashboard/groups/$id/edit/")({
	component: GroupEditPage,
});

function GroupEditPage({ params }: GroupEditPageProps) {
	const router = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [parentGroup, setParentGroup] = useState<string | null>(null);
	const { id } = Route.useParams();

	const [group, setGroup] = useState({
		id: id,
		name: "",
		description: "",
		category: "",
		icon: "twemoji:file-folder", // Default icon
	});

	// Mock data for parent groups
	const availableParentGroups = [
		{ id: "1", name: "Gaming Channels", icon: "Gamepad2" },
		{ id: "2", name: "Tech Reviews", icon: "Laptop" },
		{ id: "3", name: "Cooking Tutorials", icon: "Utensils" },
		{ id: "4", name: "Fitness & Health", icon: "Dumbbell" },
	].filter((g) => g.id !== id); // Filter out the current group

	// Fetch group data - in a real app, this would come from your API
	useEffect(() => {
		// Simulate API call
		const fetchGroup = async () => {
			// This is mock data - in a real app, you would fetch from your API
			const mockGroups = {
				"1": {
					id: "1",
					name: "Gaming Channels",
					description:
						"A collection of gaming channels covering reviews, gameplay, and esports.",
					category: "Gaming",
					icon: "Gamepad2",
					parentId: null,
				},
				"2": {
					id: "2",
					name: "Tech Reviews",
					description:
						"A collection of technology review channels covering gadgets, software, and tech news.",
					category: "Technology",
					icon: "Laptop",
					parentId: null,
				},
				"3": {
					id: "3",
					name: "Cooking Tutorials",
					description:
						"Channels that focus on cooking recipes, techniques, and food reviews.",
					category: "Food",
					icon: "Utensils",
					parentId: null,
				},
				"4": {
					id: "4",
					name: "Fitness & Health",
					description:
						"Workout tutorials, health tips, and fitness journey channels.",
					category: "Fitness",
					icon: "Dumbbell",
					parentId: null,
				},
				"101": {
					id: "101",
					name: "RPG Games",
					description: "Channels focused on role-playing games.",
					category: "Gaming",
					icon: "Swords",
					parentId: "1",
				},
				"102": {
					id: "102",
					name: "FPS Games",
					description: "Channels focused on first-person shooter games.",
					category: "Gaming",
					icon: "Target",
					parentId: "1",
				},
			};

			const groupData = mockGroups[id];
			if (groupData) {
				setGroup({
					id: groupData.id,
					name: groupData.name,
					description: groupData.description,
					category: groupData.category,
					icon: groupData.icon,
				});
				setParentGroup(groupData.parentId);
			}
		};

		fetchGroup();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call to update group
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		router({ to: "/dashboard/groups/$id", params: { id: "2" } });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Edit Group"
					description="Update your channel group details"
				/>
				<Button variant="outline" size="sm" asChild>
					<Link to="..">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Group
					</Link>
				</Button>
			</div>

			<Card>
				<CardContent className="pt-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Group Name</Label>
								<Input
									id={useId()}
									placeholder="Enter group name..."
									value={group.name}
									onChange={(e) => setGroup({ ...group, name: e.target.value })}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id={useId()}
									placeholder="Describe what this group is about..."
									value={group.description}
									onChange={(e) =>
										setGroup({ ...group, description: e.target.value })
									}
									rows={3}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="category">Category</Label>
								<Select
									value={group.category}
									onValueChange={(value) =>
										setGroup({ ...group, category: value })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Gaming">Gaming</SelectItem>
										<SelectItem value="Technology">Technology</SelectItem>
										<SelectItem value="Food">Food</SelectItem>
										<SelectItem value="Fitness">Fitness</SelectItem>
										<SelectItem value="Travel">Travel</SelectItem>
										<SelectItem value="DIY">DIY</SelectItem>
										<SelectItem value="Music">Music</SelectItem>
										<SelectItem value="Education">Education</SelectItem>
										<SelectItem value="Entertainment">Entertainment</SelectItem>
										<SelectItem value="Lifestyle">Lifestyle</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="icon">Icon</Label>
								<IconPicker
									value={"twemoji:file-folder"}
									onChange={(value) => setGroup({ ...group, icon: value })}
								>
									<IconPickerTrigger />
									<IconPickerContent />
								</IconPicker>
								<p className="text-sm text-muted-foreground">
									Choose an icon to represent this group
								</p>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="parent-group">Parent Group (Optional)</Label>
								<Select
									value={parentGroup || ""}
									onValueChange={(value) => setParentGroup(value || null)}
								>
									<SelectTrigger>
										<SelectValue placeholder="None (Top-level group)" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">None (Top-level group)</SelectItem>
										{availableParentGroups.map((pg) => (
											<SelectItem key={pg.id} value={pg.id}>
												<div className="flex items-center gap-2">
													{pg.icon &&
														(
															LucideIcons as unknown as Record<
																string,
																React.FC<React.SVGProps<SVGSVGElement>>
															>
														)[pg.icon] &&
														React.createElement(
															(
																LucideIcons as unknown as Record<
																	string,
																	React.FC<React.SVGProps<SVGSVGElement>>
																>
															)[pg.icon],
															{ className: "h-4 w-4 mr-2" },
														)}
													{pg.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="text-sm text-muted-foreground">
									Moving to a different parent will reorganize this group in the
									hierarchy
								</p>
							</div>
						</div>

						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								type="button"
								onClick={() => router({})}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
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
	);
}
