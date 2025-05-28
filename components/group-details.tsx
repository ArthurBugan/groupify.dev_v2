import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Share2 } from "lucide-react"
import Link from "next/link"
import * as LucideIcons from "lucide-react"

interface GroupDetailsProps {
  id: string
}

export function GroupDetails({ id }: GroupDetailsProps) {
  // Mock data - in a real app, this would come from your database based on the ID
  const group = {
    id,
    name:
      id === "1"
        ? "Gaming Channels"
        : id === "2"
          ? "Tech Reviews"
          : id === "3"
            ? "Cooking Tutorials"
            : id === "4"
              ? "Fitness & Health"
              : "Channel Group",
    description:
      id === "2"
        ? "A collection of technology review channels covering gadgets, software, and tech news."
        : id === "1"
          ? "A collection of gaming channels covering reviews, gameplay, and esports."
          : id === "3"
            ? "Channels that focus on cooking recipes, techniques, and food reviews."
            : id === "4"
              ? "Workout tutorials, health tips, and fitness journey channels."
              : "A collection of YouTube channels",
    category:
      id === "1" ? "Gaming" : id === "2" ? "Technology" : id === "3" ? "Food" : id === "4" ? "Fitness" : "General",
    createdAt: "June 24, 2023",
    channelCount: 12,
    totalSubscribers: "2.4M",
    totalViews: "45.7M",
    averageVideoLength: "12:45",
    icon:
      id === "1"
        ? "Gamepad2"
        : id === "2"
          ? "Laptop"
          : id === "3"
            ? "Utensils"
            : id === "4"
              ? "Dumbbell"
              : "FolderKanban",
    parentGroup:
      id === "101" || id === "102"
        ? "Gaming Channels"
        : id === "201" || id === "202" || id === "203"
          ? "Tech Reviews"
          : null,
    parentId: id === "101" || id === "102" ? "1" : id === "201" || id === "202" || id === "203" ? "2" : null,
  }

  // Dynamically render the icon
  const IconComponent = group.icon
    ? (LucideIcons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[group.icon] || LucideIcons.FolderKanban
    : LucideIcons.FolderKanban

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted/50">
              <IconComponent className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {group.parentGroup && (
                  <Link
                    href={`/dashboard/groups/${group.parentId}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {group.parentGroup} /
                  </Link>
                )}
                <CardTitle>{group.name}</CardTitle>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{group.category}</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/groups/${id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Group
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/groups/${id}/share`}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Created</p>
            <p>{group.createdAt}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Channels</p>
            <p>{group.channelCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
            <p>{group.totalSubscribers}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
            <p>{group.totalViews}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
