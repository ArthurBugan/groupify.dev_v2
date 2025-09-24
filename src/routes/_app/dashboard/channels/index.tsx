import { DashboardHeader } from "@/components/dashboard-header";
import { AllChannelsTable } from "@/components/all-channels-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/channels/")({
  component: ChannelsPage,
});

function ChannelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          title="All Channels"
          description="View and manage all YouTube channels"
        />
        <Button variant="outline" type="button" asChild>
          <Link to="/dashboard/channels/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Link>
        </Button>
      </div>
      <AllChannelsTable />
    </div>
  );
}
