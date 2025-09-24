import { GroupSettings } from '@/components/settings/group-settings'
import { TabsContent } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/settings/groups/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <TabsContent value="groups" className="space-y-4">
            <GroupSettings />
        </TabsContent>
    )
}
