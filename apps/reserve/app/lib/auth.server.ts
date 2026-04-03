import type { Db } from "@workspace/db";
import { schema } from "@workspace/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "~/lib/env.server";

function getTrustedOrigins() {
    const origins = env.BETTER_AUTH_TRUSTED_ORIGINS
        ?.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

    return origins ?? [];
}

export function createAuth(db: Db) {
    return betterAuth({
        baseURL: env.BETTER_AUTH_URL,
        trustedOrigins: getTrustedOrigins(),
        advanced: {
            database: {
                generateId: "serial",
            },
        },
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            discord: {
                clientId: env.DISCORD_CLIENT_ID,
                clientSecret: env.DISCORD_CLIENT_SECRET,
            },
        },
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema,
            usePlural: true,
        }),
        // baseURL:{
        //     allowedHosts:[
        //         "*.foodpantrythomasville.org"
        //     ],
        //     protocol: process.env.NODE_ENV === "development" ? "http" : "https",
        // }
    });
}