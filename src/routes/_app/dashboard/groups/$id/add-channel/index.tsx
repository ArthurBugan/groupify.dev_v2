"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	DeleteIcon,
	Loader2,
	Search,
	Trash2,
	Youtube,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	type Channel,
	getChannels,
	useChannels,
	useUpdateChannelsBatch,
} from "@/hooks/useQuery/useChannels";
import { useGroup } from "@/hooks/useQuery/useGroups";
import { type Anime, useAllAnimes, useInfiniteAnimes, getAnimes } from "@/hooks/useQuery/useAnimes";

export const Route = createFileRoute("/_app/dashboard/groups/$id/add-channel/")(
	{
		component: AddChannelPage,
	},
);

function AddChannelPage() {
	const router = useNavigate();
	const { id } = Route.useParams();
	const { data: groupData } = useGroup(id);
	const {
		data: channelsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useChannels({ groupId: id });

	const {
		data: animesData,
		isLoading: isLoadingAnimes,
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
	const animeItems = animeResults.length > 0 ? animeResults : allAnimesData?.data || [];

	const [selectedChannels, setSelectedChannels] = useState<(Channel | Anime)[]>([]);
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
		if (selectedChannels.length === 0) return;

		const channelsToUpdate = selectedChannels.map((channel) => {
			let url = channel.url;

			return {
				id: (url?.trim() || "").replace("@", "") || "",
				name: channel.name,
				thumbnail: channel.thumbnail,
				groupId: id,
				contentType: channel.contentType ?? 'youtube',
				url: url || "",
				newContent: false,
			}
		});

		await updateChannelsBatchMutation({ channels: channelsToUpdate });

		router({ to: "/dashboard/groups/$id", params: { id: id } });
	};

	return (
		<div className="space-y-6 flex flex-col h-full">
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

			<div className="grid gap-6 md:grid-cols-3 flex-1 relative">
				<div className="md:col-span-2">
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
							<Card>
								<CardContent className="pt-6">
									<form onSubmit={handleSearch} className="flex gap-2">
										<Input
											placeholder="Search for YouTube channels..."
											value={searchQuery}
											onChange={(e) => {
												setSearchQuery(e.target.value);
											}}
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
											variant="destructive"
											onClick={() => {
												setSearchQuery("");
												handleSearch();
											}}
										>
											<Trash2 className="h-4 w-2" />
										</Button>
									</form>
								</CardContent>
							</Card>

							{items?.map((channel) => (
								<div
									key={channel.name + channel.id}
									className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
								>
									<div className="flex items-start gap-3">
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
										variant="outline"
										onClick={() => handleAddChannel(channel)}
										disabled={selectedChannels?.some(
											(c) => c.id === channel.id,
										)}
									>
										{selectedChannels?.some((c) => c.id === channel.id)
											? "Added"
											: "Add"}
									</Button>
								</div>
							))}

							<Button
								size="sm"
								variant="outline"
								onClick={() => fetchNextPage()}
								disabled={!hasNextPage}
							>
								{isFetchingNextPage ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Load more channels"
								)}
							</Button>
						</TabsContent>
						<TabsContent value="anime" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<form onSubmit={handleSearch} className="flex gap-2">
										<Input
											placeholder="Search for Animes..."
											value={searchQuery}
											onChange={(e) => {
												setSearchQuery(e.target.value);
											}}
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
											variant="destructive"
											onClick={() => {
												setSearchQuery("");
												handleSearch();
											}}
										>
											<Trash2 className="h-4 w-2" />
										</Button>
									</form>
								</CardContent>
							</Card>

							{animeItems?.map((channel) => (
								<div
									key={channel.name + channel.id}
									className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
								>
									<div className="flex items-start gap-3">
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
										variant="outline"
										onClick={() => handleAddChannel(channel)}
										disabled={selectedChannels?.some(
											(c) => c.id === channel.id,
										)}
									>
										{selectedChannels?.some((c) => c.id === channel.id)
											? "Added"
											: "Add"}
									</Button>
								</div>
							))}

							<Button
								size="sm"
								variant="outline"
								onClick={() => fetchNextPageAnimes()}
								disabled={!hasNextPageAnimes}
							>
								{isFetchingNextPageAnimes ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Load more animes"
								)}
							</Button>
						</TabsContent>
					</Tabs>
				</div>

				<div>
					<Card className="sticky top-0 z-10">
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
															src={channel.thumbnail || "/placeholder.svg"}
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
															{channel.contentType === "anime"
																? `https://crunchyroll.com/series/${channel.url}`
																: `https://youtube.com/channel/${channel.channelId?.split("/")[1]}`}

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
													<DeleteIcon className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
								)}

								<div className="pt-2">
									<Button
										className="w-full"
										variant="outline"
										disabled={selectedChannels.length === 0 || isUpdating}
										onClick={handleSaveChannels}
									>
										{isUpdating ? (
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
