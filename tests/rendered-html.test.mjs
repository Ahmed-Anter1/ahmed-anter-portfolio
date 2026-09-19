import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio reads published projects from durable storage", async () => {
  const [page, projects, store] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/projects.ts", root), "utf8"),
    readFile(new URL("app/project-store.ts", root), "utf8"),
  ]);
  assert.match(page, /getPublishedProjects/);
  assert.match(projects, /readProjects/);
  assert.match(store, /@vercel\/blob/);
  assert.match(store, /BLOB_READ_WRITE_TOKEN/);
});

test("dashboard uses password-only server authentication", async () => {
  const [dashboard, login, session] = await Promise.all([
    readFile(new URL("app/admin/AdminDashboard.tsx", root), "utf8"),
    readFile(new URL("app/admin/login/LoginForm.tsx", root), "utf8"),
    readFile(new URL("app/admin-session.ts", root), "utf8"),
  ]);
  assert.match(dashboard, /\/api\/admin\/projects/);
  assert.match(dashboard, /\/api\/admin\/logout/);
  assert.match(login, /\/api\/admin\/login/);
  assert.match(session, /httpOnly: true/);
  assert.match(session, /ADMIN_PASSWORD/);
  assert.doesNotMatch(login, /name="email"|First-time setup|signInWithPassword/);
  assert.match(login, /portfolio-studio\/dashboard/);
  assert.doesNotMatch(dashboard + login, /anterahmed818|ADMIN_PASSWORD/);
});
