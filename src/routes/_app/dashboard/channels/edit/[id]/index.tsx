"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, createFileRoute } from "@tanstack/react-router"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Youtube } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChannelEditPageProps {
  params: {
    id: string
  }
}

export const Route = createFileRoute("/_app/dashboard/channels/edit/[id]/")({
  component: ChannelEditPage,
})

function ChannelEditPage({ params }: ChannelEditPageProps) {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [channel, setChannel] = useState({
    id: params.id,
    name: "",
    url: "",
    description: "",
    avatar: "/placeholder.svg?height=100&width=100",
  })

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
          description: "Latest tech reviews and unboxing videos",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        "2": {
          id: "2",
          name: "GadgetGuru",
          url: "https://youtube.com/gadgetguru",
          description: "Honest reviews of the latest gadgets and tech",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        "3": {
          id: "3",
          name: "GamersUnite",
          url: "https://youtube.com/gamersunite",
          description: "Gaming reviews, walkthroughs, and live streams",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        "4": {
          id: "4",
          name: "ChefMaster",
          url: "https://youtube.com/chefmaster",
          description: "Cooking tutorials and recipe guides",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        "5": {
          id: "5",
          name: "FitLife",
          url: "https://youtube.com/fitlife",
          description: "Fitness routines and health tips",
          avatar: "/placeholder.svg?height=100&width=100",
        },
      }

      const channelData = mockChannels[params.id]
      if (channelData) {
        setChannel(channelData)
      }
    }

    fetchChannel()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to update channel
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    router.push("/dashboard/channels")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Edit Channel" description="Update channel details" />
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/channels">
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
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Channel Name</Label>
                <Input
                  id="name"
                  value={channel.name}
                  onChange={(e) => setChannel({ ...channel, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">Channel URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={channel.url}
                  onChange={(e) => setChannel({ ...channel, url: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={channel.description}
                  onChange={(e) => setChannel({ ...channel, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
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
