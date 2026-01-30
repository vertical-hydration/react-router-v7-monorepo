import { index, type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  route("/todos", "routes/todos.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
