"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	createFileRoute,
	Link,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardHeader } from "@/components/dashboard-header";
import {
	IconPicker,
	IconPickerContent,
	IconPickerTrigger,
	IconViewer,
} from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGroup, useGroups } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/new/")({
	component: NewGroupPage,
	validateSearch: (search: Record<string, unknown>) => ({
		parentId: (search.parentId as string) || undefined,
	}),
});

// Zod schema for form validation
const createGroupSchema = z.object({
	name: z
		.string()
		.min(1, "Group name is required")
		.max(50, "Group name must be less than 50 characters")
		.regex(
			/^[a-zA-Z0-9\s\-_]+$/,
			"Group name can only contain letters, numbers, spaces, hyphens, and underscores",
		),
	description: z
		.string()
		.max(200, "Description must be less than 200 characters")
		.optional(),
	category: z.string().min(1, "Please select a category"),
	icon: z.string().min(1, "Please select an icon"),
	parentId: z.string().optional(),
});

type CreateGroupFormData = z.infer<typeof createGroupSchema>;

function NewGroupPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/_app/dashboard/groups/new/" });
	const { data: groupsData, isLoading: isGroupsLoading } = useGroups();
	const createGroupMutation = useCreateGroup();
	const [isLoading, setIsLoading] = useState(false);

	// Initialize React Hook Form with Zod validation
	const form = useForm<CreateGroupFormData>({
		resolver: zodResolver(createGroupSchema),
		defaultValues: {
			name: "",
			description: "",
			category: "",
			icon: "twemoji:rocket",
			parentId: search.parentId || undefined,
		},
	});

	const { control, setValue } = form;

	// Set parent group from URL parameter
	useEffect(() => {
		if (search.parentId) {
			setValue("parentId", search.parentId);
		}
	}, [search.parentId, setValue]);

	// Get available parent groups (top-level groups only)
	const availableParentGroups =
		groupsData?.data || [];

	const onSubmit = async (data: CreateGroupFormData) => {
		setIsLoading(true);
		try {
			// Prepare group data with parent group if selected
			const groupData = {
				name: data.name,
				description: data.description,
				category: data.category,
				icon: data.icon,
				...(data.parentId &&
					data.parentId !== "none" && { parentId: data.parentId }),
			};

			// Create group using the mutation
			await createGroupMutation.mutateAsync(groupData);

			toast.success("Success", {
				description: "Group created successfully!",
			});

			setIsLoading(false);
			navigate({ to: "/dashboard/groups" });
		} catch (error) {
			console.error("Error creating group:", error);
			toast.error("Error", {
				description: "Failed to create group. Please try again.",
			});
			setIsLoading(false);
		}
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
					<Form {...form}>
						<div className="grid gap-4">
							<FormField
								control={control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Group Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter group name..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe what this group is about..."
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Gaming">Gaming</SelectItem>
												<SelectItem value="Technology">Technology</SelectItem>
												<SelectItem value="Food">Food</SelectItem>
												<SelectItem value="Fitness">Fitness</SelectItem>
												<SelectItem value="Travel">Travel</SelectItem>
												<SelectItem value="DIY">DIY</SelectItem>
												<SelectItem value="Music">Music</SelectItem>
												<SelectItem value="Education">Education</SelectItem>
												<SelectItem value="Entertainment">
													Entertainment
												</SelectItem>
												<SelectItem value="Lifestyle">Lifestyle</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-3 gap-4">
								<FormField
									control={control}
									name="icon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<IconPicker
													value={field.value}
													onChange={(value) =>
														field.onChange(`twemoji:${value}`)
													}
												>
													<IconPickerTrigger />
													<IconPickerContent />
												</IconPicker>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="parentId"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>Parent Group (Optional)</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															placeholder={
																isGroupsLoading
																	? "Loading groups..."
																	: "None (Top-level group)"
															}
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="none">
														None (Top-level group)
													</SelectItem>
													{isGroupsLoading ? (
														<SelectItem value="loading" disabled>
															<Loader2 className="mr-2 h-4 w-4 animate-spin" />
															Loading groups...
														</SelectItem>
													) : availableParentGroups.length === 0 ? (
														<SelectItem value="no-groups" disabled>
															<span className="flex items-center gap-2">
																<FolderKanban className="h-4 w-4" />
																No parent groups available
															</span>
														</SelectItem>
													) : (
														availableParentGroups.map((pg) => (
															<SelectItem key={pg.id} value={pg.id}>
																<div className="flex items-center gap-2">
																	<IconViewer
																		icon={pg.icon || "FolderKanban"}
																		size={32}
																	/>
																	{pg.name}
																</div>
															</SelectItem>
														))
													)}
												</SelectContent>
											</Select>
											<FormDescription>
												Creating a subgroup allows you to organize channels
												hierarchically.{" "}
												{availableParentGroups.length === 0 &&
													!isGroupsLoading &&
													"Create a main group first to use as a parent group."}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-4">
							<Button
								variant="destructive"
								type="button"
								onClick={() => navigate({ to: "/dashboard/groups" })}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								onClick={form.handleSubmit(onSubmit)}
								className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								disabled={isLoading || createGroupMutation.isPending}
							>
								{isLoading || createGroupMutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating...
									</>
								) : (
									"Create Group"
								)}
							</Button>
						</div>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
