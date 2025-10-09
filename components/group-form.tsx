"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import type { Group } from "@/hooks/useQuery/useGroups";

// Zod schema for form validation
export const groupFormSchema = z.object({
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

export type GroupFormData = z.infer<typeof groupFormSchema>;

interface GroupFormProps {
	initialData?: Partial<GroupFormData>;
	groups?: Group[];
	isLoading?: boolean;
	onSubmit: (data: GroupFormData) => Promise<void>;
	submitLabel?: string;
	cancelPath?: string;
	title?: string;
	description?: string;
	parentId?: string;
}

export function GroupForm({
	initialData,
	groups = [],
	isLoading = false,
	onSubmit,
	submitLabel = "Submit",
	cancelPath = "/dashboard/groups",
	title = "Group Form",
	description = "Manage group settings",
	parentId,
}: GroupFormProps) {
	const navigate = useNavigate();

	const form = useForm<GroupFormData>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			name: initialData?.name || "",
			description: initialData?.description || "",
			category: initialData?.category || "",
			icon: initialData?.icon || "twemoji:rocket",
			parentId: initialData?.parentId || parentId || undefined,
		},
	});

	const { control, setValue, handleSubmit } = form;
	// Set parent group from prop
	useEffect(() => {
		if (parentId) {
			setValue("parentId", parentId);
		}
	}, [parentId, setValue]);

	const handleFormSubmit = async (data: GroupFormData) => {
		await onSubmit(data);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to={cancelPath}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Cancel
					</Link>
				</Button>
			</div>

			<Card>
				<CardContent className="pt-6">
					<Form {...form}>
						<form onSubmit={handleSubmit(handleFormSubmit)}>
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
														onChange={(value) => field.onChange(`${value}`)}
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
																	isLoading
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
														{isLoading ? (
															<SelectItem value="loading" disabled>
																<Loader2 className="mr-2 h-4 w-4 animate-spin" />
																Loading groups...
															</SelectItem>
														) : groups.length === 0 ? (
															<SelectItem value="no-groups" disabled>
																<span className="flex items-center gap-2">
																	<FolderKanban className="h-4 w-4" />
																	No parent groups available
																</span>
															</SelectItem>
														) : (
															groups.map((pg) => (
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
													{groups.length === 0 &&
														!isLoading &&
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
									onClick={() => navigate({ to: cancelPath })}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Processing...
										</>
									) : (
										submitLabel
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
