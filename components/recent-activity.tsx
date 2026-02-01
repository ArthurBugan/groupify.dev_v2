"use client";

import {
	FolderKanban,
	Layers,
	Share2,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
	{
		id: "1",
		title: "Organize with Groups",
		description:
			"Create unlimited groups to organize your YouTube channels by topic, project, or any criteria you need.",
		icon: FolderKanban,
		color: "from-blue-500 to-blue-600",
		badge: "Core Feature",
	},
	{
		id: "2",
		title: "Share & Collaborate",
		description:
			"Generate share links to let others view or copy your groups. Perfect for teams and communities.",
		icon: Share2,
		color: "from-purple-500 to-purple-600",
		badge: "Popular",
	},
	{
		id: "3",
		title: "Team Permissions",
		description:
			"Control access with view, edit, or admin permissions. Manage who can modify your groups.",
		icon: Users,
		color: "from-green-500 to-green-600",
		badge: "Pro",
	},
	{
		id: "4",
		title: "Bulk Operations",
		description:
			"Add, remove, or move multiple channels at once. Save time with powerful batch actions.",
		icon: Layers,
		color: "from-amber-500 to-orange-600",
		badge: null,
	},
	{
		id: "5",
		title: "Extension Integration",
		description:
			"Use our browser extension to quickly add channels while browsing YouTube directly.",
		icon: Zap,
		color: "from-red-500 to-pink-600",
		badge: "New",
	},
];

export function RecentActivity() {
	return (
		<div className="space-y-3">
			{features.map((feature) => (
				<div
					key={feature.id}
					className={cn(
						"group relative overflow-hidden rounded-xl border p-4 transition-all duration-300",
						"hover:shadow-md hover:-translate-y-0.5",
					)}
				>
					{/* Gradient background on hover */}
					<div
						className={cn(
							"absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
							feature.color,
							"group-hover:opacity-5",
						)}
					/>

					<div className="relative flex items-start gap-3">
						<div
							className={cn(
								"flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
								feature.color,
							)}
						>
							<feature.icon className="h-5 w-5 text-white" />
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="font-semibold text-sm">{feature.title}</h3>
								{feature.badge && (
									<Badge
										variant="secondary"
										className="text-[10px] px-1.5 py-0 h-4"
									>
										{feature.badge}
									</Badge>
								)}
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</div>
					</div>
				</div>
			))}

			{/* Pro Tip */}
			<div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-red-500/5 to-pink-500/5 border border-red-500/10">
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0">
						<Sparkles className="h-5 w-5 text-red-500" />
					</div>
					<div>
						<h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
						<p className="text-xs text-muted-foreground">
							Use subgroups to create nested hierarchies. Perfect for organizing
							large collections by sub-topic or project phase.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
