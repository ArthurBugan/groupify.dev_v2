import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderKanban, UserCircle, Eye, Share2, Clock } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Progress } from "@/components/ui/progress"

export function SharedGroupsOverview() {
  // Mock data - in a real app, this would come from your database
  const sharedGroups = [
    {
      id: "101",
      name: "AI & Machine Learning",
      owner: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Technology",
      channelCount: 14,
      totalChannels: 20,
      role: "Editor",
      sharedDate: "2 weeks ago",
      lastActivity: "Yesterday",
      collaborators: 4,
      views: 1250,
    },
    {
      id: "102",
      name: "Music Production",
      owner: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Music",
      channelCount: 8,
      totalChannels: 15,
      role: "Viewer",
      sharedDate: "1 month ago",
      lastActivity: "3 days ago",
      collaborators: 7,
      views: 3420,
    },
    {
      id: "103",
      name: "Documentary Films",
      owner: {
        name: "Sam Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Entertainment",
      channelCount: 12,
      totalChannels: 12,
      role: "Admin",
      sharedDate: "2 days ago",
      lastActivity: "Today",
      collaborators: 2,
      views: 845,
    },
  ]

  return (
    <div className="space-y-4">
      {sharedGroups.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Share2 className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-lg font-medium">No shared groups yet</p>
            <p className="text-muted-foreground">Groups shared with you will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sharedGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge variant="outline" className="mb-2">
                    {group.role}
                  </Badge>
                  <Badge variant="secondary">{group.category}</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to={`/dashboard/groups/${group.id}`} className="hover:underline flex items-center gap-2">
                    <FolderKanban className="h-4 w-4" />
                    {group.name}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <UserCircle className="h-3 w-3" />
                  Owned by {group.owner.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Channels Progress</span>
                    <span>
                      {group.channelCount} / {group.totalChannels}
                    </span>
                  </div>
                  <Progress value={(group.channelCount / group.totalChannels) * 100} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Shared
                    </span>
                    <span>{group.sharedDate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Activity
                    </span>
                    <span>{group.lastActivity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <UserCircle className="h-3 w-3" /> Collaborators
                    </span>
                    <span>{group.collaborators}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Views
                    </span>
                    <span>{group.views.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
