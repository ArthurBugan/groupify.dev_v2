"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FolderKanban, Save, Youtube } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ChangeGroupPageProps {
  params: {
    id: string
  }
}

export default function ChangeGroupPage({ params }: ChangeGroupPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [channel, setChannel] = useState({
    id: params.id,
    name: "",
    url: "",
    avatar: "/placeholder.svg?height=100&width=100",
    currentGroup: "",
  })
  const [selectedGroup, setSelectedGroup] = useState("")

  // Mock groups data - in a real app, this would come from your API
  const groups = [
    { id: "1", name: "Gaming Channels", channelCount: 8, category: "Gaming" },
    { id: "2", name: "Tech Reviews", channelCount: 12, category: "Technology" },
    { id: "3", name: "Cooking Tutorials", channelCount: 6, category: "Food" },
    { id: "4", name: "Fitness & Health", channelCount: 9, category: "Fitness" },
    { id: "5", name: "Travel Vlogs", channelCount: 7, category: "Travel" },
    { id: "6", name: "DIY Projects", channelCount: 5, category: "DIY" },
    { id: "7", name: "Music Reviews", channelCount: 10, category: "Music" },
    { id: "8", name: "Educational Content", channelCount: 15, category: "Education" },
  ]

  // Fetch channel data - in a real app, this would come from your API
  useEffect(() => {
    // Simulate API call
    const fetchChannel = async () => {
      // This is mock data - in a real app, you would fetch from your API
      const mockChannels = {
        "1": {
          id: "1",
          name: "TechReviewPro",
          url: "https://youtube.com/techreviewpro",
          avatar: "/placeholder.svg?height=100&width=100",
          currentGroup: "2", // Tech Reviews
        },
        "2": {
          id: "2",
          name: "GadgetGuru",
          url: "https://youtube.com/gadgetguru",
          avatar: "/placeholder.svg?height=100&width=100",
          currentGroup: "2", // Tech Reviews
        },
        "3": {
          id: "3",
          name: "GamersUnite",
          url: "https://youtube.com/gamersunite",
          avatar: "/placeholder.svg?height=100&width=100",
          currentGroup: "1", // Gaming Channels
        },
        "4": {
          id: "4",
          name: "ChefMaster",
          url: "https://youtube.com/chefmaster",
          avatar: "/placeholder.svg?height=100&width=100",
          currentGroup: "3", // Cooking Tutorials
        },
        "5": {
          id: "5",
          name: "FitLife",
          url: "https://youtube.com/fitlife",
          avatar: "/placeholder.svg?height=100&width=100",
          currentGroup: "4", // Fitness & Health
        },
      }

      const channelData = mockChannels[params.id]
      if (channelData) {
        setChannel(channelData)
        setSelectedGroup(channelData.currentGroup)
      }
    }

    fetchChannel()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to update channel group
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    router.push("/dashboard/channels")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Change Group" description="Move channel to a different group" />
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/channels">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Channels
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
              <AvatarFallback>
                <Youtube className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{channel.name}</h3>
              <p className="text-sm text-muted-foreground">{channel.url}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Select a group for this channel:</h3>
              <RadioGroup value={selectedGroup} onValueChange={setSelectedGroup}>
                <div className="grid gap-4">
                  {groups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value={group.id} id={`group-${group.id}`} />
                      <Label htmlFor={`group-${group.id}`} className="flex items-center gap-3 cursor-pointer">
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.category} • {group.channelCount} channels
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || selectedGroup === channel.currentGroup}>
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
