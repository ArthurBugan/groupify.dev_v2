import { createFileRoute } from "@tanstack/react-router";
import { Copy, Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import { IconViewer } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useCopyShelf, useGroupShelves } from "@/hooks/useQuery/useGroupShelf";

export const Route = createFileRoute("/_app/dashboard/groupshelf/")({
	component: GroupShelfPage,
});

function GroupShelfPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	const { data, isLoading, error } = useGroupShelves({
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearchTerm || undefined,
	});
	const copyShelf = useCopyShelf();

	const handleCopy = (shelfId: string, shelfName: string) => {
		copyShelf.mutate(shelfId, {
			onSuccess: () => {
				toast.success("Copied", {
					description: `"${shelfName}" has been copied.`,
				});
			},
		});
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(e.target.value);
			setCurrentPage(1);
		}, 300);
		return () => clearTimeout(timer);
	};

	const getPaginationPages = (): (number | string)[] => {
		if (!data?.pagination) return [];

		const totalPages = data.pagination.totalPages;
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			if (currentPage > 3) {
				pages.push("...");
			}

			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (currentPage < totalPages - 2) {
				pages.push("...");
			}

			pages.push(totalPages);
		}

		return pages;
	};

	if (error) {
		return (
			<div className="space-y-6">
				<DashboardHeader
					title="Groupshelf"
					description="Copy groups from other users"
				/>
				<Card>
					<CardHeader>
						<CardTitle className="text-red-600">
							Error Loading Groupshelf
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							{error.message || "Failed to load groupshelf. Please try again."}
						</p>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<DashboardHeader
				title="Groupshelf"
				description="Copy groups from other users"
			/>
			<Card>
				<CardContent className="pt-6">
					<div className="flex items-center gap-2 mb-4">
						<Input
							placeholder="Search groupshelf..."
							value={searchTerm}
							onChange={handleSearchChange}
							className="max-w-sm"
						/>
					</div>
					<div className="rounded-md border bg-card">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]"></TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Created</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoading ? (
									<TableRow>
										<TableCell colSpan={5} className="h-24 text-center">
											<div className="flex flex-col items-center justify-center space-y-2">
												<Loader2 className="h-6 w-6 animate-spin" />
												<p className="text-sm text-muted-foreground">
													Loading groupshelf...
												</p>
											</div>
										</TableCell>
									</TableRow>
								) : data?.data.length === 0 ? (
									<TableRow>
										<TableCell colSpan={5} className="h-24 text-center">
											<div className="flex flex-col items-center justify-center space-y-2">
												{debouncedSearchTerm ? (
													<>
														<p className="text-sm text-muted-foreground">
															No groupshelf match "{debouncedSearchTerm}"
														</p>
														<p className="text-xs text-muted-foreground">
															Try adjusting your search terms
														</p>
													</>
												) : (
													<p className="text-sm text-muted-foreground">
														No groupshelf found
													</p>
												)}
											</div>
										</TableCell>
									</TableRow>
								) : (
									data?.data.map((shelf) => (
										<TableRow key={shelf.id}>
											<TableCell>
												<IconViewer
													icon={shelf.icon || "Library"}
													className="h-5 w-5 text-muted-foreground"
												/>
											</TableCell>
											<TableCell className="font-medium">
												{shelf.name}
											</TableCell>
											<TableCell>
												{shelf.description ? (
													<span className="text-muted-foreground">
														{shelf.description}
													</span>
												) : (
													<span className="text-muted-foreground italic">
														No description
													</span>
												)}
											</TableCell>
											<TableCell>
												{new Date(shelf.createdAt).toLocaleDateString()}
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
															onClick={() => handleCopy(shelf.id, shelf.name)}
															disabled={copyShelf.isPending}
														>
															<Copy className="mr-2 h-4 w-4" />
															Copy
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

					{data?.pagination && data.pagination.total > 0 && (
						<div className="flex items-center justify-between mt-4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>Items per page:</span>
								<Select
									value={itemsPerPage.toString()}
									onValueChange={(value) => {
										setItemsPerPage(Number(value));
										setCurrentPage(1);
									}}
								>
									<SelectTrigger className="w-[70px] h-8">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="10">10</SelectItem>
										<SelectItem value="25">25</SelectItem>
										<SelectItem value="50">50</SelectItem>
										<SelectItem value="100">100</SelectItem>
									</SelectContent>
								</Select>
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
													Math.min(prev + 1, data.pagination.totalPages),
												)
											}
											isActive={currentPage >= data.pagination.totalPages}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
