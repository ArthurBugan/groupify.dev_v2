import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  // Mock data - in a real app, this would come from your database
  const activities = [
    {
      id: "1",
      action: "Added channel",
      channel: "TechReviews",
      group: "Tech Reviews",
      time: "2 hours ago",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      action: "Created group",
      channel: null,
      group: "DIY Projects",
      time: "Yesterday",
      user: {
        name: "Sam Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      action: "Removed channel",
      channel: "GamingPro",
      group: "Gaming Channels",
      time: "2 days ago",
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      action: "Updated group",
      channel: null,
      group: "Fitness & Health",
      time: "3 days ago",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions in your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name} {activity.action}
                  {activity.channel && <span> "{activity.channel}"</span>}
                  {activity.group && <span> to "{activity.group}"</span>}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
