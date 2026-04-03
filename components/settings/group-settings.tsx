"use client";

import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function GroupSettings() {
	const [maxChannels, setMaxChannels] = useState("50");
	const [allowDuplicates, setAllowDuplicates] = useState(false);
	const [autoSort, setAutoSort] = useState(true);
	const [defaultView, setDefaultView] = useState("grid");
	const [sortOrder, setSortOrder] = useState("subscribers-desc");
	const [categories, setCategories] = useState(["Gaming", "Technology", "Food", "Music"]);
	const [newCategory, setNewCategory] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("groupSettings");
		if (saved) {
			try {
				const s = JSON.parse(saved);
				setMaxChannels(s.maxChannels || "50");
				setAllowDuplicates(s.allowDuplicates || false);
				setAutoSort(s.autoSort || true);
				setDefaultView(s.defaultView || "grid");
				setSortOrder(s.sortOrder || "subscribers-desc");
				if (s.categories) setCategories(s.categories);
			} catch {}
		}
	}, []);

	const addCategory = () => {
		if (!newCategory.trim() || categories.includes(newCategory)) return;
		setCategories([...categories, newCategory]);
		setNewCategory("");
		saveToStorage();
	};

	const removeCategory = (c: string) => {
		setCategories(categories.filter((x) => x !== c));
		saveToStorage();
	};

	const saveSettings = async () => {
		setIsSaving(true);
		await new Promise(r => setTimeout(r, 500));
		toast.success("Settings saved");
		setIsSaving(false);
	};

	const saveToStorage = () => {
		localStorage.setItem("groupSettings", JSON.stringify({ maxChannels, allowDuplicates, autoSort, defaultView, sortOrder, categories }));
	};

	return (
		<div className="space-y-4">
			{/* Configuration */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Configuration</h2>

				<div className="flex items-center justify-between">
					<Label htmlFor="max-channels" className="text-sm">Max Channels per Group</Label>
					<Input id="max-channels" type="number" value={maxChannels} onChange={(e) => setMaxChannels(e.target.value)} className="w-20 h-9" />
				</div>

				<div className="flex items-center justify-between">
					<Label htmlFor="duplicates" className="text-sm">Allow Duplicates</Label>
					<Switch id="duplicates" checked={allowDuplicates} onCheckedChange={setAllowDuplicates} />
				</div>

				<div className="flex items-center justify-between">
					<Label htmlFor="auto-sort" className="text-sm">Auto-Sort Channels</Label>
					<Switch id="auto-sort" checked={autoSort} onCheckedChange={setAutoSort} />
				</div>
			</div>

			{/* Categories */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Categories</h2>
				<div className="flex gap-2">
					<Input placeholder="Add category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addCategory()} className="h-9 flex-1" />
					<Button size="icon" onClick={addCategory}><Plus className="h-4 w-4" /></Button>
				</div>
				<div className="flex flex-wrap gap-2">
					{categories.map((c) => (
						<span key={c} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-xs">{c}<button onClick={() => removeCategory(c)}><X className="h-3 w-3" /></button></span>
					))}
				</div>
			</div>

			{/* Defaults */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Default Settings</h2>
				<div className="grid grid-cols-2 gap-3">
					<Select value={defaultView} onValueChange={setDefaultView}>
						<Label className="text-xs mb-1.5 block">Default View</Label>
						<SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
						<SelectContent><SelectItem value="grid">Grid</SelectItem><SelectItem value="list">List</SelectItem><SelectItem value="compact">Compact</SelectItem></SelectContent>
					</Select>

					<Select value={sortOrder} onValueChange={setSortOrder}>
						<Label className="text-xs mb-1.5 block">Sort Order</Label>
						<SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
						<SelectContent><SelectItem value="subscribers-desc">Subscribers ↓</SelectItem><SelectItem value="name-asc">Name A-Z</SelectItem></SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex justify-end"><Button size="sm" onClick={saveSettings} disabled={isSaving}>{isSaving ? "Saving..." : <><Save className="h-3.5 w-3.5 mr-1" /> Save Settings</>}</Button></div>
		</div>
	);
}
