"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, Save } from "lucide-react";
import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { IconPicker } from "@/components/icon-picker";
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

export const Route = createFileRoute("/_app/dashboard/groups/new/")({
	component: NewGroupPage,
});

function NewGroupPage() {
	const router = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [parentGroup, setParentGroup] = useState<string | null>(null);

	const [group, setGroup] = useState({
		name: "",
		description: "",
		category: "",
		icon: "FolderKanban", // Default icon
	});

	// Mock data for parent groups
	const availableParentGroups = [
		{ id: "1", name: "Gaming Channels", icon: "Gamepad2" },
		{ id: "2", name: "Tech Reviews", icon: "Laptop" },
		{ id: "3", name: "Cooking Tutorials", icon: "Utensils" },
		{ id: "4", name: "Fitness & Health", icon: "Dumbbell" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call to create group
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		router.push("/dashboard/groups");
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title="Create New Group"
					description="Create a new YouTube channel group"
				/>
				<Button variant="outline" size="sm" asChild>
					<Link to="/dashboard/groups">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Cancel
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
									id="name"
									placeholder="Enter group name..."
									value={group.name}
									onChange={(e) => setGroup({ ...group, name: e.target.value })}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
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
									value="twemoji:file-folder"
									onChange={(value) => setGroup({ ...group, icon: value })}
								/>
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
															LucideIcons as Record<
																string,
																React.FC<React.SVGProps<SVGSVGElement>>
															>
														)[pg.icon] &&
														React.createElement(
															(
																LucideIcons as Record<
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
									Creating a subgroup allows you to organize channels
									hierarchically
								</p>
							</div>
						</div>

						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								type="button"
								onClick={() => router.back()}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="outline"
								type="button"
								disabled={isLoading}
							>
								{isLoading ? (
									"Creating..."
								) : (
									<>
										<Save className="mr-2 h-4 w-4" />
										Create Group
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
