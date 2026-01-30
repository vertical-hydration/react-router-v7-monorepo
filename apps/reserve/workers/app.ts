import * as schema from "@workspace/db";
import { drizzle } from "drizzle-orm/d1";
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
   const envDb = ()=> {
    if(!env.DB){
      throw new Error("env.DB is required but was undefined");
    }
    return env.DB
  }
	return {
    cloudflare: {
      env,
      ctx,
    },
    db: drizzle(envDb(), { schema }),
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
