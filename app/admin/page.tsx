import { requireAdmin } from "../admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  return <AdminDashboard displayName="Ahmed Anter" />;
}
