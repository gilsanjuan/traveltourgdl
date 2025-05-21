import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const quotes = sqliteTable("quotes", {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tripType: text('trip_type', { enum: [
    "punto-punto", 
    "fuera-ciudad"
  ]}).notNull(),
  origin: text('origin').notNull(),
  destination: text('destination').notNull(),
  contactName: text('contact_name').notNull(),
  contactPhone: text('contact_phone').notNull(),
  contactEmail: text('contact_email'),
  passengers: integer('passengers').notNull(),
  departureDate: integer('departure_date', { mode: 'timestamp' }).notNull(),
  returnDate: integer('return_date', { mode: 'timestamp' }).notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  // status: text({ enum: [
  //   "pending",
  //   "on-hold",
  //   "confirmed", 
  //   "canceled"
  // ]}).default("pending"),
});

export const quotesSelectSchema = createSelectSchema(quotes);
export const quotesInsertSchema = createInsertSchema(quotes);

export type Quote = typeof quotes.$inferSelect;
export type QuoteInsert = typeof quotes.$inferInsert;