import { buttonVariants } from "@workspace/ui/components/button";
import { Github, ListTodo } from "lucide-react";
import { Link } from "react-router";
import { env } from "~/lib/env.server";
import { adapterContext } from "~/workers/app";


export function meta() {
  return [
    { title: "Reserve App" },
    { name: "description", content: "Welcome to Reserve!" },
  ];
}

// export function loader({ context }: Route.LoaderArgs) {
//   const { cloudflare } = context.get(adapterContext);
//   return {
//     message: cloudflare.env.VALUE_FROM_CLOUDFLARE,
//     mode: env.ENVIRONMENT,
//   };
// }

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-lg p-6">
        <p className="font-mono text-muted-foreground">
          <span className="text-lg">[33m</span> {"heelo"}
          {" in "}
          {"mode"} mode
        </p>
        <div className="my-6 flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">Reserve App!</h1>
          <p className="text-base opacity-80">
            This is a streamlined example demonstrating the use of React Router
            v7 within a monorepo, integrating Cloudflare Workers, Drizzle ORM
            with D1, Shadcn/UI, and Tailwind CSS v4.
          </p>
        </div>
        <div className="space-x-2">
          <a
            href="https://github.com/foxlau/react-router-v7-monorepo"
            target="_blank"
            className={buttonVariants()}
            rel="noreferrer"
          >
            <Github />
            Star on GitHub [34m
          </a>
        </div>
      </div>
    </div>
  );
}
