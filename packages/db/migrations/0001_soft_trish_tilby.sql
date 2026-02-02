CREATE TABLE `eventType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type_name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `foodevent` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`event_start` integer,
	`event_end` integer,
	`event_type` integer,
	`event_stage` integer,
	`time_slots` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`event_type`) REFERENCES `eventType`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`event_stage`) REFERENCES `eventType`(`id`) ON UPDATE no action ON DELETE no action
);
