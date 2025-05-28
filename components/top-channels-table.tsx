"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Youtube, ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function TopChannelsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in a real app, this would come from your database
  const channels = [
    {
      id: "1",
      name: "TechReviewPro",
      group: "Tech Reviews",
      groupId: "2",
      subscribers: "1.2M",
      views: "28.4M",
      videos: 245,
      subscriberChange: 12500,
      viewsChange: 2100000,
      url: "https://youtube.com/techreviewpro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "GamersUnite",
      group: "Gaming Channels",
      groupId: "1",
      subscribers: "780K",
      views: "15.2M",
      videos: 312,
      subscriberChange: 8700,
      viewsChange: 1250000,
      url: "https://youtube.com/gamersunite",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "ChefMaster",
      group: "Cooking Tutorials",
      groupId: "3",
      subscribers: "320K",
      views: "8.7M",
      videos: 156,
      subscriberChange: 4200,
      viewsChange: 750000,
      url: "https://youtube.com/chefmaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "TravelWithMe",
      group: "Travel Vlogs",
      groupId: "5",
      subscribers: "420K",
      views: "12.1M",
      videos: 185,
      subscriberChange: -1200,
      viewsChange: -150000,
      url: "https://youtube.com/travelwithme",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "MusicReviewer",
      group: "Music Reviews",
      groupId: "7",
      subscribers: "380K",
      views: "9.4M",
      videos: 167,
      subscriberChange: 0,
      viewsChange: 320000,
      url: "https://youtube.com/musicreviewer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Helper function to format change with appropriate icon
  const formatChange = (change: number) => {
    if (change > 0) {
      return (
        <span className="flex items-center text-green-500">
          <TrendingUp className="mr-1 h-3 w-3" />+{Math.abs(change).toLocaleString()}
        </span>
      )
    } else if (change < 0) {
      return (
        <span className="flex items-center text-red-500">
          <TrendingDown className="mr-1 h-3 w-3" />-{Math.abs(change).toLocaleString()}
        </span>
      )
    } else {
      return (
        <span className="flex items-center text-muted-foreground">
          <Minus className="mr-1 h-3 w-3" />0
        </span>
      )
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Top Performing Channels</CardTitle>
          <CardDescription>Your channels with the most subscribers and engagement</CardDescription>
        </div>
        <Input
          placeholder="Search channels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>30-Day Growth</TableHead>
                <TableHead>Total Views</TableHead>
                <TableHead>30-Day Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChannels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No channels found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredChannels.map((channel) => (
                  <TableRow key={channel.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                          <AvatarFallback>
                            <Youtube className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{channel.name}</span>
                            <a
                              href={channel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <span className="text-xs text-muted-foreground">{channel.videos} videos</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{channel.group}</Badge>
                    </TableCell>
                    <TableCell>{channel.subscribers}</TableCell>
                    <TableCell>{formatChange(channel.subscriberChange)}</TableCell>
                    <TableCell>{channel.views}</TableCell>
                    <TableCell>{formatChange(channel.viewsChange)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
