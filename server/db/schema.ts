import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Drizzle schemas 👇🏻
export const eventsTable = pgTable(
  "events",
  {
    eventId: serial("event_id").primaryKey(),
    eventName: text("event_name").notNull(),
    eventDescription: text("event_description"),
    eventImg: text("event_imgUrl").default(
      "https://saffronweddingstyle.com/wp-content/uploads/2023/08/corporate-event-planning.jpg",
    ),
    eventPrice: integer("event_price").notNull().default(1),
    eventLocation: text("event_location").notNull(),
    eventDateStart: date("event_date_start").notNull(),
    eventTimeStart: time("event_time_start").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("eventName_search_index").using(
      "gin",
      sql`to_tsvector
        ('english', ${table.eventName})`,
    ),
  ],
);

export const eventUserTable = pgTable(
  "event_user",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => eventsTable.eventId, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    subscriptionCreatedAt: timestamp("subscription_created_at", {withTimezone: true}).defaultNow().notNull()
  },
  (t) => [unique("event_user_unique").on(t.eventId, t.userId)],
);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: text("role"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Zod schemas 👇🏻
export const eventsPostSchema = createInsertSchema(eventsTable, {
  eventName: (schema) =>
    schema
      .min(3, "Event name must be at least 3 chars long")
      .max(30, "Event name can't be longer than 30 characters"),
  eventPrice: (schema) =>
    schema.nonnegative("Input must be non-negative number"),
  eventLocation: (schema) =>
    schema
      .min(3, "Location must be at least 3 chars long")
      .max(20, "Location can't be more than 20 chars long"),
  eventImg: (schema) => schema.url("Must be a valid URL").optional(),
  eventDescription: (schema) => schema.optional(),
  eventDateStart: (schema) => schema.date("Must be a date in YY-MM-DD format"),
  eventTimeStart: (schema) =>
    schema.time({ message: "Must be time in format 00:00 or 00:00:00" }),
});

export const eventUpdateSchema = createUpdateSchema(eventsTable, {
  eventName: (schema) =>
    schema
      .min(3, "Event name must be at least 3 chars long")
      .max(30, "Event name can't be longer than 30 characters")
      .optional(),
  eventPrice: (schema) => schema.nonnegative().optional(),
  eventLocation: (schema) =>
    schema
      .min(3, "Location must be at least 3 chars long")
      .max(20, "Location can't be more than 20 chars long")
      .optional(),
  eventImg: (schema) => schema.url("Must be a valid URL").optional(),
  eventDescription: (schema) => schema.optional(),
  eventDateStart: (schema) =>
    schema.date("Must be a date in YY-MM-DD format").optional(),
  eventTimeStart: (schema) =>
    schema
      .time({ message: "Must be time in format 00:00 or 00:00:00" })
      .optional(),
});

export const eventSelectSchema = createSelectSchema(eventsTable);

export const eventUserSelectSchema = createSelectSchema(eventUserTable);
export const eventUserPostSchema = createInsertSchema(eventUserTable);
export const stripeInsertSchema = eventsPostSchema.pick({
  eventName: true,
  eventPrice: true,
  eventImg: true,
  eventId: true,
});
