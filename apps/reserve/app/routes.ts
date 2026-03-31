import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index-page.tsx"),
    route("/todos", "routes/todos.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
  route("/api/auth/*", "routes/api.auth.ts")
] satisfies RouteConfig;
