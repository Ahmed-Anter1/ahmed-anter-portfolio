import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio reads published projects from durable storage", async () => {
  const [page, schema, hosting] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
    readFile(new URL(".openai/hosting.json", root), "utf8"),
  ]);
  assert.match(page, /getPublishedProjects/);
  assert.match(schema, /sqliteTable\("projects"/);
  assert.equal(JSON.parse(hosting).d1, "DB");
});

test("dashboard and write endpoints require the server-side admin check", async () => {
  const [dashboard, collectionRoute, itemRoute, auth] = await Promise.all([
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/projects/route.ts", root), "utf8"),
    readFile(new URL("app/api/admin/projects/[id]/route.ts", root), "utf8"),
    readFile(new URL("app/chatgpt-auth.ts", root), "utf8"),
  ]);
  assert.match(dashboard, /requireAdmin/);
  assert.match(collectionRoute, /isAdmin/);
  assert.match(itemRoute, /isAdmin/);
  assert.match(auth, /oai-authenticated-user-email/);
  assert.match(auth, /ADMIN_EMAILS/);
});

test("initial migration includes the current portfolio projects", async () => {
  const migration = await readFile(new URL("drizzle/0000_flashy_killmonger.sql", root), "utf8");
  for (const title of ["Sale Stock Guard", "Customer Statement", "HR Management & Time Tracking System", "MAISYS — Medical AI System"]) assert.match(migration, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});
