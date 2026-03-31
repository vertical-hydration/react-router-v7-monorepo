import type { Db } from "@workspace/db";
import { schema } from "@workspace/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth(db: Db) {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema,
            usePlural: true,
        }),
    });
}