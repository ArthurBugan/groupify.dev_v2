"use client";

import {
	AlignJustify,
	ExternalLink,
	LayoutGrid,
	List,
	Loader2,
	MoreHorizontal,
	Trash2,
	Youtube,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDeleteChannelMutation } from "@/hooks/useQuery/useChannels";
import { type Channel, useGroup } from "@/hooks/useQuery/useGroups";

interface ChannelsTableProps {
	groupId: string;
}

export function ChannelsTable({ groupId }: ChannelsTableProps) {
	const { data: groupData } = useGroup(groupId);
	const [searchTerm, setSearchTerm] = useState("");
	const [channels, setChannels] = useState<Channel[]>(
		groupData?.channels || [],
	);
	const [viewMode, setViewMode] = useState("grid"); // grid, list, compact
	const [sortOrder, setSortOrder] = useState("name-asc"); // Default sort by name ascending

	const { mutate: deleteChannel, isPending: isDeletingChannel } =
		useDeleteChannelMutation();

	useEffect(() => {
		if (groupData?.channels) {
			setChannels(groupData.channels);
		}
	}, [groupData?.channels]);

	// Load settings from localStorage on component mount
	useEffect(() => {
		const savedSettings = localStorage.getItem("groupSettings");
		if (savedSettings) {
			try {
				const settings = JSON.parse(savedSettings);
				setViewMode(settings.defaultView || "grid");
				setSortOrder(settings.sortOrder || "name-asc");
			} catch (error) {
				console.error("Error loading settings:", error);
			}
		}
	}, []);

	const handleRemoveChannel = (channelId: string) => {
		deleteChannel({ channelId });
	};

	const renderTableView = () => (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Channel</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{channels.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="h-24 text-center">
								No channels found.
							</TableCell>
						</TableRow>
					) : (
						channels.map((channel) => (
							<TableRow key={channel.id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={channel.thumbnail || "/placeholder.svg"}
												alt={channel.name}
											/>
											<AvatarFallback>
												<Youtube className="h-4 w-4" />
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium">{channel.name}</p>
											<p className="text-xs text-muted-foreground truncate max-w-[200px]">
												{channel.url}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<a
													href={`https://www.youtube.com/channel/${channel.url}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink className="mr-2 h-4 w-4" />
													Visit channel
												</a>
											</DropdownMenuItem>
											<DropdownMenuItem
												className="text-destructive"
												onClick={() => handleRemoveChannel(channel.id)}
												disabled={isDeletingChannel}
											>
												{isDeletingChannel ? (
													<Loader2 className="animate-spin h-4 w-4" />
												) : (
													<Trash2 className="mr-2 h-4 w-4" />
												)}
												Remove from group
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);

	const renderGridView = () => (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{channels.length === 0 ? (
				<div className="col-span-full h-24 flex items-center justify-center text-center border rounded-md">
					No channels found.
				</div>
			) : (
				channels.map((channel) => (
					<Card key={channel.id}>
						<CardContent className="p-4">
							<div className="flex flex-col items-center text-center">
								<Avatar className="h-16 w-16 mb-2">
									<AvatarImage
										src={channel.thumbnail || "/placeholder.svg"}
										alt={channel.name}
									/>
									<AvatarFallback>
										<Youtube className="h-8 w-8" />
									</AvatarFallback>
								</Avatar>
								<h3 className="font-medium">{channel.name}</h3>
								<div className="flex gap-2 mt-auto">
									<Button
										size="sm"
										variant="outline"
										asChild
										className="flex-1"
									>
										<a
											href={`https://www.youtube.com/channel/${channel.url}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<ExternalLink className="mr-2 h-4 w-4" />
											Visit
										</a>
									</Button>
									<Button
										size="sm"
										variant="outline"
										className="flex-1 text-destructive"
										onClick={() => handleRemoveChannel(channel.id)}
										disabled={isDeletingChannel}
									>
										{isDeletingChannel ? (
											<Loader2 className="animate-spin h-4 w-4" />
										) : (
											<Trash2 className="mr-2 h-4 w-4" />
										)}
										Remove
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	);

	const renderCompactView = () => (
		<div className="space-y-2">
			{channels.length === 0 ? (
				<div className="h-24 flex items-center justify-center text-center border rounded-md">
					No channels found.
				</div>
			) : (
				channels.map((channel) => (
					<div
						key={channel.id}
						className="flex items-center justify-between p-2 border rounded-md hover:bg-accent/50 transition-colors"
					>
						<div className="flex items-center gap-2">
							<Avatar className="h-6 w-6">
								<AvatarImage
									src={channel.thumbnail || "/placeholder.svg"}
									alt={channel.name}
								/>
								<AvatarFallback>
									<Youtube className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>
							<div className="overflow-hidden">
								<p className="font-medium text-sm">{channel.name}</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon" className="h-7 w-7" asChild>
								<a
									href={`https://www.youtube.com/channel/${channel.url}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="h-4 w-4" />
								</a>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 text-destructive"
								onClick={() => handleRemoveChannel(channel.id)}
								disabled={isDeletingChannel}
							>
								{isDeletingChannel ? (
									<Loader2 className="animate-spin h-4 w-4" />
								) : (
									<Trash2 className="h-4 w-4" />
								)}
							</Button>
						</div>
					</div>
				))
			)}
		</div>
	);

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
				<Input
					placeholder="Search channels..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
				<div className="flex items-center gap-2">
					<Select value={sortOrder} onValueChange={setSortOrder}>
						<SelectTrigger className="w-[180px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="subscribers-desc">
								Subscribers (High to Low)
							</SelectItem>
							<SelectItem value="subscribers-asc">
								Subscribers (Low to High)
							</SelectItem>
							<SelectItem value="name-asc">Name (A to Z)</SelectItem>
							<SelectItem value="name-desc">Name (Z to A)</SelectItem>
							<SelectItem value="recent">Recently Added</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex border rounded-md overflow-hidden">
						<Button
							variant={viewMode === "grid" ? "secondary" : "ghost"}
							size="icon"
							className="rounded-none"
							onClick={() => setViewMode("grid")}
						>
							<LayoutGrid className="h-4 w-4" />
							<span className="sr-only">Grid view</span>
						</Button>
						<Button
							variant={viewMode === "list" ? "secondary" : "ghost"}
							size="icon"
							className="rounded-none"
							onClick={() => setViewMode("list")}
						>
							<List className="h-4 w-4" />
							<span className="sr-only">List view</span>
						</Button>
						<Button
							variant={viewMode === "compact" ? "secondary" : "ghost"}
							size="icon"
							className="rounded-none"
							onClick={() => setViewMode("compact")}
						>
							<AlignJustify className="h-4 w-4" />
							<span className="sr-only">Compact view</span>
						</Button>
					</div>
				</div>
			</div>

			{viewMode === "list" && renderTableView()}
			{viewMode === "grid" && renderGridView()}
			{viewMode === "compact" && renderCompactView()}
		</div>
	);
}
