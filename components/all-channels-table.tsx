"use client"

import { useState } from "react"
import { Youtube, MoreHorizontal, ExternalLink, FolderKanban, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function AllChannelsTable() {
  // Mock data - in a real app, this would come from your database
  const initialChannels = [
    {
      id: "1",
      name: "TechReviewPro",
      url: "https://youtube.com/techreviewpro",
      subscribers: "1.2M",
      videos: 245,
      group: "Tech Reviews",
      groupId: "2",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "GadgetGuru",
      url: "https://youtube.com/gadgetguru",
      subscribers: "450K",
      videos: 178,
      group: "Tech Reviews",
      groupId: "2",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "GamersUnite",
      url: "https://youtube.com/gamersunite",
      subscribers: "780K",
      videos: 312,
      group: "Gaming Channels",
      groupId: "1",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "ChefMaster",
      url: "https://youtube.com/chefmaster",
      subscribers: "320K",
      videos: 156,
      group: "Cooking Tutorials",
      groupId: "3",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "FitLife",
      url: "https://youtube.com/fitlife",
      subscribers: "550K",
      videos: 210,
      group: "Fitness & Health",
      groupId: "4",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "TravelWithMe",
      url: "https://youtube.com/travelwithme",
      subscribers: "420K",
      videos: 185,
      group: "Travel Vlogs",
      groupId: "5",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "DIYCreator",
      url: "https://youtube.com/diycreator",
      subscribers: "290K",
      videos: 134,
      group: "DIY Projects",
      groupId: "6",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "MusicReviewer",
      url: "https://youtube.com/musicreviewer",
      subscribers: "380K",
      videos: 167,
      group: "Music Reviews",
      groupId: "7",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [channels, setChannels] = useState(initialChannels)

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteChannel = (channelId: string) => {
    setChannels(channels.filter((channel) => channel.id !== channelId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search channels or groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Subscribers</TableHead>
              <TableHead>Videos</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChannels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
                      <div>
                        <p className="font-medium">{channel.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{channel.url}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      <Link href={`/dashboard/groups/${channel.groupId}`} className="hover:underline">
                        {channel.group}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{channel.subscribers}</TableCell>
                  <TableCell>{channel.videos}</TableCell>
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
                          <a href={channel.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit channel
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/channels/edit/${channel.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/channels/change-group/${channel.id}`}>
                            <FolderKanban className="mr-2 h-4 w-4" />
                            Change group
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteChannel(channel.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
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
    </div>
  )
}
