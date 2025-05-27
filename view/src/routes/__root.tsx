import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";

import Header from "../components/Header";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Header />
      <Outlet />
      <Toaster />
    </>
  ),
});
