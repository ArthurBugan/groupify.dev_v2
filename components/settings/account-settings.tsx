"use client";

import { AlertTriangle, Link, Shield, Trash2, Unlink } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { type SocialLoginSessionStatus, useCheckDiscordSession, useCheckGoogleSession, useDisconnectDiscordSession, useDisconnectGoogleSession } from "@/hooks/useQuery/useSocialLogin";
import { Icons } from "@/components/ui/icons";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export function AccountSettings() {
	const [isLoading, setIsLoading] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false);
	const [acknowledgeNoRecovery, setAcknowledgeNoRecovery] = useState(false);

	const { data: discordSession } = useCheckDiscordSession();
	const { data: googleSession } = useCheckGoogleSession();

	const disconnectGoogleMutation = useDisconnectGoogleSession();
	const disconnectDiscordMutation = useDisconnectDiscordSession();

	const [socialConnections, setSocialConnections] = useState<{
		discord: SocialLoginSessionStatus;
		google: SocialLoginSessionStatus;
	}>({
		discord: {
			connected: false,
			provider: "discord",
			expired: false,
			expiresAt: '',
		},
		google: {
			connected: false,
			provider: "google",
			expired: false,
			expiresAt: '',
		},
	});

	useEffect(() => {
		if (discordSession) {
			setSocialConnections((prev) => ({
				...prev,
				discord: {
					connected: discordSession.connected,
					expired: discordSession.expired,
					provider: discordSession.provider,
					expiresAt: discordSession.expiresAt,
				},
			}));
		}
	}, [discordSession]);

	useEffect(() => {
		if (googleSession) {
			setSocialConnections((prev) => ({
				...prev,
				google: {
					connected: googleSession.connected,
					expired: googleSession.expired,
					provider: googleSession.provider,
					expiresAt: googleSession.expiresAt,
				},
			}));
		}
	}, [googleSession]);

	const handleSave = async () => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsLoading(false);
	};

	const handleSocialConnect = async (provider: "google" | "discord") => {
		console.log(`Connecting to ${provider}...`);
		if (provider === "google") {
			window.location.href = `${VITE_BASE_URL}/auth/google`;
		} else if (provider === "discord") {
			window.location.href = `${VITE_BASE_URL}/auth/discord`;
		}
	};

	const handleSocialDisconnect = async (provider: "google" | "discord") => {
		if (provider === "google") {
			await disconnectGoogleMutation.mutateAsync();
		} else if (provider === "discord") {
			await disconnectDiscordMutation.mutateAsync();
		}
	};

	const resetDeleteForm = () => {
		setDeleteConfirmation("");
		setAcknowledgeDataLoss(false);
		setAcknowledgeNoRecovery(false);
	};

	const handleDeleteAccount = async () => {
		if (
			deleteConfirmation !== "DELETE" ||
			!acknowledgeDataLoss ||
			!acknowledgeNoRecovery
		) {
			return;
		}

		setIsLoading(true);
		// Simulate account deletion
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log("Account deleted");
		setIsLoading(false);
		setDeleteDialogOpen(false);
		// In real app, this would redirect to a goodbye page or login
	};

	const canDeleteAccount =
		deleteConfirmation === "DELETE" &&
		acknowledgeDataLoss &&
		acknowledgeNoRecovery;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Social Login Connections</CardTitle>
					<CardDescription>
						Manage your connected social accounts for easy sign-in
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Google Connection */}
					<div className="flex items-center justify-between p-4 border rounded-lg">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
								<Icons.google className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-medium">Google</h3>
								{socialConnections.google.connected ? (
									<div className="space-y-1">
										<p className="text-sm text-muted-foreground">
											Connected
										</p>
									</div>
								) : (
									<p className="text-sm text-muted-foreground">Not connected</p>
								)}
							</div>
						</div>
						<div className="flex items-center gap-2">
							{socialConnections.google.connected ? (
								<>
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800"
									>
										<Shield className="w-3 h-3 mr-1" />
										Connected
									</Badge>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleSocialDisconnect("google")}
									>
										<Unlink className="w-4 h-4 mr-1" />
										Disconnect
									</Button>
								</>
							) : (
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleSocialConnect("google")}
								>
									<Link className="w-4 h-4 mr-1" />
									Connect
								</Button>
							)}
						</div>
					</div>

					{/* discord Connection */}
					<div className="flex items-center justify-between p-4 border rounded-lg">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
								<Icons.discord className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-medium">Discord</h3>
								{socialConnections.discord.connected ? (
									<div className="space-y-1">
										<p className="text-sm text-muted-foreground">
											Connected
										</p>
									</div>
								) : (
									<p className="text-sm text-muted-foreground">Not connected</p>
								)}
							</div>
						</div>
						<div className="flex items-center gap-2">
							{socialConnections.discord.connected ? (
								<>
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800"
									>
										<Shield className="w-3 h-3 mr-1" />
										Connected
									</Badge>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleSocialDisconnect("discord")}
									>
										<Unlink className="w-4 h-4 mr-1" />
										Disconnect
									</Button>
								</>
							) : (
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleSocialConnect("discord")}
								>
									<Link className="w-4 h-4 mr-1" />
									Connect
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password</CardTitle>
					<CardDescription>
						Change your password to keep your account secure
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor={useId()}>Current Password</Label>
							<Input id={useId()} type="password" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor={useId()}>New Password</Label>
							<Input id={useId()} type="password" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor={useId()}>Confirm New Password</Label>
							<Input id={useId()} type="password" />
						</div>
					</div>
					<Button>Update Password</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Delete Account</CardTitle>
					<CardDescription>
						Permanently delete your account and all associated data
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Dialog
						open={deleteDialogOpen}
						onOpenChange={(open) => {
							setDeleteDialogOpen(open);
							if (!open) {
								resetDeleteForm();
							}
						}}
					>
						<DialogTrigger asChild>
							<Button variant="destructive">
								<Trash2 className="w-4 h-4 mr-2" />
								Delete Account
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle className="flex items-center gap-2 text-red-600">
									<AlertTriangle className="w-5 h-5" />
									Delete Account
								</DialogTitle>
								<DialogDescription className="text-left space-y-3">
									<p className="font-medium text-foreground">
										This action cannot be undone. This will permanently delete
										your account and remove all your data from our servers.
									</p>

									<div className="bg-red-50 border border-red-200 rounded-lg p-4">
										<h4 className="font-medium text-red-900 mb-2">
											What will be deleted:
										</h4>
										<ul className="text-sm text-red-800 space-y-1">
											<li>• All your groups and channel collections</li>
											<li>• Shared group access and collaborations</li>
											<li>• Analytics data and reports</li>
											<li>• Account settings and preferences</li>
											<li>• All uploaded files and custom data</li>
										</ul>
									</div>

									<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
										<h4 className="font-medium text-amber-900 mb-2">
											Before you delete:
										</h4>
										<ul className="text-sm text-amber-800 space-y-1">
											<li>• Export any data you want to keep</li>
											<li>• Transfer group ownership to team members</li>
											<li>• Cancel any active subscriptions</li>
											<li>• Download your analytics reports</li>
										</ul>
									</div>
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-4">
								<div className="space-y-3">
									<div className="flex items-center space-x-2">
										<Checkbox
											id={useId()}
											checked={acknowledgeDataLoss}
											onCheckedChange={(checked) =>
												setAcknowledgeDataLoss(checked as boolean)
											}
										/>
										<Label htmlFor={useId()} className="text-sm">
											I understand that all my data will be permanently deleted
										</Label>
									</div>

									<div className="flex items-center space-x-2">
										<Checkbox
											id={useId()}
											checked={acknowledgeNoRecovery}
											onCheckedChange={(checked) =>
												setAcknowledgeNoRecovery(checked as boolean)
											}
										/>
										<Label
											htmlFor="acknowledge-no-recovery"
											className="text-sm"
										>
											I understand that this action cannot be undone
										</Label>
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="delete-confirmation"
										className="text-sm font-medium"
									>
										Type{" "}
										<span className="font-mono bg-gray-100 px-1 rounded">
											DELETE
										</span>{" "}
										to confirm:
									</Label>
									<Input
										id={useId()}
										value={deleteConfirmation}
										onChange={(e) => setDeleteConfirmation(e.target.value)}
										placeholder="Type DELETE to confirm"
										className="font-mono"
									/>
								</div>
							</div>

							<DialogFooter className="gap-2">
								<Button
									variant="outline"
									onClick={() => setDeleteDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={handleDeleteAccount}
									disabled={!canDeleteAccount || isLoading}
								>
									{isLoading ? (
										<>
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
											Deleting...
										</>
									) : (
										<>
											<Trash2 className="w-4 h-4 mr-2" />
											Delete Account
										</>
									)}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>
		</div>
	);
}
