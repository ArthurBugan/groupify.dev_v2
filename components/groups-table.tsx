"use client";

import { Link } from "@tanstack/react-router";
import {
	ArrowDown,
	ArrowUp,
	ChevronDown,
	ChevronRight,
	GripVertical,
	MoreHorizontal,
	Pencil,
	Plus,
	Trash2,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconViewer } from "@/components/icon-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
import {
	type Group as ApiGroup,
	useDeleteGroup,
	useGroups,
	useUpdateGroupDisplayOrder,
} from "@/hooks/useQuery/useGroups";
import { cn } from "@/lib/utils";

interface TableGroup {
	id: string;
	name: string;
	channelCount: number;
	category: string;
	createdAt: string;
	icon: string;
	parentId: string | null;
	expanded: boolean;
	level: number;
	order: number;
}

export function GroupsTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	const { data: apiGroups, isLoading } = useGroups({
		page: currentPage,
		limit: itemsPerPage,
		search: debouncedSearchTerm,
	});

	const updateDisplayOrder = useUpdateGroupDisplayOrder();
	const deleteGroup = useDeleteGroup();

	// Transform API groups to table format
	const transformApiGroups = (apiGroups?: ApiGroup[]): TableGroup[] => {
		if (!apiGroups) return [];

		return apiGroups?.map((group, index) => ({
			id: group.id,
			name: group.name,
			channelCount: group.channelCount || 0,
			category: group.category || "General", // Default category, can be enhanced later
			createdAt: new Date(group.createdAt).toLocaleDateString(),
			icon: group.icon || "FolderKanban",
			parentId: group.parentId || null, // Flat structure for now, can add hierarchical support later
			expanded: false,
			level: group.nestingLevel || 0,
			order: group.displayOrder || index,
		}));
	};

	const initialGroups: TableGroup[] = transformApiGroups(apiGroups?.data);

	const [groups, setGroups] = useState(initialGroups);
	const [draggedGroup, setDraggedGroup] = useState<TableGroup | null>(null);
	const [dragOverGroup, setDragOverGroup] = useState<string | null>(null);
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	// Update groups when API data changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <cant apply the rule as the transformApiGroups changes on every render>
	useEffect(() => {
		if (apiGroups?.data) {
			console.log("apiGroups?.data", apiGroups?.data);
			const newGroups = transformApiGroups(apiGroups.data);
			const savedOrder = localStorage.getItem("groupsOrder");

			if (savedOrder) {
				try {
					const orderData = JSON.parse(savedOrder);
					setGroups(
						newGroups.map((group) => ({
							...group,
							order: orderData[group.id] ?? group.order,
						})),
					);
				} catch (error) {
					console.error("Error loading groups order:", error);
					setGroups(newGroups);
				}
			} else {
				setGroups(newGroups);
			}
		}
	}, [apiGroups?.data]);

	// Save groups order to localStorage
	useEffect(() => {
		const savedOrder = localStorage.getItem("groupsOrder");
		if (savedOrder) {
			try {
				const orderData = JSON.parse(savedOrder);
				setGroups((prevGroups) => {
					return prevGroups.map((group) => ({
						...group,
						order: orderData[group.id] ?? group.order,
					}));
				});
			} catch (error) {
				console.error("Error loading groups order:", error);
			}
		}
	}, []);

	// Toggle expand/collapse for a group
	const toggleExpand = (id: string) => {
		setGroups(
			groups.map((group) =>
				group.id === id ? { ...group, expanded: !group.expanded } : group,
			),
		);
	};

	// Note: isVisible logic is now handled within getSortedGroups function
	// This function is kept for reference but not used in rendering
	const isVisible = (group: TableGroup) => {
		if (group.parentId === null) return true;
		if (debouncedSearchTerm) return true;

		// If parent doesn't exist in current dataset, show the group as a root-level item
		const parent = groups.find((g) => g.id === group.parentId);
		if (!parent) return true; // Parent not in current dataset, show as root

		return parent?.expanded;
	};

	// Get sorted groups
	// Handles pagination scenarios where parent and child groups might be split across pages
	const getSortedGroups = () => {
		const result: TableGroup[] = [];
		const processedGroups = new Set<string>();

		// First, add all groups that don't have parents in the current dataset
		// This includes actual root groups and orphaned child groups whose parents are on other pages
		const groupsWithoutParentsInDataset = groups.filter((group) => {
			if (group.parentId === null) return true;
			// Check if parent exists in current dataset
			const parentExists = groups.some((g) => g.id === group.parentId);
			return !parentExists;
		});

		// Sort groups without parents by order
		const sortedRootGroups = groupsWithoutParentsInDataset.sort(
			(a, b) => a.order - b.order,
		);

		const addGroupAndChildren = (group: TableGroup) => {
			if (processedGroups.has(group.id)) return;

			result.push(group);
			processedGroups.add(group.id);

			// Add children if expanded (only if they exist in current dataset)
			if (group.expanded) {
				const children = groups
					.filter((g) => g.parentId === group.id)
					.sort((a, b) => a.order - b.order);
				children.forEach(addGroupAndChildren);
			}
		};

		sortedRootGroups.forEach(addGroupAndChildren);
		return result;
	};

	// Drag and drop handlers
	const handleDragStart = (e: React.DragEvent, group: TableGroup) => {
		setDraggedGroup(group);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleDragOver = (e: React.DragEvent, group: TableGroup) => {
		e.preventDefault();
		if (
			draggedGroup &&
			draggedGroup.id !== group.id &&
			draggedGroup.parentId === group.parentId
		) {
			setDragOverGroup(group.id);
			e.dataTransfer.dropEffect = "move";
		}
	};

	const handleDragLeave = () => {
		setDragOverGroup(null);
	};

	const handleDrop = (e: React.DragEvent, targetGroup: TableGroup) => {
		e.preventDefault();
		setDragOverGroup(null);

		if (!draggedGroup || draggedGroup.id === targetGroup.id) return;

		// Only allow reordering within the same parent level
		if (draggedGroup.parentId !== targetGroup.parentId) {
			toast.error("Cannot move group", {
				description: "Groups can only be reordered within the same level.",
			});
			return;
		}

		// Additional safety check: ensure both groups have valid parent relationships in current dataset
		if (
			draggedGroup.parentId &&
			!groups.some((g) => g.id === draggedGroup.parentId)
		) {
			toast.error("Cannot move group", {
				description: "Parent group not available in current view.",
			});
			return;
		}
		if (
			targetGroup.parentId &&
			!groups.some((g) => g.id === targetGroup.parentId)
		) {
			toast.error("Cannot move group", {
				description: "Target parent group not available in current view.",
			});
			return;
		}

		const newGroups = [...groups];
		const draggedIndex = newGroups.findIndex((g) => g.id === draggedGroup.id);

		// Update order values
		const siblingGroups = newGroups.filter(
			(g) => g.parentId === draggedGroup.parentId,
		);
		const sortedSiblings = siblingGroups.sort((a, b) => a.order - b.order);

		const draggedSiblingIndex = sortedSiblings.findIndex(
			(g) => g.id === draggedGroup.id,
		);
		const targetSiblingIndex = sortedSiblings.findIndex(
			(g) => g.id === targetGroup.id,
		);

		if (draggedSiblingIndex < targetSiblingIndex) {
			// Moving down
			for (let i = draggedSiblingIndex + 1; i <= targetSiblingIndex; i++) {
				const group = sortedSiblings[i];
				const groupIndex = newGroups.findIndex((g) => g.id === group.id);
				newGroups[groupIndex].order = i - 1;
			}
			newGroups[draggedIndex].order = targetSiblingIndex;
		} else {
			// Moving up
			for (let i = targetSiblingIndex; i < draggedSiblingIndex; i++) {
				const group = sortedSiblings[i];
				const groupIndex = newGroups.findIndex((g) => g.id === group.id);
				newGroups[groupIndex].order = i + 1;
			}
			newGroups[draggedIndex].order = targetSiblingIndex;
		}

		setGroups(newGroups);

		// Save order to localStorage
		const orderData: Record<string, number> = {};
		newGroups.forEach((group) => {
			orderData[group.id] = group.order;
		});
		localStorage.setItem("groupsOrder", JSON.stringify(orderData));

		// Update display order via API
		updateDisplayOrder.mutate(
			{ groupId: draggedGroup.id, displayOrder: targetSiblingIndex },
			{
				onSuccess: () => {
					toast.success("Groups reordered", {
						description: "The group order has been updated",
					});
				},
				onError: (error) => {
					toast.error("Failed to reorder groups", {
						description: "Please try again later",
					});
					console.error("Error updating group display order:", error);
				},
			},
		);
	};

	const handleDragEnd = () => {
		setDraggedGroup(null);
		setDragOverGroup(null);
	};

	const handleDeleteGroup = (groupId: string, groupName: string) => {
		if (
			confirm(
				`Are you sure you want to delete "${groupName}"? This action cannot be undone.`,
			)
		) {
			deleteGroup.mutate(groupId, {
				onSuccess: () => {
					toast.success("Group deleted successfully", {
						description: `"${groupName}" has been deleted.`,
					});
				},
				onError: (error) => {
					toast.error("Failed to delete group", {
						description: "Please try again later.",
					});
					console.error("Error deleting group:", error);
				},
			});
		}
	};

	const moveGroup = (group: TableGroup, direction: "up" | "down") => {
		const siblingGroups = groups
			.filter((g) => g.parentId === group.parentId)
			.sort((a, b) => a.order - b.order);
		const currentIndex = siblingGroups.findIndex((g) => g.id === group.id);

		if (
			(direction === "up" && currentIndex === 0) ||
			(direction === "down" && currentIndex === siblingGroups.length - 1)
		) {
			return;
		}

		const newGroups = [...groups];
		const targetIndex =
			direction === "up" ? currentIndex - 1 : currentIndex + 1;
		const targetGroup = siblingGroups[targetIndex];

		// Swap order values
		const groupIndex = newGroups.findIndex((g) => g.id === group.id);
		const targetGroupIndex = newGroups.findIndex(
			(g) => g.id === targetGroup.id,
		);

		const tempOrder = newGroups[groupIndex].order;
		newGroups[groupIndex].order = newGroups[targetGroupIndex].order;
		newGroups[targetGroupIndex].order = tempOrder;

		setGroups(newGroups);

		// Save order to localStorage
		const orderData: Record<string, number> = {};
		newGroups.forEach((g) => {
			orderData[g.id] = g.order;
		});
		localStorage.setItem("groupsOrder", JSON.stringify(orderData));

		// Update display order via API
		updateDisplayOrder.mutate(
			{ groupId: group.id, displayOrder: newGroups[groupIndex].order },
			{
				onSuccess: () => {
					toast.success("Group moved", {
						description: `${group.name} moved ${direction}`,
					});
				},
				onError: (error) => {
					toast.error("Failed to move group", {
						description: "Please try again later",
					});
					console.error("Error updating group display order:", error);
				},
			},
		);
	};

	const getPaginationPages = (): (number | string)[] => {
		if (!apiGroups?.data) return [];

		const totalPages = Math.ceil(apiGroups.pagination.total / itemsPerPage);
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

	const sortedGroups = getSortedGroups();

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Search groups..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]"></TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Channels</TableHead>
							<TableHead>Created</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={6} className="h-24 text-center">
									<div className="flex flex-col items-center justify-center space-y-2">
										<p className="text-sm text-muted-foreground">
											Loading groups...
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : sortedGroups.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="h-24 text-center">
									<div className="flex flex-col items-center justify-center space-y-2">
										{debouncedSearchTerm ? (
											<>
												<p className="text-sm text-muted-foreground">
													No groups match "{debouncedSearchTerm}"
												</p>
												<p className="text-xs text-muted-foreground">
													Try adjusting your search terms
												</p>
											</>
										) : (
											<p className="text-sm text-muted-foreground">
												No groups found
											</p>
										)}
									</div>
								</TableCell>
							</TableRow>
						) : (
							sortedGroups.filter(isVisible).map((group) => {
								const siblingGroups = groups
									.filter((g) => g.parentId === group.parentId)
									.sort((a, b) => a.order - b.order);
								const currentIndex = siblingGroups.findIndex(
									(g) => g.id === group.id,
								);
								const canMoveUp = currentIndex > 0;
								const canMoveDown = currentIndex < siblingGroups.length - 1;

								return (
									<TableRow
										key={group.id}
										className={cn(
											"group",
											dragOverGroup === group.id && "bg-accent/50",
											draggedGroup?.id === group.id && "opacity-50",
										)}
										draggable={!debouncedSearchTerm}
										onDragStart={(e) => handleDragStart(e, group)}
										onDragOver={(e) => handleDragOver(e, group)}
										onDragLeave={handleDragLeave}
										onDrop={(e) => handleDrop(e, group)}
										onDragEnd={handleDragEnd}
									>
										<TableCell>
											{!debouncedSearchTerm && (
												<div className="flex items-center gap-1">
													<GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
												</div>
											)}
										</TableCell>
										<TableCell>
											<div
												className="flex items-center gap-2"
												style={{
													paddingLeft: `${group.parentId && !groups.some((g) => g.id === group.parentId) ? 0 : group.level * 1.5}rem`,
												}}
											>
												{groups.some((g) => g.parentId === group.id) ? (
													<Button
														variant="ghost"
														size="icon"
														className="h-6 w-6 p-0"
														onClick={() => toggleExpand(group.id)}
													>
														{group.expanded ? (
															<ChevronDown className="h-4 w-4" />
														) : (
															<ChevronRight className="h-4 w-4" />
														)}
													</Button>
												) : (
													<div className="w-6"></div> // Spacer for alignment
												)}

												<IconViewer
													icon={group.icon}
													className="h-4 w-4 mr-4 text-muted-foreground"
												/>
												<Link
													to={`/dashboard/groups/$id`}
													params={{ id: group.id }}
													className="font-medium hover:underline"
												>
													{group.name}
													{group.parentId &&
														!groups.some((g) => g.id === group.parentId) && (
															<span className="ml-2 text-xs text-muted-foreground">
																(subgroup)
															</span>
														)}
												</Link>

												{/* Add subgroup button */}
												<Button
													variant="ghost"
													size="icon"
													className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
													asChild
												>
													<Link
														to="/dashboard/groups/new"
														search={{ parentId: group.id }}
													>
														<Plus className="h-3 w-3" />
														<span className="sr-only">Add subgroup</span>
													</Link>
												</Button>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline">{group.category}</Badge>
										</TableCell>
										<TableCell>{group.channelCount}</TableCell>
										<TableCell>{group.createdAt}</TableCell>
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
														<Link
															to={`/dashboard/groups/$id`}
															params={{ id: group.id }}
														>
															View details
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															to={`/dashboard/groups/$id/edit`}
															params={{ id: group.id }}
														>
															<Pencil className="mr-2 h-4 w-4" />
															Edit
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															to="/dashboard/groups/new"
															search={{ parentId: group.id }}
														>
															<Plus className="mr-2 h-4 w-4" />
															Add Subgroup
														</Link>
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() => moveGroup(group, "up")}
														disabled={!canMoveUp || debouncedSearchTerm !== ""}
													>
														<ArrowUp className="mr-2 h-4 w-4" />
														Move Up
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => moveGroup(group, "down")}
														disabled={
															!canMoveDown || debouncedSearchTerm !== ""
														}
													>
														<ArrowDown className="mr-2 h-4 w-4" />
														Move Down
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														className="text-destructive"
														onClick={() =>
															handleDeleteGroup(group.id, group.name)
														}
														disabled={deleteGroup.isPending}
													>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>

			{apiGroups?.data && apiGroups.pagination.total > 0 && (
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>Items per page:</span>
						<Select
							value={itemsPerPage.toString()}
							onValueChange={(value) => {
								setItemsPerPage(Number(value));
								setCurrentPage(1); // Reset to first page when changing items per page
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
											Math.min(
												prev + 1,
												Math.ceil(apiGroups.pagination.total / itemsPerPage),
											),
										)
									}
									isActive={
										currentPage >=
										Math.ceil(apiGroups.pagination.total / itemsPerPage)
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
