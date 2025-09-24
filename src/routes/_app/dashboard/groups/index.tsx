import { DashboardHeader } from "@/components/dashboard-header"
import { GroupsTable } from "@/components/groups-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dashboard/groups/")({
  component: GroupsPage,
})

function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Groups" description="Manage your YouTube channel groups" />
        <Button variant="outline" type="button" asChild>
          <Link to="/dashboard/groups/new">
            <Plus className="mr-2 h-4 w-4" />
            New Group
          </Link>
        </Button>
      </div>
      <GroupsTable />
    </div>
  )
}
