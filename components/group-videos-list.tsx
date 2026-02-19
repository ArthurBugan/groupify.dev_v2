"use client";

import {
	AlignJustify,
	ChevronLeft,
	ChevronRight,
	Clock,
	Eye,
	LayoutGrid,
	List,
	Play,
	Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGroupVideos } from "@/hooks/useQuery/useGroupVideos";
import { cn } from "@/lib/utils";

interface GroupVideosListProps {
	groupId: string;
}

function formatDuration(seconds?: number): string {
	if (!seconds) return "";
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	}
	return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatViewCount(count?: number): string {
	if (!count) return "0";
	if (count >= 1000000) {
		return `${(count / 1000000).toFixed(1)}M`;
	}
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}K`;
	}
	return `${count}`;
}

function formatPublishedDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInHours = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60 * 60),
	);

	if (diffInHours < 1) return "now";
	if (diffInHours < 24) return `${diffInHours}h`;
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays}d`;
	if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w`;
	return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function GroupVideosList({ groupId }: GroupVideosListProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [sortOrder, setSortOrder] = useState<"recent" | "views" | "oldest">(
		"recent",
	);
	const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");

	// Debounce search input
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1); // Reset to page 1 on new search
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const {
		data: videosData,
		isLoading,
		error,
	} = useGroupVideos(groupId, {
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearch || undefined,
	});

	const allVideos = videosData?.data || [];
	const pagination = videosData?.pagination;

	// Client-side filtering (only if not using server-side search)
	const filteredVideos = useMemo(() => {
		if (!searchQuery.trim()) return allVideos;

		const query = searchQuery.toLowerCase();
		return allVideos.filter((video) =>
			video.title.toLowerCase().includes(query),
		);
	}, [allVideos, searchQuery]);

	// Client-side sorting
	const sortedVideos = useMemo(() => {
		const sorted = [...filteredVideos];
		switch (sortOrder) {
			case "recent":
				sorted.sort(
					(a, b) =>
						new Date(b.publishedAt).getTime() -
						new Date(a.publishedAt).getTime(),
				);
				break;
			case "oldest":
				sorted.sort(
					(a, b) =>
						new Date(a.publishedAt).getTime() -
						new Date(b.publishedAt).getTime(),
				);
				break;
			case "views":
				sorted.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
				break;
		}
		return sorted;
	}, [filteredVideos, sortOrder]);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemsPerPage]);

	// Load settings from localStorage on component mount
	useEffect(() => {
		const savedVideoView = localStorage.getItem("groupVideosViewMode");
		if (savedVideoView) {
			setViewMode(savedVideoView as "grid" | "list" | "compact");
		}
		const savedItemsPerPage = localStorage.getItem("groupVideosItemsPerPage");
		if (savedItemsPerPage) {
			setItemsPerPage(Number(savedItemsPerPage));
		}
	}, []);

	// Save view mode preference
	const handleViewModeChange = (mode: "grid" | "list" | "compact") => {
		setViewMode(mode);
		localStorage.setItem("groupVideosViewMode", mode);
	};

	const handleItemsPerPageChange = (value: string) => {
		const num = Number(value);
		setItemsPerPage(num);
		localStorage.setItem("groupVideosItemsPerPage", value);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top of video list
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const totalPages = pagination?.totalPages || 1;
	const totalVideos = pagination?.total || 0;
	const hasFilters = searchQuery.trim() !== "";

	const renderPagination = () => {
		// Don't show pagination if we're filtering (since filtering is client-side on current page)
		if (hasFilters || totalPages <= 1) return null;

		const getPageNumbers = () => {
			const pages: (number | string)[] = [];
			const maxVisible = 5;

			if (totalPages <= maxVisible) {
				for (let i = 1; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				if (currentPage > 3) pages.push("...");

				const start = Math.max(2, currentPage - 1);
				const end = Math.min(totalPages - 1, currentPage + 1);
				for (let i = start; i <= end; i++) pages.push(i);

				if (currentPage < totalPages - 2) pages.push("...");
				pages.push(totalPages);
			}
			return pages;
		};

		return (
			<div className="flex items-center justify-between pt-4 border-t">
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>Show:</span>
					<Select
						value={String(itemsPerPage)}
						onValueChange={handleItemsPerPageChange}
					>
						<SelectTrigger className="h-7 w-16 text-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="6">6</SelectItem>
							<SelectItem value="12">12</SelectItem>
							<SelectItem value="24">24</SelectItem>
							<SelectItem value="48">48</SelectItem>
						</SelectContent>
					</Select>
					<span>per page</span>
				</div>

				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						className="h-7 w-7"
						onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
						disabled={currentPage === 1 || isLoading}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{getPageNumbers().map((page) =>
						page === "..." ? (
							<span key="ellipsis" className="px-2 text-muted-foreground">
								...
							</span>
						) : (
							<Button
								key={`page-${page}`}
								variant={currentPage === page ? "default" : "outline"}
								size="icon"
								className={cn(
									"h-7 w-7 text-xs",
									currentPage === page &&
										"bg-gradient-to-r from-red-500 to-pink-500",
								)}
								onClick={() => handlePageChange(page as number)}
								disabled={isLoading}
							>
								{page}
							</Button>
						),
					)}

					<Button
						variant="outline"
						size="icon"
						className="h-7 w-7"
						onClick={() =>
							handlePageChange(Math.min(totalPages, currentPage + 1))
						}
						disabled={currentPage === totalPages || isLoading}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="text-xs text-muted-foreground">
					Page {currentPage} of {totalPages}
				</div>
			</div>
		);
	};

	const renderGridView = () => (
		<div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
			{sortedVideos.map((video) => (
				<a
					key={video.id}
					href={video.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group block"
				>
					<div className="space-y-1">
						<div className="relative aspect-video rounded overflow-hidden bg-muted">
							<img
								src={video.thumbnail}
								alt={video.title}
								className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
							/>
							{video.durationSeconds && (
								<div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[10px] px-1 py-0 rounded">
									{formatDuration(video.durationSeconds)}
								</div>
							)}
							<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<Play className="h-6 w-6 text-white fill-white" />
							</div>
						</div>
						<h3 className="text-xs font-medium line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
							{video.title}
						</h3>
						<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
							<span className="flex items-center gap-0.5">
								<Eye className="h-2.5 w-2.5" />
								{formatViewCount(video.viewsCount)}
							</span>
							<span>•</span>
							<span>{formatPublishedDate(video.publishedAt)}</span>
						</div>
					</div>
				</a>
			))}
		</div>
	);

	const renderListView = () => (
		<div className="space-y-2">
			{sortedVideos.map((video) => (
				<a
					key={video.id}
					href={video.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex items-center gap-3 p-2 border rounded-lg hover:bg-accent/50 transition-colors"
				>
					<div className="relative w-32 h-18 shrink-0 rounded overflow-hidden bg-muted">
						<img
							src={video.thumbnail}
							alt={video.title}
							className="object-cover w-full h-full"
						/>
						{video.durationSeconds && (
							<div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[9px] px-1 rounded">
								{formatDuration(video.durationSeconds)}
							</div>
						)}
						<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<Play className="h-5 w-5 text-white fill-white" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-sm font-medium line-clamp-2 group-hover:text-red-600 transition-colors">
							{video.title}
						</h3>
						<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
							<span className="flex items-center gap-1">
								<Eye className="h-3 w-3" />
								{formatViewCount(video.viewsCount)}
							</span>
							<span>•</span>
							<span className="flex items-center gap-1">
								<Clock className="h-3 w-3" />
								{formatPublishedDate(video.publishedAt)}
							</span>
						</div>
					</div>
				</a>
			))}
		</div>
	);

	const renderCompactView = () => (
		<div className="space-y-1">
			{sortedVideos.map((video) => (
				<a
					key={video.id}
					href={video.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex items-center gap-2 p-1.5 border rounded hover:bg-accent/50 transition-colors"
				>
					<div className="relative w-16 h-9 shrink-0 rounded overflow-hidden bg-muted">
						<img
							src={video.thumbnail}
							alt={video.title}
							className="object-cover w-full h-full"
						/>
						<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<Play className="h-3 w-3 text-white fill-white" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-xs font-medium line-clamp-1 group-hover:text-red-600 transition-colors">
							{video.title}
						</h3>
						<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
							<span>{formatViewCount(video.viewsCount)}</span>
							<span>•</span>
							<span>{formatPublishedDate(video.publishedAt)}</span>
						</div>
					</div>
				</a>
			))}
		</div>
	);

	if (isLoading) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-base flex items-center gap-2">
						<Play className="h-4 w-4 text-red-500" />
						Latest Videos
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{["a", "b", "c", "d", "e", "f"].map((key) => (
							<div key={`skeleton-${key}`} className="animate-pulse space-y-2">
								<div className="aspect-video bg-muted rounded-lg" />
								<div className="h-3 bg-muted rounded w-full" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-base flex items-center gap-2">
						<Play className="h-4 w-4 text-red-500" />
						Latest Videos
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="text-center py-4 text-muted-foreground text-sm">
						Failed to load videos
					</div>
				</CardContent>
			</Card>
		);
	}

	if (allVideos.length === 0) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-base flex items-center gap-2">
						<Play className="h-4 w-4 text-red-500" />
						Latest Videos
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="text-center py-4 text-muted-foreground text-sm">
						No videos found
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
					<CardTitle className="text-base flex items-center gap-2">
						<Play className="h-4 w-4 text-red-500" />
						Latest Videos
						<Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
							{hasFilters
								? `${sortedVideos.length} of ${totalVideos}`
								: totalVideos}
						</Badge>
						{hasFilters && (
							<span className="text-xs text-muted-foreground font-normal">
								(filtered)
							</span>
						)}
					</CardTitle>

					<div className="flex items-center gap-2">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
							<Input
								placeholder="Search videos..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-7 h-8 text-sm w-40 sm:w-48"
							/>
						</div>

						{/* Sort */}
						<Select
							value={sortOrder}
							onValueChange={(v) => setSortOrder(v as typeof sortOrder)}
						>
							<SelectTrigger className="h-8 w-28 text-xs">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="recent">Recent</SelectItem>
								<SelectItem value="oldest">Oldest</SelectItem>
								<SelectItem value="views">Views</SelectItem>
							</SelectContent>
						</Select>

						{/* View Mode Toggle */}
						<div className="flex border rounded-md overflow-hidden">
							<Button
								variant={viewMode === "grid" ? "secondary" : "ghost"}
								size="icon"
								className="h-8 w-8 rounded-none"
								onClick={() => handleViewModeChange("grid")}
							>
								<LayoutGrid className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant={viewMode === "list" ? "secondary" : "ghost"}
								size="icon"
								className="h-8 w-8 rounded-none"
								onClick={() => handleViewModeChange("list")}
							>
								<List className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant={viewMode === "compact" ? "secondary" : "ghost"}
								size="icon"
								className="h-8 w-8 rounded-none"
								onClick={() => handleViewModeChange("compact")}
							>
								<AlignJustify className="h-3.5 w-3.5" />
							</Button>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0 space-y-4">
				{sortedVideos.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<p>No videos match your search</p>
					</div>
				) : (
					<>
						{viewMode === "grid" && renderGridView()}
						{viewMode === "list" && renderListView()}
						{viewMode === "compact" && renderCompactView()}
						{renderPagination()}
					</>
				)}
			</CardContent>
		</Card>
	);
}
