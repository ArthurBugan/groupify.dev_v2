"use client";

import { AlertTriangle, Eye, EyeOff, Link, Shield, Trash2, Unlink } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckDiscordSession, useCheckGoogleSession, useDisconnectDiscordSession, useDisconnectGoogleSession } from "@/hooks/useQuery/useSocialLogin";
import { Icons } from "@/components/ui/icons";
import { useDeleteAccountMutation, useUpdatePasswordMutation } from "@/hooks/mutations/useAuthMutations";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export function AccountSettings() {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false);
	const [acknowledgeNoRecovery, setAcknowledgeNoRecovery] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { data: discordSession } = useCheckDiscordSession();
	const { data: googleSession } = useCheckGoogleSession();
	const disconnectGoogleMutation = useDisconnectGoogleSession();
	const disconnectDiscordMutation = useDisconnectDiscordSession();
	const deleteAccountMutation = useDeleteAccountMutation();
	const { mutateAsync: updatePasswordMutation, isPending: passwordMutation } = useUpdatePasswordMutation();

	const [socialConnections, setSocialConnections] = useState({
		discord: { connected: false, expired: false },
		google: { connected: false, expired: false },
	});

	useEffect(() => { if (discordSession) setSocialConnections((p) => ({ ...p, discord: { connected: discordSession.connected, expired: discordSession.expired } })); }, [discordSession]);
	useEffect(() => { if (googleSession) setSocialConnections((p) => ({ ...p, google: { connected: googleSession.connected, expired: googleSession.expired } })); }, [googleSession]);

	const handleConnect = async (provider: "google" | "discord") => {
		window.location.href = `${VITE_BASE_URL}/auth/${provider}`;
	};

	const handleDisconnect = async (provider: "google" | "discord") => {
		if (provider === "google") await disconnectGoogleMutation.mutateAsync();
		else await disconnectDiscordMutation.mutateAsync();
	};

	const canDeleteAccount = deleteConfirmation === "DELETE" && acknowledgeDataLoss && acknowledgeNoRecovery;

	return (
		<div className="space-y-4">
			{/* Social Connections */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-2">Social Login</h2>

				{/* Google */}
				<div className="flex items-center justify-between p-3 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"><Icons.google className="h-5 w-5" /></div>
						<div>
							<p className="font-medium text-sm">Google</p>
							{socialConnections.google.connected ? <Badge variant="secondary" className="mt-1 gap-1 h-auto py-0.5 px-2"><Shield className="h-3 w-3" /> Connected</Badge> : <span className="text-xs text-muted-foreground">Not connected</span>}
						</div>
					</div>
					<Button size="sm" variant={socialConnections.google.connected ? "outline" : "ghost"} onClick={() => socialConnections.google.connected ? handleDisconnect("google") : handleConnect("google")}>
						{socialConnections.google.connected ? <><Unlink className="h-3.5 w-3.5 mr-1" /> Disconnect</> : <><Link className="h-3.5 w-3.5 mr-1" /> Connect</>}
					</Button>
				</div>

				{/* Discord */}
				<div className="flex items-center justify-between p-3 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><Icons.discord className="h-5 w-5" /></div>
						<div>
							<p className="font-medium text-sm">Discord</p>
							{socialConnections.discord.connected ? <Badge variant="secondary" className="mt-1 gap-1 h-auto py-0.5 px-2"><Shield className="h-3 w-3" /> Connected</Badge> : <span className="text-xs text-muted-foreground">Not connected</span>}
						</div>
					</div>
					<Button size="sm" variant={socialConnections.discord.connected ? "outline" : "ghost"} onClick={() => socialConnections.discord.connected ? handleDisconnect("discord") : handleConnect("discord")}>
						{socialConnections.discord.connected ? <><Unlink className="h-3.5 w-3.5 mr-1" /> Disconnect</> : <><Link className="h-3.5 w-3.5 mr-1" /> Connect</>}
					</Button>
				</div>
			</div>

			{/* Password */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-3">Password</h2>
				<div className="space-y-3">
					<Input type={showNewPassword ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pr-10 h-9" />
					{showNewPassword && <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"><EyeOff className="h-4 w-4" /></button>}
					
					<Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10 h-9" />
					
					<Button variant="secondary" size="sm" disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 6 || passwordMutation} onClick={() => updatePasswordMutation({ password: newPassword, passwordConfirmation: confirmPassword })}>Update Password</Button>
				</div>
			</div>

			{/* Delete Account */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-3">Danger Zone</h2>
				<Dialog open={deleteDialogOpen} onOpenChange={(o) => { setDeleteDialogOpen(o); if (!o) { setDeleteConfirmation(""); setAcknowledgeDataLoss(false); setAcknowledgeNoRecovery(false); } }}>
					<DialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="h-3.5 w-3.5 mr-1" /> Delete Account</Button></DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2 text-red-600"><AlertTriangle className="h-5 w-5" /> Delete Account?</DialogTitle>
							<DialogDescription>This cannot be undone.</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 mt-4">
							<p className="text-sm text-muted-foreground">All your data including groups, analytics, and settings will be permanently deleted.</p>
							<Checkbox checked={acknowledgeDataLoss} onCheckedChange={(c) => setAcknowledgeDataLoss(c as boolean)} /><Label>I understand all data will be lost</Label>
							<Checkbox checked={acknowledgeNoRecovery} onCheckedChange={(c) => setAcknowledgeNoRecovery(c as boolean)} /><Label>This action cannot be undone</Label>
							<Input placeholder="Type DELETE to confirm" value={deleteConfirmation} onChange={(e) => setDeleteConfirmation(e.target.value)} />
						</div>
						<DialogFooter className="gap-2 mt-4">
							<Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
							<Button variant="destructive" size="sm" disabled={!canDeleteAccount} onClick={() => deleteAccountMutation.mutateAsync()}>Delete Account</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
