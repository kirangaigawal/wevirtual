import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
});

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$id",
  component: ProjectDetailPage,
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/$id",
  component: ArticleDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  projectDetailRoute,
  articleDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
