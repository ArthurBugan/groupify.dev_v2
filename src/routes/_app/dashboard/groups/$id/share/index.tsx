"use client"

import { useState, useEffect } from "react"
import { useNavigate, createFileRoute } from "@tanstack/react-router"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Copy, LinkIcon, Share2, Users, UserPlus, X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ShareGroupPageProps {
  params: {
    id: string
  }
}

export const Route = createFileRoute("/_app/dashboard/groups/$id/share/")({
  component: ShareGroupPage,
})

function ShareGroupPage({ params }: ShareGroupPageProps) {
  const router = useNavigate()
    const { id } = Route.useParams();
  
  const [activeTab, setActiveTab] = useState("collaborate")
  const [group, setGroup] = useState({
    id: id,
    name: "",
    description: "",
    category: "",
    channelCount: 0,
  })
  const [collaborators, setCollaborators] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "editor",
    },
  ])
  const [newCollaborator, setNewCollaborator] = useState("")
  const [shareLink, setShareLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [sharePermission, setSharePermission] = useState("view")
  const [allowComments, setAllowComments] = useState(true)
  const [copyDestination, setCopyDestination] = useState("new")
  const [isGeneratingLink, setIsGeneratingLink] = useState(false)

  // Fetch group data - in a real app, this would come from your API
  useEffect(() => {
    // Simulate API call
    const fetchGroup = async () => {
      // This is mock data - in a real app, you would fetch from your API
      const mockGroups = {
        "1": {
          id: "1",
          name: "Gaming Channels",
          description: "A collection of gaming channels covering reviews, gameplay, and esports.",
          category: "Gaming",
          channelCount: 8,
        },
        "2": {
          id: "2",
          name: "Tech Reviews",
          description: "A collection of technology review channels covering gadgets, software, and tech news.",
          category: "Technology",
          channelCount: 12,
        },
        "3": {
          id: "3",
          name: "Cooking Tutorials",
          description: "Channels that focus on cooking recipes, techniques, and food reviews.",
          category: "Food",
          channelCount: 6,
        },
        "4": {
          id: "4",
          name: "Fitness & Health",
          description: "Workout tutorials, health tips, and fitness journey channels.",
          category: "Fitness",
          channelCount: 9,
        },
      }

      const groupData = mockGroups[id]
      if (groupData) {
        setGroup(groupData)
      }
    }

    fetchGroup()
  }, [id])

  const generateShareLink = async () => {
    setIsGeneratingLink(true)
    // Simulate API call to generate link
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock share link
    const baseUrl = window.location.origin
    const linkType = activeTab === "collaborate" ? "collaborate" : "copy"
    const permission = activeTab === "collaborate" ? sharePermission : ""
    const timestamp = Date.now()
    const mockShareLink = `${baseUrl}/share/${linkType}/${id}?permission=${permission}&t=${timestamp}`

    setShareLink(mockShareLink)
    setIsGeneratingLink(false)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const addCollaborator = () => {
    if (!newCollaborator.trim()) return

    // In a real app, you would validate the email and send an invitation
    const newUser = {
      id: `user-${Date.now()}`,
      name: "New User",
      email: newCollaborator,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "viewer",
    }

    setCollaborators([...collaborators, newUser])
    setNewCollaborator("")
  }

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((user) => user.id !== id))
  }

  const changeCollaboratorRole = (id: string, role: string) => {
    setCollaborators(collaborators.map((user) => (user.id === id ? { ...user, role } : user)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title={`Share "${group.name}"`} description="Share your group with others" />
        <Button variant="outline" size="sm" asChild>
          <Link to="..">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Group
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="collaborate">
                <Users className="mr-2 h-4 w-4" />
                Collaborate
              </TabsTrigger>
              <TabsTrigger value="copy">
                <Copy className="mr-2 h-4 w-4" />
                Copy Group
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collaborate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invite Collaborators</CardTitle>
                  <CardDescription>
                    Invite others to collaborate on this group. They will be able to view or edit the group based on the
                    permissions you set.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address"
                      value={newCollaborator}
                      onChange={(e) => setNewCollaborator(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={addCollaborator}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Collaborators</Label>
                    {collaborators.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground border rounded-md">
                        <p>No collaborators yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {collaborators.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                className="text-xs border rounded px-2 py-1"
                                value={user.role}
                                onChange={(e) => changeCollaboratorRole(user.id, e.target.value)}
                              >
                                <option value="viewer">Viewer</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                              </select>
                              <Button variant="ghost" size="icon" onClick={() => removeCollaborator(user.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label>Default Permission for New Collaborators</Label>
                      <RadioGroup value={sharePermission} onValueChange={setSharePermission} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="view" id="view" />
                          <Label htmlFor="view">View only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="edit" id="edit" />
                          <Label htmlFor="edit">Can edit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="admin" />
                          <Label htmlFor="admin">Admin (can edit and invite others)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="comments">Allow Comments</Label>
                        <p className="text-sm text-muted-foreground">Let collaborators add comments to channels</p>
                      </div>
                      <Switch id="comments" checked={allowComments} onCheckedChange={setAllowComments} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create Shareable Link</CardTitle>
                  <CardDescription>
                    Generate a link that you can share with others to invite them to collaborate on this group.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shareLink ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input value={shareLink} readOnly className="flex-1" />
                        <Button variant="outline" size="sm" onClick={copyLinkToClipboard}>
                          {linkCopied ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Anyone with this link can join as a{" "}
                        {sharePermission === "view" ? "viewer" : sharePermission === "edit" ? "editor" : "admin"}.
                      </p>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={generateShareLink} disabled={isGeneratingLink}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      {isGeneratingLink ? "Generating..." : "Generate Link"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="copy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create Copy Link</CardTitle>
                  <CardDescription>
                    Generate a link that allows others to copy all channels from this group to their own account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Copy Destination</Label>
                      <RadioGroup value={copyDestination} onValueChange={setCopyDestination} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new-group" />
                          <Label htmlFor="new-group">Create a new group</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="existing" id="existing-group" />
                          <Label htmlFor="existing-group">Add to an existing group</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Alert>
                      <Share2 className="h-4 w-4" />
                      <AlertDescription>
                        When someone uses this link, they will be able to copy all {group.channelCount} channels from
                        this group to their account.
                      </AlertDescription>
                    </Alert>

                    {shareLink ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input value={shareLink} readOnly className="flex-1" />
                          <Button variant="outline" onClick={copyLinkToClipboard}>
                            {linkCopied ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This link allows anyone to copy the channels in this group.
                        </p>
                      </div>
                    ) : (
                      <Button onClick={generateShareLink} disabled={isGeneratingLink}>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        {isGeneratingLink ? "Generating..." : "Generate Copy Link"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Group Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{group.name}</h3>
                  <Badge>{group.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Channels</span>
                  <span className="font-medium">{group.channelCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Collaborators</span>
                  <span className="font-medium">{collaborators.length}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Share Settings</h4>
                <p className="text-xs text-muted-foreground">
                  {activeTab === "collaborate"
                    ? `Collaborators will have ${sharePermission} access to this group.`
                    : `Recipients will be able to copy all channels to ${copyDestination === "new" ? "a new group" : "an existing group"}.`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
