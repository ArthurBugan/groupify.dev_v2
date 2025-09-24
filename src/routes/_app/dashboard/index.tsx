import { createFileRoute } from "@tanstack/react-router"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { GroupList } from "@/components/group-list"
import { SharedGroupsOverview } from "@/components/shared-groups-overview"
import { RecommendationCards } from "@/components/recommendation-cards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Route = createFileRoute("/_app/dashboard/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Dashboard" description="Overview of your YouTube channel groups" />
      <DashboardStats />

      <RecommendationCards />

      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="shared">Shared With Me</TabsTrigger>
        </TabsList>
        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <GroupList />
            <RecentActivity />
          </div>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <SharedGroupsOverview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
