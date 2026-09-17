"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../../supabase";

export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    if (!password) { setError("Enter your password."); setBusy(false); return; }

    const { error: loginError } = await getSupabase().auth.signInWithPassword({
      email: "anterahmed818@gmail.com",
      password,
    });

    if (!loginError) window.location.replace("/portfolio-studio/dashboard");
    else { setError("Incorrect password. Please try again."); setBusy(false); }
  }

  return <section className="loginCard">
    <Link className="brand" href="/"><span>AA</span><strong>Ahmed Anter</strong></Link>
    <p className="eyebrow"><span /> Private dashboard</p>
    <h1>Welcome back.</h1><p>Enter your password to manage the projects shown on your portfolio.</p>
    <form onSubmit={submit}>
      <label>Password<input name="password" type="password" autoComplete="current-password" autoFocus required /></label>
      <button className="button primary" disabled={busy}>{busy ? "Opening dashboard..." : "Open dashboard"}</button>
      {error && <p className="loginError" role="alert">{error}</p>}
    </form>
    <Link className="backLink" href="/">← Back to portfolio</Link>
  </section>;
}
