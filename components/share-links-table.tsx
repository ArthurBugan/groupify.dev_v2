"use client";

import { Link } from "@tanstack/react-router";
import {
	Calendar,
	Copy,
	Edit,
	ExternalLink,
	Eye,
	Loader2,
	MoreHorizontal,
	Share2,
	Trash2,
	Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	useDeleteShareLink,
	useShareLinks,
} from "@/hooks/useQuery/useShareLinks";
import { IconViewer } from "./icon-picker";

const AdRow: React.FC<{ colSpan: number }> = ({ colSpan }) => {
	const adRef = useRef<any>(null);
	useEffect(() => {
		const w: any = typeof window !== "undefined" ? (window as any) : null;
		if (
			w &&
			w.adsbygoogle &&
			adRef.current &&
			!adRef.current.getAttribute("data-adsbygoogle-status")
		) {
			try {
				w.adsbygoogle.push({});
			} catch (_) { }
		}
	}, []);
	return (
		<TableRow>
			<TableCell colSpan={colSpan}>
				<div className="flex justify-center">
					<div>
						<ins
							className="adsbygoogle"
							style={{ display: "inline-block", width: 1200, height: 69 }}
							data-ad-client="ca-pub-4077364511521347"
							data-ad-slot="2439256813"
							ref={adRef}
						></ins>
					</div>
				</div>
			</TableCell>
		</TableRow>
	);
};

export function ShareLinksTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [adIndices, setAdIndices] = useState<number[]>([]);
	const { mutate: deleteShareLink, isPending: isDeletingLink } =
		useDeleteShareLink();

	// Fetch share links with pagination
	const { data, isLoading, error } = useShareLinks({
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearchTerm || undefined,
	});

	// Handle delete share link
	const handleDeleteShareLink = (linkId: string, linkCode: string) => {
		if (
			confirm(
				`Are you sure you want to delete share link "${linkCode}"? This action cannot be undone.`,
			)
		) {
			deleteShareLink({ id: linkId });
		}
	};

	// Handle copy link to clipboard
	const handleCopyLink = (linkCode: string, linkType: string) => {
		const shareUrl = `${window.location.origin}/share/${linkType}/${linkCode}`;
		navigator.clipboard.writeText(shareUrl);
		toast.success("Link copied to clipboard", {
			description: "Share link has been copied to your clipboard.",
		});
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
	}, [data]);

	const handleSearchChange = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const getPaginationPages = (): (number | string)[] => {
		if (!data?.pagination) return [];

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

	const formatDate = (dateString?: string) => {
		if (!dateString) return "No expiration";
		return new Date(dateString).toLocaleDateString();
	};

	const getPermissionBadgeVariant = (permission?: string) => {
		switch (permission) {
			case "admin":
				return "destructive";
			case "edit":
				return "default";
			case "view":
			default:
				return "secondary";
		}
	};

	const getLinkTypeBadgeVariant = (linkType: string) => {
		switch (linkType) {
			case "copy":
				return "outline";
			case "collaborate":
				return "default";
			default:
				return "secondary";
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Search share links, groups, or permissions..."
					value={searchTerm}
					onChange={(e) => handleSearchChange(e.target.value)}
					className="max-w-sm"
				/>
			</div>

			{error && (
				<div className="text-red-500 text-sm">
					Error loading share links: {error.message}
				</div>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Link Code</TableHead>
							<TableHead>Group</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Permission</TableHead>
							<TableHead>Created</TableHead>
							<TableHead>Expires</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									Loading share links...
								</TableCell>
							</TableRow>
						) : data?.data?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									No share links found.
								</TableCell>
							</TableRow>
						) : (
							data?.data?.map?.((link, idx) => (
								<>
									{adIndices.includes(idx) && (
										<AdRow colSpan={7} key={`ad-${link.id}-${idx}`} />
									)}
									<TableRow key={link.id}>
										<TableCell>
											<div className="flex items-center gap-2">
												<Badge variant="outline">{link.linkCode}</Badge>
												<Button
													variant="ghost"
													size="icon"
													className="h-6 w-6 p-0"
													onClick={() =>
														handleCopyLink(link.linkCode, link.linkType)
													}
												>
													<Copy className="h-3 w-3" />
													<span className="sr-only">Copy link</span>
												</Button>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<IconViewer
														icon={link.groupIcon || "/placeholder.svg"}
													/>
													<AvatarFallback>
														<Users className="h-3 w-3" />
													</AvatarFallback>
												</Avatar>
												<Link
													to={`/dashboard/groups/$id`}
													params={{ id: link.group_id }}
													className="hover:underline"
												>
													{link.groupName}
												</Link>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant={getLinkTypeBadgeVariant(link.linkType)}>
												{link.linkType === "collaborate" ? (
													<>
														<Users className="mr-1 h-3 w-3" />
														Collaborate
													</>
												) : (
													<>
														<Copy className="mr-1 h-3 w-3" />
														Copy
													</>
												)}
											</Badge>
										</TableCell>
										<TableCell>
											{link.permission && (
												<Badge
													variant={getPermissionBadgeVariant(link.permission)}
												>
													{link.permission === "admin" ? (
														<>
															<Edit className="mr-1 h-3 w-3" />
															Admin
														</>
													) : link.permission === "edit" ? (
														<>
															<Edit className="mr-1 h-3 w-3" />
															Edit
														</>
													) : (
														<>
															<Eye className="mr-1 h-3 w-3" />
															View
														</>
													)}
												</Badge>
											)}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1">
												<Calendar className="h-3 w-3 text-muted-foreground" />
												<span className="text-sm">
													{link.createdAt
														? new Date(link.createdAt).toLocaleDateString()
														: "Unknown"}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1">
												<Calendar className="h-3 w-3 text-muted-foreground" />
												<span className="text-sm">
													{formatDate(link.expiresAt)}
												</span>
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
													<DropdownMenuItem
														onClick={() =>
															handleCopyLink(link.linkCode, link.linkType)
														}
													>
														<Copy className="mr-2 h-4 w-4" />
														Copy link
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<a
															href={`${window.location.origin}/share/${link.linkType}/${link.linkCode}`}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ExternalLink className="mr-2 h-4 w-4" />
															Test link
														</a>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleCopyLink(link.linkCode, link.linkType)
														}
													>
														<Share2 className="mr-2 h-4 w-4" />
														Share
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleDeleteShareLink(link.id, link.linkCode)
														}
														className="text-destructive"
														disabled={isDeletingLink}
													>
														{isDeletingLink ? (
															<Loader2 className="animate-spin mr-2 h-4 w-4" />
														) : (
															<Trash2 className="mr-2 h-4 w-4" />
														)}
														Delete link
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

			{data && data.data?.length > 0 && (
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span className="whitespace-nowrap">Items per page:</span>
						<select
							value={itemsPerPage}
							onChange={(e) => {
								setItemsPerPage(Number(e.target.value));
								setCurrentPage(1); // Reset to first page when changing items per page
							}}
							className="border rounded px-2 py-1 h-8"
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
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
