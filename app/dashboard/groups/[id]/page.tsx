"use client"

import { useState, useEffect, use } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { GroupDetails } from "@/components/group-details"
import { ChannelsTable } from "@/components/channels-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ToastProvider, Toast } from "@/components/ui/toast"

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const [toasts, setToasts] = useState<any[]>([])
  const { id } = use(params); 

  // Get group name based on ID for the header
  const groupName =
    params.id === "1"
      ? "Gaming Channels"
      : params.id === "2"
        ? "Tech Reviews"
        : params.id === "3"
          ? "Cooking Tutorials"
          : params.id === "4"
            ? "Fitness & Health"
            : "Group Details"

  // Check for settings saved notification
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const settingsSaved = urlParams.get("settings-saved")

    if (settingsSaved === "true") {
      setToasts([
        ...toasts,
        {
          id: Date.now(),
          title: "Settings Applied",
          description: "Your group settings have been applied to this view.",
        },
      ])

      // Remove the query parameter without refreshing the page
      const newUrl = window.location.pathname
      window.history.replaceState({}, document.title, newUrl)

      // Auto-dismiss toast after 3 seconds
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== Date.now()))
      }, 3000)
    }
  }, [])

  return (
    <div className="space-y-6">
      <ToastProvider>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            onClose={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </ToastProvider>

      <div className="flex items-center justify-between">
        <DashboardHeader title={groupName} description="Manage channels in this group" />
        <Button asChild>
          <Link href={`/dashboard/groups/${id}/add-channel`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Link>
        </Button>
      </div>
      <GroupDetails id={id} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Channels in this group</h2>
        <ChannelsTable groupId={id} />
      </div>
    </div>
  )
}
