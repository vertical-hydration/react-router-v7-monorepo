import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { autoIncrementId, createdAt, updatedAt } from "../helpers";

// Table
export const eventType = sqliteTable("eventType", {
  id: autoIncrementId("id"),
  name: text("type_name").notNull(),
  createdAt,
  updatedAt,
});
