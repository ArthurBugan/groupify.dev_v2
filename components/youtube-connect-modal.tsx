"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface YouTubeConnectModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function YouTubeConnectModal({
	open,
	onOpenChange,
}: YouTubeConnectModalProps) {
	const navigate = useNavigate();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Youtube className="h-5 w-5 text-red-50" />
						Connect Your YouTube Account
					</DialogTitle>
					<DialogDescription>
							You don&apos;t have any YouTube channels connected yet.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						To be able to organize your YouTube subscriptions and see their latest videos, please
						connect your Google account with YouTube subscriptions in your
						account settings.
					</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Maybe Later
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							onOpenChange(false);
							navigate({ to: "/dashboard/settings/account" });
						}}
					>
						Go to Account Settings
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
