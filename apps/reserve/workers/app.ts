import { createDb } from "@workspace/db";
import {
  createContext,
  createRequestHandler,
  RouterContextProvider,
} from "react-router";

interface AppContext extends Awaited<ReturnType<typeof generateAppContext>> {}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

const generateAppContext = async (env: Env, ctx: ExecutionContext) => {
  if (!env.DB) {
    throw new Error("Missing Cloudflare D1 binding: DB");
  }

  return {
    cloudflare: {
      env,
      ctx,
    },
    db: createDb(env.DB),
  };
};

export const adapterContext = createContext<AppContext>();

export default {
  async fetch(request, env, ctx) {
    try {
      const appContext = await generateAppContext(env, ctx);
      const routerContext = new RouterContextProvider();
      routerContext.set(adapterContext, appContext);
      return requestHandler(request, routerContext);
    } catch (error) {
      console.error(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
