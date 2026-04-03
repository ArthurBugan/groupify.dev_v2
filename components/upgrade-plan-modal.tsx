"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface UpgradePlanModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	type: "channel" | "group";
}

export function UpgradePlanModal({
	open,
	onOpenChange,
	type,
}: UpgradePlanModalProps) {
	const navigate = useNavigate();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-amber-500" />
						Upgrade Your Plan
					</DialogTitle>
					<DialogDescription>
						{type === "channel"
							? "You've reached the maximum number of channels allowed on your current plan."
							: "You've reached the maximum number of groups allowed on your current plan."}
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						To {type === "channel" ? "add more channels" : "create more groups"}
						, please upgrade your plan to unlock more features.
					</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							onOpenChange(false);
							navigate({ to: "/dashboard/settings/billing" });
						}}
					>
						Upgrade Plan
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
