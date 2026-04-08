"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	IconPicker,
	IconPickerContent,
	IconPickerTrigger,
	IconViewer,
} from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
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
import type { Group } from "@/hooks/useQuery/useGroups";

export const groupFormSchema = z.object({
	name: z
		.string()
		.min(1, "Required")
		.max(50, "Max 50 chars")
		.regex(
			/^[a-zA-Z0-9\s\-_]+$/,
			"Only letters, numbers, spaces, hyphens, underscores",
		),
	description: z.string().max(200).optional(),
	category: z.string().min(1, "Select a category"),
	icon: z.string().min(1, "Select an icon"),
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

const DEFAULT_CATEGORIES = [
	"Apps & Software",
	"Arts",
	"Business",
	"Education",
	"Entertainment",
	"Gaming",
	"Lifestyle",
	"Music",
	"News",
	"Science & Technology",
	"Sports",
	"Travel",
];

export function GroupForm({
	initialData,
	groups = [],
	isLoading = false,
	onSubmit,
	submitLabel = "Submit",
	cancelPath = "/dashboard/groups",
	title = "Create Group",
	description = "",
	parentId,
}: GroupFormProps) {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

	// Load categories from localStorage on component mount
	useEffect(() => {
		const savedSettings = localStorage.getItem("groupSettings");
		if (savedSettings) {
			try {
				const settings = JSON.parse(savedSettings);
				if (
					settings.categories &&
					Array.isArray(settings.categories) &&
					settings.categories.length > 0
				) {
					setCategories(settings.categories);
				}
			} catch (error) {
				console.error("Error parsing settings:", error);
			}
		}
	}, []);

	const form = useForm<GroupFormData>({
		resolver: zodResolver(groupFormSchema),
		defaultValues: {
			name: initialData?.name || "",
			description: initialData?.description || "",
			category: initialData?.category || "",
			icon: initialData?.icon || "twemoji:rocket",
			parentId: initialData?.parentId || parentId,
		},
	});

	const { control, setValue } = form;
	useEffect(() => {
		if (parentId) setValue("parentId", parentId);
	}, [parentId, setValue]);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">{title}</h1>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to={cancelPath}>
						<ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back
					</Link>
				</Button>
			</div>

			<div className="rounded-xl border bg-card/50 backdrop-blur-sm">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="p-4 space-y-4"
					>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">Name</FormLabel>
									<FormControl>
										<Input placeholder="My Group" className="h-10" {...field} />
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
									<FormLabel className="text-sm font-medium">
										Description
									</FormLabel>
									<FormControl>
										<Input
											placeholder="What's this group about?"
											className="h-10"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid md:grid-cols-2 gap-4">
							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Category
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="h-10">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map((c) => (
													<SelectItem key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="icon"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">Icon</FormLabel>
										<FormControl>
											<IconPicker
												value={field.value}
												onChange={(v) => field.onChange(v)}
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
									<FormItem className="md:col-span-2">
										<FormLabel className="text-sm font-medium">
											Parent Group (Optional)
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="h-10">
													<SelectValue placeholder="None (top-level)" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="none">None (Top-level)</SelectItem>
												{groups.map((g) => (
													<SelectItem key={g.id} value={g.id}>
														<div className="flex items-center gap-2">
															<IconViewer
																icon={g.icon || "FolderKanban"}
																size={16}
															/>{" "}
															{g.name}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription className="text-xs mt-1">
											Create subgroups to organize hierarchically
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-2 pt-2">
							<Button
								variant="ghost"
								size="sm"
								type="button"
								onClick={() => navigate({ to: cancelPath })}
							>
								Cancel
							</Button>
							<Button
								size="sm"
								disabled={isLoading}
								className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />{" "}
										Creating...
									</>
								) : (
									submitLabel
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
