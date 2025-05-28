import { DashboardHeader } from "@/components/dashboard-header"
import { AllChannelsTable } from "@/components/all-channels-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ChannelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="All Channels" description="View and manage all YouTube channels" />
        <Button asChild>
          <Link href="/dashboard/channels/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Link>
        </Button>
      </div>
      <AllChannelsTable />
    </div>
  )
}
