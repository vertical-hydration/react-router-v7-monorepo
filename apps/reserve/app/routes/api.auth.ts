import { createAuth } from "~/lib/auth.server";
import { adapterContext } from "~/workers/app";
import type { Route } from "./+types/api.auth";

export async function loader({ request, context }: Route.LoaderArgs) {
  const { db } = context.get(adapterContext);
  const auth = createAuth(db);
  return auth.handler(request);
}

export async function action({ request, context }: Route.ActionArgs) {
  const { db } = context.get(adapterContext);
  const auth = createAuth(db);
  return auth.handler(request);
}