"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = await response.json();
    if (response.ok) window.location.href = "/admin";
    else { setError(data.error ?? "Unable to sign in."); setBusy(false); }
  }

  return <section className="loginCard">
    <a className="brand" href="/"><span>AA</span><strong>Ahmed Anter</strong></a>
    <p className="eyebrow"><span /> Private dashboard</p>
    <h1>Welcome back.</h1><p>Sign in to manage the projects shown on your portfolio.</p>
    <form onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="username" required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="button primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      {error && <p className="loginError" role="alert">{error}</p>}
    </form>
    <a className="backLink" href="/">← Back to portfolio</a>
  </section>;
}
