import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/animes/edit/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/dashboard/animes/edit/index/$id"!</div>
}
