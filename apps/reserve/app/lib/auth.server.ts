import type { Db } from "@workspace/db";
import { schema } from "@workspace/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth(db: Db) {
    return betterAuth({
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            discord: {
                clientId: process.env.DISCORD_CLIENT_ID as string,
                clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
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