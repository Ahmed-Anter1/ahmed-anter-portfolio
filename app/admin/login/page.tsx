import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  return <main className="adminLoginPage"><LoginForm /></main>;
}
