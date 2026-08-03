import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category", { enum: ["odoo", "web", "ai"] }).notNull(),
  label: text("label").notNull().default(""),
  description: text("description").notNull(),
  technologies: text("technologies").notNull().default("[]"),
  repositoryUrl: text("repository_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
