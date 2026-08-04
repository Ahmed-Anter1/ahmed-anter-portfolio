"use client";

import { FormEvent, useState } from "react";
import { getSupabase } from "../../supabase";

export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim().toLowerCase();
    const password = String(form.get("password"));
    const action = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? "login";
    if (action === "signup") {
      if (email !== "anterahmed818@gmail.com") { setError("Only the portfolio owner can create the admin account."); setBusy(false); return; }
      const { data, error: signupError } = await getSupabase().auth.signUp({ email, password });
      if (signupError) setError(signupError.message);
      else if (data.session) window.location.href = "/admin";
      else setError("Account created. Open the confirmation email, then sign in here.");
      setBusy(false); return;
    }
    const { error: loginError } = await getSupabase().auth.signInWithPassword({ email, password });
    if (!loginError) window.location.href = "/admin";
    else { setError("Incorrect email or password. Use first-time setup if the account does not exist yet."); setBusy(false); }
  }

  return <section className="loginCard">
    <a className="brand" href="/"><span>AA</span><strong>Ahmed Anter</strong></a>
    <p className="eyebrow"><span /> Private dashboard</p>
    <h1>Welcome back.</h1><p>Sign in to manage the projects shown on your portfolio.</p>
    <form onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="username" required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="button primary" name="action" value="login" disabled={busy}>{busy ? "Please wait..." : "Sign in"}</button>
      <button className="button secondary" name="action" value="signup" disabled={busy}>First-time setup</button>
      {error && <p className="loginError" role="alert">{error}</p>}
    </form>
    <a className="backLink" href="/">← Back to portfolio</a>
  </section>;
}
