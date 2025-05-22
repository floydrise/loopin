import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/paymentCancel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={"mt-30"}>Hello "/paymentCancel"!</div>
}
