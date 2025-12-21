"use client";

import { Link } from "@tanstack/react-router";
import {
    ExternalLink,
    FolderKanban,
    Loader2,
    MoreHorizontal,
    Trash2,
    Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import { useAllAnimes } from "@/hooks/useQuery/useAnimes";
import { IconViewer } from "./icon-picker";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { useDeleteChannelMutation, useUpdateChannel } from "@/hooks/useQuery/useChannels";

export function AllAnimesTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState("");

    const { mutate: updateChannel } = useUpdateChannel();
    const { mutate: deleteAnime, isPending: isDeletingAnime } = useDeleteChannelMutation();
    const { data: groupsData } = useGroups({limit: 100});
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Fetch animes with pagination
    const { data: animesData, isLoading, error } = useAllAnimes({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchTerm || undefined,
    });

    const data = animesData?.data || [];
    const pagination = animesData?.pagination;

    // Handle delete anime
    const handleDeleteAnime = (animeId: string) => {
        deleteAnime({ channelId: animeId });
    };

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    const handleAssignGroup = (
        animeId: string,
        groupId: string,
        name: string,
        thumbnail: string | undefined,
        url: string | undefined,
    ) => {
        updateChannel({
            id: animeId,
            data: { id: animeId, groupId, name, thumbnail, url, contentType: 'anime' },
        });
    };

    const getPaginationPages = (): (number | string)[] => {
        const totalPages = Math.ceil((pagination?.total || 0) / itemsPerPage);
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (!totalPages) return [];
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
                    placeholder="Search animes..."
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
                        ) : !animesData?.data || animesData.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No animes found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            animesData.data.map((anime) => (
                                <TableRow key={anime.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={anime.thumbnail || "/placeholder.svg"}
                                                    alt={anime.name}
                                                />
                                                <AvatarFallback>
                                                    <Youtube className="h-10 w-10" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{anime.name}</p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {`https://crunchyroll.com/series/${anime.id}`}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {anime.groupId ? (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <IconViewer
                                                        icon={anime.groupIcon || "/placeholder.svg"}
                                                    />
                                                    <AvatarFallback>
                                                        <FolderKanban className="h-3 w-3" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Link
                                                    to={`/dashboard/groups/$id`}
                                                    params={{ id: anime.groupId }}
                                                    className="hover:underline"
                                                >
                                                    {anime.groupName}
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
                                                value={anime.groupId || ""}
                                                onValueChange={(value) =>
                                                    handleAssignGroup(
                                                        anime.id,
                                                        value,
                                                        anime.name,
                                                        anime.thumbnail ?? "",
                                                        anime.id,
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
                                                        href={`https://crunchyroll.com/series/${anime.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Visit anime
                                                    </a>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        to={`/dashboard/animes/change-group/$id`}
                                                        params={{ id: anime.id }}
                                                    >
                                                        <FolderKanban className="mr-2 h-4 w-4" />
                                                        Change group
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteAnime(anime.id)}
                                                    className="text-destructive"
                                                    disabled={isDeletingAnime}
                                                >
                                                    {isDeletingAnime ? (
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {data && data.length > 0 && (
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
                                                Math.ceil((pagination?.total || 1) / itemsPerPage),
                                            ),
                                        )
                                    }
                                    isActive={
                                        currentPage >=
                                        Math.ceil((pagination?.total || 1) / itemsPerPage)
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
