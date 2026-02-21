"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Clock, Copy, Users } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useConsumeShareLink, useShareLink } from "@/hooks/useQuery/useShare";

export const Route = createFileRoute("/_app/share/$type/$id/")({
	component: ShareLinkPage,
});

function ShareLinkPage() {
	const { id, type } = Route.useParams();
	const router = useNavigate();
	const { data: shareLink, isLoading, error } = useShareLink(id);
	const { mutate: consumeShareLink, isPending: isConsuming } =
		useConsumeShareLink();
	const [isExpired, setIsExpired] = useState(false);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center">Loading...</CardTitle>
						<CardDescription className="text-center">
							Fetching group information...
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center text-destructive flex items-center justify-center gap-2">
							{isExpired && <Clock className="h-5 w-5" />}
							{isExpired ? "Link Expired" : "Error"}
						</CardTitle>
						<CardDescription className="text-center">
							{isExpired
								? "This share link has expired and is no longer valid."
								: "Failed to load group data"}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{isExpired && (
							<Alert>
								<AlertTriangle className="h-4 w-4" />
								<AlertDescription>
									Share links have a limited validity period. Please contact the
									person who shared this link to get a new one.
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							onClick={() => router({ to: "/dashboard" })}
						>
							Go to Dashboard
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	function handleJoinCollaboration() {
		consumeShareLink({
			linkCode: id,
			linkType: type,
		});
	}

	function handleCopyGroup() {
		consumeShareLink({
			linkCode: id,
			linkType: type,
		});
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>
						{type !== "copy" ? "Join Collaboration" : "Copy Group"}
					</CardTitle>
					<CardDescription>
						{type !== "copy"
							? `You've been invited to collaborate on "${shareLink?.groupName || "a group"}"`
							: `Copy all channels from "${shareLink?.groupName || "a group"}" to your account`}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="font-medium">
								{shareLink?.groupName || "Unknown Group"}
							</h3>
							<Badge>{shareLink?.groupDescription || "Unknown"}</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							{shareLink?.groupDescription || "No description available"}
						</p>
					</div>

					<Separator />

					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-sm text-muted-foreground">Channels</span>
							<span className="font-medium">
								{shareLink?.channelCount || "0"}
							</span>
						</div>

						<div className="max-h-32 overflow-y-auto border rounded-md p-2">
							<div className="space-y-1">
								{shareLink?.channels?.map((channel) => (
									<div
										key={channel.id}
										className="flex justify-between text-sm"
									>
										<span>{channel.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{type !== "copy" ? (
						<Alert>
							<Users className="h-4 w-4" />
							<AlertDescription>
								You will join as a {shareLink?.permission} permission .
								{shareLink?.permission === "view" &&
									" You will only be able to view channels and groups"}
								{shareLink?.permission === "edit" &&
									" You will be able to add, remove, and edit groups and channels."}
								{shareLink?.permission === "admin" &&
									" You will have full control over group and can invite others."}
							</AlertDescription>
						</Alert>
					) : (
						<div className="space-y-4">
							<Alert>
								<Copy className="h-4 w-4" />
								<AlertDescription>
									This will copy all {shareLink?.channelCount || "0"} channels
									to your account.
								</AlertDescription>
							</Alert>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => router({ to: "/dashboard" })}
					>
						Cancel
					</Button>
					<Button
						variant="secondary"
						onClick={
							type !== "copy" ? handleJoinCollaboration : handleCopyGroup
						}
						disabled={isLoading || isConsuming}
					>
						{isLoading || isConsuming
							? type !== "copy"
								? "Joining..."
								: "Copying..."
							: type !== "copy"
								? "Join Group"
								: "Copy Channels"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
