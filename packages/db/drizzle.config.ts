import type { Config } from "drizzle-kit";
import { defineConfig } from 'drizzle-kit';

const LOCAL_DB_PATH = String(process.env.LOCAL_DB_PATH || '');


export default defineConfig(
  process.env.LOCAL_DB_PATH // Check if LOCAL_DB_PATH is set
  ?
 {
  schema: "./src/schema/*.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials:{
    url: LOCAL_DB_PATH
  }

}
:{
  schema: "./src/schema/*.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials:{
    url:LOCAL_DB_PATH
  }
}
);
