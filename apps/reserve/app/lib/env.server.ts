import { env as cloudflareEnv } from "cloudflare:workers";
import { z } from "zod";

/**
 * Server environment schema definition with validation rules
 */
const serverEnvSchema = z.object({
  ENVIRONMENT: z.enum(["development", "preview", "production"]),
  VALUE_FROM_CLOUDFLARE: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string().optional(),
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1),
});

/**
 * Validated server environment variables
 */
export const env = (() => {
  const parsed = serverEnvSchema.safeParse(cloudflareEnv);

  if (parsed.success === false) {
    console.error(
      "[31m Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  const validatedData = parsed.data;
  Object.freeze(validatedData); // Ensure immutability

  // Only log in development for better production security
  if (validatedData.ENVIRONMENT === "development") {
    console.log(`[32m Environment: ${validatedData.ENVIRONMENT}`);
  }

  return validatedData;
})();

// Environment convenience exports
export const isDevelopment = env.ENVIRONMENT === "development";
export const isPreview = env.ENVIRONMENT === "preview";
export const isProduction = env.ENVIRONMENT === "production";

/**
 * Returns a subset of environment variables that are safe to expose to the client.
 * SECURITY WARNING: Be careful what you expose here - never include API keys,
 * secrets, or sensitive information as these will be visible in the browser.
 */
export function getPublicEnv() {
  return {
    VALUE_FROM_CLOUDFLARE: env.VALUE_FROM_CLOUDFLARE,
    // ...existing code...
  };
}
