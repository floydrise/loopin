import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/paymentSuccess')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={"mt-30"}>Hello "/paymentSuccess"!</div>
}
