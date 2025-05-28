import { DashboardHeader } from "@/components/dashboard-header"
import { GroupsTable } from "@/components/groups-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Groups" description="Manage your YouTube channel groups" />
        <Button asChild>
          <Link href="/dashboard/groups/new">
            <Plus className="mr-2 h-4 w-4" />
            New Group
          </Link>
        </Button>
      </div>
      <GroupsTable />
    </div>
  )
}
