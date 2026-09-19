import LoginForm from "../admin/login/LoginForm";
import { redirect } from "next/navigation";
import { hasAdminSession } from "../admin-session";

export const dynamic = "force-dynamic";

export default async function PortfolioStudioLoginPage() {
  if (await hasAdminSession()) redirect("/portfolio-studio/dashboard");
  return <main className="adminLoginPage"><LoginForm /></main>;
}
