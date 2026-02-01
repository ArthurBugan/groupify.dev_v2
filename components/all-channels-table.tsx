"use client";

import { Link } from "@tanstack/react-router";
import {
	ExternalLink,
	FolderKanban,
	Loader2,
	MoreHorizontal,
	Pencil,
	Trash2,
	Youtube,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GenericCombobox } from "@/components/ui/combobox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useAllChannels,
	useDeleteChannelMutation,
	useUpdateChannel,
} from "@/hooks/useQuery/useChannels";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { IconViewer } from "./icon-picker";

const AdRow: React.FC<{ colSpan: number }> = ({ colSpan }) => {
		const adRef = useRef<any>(null);
		useEffect(() => {
			const w: any = typeof window !== 'undefined' ? (window as any) : null;
			if (w && w.adsbygoogle && adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
				try { w.adsbygoogle.push({}); } catch (_) {}
			}
		}, []);
		return (
			<TableRow>
				<TableCell colSpan={colSpan}>
					<div className="flex justify-center">
						<div>
							<ins className="adsbygoogle" style={{ display: 'inline-block', width: 1200, height: 69 }} data-ad-client="ca-pub-4077364511521347" data-ad-slot="2439256813" ref={adRef}></ins>
						</div>
					</div>
				</TableCell>
			</TableRow>
		);
	};

export function AllChannelsTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [adIndices, setAdIndices] = useState<number[]>([]);
	// Fetch all groups
	const { data: groupsData } = useGroups({limit: 100});
	const { mutate: updateChannel } = useUpdateChannel();
	const { mutate: deleteChannel, isPending: isDeletingChannel } =
		useDeleteChannelMutation();
	// Fetch channels with pagination
	const { data, isLoading, error } = useAllChannels({
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearchTerm || undefined,
	});

	// Handle delete channel
	const handleDeleteChannel = (channelId: string) => {
		deleteChannel({ channelId });
	};

	// Debounce search term
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			setCurrentPage(1);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (data?.data && data.data.length > 0) {
			const maxAds = Math.min(4, data.data.length);
			const count = Math.floor(Math.random() * maxAds) + 1;
			const indices = new Set<number>();
			while (indices.size < count) {
				indices.add(Math.floor(Math.random() * data.data.length));
			}
			setAdIndices(Array.from(indices));
		}
	}, [data?.data]);

	const handleSearchChange = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const handleAssignGroup = (
		channelId: string,
		groupId: string,
		name: string,
		thumbnail: string | undefined,
		url: string | undefined,
	) => {
		updateChannel({
			id: channelId,
			data: { id: channelId, groupId, name, thumbnail, url, contentType: 'youtube' },
		});
	};

	const getPaginationPages = (): (number | string)[] => {
		if (!data?.data) return [];

		const totalPages = Math.ceil(data.pagination.total / itemsPerPage);
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// Show all pages if there are few pages
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show first page
			pages.push(1);

			if (currentPage > 3) {
				pages.push("...");
			}

			// Show pages around current page
			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (currentPage < totalPages - 2) {
				pages.push("...");
			}

			// Show last page
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Search channels or groups..."
					value={searchTerm}
					onChange={(e) => handleSearchChange(e.target.value)}
					className="max-w-sm"
				/>
			</div>

			{error && (
				<div className="text-red-500 text-sm">
					Error loading channels: {error.message}
				</div>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Channel</TableHead>
							<TableHead>Group</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									Loading channels...
								</TableCell>
							</TableRow>
						) : !data?.data || data.data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									No channels found.
								</TableCell>
							</TableRow>
						) : (
							data.data.map((channel, idx) => (
								<>
									{adIndices.includes(idx) && (
										<AdRow colSpan={3} key={`ad-${channel.id}-${idx}`} />
									)}
									<TableRow key={channel.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-4 w-4">
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
													{`https://youtube.com/channel/${channel.url}`}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										{channel.groupId ? (
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<IconViewer
														icon={channel.groupIcon || "/placeholder.svg"}
													/>
													<AvatarFallback>
														<FolderKanban className="h-3 w-3" />
													</AvatarFallback>
												</Avatar>
												<Link
													to={`/dashboard/groups/$id`}
													params={{ id: channel.groupId }}
													className="hover:underline"
												>
													{channel.groupName}
												</Link>
											</div>
										) : (
											<GenericCombobox
												data={
													groupsData?.data.map((group) => ({
														value: group.id,
														label: group.name,
														icon: group.icon,
													})) || []
												}
												value={channel.groupId || ""}
												onValueChange={(value) =>
													handleAssignGroup(
														channel.id,
														value,
														channel.name,
														channel.thumbnail,
														channel.url,
													)
												}
												placeholder="Assign Group"
												renderItem={(item) => (
													<div className="flex items-center gap-8">
														{item.icon && (
															<IconViewer
																icon={item.icon}
																className="h-6 w-6"
															/>
														)}
														<span>{item.label}</span>
													</div>
												)}
											/>
										)}
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
														href={`https://youtube.com/channel/${channel.url?.trim().replace("@", "")}`}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ExternalLink className="mr-2 h-4 w-4" />
														Visit channel
													</a>
												</DropdownMenuItem>
												{/* <DropdownMenuItem asChild>
													<Link
														to={`/dashboard/channels/edit/$id`}
														params={{ id: channel.id }}
													>
														<Pencil className="mr-2 h-4 w-4" />
														Edit details
													</Link>
												</DropdownMenuItem> */}
												<DropdownMenuItem asChild>
													<Link
														to={`/dashboard/channels/change-group/$id`}
														params={{ id: channel.id }}
													>
														<FolderKanban className="mr-2 h-4 w-4" />
														Change group
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => handleDeleteChannel(channel.id)}
													className="text-destructive"
													disabled={isDeletingChannel}
												>
													{isDeletingChannel ? (
														<Loader2 className="animate-spin mr-2 h-4 w-4" />
													) : (
														<Trash2 className="mr-2 h-4 w-4" />
													)}
													Delete channel
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							</>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{data?.data && data.data.length > 0 && (
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span className="whitespace-nowrap">Items per page:</span>
						<GenericCombobox
							data={[
								{ value: "10", label: "10" },
								{ value: "25", label: "25" },
								{ value: "50", label: "50" },
								{ value: "100", label: "100" },
							]}
							value={itemsPerPage.toString()}
							onValueChange={(value) => {
								setItemsPerPage(Number(value));
								setCurrentPage(1); // Reset to first page when changing items per page
							}}
							placeholder="Items per page"
						/>
					</div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									size={"sm"}
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 1))
									}
									isActive={currentPage === 1}
								/>
							</PaginationItem>

							{getPaginationPages().map((page) => (
								<PaginationItem key={`page-${page}`}>
									{page === "..." ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											size={"sm"}
											onClick={() => setCurrentPage(page as number)}
											isActive={currentPage === page}
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									size={"sm"}
									onClick={() =>
										setCurrentPage((prev) =>
											Math.min(
												prev + 1,
												Math.ceil(data.pagination.total / itemsPerPage),
											),
										)
									}
									isActive={
										currentPage >=
										Math.ceil(data.pagination.total / itemsPerPage)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
}
