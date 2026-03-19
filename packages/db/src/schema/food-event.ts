import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { autoIncrementId, createdAt, timestamp, updatedAt } from "../helpers";
import { eventStage } from "./event-stage";
import { eventType } from "./event-type";

export type EventType = "pickup" | "drive-thru" | "error";
export type EventStage =
  | "planning"
  | "open-for-requests"
  | "open-for-pickups"
  | "event-finished";

type TimeSlot = { time: number; slot: string };

export const FoodEventTable = sqliteTable("foodevent", {
  id: autoIncrementId("id"),
  name: text("name").notNull(),
  eventStart: timestamp("event_start"),
  eventEnd: timestamp("event_end"),
  eventType: integer("event_type").references(() => eventType.id),
  eventStage: integer("event_stage").references(() => eventStage.id),
  timeSlots: text("time_slots", { mode: "json" })
    .notNull()
    .$type<TimeSlot[]>()
    .default(sql`'[]'`),
});
