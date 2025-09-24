import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/support/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/support/"!</div>
}
