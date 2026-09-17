import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio reads published projects from Supabase", async () => {
  const [page, projects, client] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/projects.ts", root), "utf8"),
    readFile(new URL("app/supabase.ts", root), "utf8"),
  ]);
  assert.match(page, /getPublishedProjects/);
  assert.match(projects, /from\("projects"\)/);
  assert.match(client, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
});

test("dashboard uses authenticated Supabase operations", async () => {
  const [dashboard, login] = await Promise.all([
    readFile(new URL("app/admin/AdminDashboard.tsx", root), "utf8"),
    readFile(new URL("app/admin/login/LoginForm.tsx", root), "utf8"),
  ]);
  assert.match(dashboard, /auth\.getUser/);
  assert.match(dashboard, /auth\.signOut/);
  assert.match(login, /signInWithPassword/);
  assert.doesNotMatch(login, /name="email"|First-time setup|auth\.signUp/);
  assert.match(login, /portfolio-studio\/dashboard/);
  assert.doesNotMatch(dashboard + login, /ADMIN_PASSWORD_HASH|service_role/);
});
