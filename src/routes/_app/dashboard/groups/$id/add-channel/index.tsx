"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	DeleteIcon,
	Loader2,
	Plus,
	Search,
	Trash2,
	X,
	Youtube,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpgradePlanModal } from "@/components/upgrade-plan-modal";
import {
	type Anime,
	getAnimes,
	useAllAnimes,
	useInfiniteAnimes,
} from "@/hooks/useQuery/useAnimes";
import {
	type Channel,
	getChannels,
	useChannels,
	useUpdateChannelsBatch,
} from "@/hooks/useQuery/useChannels";
import { useGroup } from "@/hooks/useQuery/useGroups";
import { useUser } from "@/hooks/useQuery/useUser";

export const Route = createFileRoute("/_app/dashboard/groups/$id/add-channel/")(
	{
		component: AddChannelPage,
	},
);

function AddChannelPage() {
	const router = useNavigate();
	const { id } = Route.useParams();
	const { data: groupData } = useGroup(id);
	const { data: user } = useUser();
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const [step, setStep] = useState<"select" | "review">("select");

	const {
		data: channelsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useChannels({ groupId: id });

	const {
		data: animesData,
		fetchNextPage: fetchNextPageAnimes,
		hasNextPage: hasNextPageAnimes,
		isFetchingNextPage: isFetchingNextPageAnimes,
	} = useInfiniteAnimes({ groupId: id });

	const { data: allAnimesData } = useAllAnimes({
		page: 1,
		limit: 25,
	});

	const channels = useMemo(
		() => channelsData?.pages.flatMap((page) => page.data) || [],
		[channelsData],
	);

	const animes = useMemo(
		() => animesData?.pages.flatMap((page) => page.data) || [],
		[animesData],
	);

	const [activeTab, setActiveTab] = useState("search");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [animeResults, setAnimeResults] = useState<any[]>([]);

	const items = searchResults.length > 0 ? searchResults : channels;
	const animeItems =
		animeResults.length > 0 ? animeResults : allAnimesData?.data || [];

	const [selectedChannels, setSelectedChannels] = useState<(Channel | Anime)[]>(
		[],
	);
	const [initialChannelsCount, setInitialChannelsCount] = useState(0);
	const [showDiscardDialog, setShowDiscardDialog] = useState(false);
	const { mutateAsync: updateChannelsBatchMutation, isPending: isUpdating } =
		useUpdateChannelsBatch();
	const groupName = groupData?.name || "Channel Group";
	useEffect(() => {
		if (!isLoading && groupData?.channels) {
			setSelectedChannels(
				groupData.channels.map((c) => ({
					id: (c.url?.trim() || "").replace("@", "") || "",
					name: c.name,
					channelId: c.channelId,
					thumbnail: c.thumbnail,
					url: c.url,
					groupId: id,
					contentType: c.contentType,
					newContent: false,
				})),
			);
			setInitialChannelsCount(groupData.channels.length);
		}
	}, [groupData, isLoading, id]);

	const handleSearch = async (e?: React.FormEvent) => {
		e?.preventDefault();
		setIsSearching(true);

		if (activeTab === "anime") {
			try {
				const params: { groupId: string; search?: string } = { groupId: id };
				if (searchQuery.trim()) {
					params.search = searchQuery;
				}
				const response = await getAnimes(params);
				setAnimeResults(response.data || []);
			} catch (error) {
				console.error("Error searching animes:", error);
			} finally {
				setIsSearching(false);
			}
			return;
		} else {
			try {
				const params: { groupId: string; search?: string } = { groupId: id };
				if (searchQuery.trim()) {
					params.search = searchQuery;
				}
				const response = await getChannels(params);
				setSearchResults(response.data);
			} catch (error) {
				console.error("Error searching channels:", error);
			} finally {
				setIsSearching(false);
			}
		}
	};

	const handleAddChannel = (channel: Channel | Anime) => {
		setSelectedChannels((prev) => [...prev, channel]);
	};

	const handleRemoveChannel = (channelId: string) => {
		setSelectedChannels((prev) => prev.filter((c) => c.id !== channelId));
	};

	const handleSaveChannels = async () => {
		const channelsToUpdate = selectedChannels.map((channel) => {
			const url = channel.url;

			return {
				id: (url?.trim() || "").replace("@", "") || "",
				name: channel.name,
				thumbnail: channel.thumbnail,
				groupId: id,
				contentType: channel.contentType ?? "youtube",
				url: url || "",
				newContent: false,
			};
		});

		await updateChannelsBatchMutation({ channels: channelsToUpdate });

		router({ to: "/dashboard/groups/$id", params: { id: id } });
	};

	const isSelected = (channelId: string) =>
		selectedChannels.some((c) => c.id === channelId);

	return (
		<div className="space-y-6 flex flex-col h-full">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={`Add Channels to ${groupName}`}
					description={
						step === "select"
							? "Search and select channels to add"
							: "Review and save your selection"
					}
				/>
				{selectedChannels.length !== initialChannelsCount ? (
					<Dialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Group
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Discard unsaved changes?</DialogTitle>
								<DialogDescription>
									You have {selectedChannels.length} channel
									{selectedChannels.length !== 1 ? "s" : ""} selected that you
									haven't saved yet. If you go back now, your changes will be
									lost.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setShowDiscardDialog(false)}
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={() => {
										setShowDiscardDialog(false);
										router({ to: "/dashboard/groups/$id", params: { id: id } });
									}}
								>
									Discard & Go Back
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				) : (
					<Button variant="outline" size="sm" asChild>
						<Link to="..">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Group
						</Link>
					</Button>
				)}
			</div>

			{step === "select" ? (
				<>
					<Card>
						<CardContent className="pt-6">
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="space-y-4"
							>
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="search">Search YouTube</TabsTrigger>
									<TabsTrigger value="anime">Search Anime</TabsTrigger>
								</TabsList>

								<TabsContent value="search" className="space-y-4">
									<form onSubmit={handleSearch} className="flex gap-2 mb-4">
										<Input
											placeholder="Search for YouTube channels..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="flex-1"
										/>
										<Button
											type="submit"
											variant="secondary"
											disabled={isSearching || !searchQuery.trim()}
										>
											{isSearching ? (
												"Searching..."
											) : (
												<Search className="mr-2 h-4 w-4" />
											)}
											{isSearching ? "" : "Search"}
										</Button>
										<Button
											type="button"
											variant="ghost"
											onClick={() => {
												setSearchQuery("");
												setSearchResults([]);
											}}
										>
											<X className="h-4 w-4" />
										</Button>
									</form>
								</TabsContent>

								<TabsContent value="anime" className="space-y-4">
									<form onSubmit={handleSearch} className="flex gap-2 mb-4">
										<Input
											placeholder="Search for Animes..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="flex-1"
										/>
										<Button
											type="submit"
											variant="secondary"
											disabled={isSearching || !searchQuery.trim()}
										>
											{isSearching ? (
												"Searching..."
											) : (
												<Search className="mr-2 h-4 w-4" />
											)}
											{isSearching ? "" : "Search"}
										</Button>
										<Button
											type="button"
											variant="ghost"
											onClick={() => {
												setSearchQuery("");
												setAnimeResults([]);
											}}
										>
											<X className="h-4 w-4" />
										</Button>
									</form>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>

					<div className="space-y-2">
						{activeTab === "search"
							? items?.map((channel) => (
									<div
										key={channel.name + channel.id}
										className="flex items-center justify-between p-3 rounded-lg border bg-card"
									>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={channel.thumbnail || "/placeholder.svg"}
													alt={channel.name}
												/>
												<AvatarFallback>
													<Youtube className="h-5 w-5" />
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="flex items-center gap-2">
													<h3 className="font-medium">{channel.name}</h3>
												</div>
												<p className="text-xs text-muted-foreground">
													{`https://youtube.com/channel/${channel.channelId?.split("/")[1]}`}
												</p>
											</div>
										</div>
										<Button
											size="sm"
											variant={isSelected(channel.id) ? "secondary" : "outline"}
											onClick={() => handleAddChannel(channel)}
											disabled={isSelected(channel.id)}
										>
											{isSelected(channel.id) ? (
												<Check className="mr-1 h-4 w-4" />
											) : (
												<Plus className="mr-1 h-4 w-4" />
											)}
											{isSelected(channel.id) ? "Added" : "Add"}
										</Button>
									</div>
								))
							: animeItems?.map((channel) => (
									<div
										key={channel.name + channel.id}
										className="flex items-center justify-between p-3 rounded-lg border bg-card"
									>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={channel.thumbnail || "/placeholder.svg"}
													alt={channel.name}
												/>
												<AvatarFallback>
													<Youtube className="h-5 w-5" />
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="flex items-center gap-2">
													<h3 className="font-medium">{channel.name}</h3>
												</div>
												<p className="text-xs text-muted-foreground">
													{`https://crunchyroll.com/series/${channel.url}`}
												</p>
											</div>
										</div>
										<Button
											size="sm"
											variant={isSelected(channel.id) ? "secondary" : "outline"}
											onClick={() => handleAddChannel(channel)}
											disabled={isSelected(channel.id)}
										>
											{isSelected(channel.id) ? (
												<Check className="mr-1 h-4 w-4" />
											) : (
												<Plus className="mr-1 h-4 w-4" />
											)}
											{isSelected(channel.id) ? "Added" : "Add"}
										</Button>
									</div>
								))}

						{activeTab === "search" && hasNextPage && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => fetchNextPage()}
								disabled={!hasNextPage}
								className="w-full"
							>
								{isFetchingNextPage ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Load more channels"
								)}
							</Button>
						)}

						{activeTab === "anime" && hasNextPageAnimes && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => fetchNextPageAnimes()}
								disabled={!hasNextPageAnimes}
								className="w-full"
							>
								{isFetchingNextPageAnimes ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Load more animes"
								)}
							</Button>
						)}
					</div>

					<div className="h-20"></div>

					{selectedChannels.length > 0 && (
						<div className="fixed bottom-4 left-4 right-4 z-50 md:left-72 md:right-4">
							<Card className="shadow-lg border-2 border-primary/20">
								<CardContent className="p-3">
									<div className="flex items-center justify-between gap-2">
										<div className="flex items-center gap-2">
											<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
												<span className="text-primary font-semibold text-sm">
													{selectedChannels.length}
												</span>
											</div>
											<p className="text-sm font-medium hidden sm:inline">
												{selectedChannels.length} selected
											</p>
										</div>
										<Button size="sm" onClick={() => setStep("review")}>
											Review
											<ArrowRight className="ml-1 h-3 w-3" />
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</>
			) : (
				<>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								Review Selection ({selectedChannels.length} channel
								{selectedChannels.length !== 1 ? "s" : ""})
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{selectedChannels.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">
									<Youtube className="mx-auto h-12 w-12 mb-4 opacity-50" />
									<p className="text-lg font-medium">No channels selected</p>
									<p className="text-sm mt-2 mb-4">
										Go back to select channels to add
									</p>
									<Button variant="outline" onClick={() => setStep("select")}>
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back to Search
									</Button>
								</div>
							) : (
								<>
									<div className="space-y-2 max-h-[400px] overflow-y-auto">
										{selectedChannels.map((channel, index) => (
											<div
												key={channel.id}
												className="flex items-center justify-between p-3 rounded-lg border bg-card"
											>
												<div className="flex items-center gap-3">
													<span className="text-muted-foreground text-sm w-6">
														{index + 1}.
													</span>
													<Avatar className="h-10 w-10">
														<AvatarImage
															src={channel.thumbnail || "/placeholder.svg"}
															alt={channel.name}
														/>
														<AvatarFallback>
															<Youtube className="h-5 w-5" />
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium">{channel.name}</p>
														<p className="text-xs text-muted-foreground">
															{channel.contentType === "anime"
																? `https://crunchyroll.com/series/${channel.url}`
																: `https://youtube.com/channel/${channel.channelId?.split("/")[1]}`}
														</p>
													</div>
												</div>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => handleRemoveChannel(channel.id)}
												>
													<DeleteIcon className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>

									<Separator />

									<div className="flex gap-2 pt-2">
										<Button
											variant="outline"
											className="flex-1"
											onClick={() => setStep("select")}
										>
											<ArrowLeft className="mr-2 h-4 w-4" />
											Add More
										</Button>
										<Button
											className="flex-1"
											disabled={isUpdating}
											onClick={() => {
												if (user?.canAddChannel === false) {
													setUpgradeModalOpen(true);
												} else {
													handleSaveChannels();
												}
											}}
										>
											{isUpdating ? (
												"..."
											) : (
												<>Save {selectedChannels.length} to Group</>
											)}
										</Button>
									</div>
								</>
							)}
						</CardContent>
					</Card>

					{user?.canAddChannel === false && (
						<UpgradePlanModal
							open={upgradeModalOpen}
							onOpenChange={setUpgradeModalOpen}
							type="channel"
						/>
					)}
				</>
			)}
		</div>
	);
}
