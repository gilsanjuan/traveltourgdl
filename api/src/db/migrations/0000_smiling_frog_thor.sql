CREATE TABLE `quotes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`trip_type` text NOT NULL,
	`origin` text NOT NULL,
	`destination` text NOT NULL,
	`contact_name` text NOT NULL,
	`contact_phone` text NOT NULL,
	`contact_email` text,
	`passengers` integer NOT NULL,
	`departure_date` integer NOT NULL,
	`return_date` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
