"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Search, Youtube } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddChannelPageProps {
	params: {
		id: string;
	};
}

export const Route = createFileRoute("/_app/dashboard/groups/$id/add-channel/")(
	{
		component: AddChannelPage,
	},
);

function AddChannelPage({ params }: AddChannelPageProps) {
	const router = useNavigate();
	const [activeTab, setActiveTab] = useState("search");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [selectedChannels, setSelectedChannels] = useState<any[]>([]);
	const [manualChannel, setManualChannel] = useState({
		name: "",
		url: "",
	});
	const [isAdding, setIsAdding] = useState(false);
	const { id } = Route.useParams();

	// Mock group data - in a real app, this would come from your API
	const groupName =
		id === "1"
			? "Gaming Channels"
			: id === "2"
				? "Tech Reviews"
				: id === "3"
					? "Cooking Tutorials"
					: id === "4"
						? "Fitness & Health"
						: "Channel Group";

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		setIsSearching(true);
		// Simulate API call to YouTube API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock search results
		const mockResults = [
			{
				id: "channel1",
				name: "TechReviewPro",
				url: "https://youtube.com/techreviewpro",
				subscribers: "1.2M",
				videos: 245,
				description: "Latest tech reviews and unboxing videos",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			{
				id: "channel2",
				name: "GadgetGuru",
				url: "https://youtube.com/gadgetguru",
				subscribers: "450K",
				videos: 178,
				description: "Honest reviews of the latest gadgets and tech",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			{
				id: "channel3",
				name: "TechInsider",
				url: "https://youtube.com/techinsider",
				subscribers: "320K",
				videos: 132,
				description: "Deep dives into technology and its impact",
				avatar: "/placeholder.svg?height=40&width=40",
			},
		];

		setSearchResults(mockResults);
		setIsSearching(false);
	};

	const handleAddChannel = (channel: any) => {
		if (!selectedChannels.some((c) => c.id === channel.id)) {
			setSelectedChannels([...selectedChannels, channel]);
		}
	};

	const handleRemoveChannel = (channelId: string) => {
		setSelectedChannels(
			selectedChannels.filter((channel) => channel.id !== channelId),
		);
	};

	const handleAddManualChannel = (e: React.FormEvent) => {
		e.preventDefault();
		if (!manualChannel.name || !manualChannel.url) return;

		const newChannel = {
			id: `manual-${Date.now()}`,
			name: manualChannel.name,
			url: manualChannel.url,
			subscribers: "Unknown",
			videos: 0,
			description: "",
			avatar: "/placeholder.svg?height=40&width=40",
		};

		setSelectedChannels([...selectedChannels, newChannel]);
		setManualChannel({ name: "", url: "" });
	};

	const handleSaveChannels = async () => {
		if (selectedChannels.length === 0) return;

		setIsAdding(true);
		// Simulate API call to add channels to group
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsAdding(false);
		router({ to: "/dashboard/groups/$id", params: { id: "2" } });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={`Add Channels to ${groupName}`}
					description="Search for channels or add them manually"
				/>
				<Button variant="outline" size="sm" asChild>
					<Link to="..">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Group
					</Link>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="space-y-4"
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="search">Search YouTube</TabsTrigger>
							<TabsTrigger value="manual">Add Manually</TabsTrigger>
						</TabsList>

						<TabsContent value="search" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<form onSubmit={handleSearch} className="flex gap-2">
										<Input
											placeholder="Search for YouTube channels..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="flex-1"
										/>
										<Button type="submit" disabled={isSearching}>
											{isSearching ? (
												"Searching..."
											) : (
												<Search className="mr-2 h-4 w-4" />
											)}
											{isSearching ? "" : "Search"}
										</Button>
									</form>
								</CardContent>
							</Card>

							{searchResults.length > 0 && (
								<Card>
									<CardContent className="pt-6">
										<div className="space-y-4">
											{searchResults.map((channel) => (
												<div
													key={channel.id}
													className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
												>
													<div className="flex items-start gap-3">
														<Avatar className="h-10 w-10">
															<AvatarImage
																src={channel.avatar || "/placeholder.svg"}
																alt={channel.name}
															/>
															<AvatarFallback>
																<Youtube className="h-5 w-5" />
															</AvatarFallback>
														</Avatar>
														<div>
															<div className="flex items-center gap-2">
																<h3 className="font-medium">{channel.name}</h3>
																<Badge variant="outline">
																	{channel.subscribers}
																</Badge>
															</div>
															<p className="text-xs text-muted-foreground">
																{channel.url}
															</p>
															<p className="text-sm mt-1">
																{channel.description}
															</p>
														</div>
													</div>
													<Button
														size="sm"
														variant="outline"
														onClick={() => handleAddChannel(channel)}
														disabled={selectedChannels.some(
															(c) => c.id === channel.id,
														)}
													>
														{selectedChannels.some((c) => c.id === channel.id)
															? "Added"
															: "Add"}
													</Button>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</TabsContent>

						<TabsContent value="manual" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<form onSubmit={handleAddManualChannel} className="space-y-4">
										<div className="grid gap-4">
											<div className="grid gap-2">
												<Label htmlFor="channel-name">Channel Name</Label>
												<Input
													id="channel-name"
													value={manualChannel.name}
													onChange={(e) =>
														setManualChannel({
															...manualChannel,
															name: e.target.value,
														})
													}
													required
												/>
											</div>
											<div className="grid gap-2">
												<Label htmlFor="channel-url">Channel URL</Label>
												<Input
													id="channel-url"
													type="url"
													placeholder="https://youtube.com/channel/..."
													value={manualChannel.url}
													onChange={(e) =>
														setManualChannel({
															...manualChannel,
															url: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>
										<Button type="submit">
											<Plus className="mr-2 h-4 w-4" />
											Add to Selection
										</Button>
									</form>
								</CardContent>
							</Card>

							<Alert>
								<Youtube className="h-4 w-4" />
								<AlertDescription>
									For manually added channels, subscriber counts and video
									statistics will be fetched when you save.
								</AlertDescription>
							</Alert>
						</TabsContent>
					</Tabs>
				</div>

				<div>
					<Card className="sticky top-6">
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div>
									<h3 className="font-medium mb-2">
										Selected Channels ({selectedChannels.length})
									</h3>
									<Separator />
								</div>

								{selectedChannels.length === 0 ? (
									<div className="text-center py-6 text-muted-foreground">
										<Youtube className="mx-auto h-8 w-8 mb-2 opacity-50" />
										<p>No channels selected yet</p>
										<p className="text-xs mt-1">
											Search or add channels manually
										</p>
									</div>
								) : (
									<div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
										{selectedChannels.map((channel) => (
											<div
												key={channel.id}
												className="flex items-center justify-between gap-2 border-b pb-2 last:border-0"
											>
												<div className="flex items-center gap-2 overflow-hidden">
													<Avatar className="h-8 w-8 flex-shrink-0">
														<AvatarImage
															src={channel.avatar || "/placeholder.svg"}
															alt={channel.name}
														/>
														<AvatarFallback>
															<Youtube className="h-4 w-4" />
														</AvatarFallback>
													</Avatar>
													<div className="overflow-hidden">
														<p className="font-medium truncate">
															{channel.name}
														</p>
														<p className="text-xs text-muted-foreground truncate">
															{channel.url}
														</p>
													</div>
												</div>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 flex-shrink-0"
													onClick={() => handleRemoveChannel(channel.id)}
												>
													<span className="sr-only">Remove</span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-4 w-4"
													>
														<path d="M18 6 6 18" />
														<path d="m6 6 12 12" />
													</svg>
												</Button>
											</div>
										))}
									</div>
								)}

								<div className="pt-2">
									<Button
										className="w-full"
										disabled={selectedChannels.length === 0 || isAdding}
										onClick={handleSaveChannels}
									>
										{isAdding ? (
											"Adding Channels..."
										) : (
											<>
												Add {selectedChannels.length} Channel
												{selectedChannels.length !== 1 && "s"} to Group
											</>
										)}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
