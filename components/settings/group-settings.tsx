"use client";

import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import { Switch } from "@/components/ui/switch";

export function GroupSettings() {
	const [maxChannels, setMaxChannels] = useState("50");
	const [allowDuplicates, setAllowDuplicates] = useState(false);
	const [autoSort, setAutoSort] = useState(true);
	const [defaultView, setDefaultView] = useState("grid");
	const [sortOrder, setSortOrder] = useState("subscribers-desc");
	const [categories, setCategories] = useState([
		"Gaming",
		"Technology",
		"Food",
		"Fitness",
		"Travel",
		"DIY",
		"Music",
		"Education",
		"Entertainment",
		"Lifestyle",
	]);
	const [newCategory, setNewCategory] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	// Load settings from localStorage on component mount
	useEffect(() => {
		const savedSettings = localStorage.getItem("groupSettings");
		if (savedSettings) {
			try {
				const settings = JSON.parse(savedSettings);
				setMaxChannels(settings.maxChannels || "50");
				setAllowDuplicates(settings.allowDuplicates || false);
				setAutoSort(settings.autoSort || true);
				setDefaultView(settings.defaultView || "grid");
				setSortOrder(settings.sortOrder || "subscribers-desc");
				if (settings.categories && Array.isArray(settings.categories)) {
					setCategories(settings.categories);
				}
			} catch (error) {
				console.error("Error loading settings:", error);
			}
		}
	}, []);

	const addCategory = () => {
		if (!newCategory.trim()) return;

		if (!categories.includes(newCategory)) {
			setCategories([...categories, newCategory]);
			setNewCategory("");
		}
	};

	const removeCategory = (category: string) => {
		setCategories(categories.filter((c) => c !== category));
	};

	const saveSettings = async () => {
		setIsSaving(true);

		// Save settings to localStorage
		const settings = {
			maxChannels,
			allowDuplicates,
			autoSort,
			defaultView,
			sortOrder,
			categories,
		};
		localStorage.setItem("groupSettings", JSON.stringify(settings));

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsSaving(false);

		toast("Settings saved");

		// Apply settings by refreshing the groups page
		// router.refresh()
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Group Configuration</CardTitle>
					<CardDescription>
						Configure default settings for channel groups
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="max-channels">Maximum Channels per Group</Label>
							<p className="text-sm text-muted-foreground">
								Limit the number of channels in a single group
							</p>
						</div>
						<Input
							id="max-channels"
							type="number"
							value={maxChannels}
							onChange={(e) => setMaxChannels(e.target.value)}
							className="w-24"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="allow-duplicates">Allow Duplicate Channels</Label>
							<p className="text-sm text-muted-foreground">
								Allow the same channel in multiple groups
							</p>
						</div>
						<Switch
							id="allow-duplicates"
							checked={allowDuplicates}
							onCheckedChange={setAllowDuplicates}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="auto-sort">Auto-sort Channels</Label>
							<p className="text-sm text-muted-foreground">
								Automatically sort channels by subscriber count
							</p>
						</div>
						<Switch
							id="auto-sort"
							checked={autoSort}
							onCheckedChange={setAutoSort}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Group Categories</CardTitle>
					<CardDescription>
						Manage available categories for organizing groups
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-2">
						<Input
							placeholder="Add new category"
							value={newCategory}
							onChange={(e) => setNewCategory(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addCategory()}
						/>
						<Button onClick={addCategory} size="icon">
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<Badge key={category} variant="secondary" className="gap-1 pr-1">
								{category}
								<Button
									variant="ghost"
									size="icon"
									className="h-4 w-4 p-0 hover:bg-transparent"
									onClick={() => removeCategory(category)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Default Group Settings</CardTitle>
					<CardDescription>
						Settings applied to newly created groups
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="default-view">Default View</Label>
							<Select value={defaultView} onValueChange={setDefaultView}>
								<SelectTrigger id="default-view">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="grid">Grid View</SelectItem>
									<SelectItem value="list">List View</SelectItem>
									<SelectItem value="compact">Compact View</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="sort-order">Default Sort Order</Label>
							<Select value={sortOrder} onValueChange={setSortOrder}>
								<SelectTrigger id="sort-order">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="subscribers-desc">
										Subscribers (High to Low)
									</SelectItem>
									<SelectItem value="subscribers-asc">
										Subscribers (Low to High)
									</SelectItem>
									<SelectItem value="name-asc">Name (A to Z)</SelectItem>
									<SelectItem value="name-desc">Name (Z to A)</SelectItem>
									<SelectItem value="recent">Recently Added</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button onClick={saveSettings} disabled={isSaving}>
					{isSaving ? (
						"Saving..."
					) : (
						<>
							<Save className="mr-2 h-4 w-4" />
							Save Group Settings
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
