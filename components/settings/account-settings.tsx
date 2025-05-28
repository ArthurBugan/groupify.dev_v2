"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Unlink, Link, AlertTriangle, Trash2 } from "lucide-react"

export function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false)
  const [acknowledgeNoRecovery, setAcknowledgeNoRecovery] = useState(false)
  const [socialConnections, setSocialConnections] = useState({
    google: {
      connected: true,
      email: "alex@gmail.com",
      connectedAt: "2024-01-15",
    },
    apple: {
      connected: false,
      email: null,
      connectedAt: null,
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleSocialConnect = async (provider: "google" | "apple") => {
    // Simulate connecting to social provider
    console.log(`Connecting to ${provider}...`)
    // In real app, this would redirect to OAuth flow
  }

  const handleSocialDisconnect = async (provider: "google" | "apple") => {
    setSocialConnections((prev) => ({
      ...prev,
      [provider]: {
        connected: false,
        email: null,
        connectedAt: null,
      },
    }))
  }

  const resetDeleteForm = () => {
    setDeleteConfirmation("")
    setAcknowledgeDataLoss(false)
    setAcknowledgeNoRecovery(false)
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE" || !acknowledgeDataLoss || !acknowledgeNoRecovery) {
      return
    }

    setIsLoading(true)
    // Simulate account deletion
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Account deleted")
    setIsLoading(false)
    setDeleteDialogOpen(false)
    // In real app, this would redirect to a goodbye page or login
  }

  const canDeleteAccount = deleteConfirmation === "DELETE" && acknowledgeDataLoss && acknowledgeNoRecovery

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Login Connections</CardTitle>
          <CardDescription>Manage your connected social accounts for easy sign-in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Connection */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Google</h3>
                {socialConnections.google.connected ? (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{socialConnections.google.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Connected on {new Date(socialConnections.google.connectedAt!).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialConnections.google.connected ? (
                <>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleSocialDisconnect("google")}>
                    <Unlink className="w-4 h-4 mr-1" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleSocialConnect("google")}>
                  <Link className="w-4 h-4 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>

          {/* Apple Connection */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Apple</h3>
                {socialConnections.apple.connected ? (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{socialConnections.apple.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Connected on {new Date(socialConnections.apple.connectedAt!).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialConnections.apple.connected ? (
                <>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleSocialDisconnect("apple")}>
                    <Unlink className="w-4 h-4 mr-1" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleSocialConnect("apple")}>
                  <Link className="w-4 h-4 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Enhanced Security</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Connecting social accounts allows for secure, passwordless sign-in and provides backup access to your
                  account.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog
            open={deleteDialogOpen}
            onOpenChange={(open) => {
              setDeleteDialogOpen(open)
              if (!open) {
                resetDeleteForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Delete Account
                </DialogTitle>
                <DialogDescription className="text-left space-y-3">
                  <p className="font-medium text-foreground">
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">What will be deleted:</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• All your groups and channel collections</li>
                      <li>• Shared group access and collaborations</li>
                      <li>• Analytics data and reports</li>
                      <li>• Account settings and preferences</li>
                      <li>• All uploaded files and custom data</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-amber-900 mb-2">Before you delete:</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Export any data you want to keep</li>
                      <li>• Transfer group ownership to team members</li>
                      <li>• Cancel any active subscriptions</li>
                      <li>• Download your analytics reports</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acknowledge-data-loss"
                      checked={acknowledgeDataLoss}
                      onCheckedChange={(checked) => setAcknowledgeDataLoss(checked as boolean)}
                    />
                    <Label htmlFor="acknowledge-data-loss" className="text-sm">
                      I understand that all my data will be permanently deleted
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acknowledge-no-recovery"
                      checked={acknowledgeNoRecovery}
                      onCheckedChange={(checked) => setAcknowledgeNoRecovery(checked as boolean)}
                    />
                    <Label htmlFor="acknowledge-no-recovery" className="text-sm">
                      I understand that this action cannot be undone
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                    Type <span className="font-mono bg-gray-100 px-1 rounded">DELETE</span> to confirm:
                  </Label>
                  <Input
                    id="delete-confirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="font-mono"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount} disabled={!canDeleteAccount || isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
