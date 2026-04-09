"use client";

import { Link } from "@tanstack/react-router";
import {
	ExternalLink,
	FolderKanban,
	Globe,
	Loader2,
	MoreHorizontal,
	Pencil,
	Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
	useWebsites,
	useDeleteWebsiteMutation,
} from "@/hooks/useQuery/useWebsites";
import { getChannelUrl } from "@/lib/utils";

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
			} catch (_) {}
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

export function AllWebsitesTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [adIndices, setAdIndices] = useState<number[]>([]);

	const { data, isLoading, error } = useWebsites({
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearchTerm || undefined,
	});

	const { mutate: deleteWebsite, isPending: isDeletingWebsite } =
		useDeleteWebsiteMutation();

	const handleDeleteWebsite = (websiteId: string) => {
		deleteWebsite({ websiteId });
	};

	const totalPages = data?.pagination?.total
		? Math.ceil(data.pagination.total / itemsPerPage)
		: 1;

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			setCurrentPage(1);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (data?.pagination?.total) {
			const total = data.pagination.total;
			const adsCount = Math.floor(total / itemsPerPage);
			const indices: number[] = [];
			for (let i = 1; i <= adsCount; i++) {
				indices.push(i * itemsPerPage);
			}
			setAdIndices(indices);
		}
	}, [data?.pagination?.total, itemsPerPage]);

	if (error) {
		return (
			<div className="text-center py-4 text-red-500">
				Error loading websites.
			</div>
		);
	}

	const websites = data?.data || [];
	const shouldShowAd = adIndices.includes(currentPage * itemsPerPage);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Search websites..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
			</div>

			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Website</TableHead>
							<TableHead>URL</TableHead>
							<TableHead>Group</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									<Loader2 className="h-6 w-6 animate-spin mx-auto" />
								</TableCell>
							</TableRow>
						) : websites.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									No websites found.
								</TableCell>
							</TableRow>
						) : (
							websites.map((website, index) => (
								<>
									<TableRow key={website.id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage
														src={website.thumbnail || "/placeholder.svg"}
														alt={website.name}
													/>
													<AvatarFallback>
														<Globe className="h-5 w-5" />
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{website.name}</p>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<a
												href={getChannelUrl("website", website.url)}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-muted-foreground hover:underline"
											>
												{website.url}
											</a>
										</TableCell>
										<TableCell>{website.groupName || "-"}</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Open menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem asChild>
														<a
															href={getChannelUrl("website", website.url)}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ExternalLink className="mr-2 h-4 w-4" />
															Visit website
														</a>
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-destructive"
														onClick={() => handleDeleteWebsite(website.id)}
														disabled={isDeletingWebsite}
													>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									{index === itemsPerPage - 1 && shouldShowAd && (
										<AdRow colSpan={4} />
									)}
								</>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage((p) => Math.max(1, p - 1));
							}}
							className={currentPage === 1 ? "pointer-events-none" : ""}
						/>
					</PaginationItem>
					{currentPage > 2 && (
						<>
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setCurrentPage(1);
									}}
								>
									1
								</PaginationLink>
							</PaginationItem>
							{currentPage > 3 && <PaginationEllipsis />}
						</>
					)}
					{[-1, 0, 1].map((offset) => {
						const page = currentPage + offset;
						if (page > 0 && page <= totalPages) {
							return (
								<PaginationItem key={page}>
									<PaginationLink
										href="#"
										onClick={(e) => {
											e.preventDefault();
											setCurrentPage(page);
										}}
										className={page === currentPage ? "" : ""}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							);
						}
						return null;
					})}
					{currentPage < totalPages - 1 && totalPages > 2 && (
						<>
							{currentPage < totalPages - 2 && <PaginationEllipsis />}
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setCurrentPage(totalPages);
									}}
								>
									{totalPages}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage((p) => Math.min(totalPages, p + 1));
							}}
							className={
								currentPage === totalPages ? "pointer-events-none" : ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
