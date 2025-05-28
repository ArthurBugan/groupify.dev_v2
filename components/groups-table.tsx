"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  Plus,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface Group {
  id: string
  name: string
  channelCount: number
  category: string
  createdAt: string
  icon: string
  parentId: string | null
  expanded: boolean
  level: number
  order: number
}

export function GroupsTable() {
  const { toast } = useToast()

  // Mock data - in a real app, this would come from your database
  const initialGroups: Group[] = [
    {
      id: "1",
      name: "Gaming Channels",
      channelCount: 8,
      category: "Gaming",
      createdAt: "2023-05-12",
      icon: "Gamepad2",
      parentId: null,
      expanded: true,
      level: 0,
      order: 0,
    },
    {
      id: "101",
      name: "RPG Games",
      channelCount: 3,
      category: "Gaming",
      createdAt: "2023-06-15",
      icon: "Swords",
      parentId: "1",
      expanded: false,
      level: 1,
      order: 0,
    },
    {
      id: "102",
      name: "FPS Games",
      channelCount: 4,
      category: "Gaming",
      createdAt: "2023-06-20",
      icon: "Target",
      parentId: "1",
      expanded: false,
      level: 1,
      order: 1,
    },
    {
      id: "2",
      name: "Tech Reviews",
      channelCount: 12,
      category: "Technology",
      createdAt: "2023-06-24",
      icon: "Laptop",
      parentId: null,
      expanded: true,
      level: 0,
      order: 1,
    },
    {
      id: "201",
      name: "Smartphones",
      channelCount: 5,
      category: "Technology",
      createdAt: "2023-07-05",
      icon: "Smartphone",
      parentId: "2",
      expanded: false,
      level: 1,
      order: 0,
    },
    {
      id: "202",
      name: "Laptops & PCs",
      channelCount: 4,
      category: "Technology",
      createdAt: "2023-07-10",
      icon: "Monitor",
      parentId: "2",
      expanded: false,
      level: 1,
      order: 1,
    },
    {
      id: "203",
      name: "Accessories",
      channelCount: 3,
      category: "Technology",
      createdAt: "2023-07-15",
      icon: "Headphones",
      parentId: "2",
      expanded: false,
      level: 1,
      order: 2,
    },
    {
      id: "3",
      name: "Cooking Tutorials",
      channelCount: 6,
      category: "Food",
      createdAt: "2023-07-15",
      icon: "Utensils",
      parentId: null,
      expanded: false,
      level: 0,
      order: 2,
    },
    {
      id: "4",
      name: "Fitness & Health",
      channelCount: 9,
      category: "Fitness",
      createdAt: "2023-08-03",
      icon: "Dumbbell",
      parentId: null,
      expanded: false,
      level: 0,
      order: 3,
    },
    {
      id: "5",
      name: "Travel Vlogs",
      channelCount: 7,
      category: "Travel",
      createdAt: "2023-09-18",
      icon: "Plane",
      parentId: null,
      expanded: false,
      level: 0,
      order: 4,
    },
    {
      id: "6",
      name: "DIY Projects",
      channelCount: 5,
      category: "DIY",
      createdAt: "2023-10-05",
      icon: "Hammer",
      parentId: null,
      expanded: false,
      level: 0,
      order: 5,
    },
    {
      id: "7",
      name: "Music Reviews",
      channelCount: 10,
      category: "Music",
      createdAt: "2023-11-12",
      icon: "Music",
      parentId: null,
      expanded: false,
      level: 0,
      order: 6,
    },
    {
      id: "8",
      name: "Educational Content",
      channelCount: 15,
      category: "Education",
      createdAt: "2023-12-01",
      icon: "GraduationCap",
      parentId: null,
      expanded: false,
      level: 0,
      order: 7,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [groups, setGroups] = useState(initialGroups)
  const [draggedGroup, setDraggedGroup] = useState<Group | null>(null)
  const [dragOverGroup, setDragOverGroup] = useState<string | null>(null)

  // Save groups order to localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem("groupsOrder")
    if (savedOrder) {
      try {
        const orderData = JSON.parse(savedOrder)
        setGroups((prevGroups) => {
          return prevGroups.map((group) => ({
            ...group,
            order: orderData[group.id] ?? group.order,
          }))
        })
      } catch (error) {
        console.error("Error loading groups order:", error)
      }
    }
  }, [])

  // Toggle expand/collapse for a group
  const toggleExpand = (id: string) => {
    setGroups(groups.map((group) => (group.id === id ? { ...group, expanded: !group.expanded } : group)))
  }

  // Filter groups based on search term
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to determine if a group should be visible based on parent's expanded state
  const isVisible = (group: Group) => {
    if (group.parentId === null) return true

    // If searching, show all matches
    if (searchTerm) return true

    // Find the parent group
    const parent = groups.find((g) => g.id === group.parentId)
    return parent?.expanded
  }

  // Function to render the icon
  const renderIcon = (iconName: string) => {
    const IconComponent =
      (LucideIcons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[iconName] || LucideIcons.FolderKanban

    return <IconComponent className="h-4 w-4 text-muted-foreground" />
  }

  // Get sorted groups
  const getSortedGroups = () => {
    const topLevelGroups = filteredGroups.filter((g) => g.parentId === null).sort((a, b) => a.order - b.order)
    const result: Group[] = []

    const addGroupAndChildren = (group: Group) => {
      result.push(group)
      if (group.expanded) {
        const children = filteredGroups.filter((g) => g.parentId === group.id).sort((a, b) => a.order - b.order)
        children.forEach(addGroupAndChildren)
      }
    }

    topLevelGroups.forEach(addGroupAndChildren)
    return result
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, group: Group) => {
    setDraggedGroup(group)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, group: Group) => {
    e.preventDefault()
    if (draggedGroup && draggedGroup.id !== group.id && draggedGroup.parentId === group.parentId) {
      setDragOverGroup(group.id)
      e.dataTransfer.dropEffect = "move"
    }
  }

  const handleDragLeave = () => {
    setDragOverGroup(null)
  }

  const handleDrop = (e: React.DragEvent, targetGroup: Group) => {
    e.preventDefault()
    setDragOverGroup(null)

    if (!draggedGroup || draggedGroup.id === targetGroup.id) return

    // Only allow reordering within the same parent level
    if (draggedGroup.parentId !== targetGroup.parentId) {
      toast({
        title: "Cannot move group",
        description: "Groups can only be reordered within the same level",
      })
      return
    }

    const newGroups = [...groups]
    const draggedIndex = newGroups.findIndex((g) => g.id === draggedGroup.id)
    const targetIndex = newGroups.findIndex((g) => g.id === targetGroup.id)

    // Update order values
    const siblingGroups = newGroups.filter((g) => g.parentId === draggedGroup.parentId)
    const sortedSiblings = siblingGroups.sort((a, b) => a.order - b.order)

    const draggedSiblingIndex = sortedSiblings.findIndex((g) => g.id === draggedGroup.id)
    const targetSiblingIndex = sortedSiblings.findIndex((g) => g.id === targetGroup.id)

    if (draggedSiblingIndex < targetSiblingIndex) {
      // Moving down
      for (let i = draggedSiblingIndex + 1; i <= targetSiblingIndex; i++) {
        const group = sortedSiblings[i]
        const groupIndex = newGroups.findIndex((g) => g.id === group.id)
        newGroups[groupIndex].order = i - 1
      }
      newGroups[draggedIndex].order = targetSiblingIndex
    } else {
      // Moving up
      for (let i = targetSiblingIndex; i < draggedSiblingIndex; i++) {
        const group = sortedSiblings[i]
        const groupIndex = newGroups.findIndex((g) => g.id === group.id)
        newGroups[groupIndex].order = i + 1
      }
      newGroups[draggedIndex].order = targetSiblingIndex
    }

    setGroups(newGroups)

    // Save order to localStorage
    const orderData: Record<string, number> = {}
    newGroups.forEach((group) => {
      orderData[group.id] = group.order
    })
    localStorage.setItem("groupsOrder", JSON.stringify(orderData))

    toast({
      title: "Groups reordered",
      description: "The group order has been updated",
    })
  }

  const handleDragEnd = () => {
    setDraggedGroup(null)
    setDragOverGroup(null)
  }

  // Move group up/down
  const moveGroup = (group: Group, direction: "up" | "down") => {
    const siblingGroups = groups.filter((g) => g.parentId === group.parentId).sort((a, b) => a.order - b.order)
    const currentIndex = siblingGroups.findIndex((g) => g.id === group.id)

    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === siblingGroups.length - 1)
    ) {
      return
    }

    const newGroups = [...groups]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const targetGroup = siblingGroups[targetIndex]

    // Swap order values
    const groupIndex = newGroups.findIndex((g) => g.id === group.id)
    const targetGroupIndex = newGroups.findIndex((g) => g.id === targetGroup.id)

    const tempOrder = newGroups[groupIndex].order
    newGroups[groupIndex].order = newGroups[targetGroupIndex].order
    newGroups[targetGroupIndex].order = tempOrder

    setGroups(newGroups)

    // Save order to localStorage
    const orderData: Record<string, number> = {}
    newGroups.forEach((g) => {
      orderData[g.id] = g.order
    })
    localStorage.setItem("groupsOrder", JSON.stringify(orderData))

    toast({
      title: "Group moved",
      description: `${group.name} moved ${direction}`,
    })
  }

  const sortedGroups = getSortedGroups()

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
            {sortedGroups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No groups found.
                </TableCell>
              </TableRow>
            ) : (
              sortedGroups.map((group) => {
                const siblingGroups = groups
                  .filter((g) => g.parentId === group.parentId)
                  .sort((a, b) => a.order - b.order)
                const currentIndex = siblingGroups.findIndex((g) => g.id === group.id)
                const canMoveUp = currentIndex > 0
                const canMoveDown = currentIndex < siblingGroups.length - 1

                return (
                  <TableRow
                    key={group.id}
                    className={cn(
                      "group",
                      dragOverGroup === group.id && "bg-accent/50",
                      draggedGroup?.id === group.id && "opacity-50",
                    )}
                    draggable={!searchTerm}
                    onDragStart={(e) => handleDragStart(e, group)}
                    onDragOver={(e) => handleDragOver(e, group)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, group)}
                    onDragEnd={handleDragEnd}
                  >
                    <TableCell>
                      {!searchTerm && (
                        <div className="flex items-center gap-1">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2" style={{ paddingLeft: `${group.level * 1.5}rem` }}>
                        {/* Expand/collapse button for parent groups */}
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

                        {renderIcon(group.icon)}
                        <Link href={`/dashboard/groups/${group.id}`} className="font-medium hover:underline">
                          {group.name}
                        </Link>

                        {/* Add subgroup button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          asChild
                        >
                          <Link href={`/dashboard/groups/new?parentId=${group.id}`}>
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
                            <Link href={`/dashboard/groups/${group.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/groups/${group.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/groups/new?parentId=${group.id}`}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Subgroup
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => moveGroup(group, "up")}
                            disabled={!canMoveUp || searchTerm !== ""}
                          >
                            <ArrowUp className="mr-2 h-4 w-4" />
                            Move Up
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => moveGroup(group, "down")}
                            disabled={!canMoveDown || searchTerm !== ""}
                          >
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Move Down
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
