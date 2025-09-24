"use client";

import { Download, FileText, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function DataPrivacySettings() {
	const [dataSharing, setDataSharing] = useState(false);
	const [analytics, setAnalytics] = useState(true);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");

	return <div>lalalal</div>;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Privacy Settings</CardTitle>
					<CardDescription>
						Control how your data is used and shared
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="data-sharing">Share Usage Data</Label>
							<p className="text-sm text-muted-foreground">
								Help improve our service by sharing anonymous usage data
							</p>
						</div>
						<Switch
							id="data-sharing"
							checked={dataSharing}
							onCheckedChange={setDataSharing}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="analytics">Analytics Tracking</Label>
							<p className="text-sm text-muted-foreground">
								Allow us to track page views and feature usage
							</p>
						</div>
						<Switch
							id="analytics"
							checked={analytics}
							onCheckedChange={setAnalytics}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Data Export</CardTitle>
					<CardDescription>Download a copy of all your data</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Export all your groups, channels, and settings in various formats.
					</p>
					<div className="flex flex-wrap gap-2">
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" />
							Export as JSON
						</Button>
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" />
							Export as CSV
						</Button>
						<Button variant="outline">
							<FileText className="mr-2 h-4 w-4" />
							Generate Report
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Data Retention</CardTitle>
					<CardDescription>How long we keep your data</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between py-2 border-b">
							<span className="text-sm">Activity logs</span>
							<span className="text-sm text-muted-foreground">90 days</span>
						</div>
						<div className="flex justify-between py-2 border-b">
							<span className="text-sm">Deleted groups</span>
							<span className="text-sm text-muted-foreground">30 days</span>
						</div>
						<div className="flex justify-between py-2 border-b">
							<span className="text-sm">Analytics data</span>
							<span className="text-sm text-muted-foreground">1 year</span>
						</div>
						<div className="flex justify-between py-2">
							<span className="text-sm">Account data</span>
							<span className="text-sm text-muted-foreground">
								Until deletion
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-destructive">
				<CardHeader>
					<CardTitle className="text-destructive">Danger Zone</CardTitle>
					<CardDescription>
						Irreversible actions for your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<Shield className="h-4 w-4" />
						<AlertDescription>
							These actions cannot be undone. Please proceed with caution.
						</AlertDescription>
					</Alert>

					<div className="space-y-4">
						<div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="destructive">
										<Trash2 className="mr-2 h-4 w-4" />
										Delete All Data
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Are you absolutely sure?</DialogTitle>
										<DialogDescription>
											This will permanently delete all your groups, channels,
											and settings. This action cannot be undone.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<Label htmlFor="delete-confirmation">
											Type "DELETE" to confirm
										</Label>
										<Input
											id="delete-confirmation"
											value={deleteConfirmation}
											onChange={(e) => setDeleteConfirmation(e.target.value)}
										/>
									</div>
									<DialogFooter>
										<Button
											variant="destructive"
											disabled={deleteConfirmation !== "DELETE"}
										>
											Delete Everything
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
