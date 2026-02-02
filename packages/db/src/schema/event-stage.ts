import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { autoIncrementId, createdAt, updatedAt } from "../helpers";


// Table
export const eventStage = sqliteTable("eventType",{
	id: autoIncrementId("id"),
	name: text("type_name").notNull(),
	order: integer("order").notNull(),
	createdAt,
	updatedAt,
})