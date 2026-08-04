import { redirect } from "next/navigation";
import { isAdmin } from "../../admin-auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <main className="adminLoginPage"><LoginForm /></main>;
}
