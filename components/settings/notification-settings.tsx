"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Mail, Smartphone, Globe } from "lucide-react"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [emailFrequency, setEmailFrequency] = useState("daily")

  const [notifications, setNotifications] = useState({
    newVideos: true,
    subscriberMilestones: true,
    channelUpdates: true,
    weeklyReports: true,
    systemUpdates: false,
    marketingEmails: false,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
              </div>
            </div>
            <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications within the dashboard</p>
              </div>
            </div>
            <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
          </div>
        </CardContent>
      </Card>

      {emailNotifications && (
        <Card>
          <CardHeader>
            <CardTitle>Email Frequency</CardTitle>
            <CardDescription>How often should we send you email digests?</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={emailFrequency} onValueChange={setEmailFrequency}>
              <div className="grid gap-4">
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="realtime" id="realtime" />
                  <Label htmlFor="realtime">Real-time</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily digest</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly digest</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="never" id="never" />
                  <Label htmlFor="never">Never</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Choose which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-videos">New Videos</Label>
                <p className="text-sm text-muted-foreground">When channels in your groups upload new videos</p>
              </div>
              <Switch
                id="new-videos"
                checked={notifications.newVideos}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newVideos: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="subscriber-milestones">Subscriber Milestones</Label>
                <p className="text-sm text-muted-foreground">When channels reach subscriber milestones</p>
              </div>
              <Switch
                id="subscriber-milestones"
                checked={notifications.subscriberMilestones}
                onCheckedChange={(checked) => setNotifications({ ...notifications, subscriberMilestones: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="channel-updates">Channel Updates</Label>
                <p className="text-sm text-muted-foreground">When channels update their information</p>
              </div>
              <Switch
                id="channel-updates"
                checked={notifications.channelUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, channelUpdates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly summary of your groups' performance</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-updates">System Updates</Label>
                <p className="text-sm text-muted-foreground">Important updates about the platform</p>
              </div>
              <Switch
                id="system-updates"
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Tips, offers, and product updates</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Notification Settings</Button>
      </div>
    </div>
  )
}
