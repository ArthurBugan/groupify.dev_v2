"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Key, RefreshCw, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function IntegrationSettings() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [syncInterval, setSyncInterval] = useState("6")
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "error">("disconnected")

  const testConnection = async () => {
    // Simulate API connection test
    setConnectionStatus("connected")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>YouTube API Configuration</CardTitle>
          <CardDescription>Connect your YouTube API to fetch channel data automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need a YouTube Data API v3 key to enable automatic channel data fetching.{" "}
              <a
                href="https://console.cloud.google.com"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get your API key here
              </a>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your YouTube API key"
                />
                <Button variant="outline" onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? "Hide" : "Show"}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={testConnection} variant="outline">
                <Key className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
              {connectionStatus === "connected" && (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Connected
                </Badge>
              )}
              {connectionStatus === "disconnected" && (
                <Badge variant="secondary" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Disconnected
                </Badge>
              )}
              {connectionStatus === "error" && (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Error
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
          <CardDescription>Configure how often channel data is synchronized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically fetch latest channel data</p>
            </div>
            <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          {autoSync && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sync-interval">Sync Interval</Label>
                <p className="text-sm text-muted-foreground">How often to check for updates</p>
              </div>
              <Select value={syncInterval} onValueChange={setSyncInterval}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every hour</SelectItem>
                  <SelectItem value="6">Every 6 hours</SelectItem>
                  <SelectItem value="12">Every 12 hours</SelectItem>
                  <SelectItem value="24">Daily</SelectItem>
                  <SelectItem value="168">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>Monitor your YouTube API quota usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Quota Used</span>
                <span className="font-medium">2,450 / 10,000</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "24.5%" }} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Resets daily at 12:00 AM Pacific Time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
