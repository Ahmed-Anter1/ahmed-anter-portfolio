import AdminDashboard from "../../admin/AdminDashboard";
import { redirect } from "next/navigation";
import { hasAdminSession } from "../../admin-session";

export const dynamic = "force-dynamic";

export default async function PortfolioStudioDashboardPage() {
  if (!await hasAdminSession()) redirect("/portfolio-studio");
  return <AdminDashboard displayName="Ahmed Anter" />;
}
