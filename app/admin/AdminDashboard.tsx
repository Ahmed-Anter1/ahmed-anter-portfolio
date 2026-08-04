"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Project = { id: number; title: string; category: "odoo" | "web" | "ai"; label: string; description: string; stack: string[]; repositoryUrl: string; liveUrl: string; imageUrl: string; featured: boolean; published: boolean; sortOrder: number };
type Draft = Omit<Project, "id" | "stack"> & { technologies: string };
const empty: Draft = { title: "", category: "odoo", label: "", description: "", technologies: "", repositoryUrl: "", liveUrl: "", imageUrl: "", featured: true, published: true, sortOrder: 0 };

export default function AdminDashboard({ displayName }: { displayName: string }) {
  const [items, setItems] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Draft>(empty);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setBusy(true);
    const response = await fetch("/api/admin/projects", { cache: "no-store" });
    const data = await response.json();
    if (response.ok) setItems(data.projects); else setMessage(data.error ?? "Could not load projects.");
    setBusy(false);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const counts = useMemo(() => ({ all: items.length, live: items.filter((item) => item.published).length, drafts: items.filter((item) => !item.published).length }), [items]);

  function edit(item: Project) {
    setEditingId(item.id);
    setDraft({ ...item, technologies: item.stack.join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function reset() { setEditingId(null); setDraft(empty); setMessage(""); }
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch(editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects", { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    const data = response.status === 204 ? {} : await response.json();
    if (response.ok) { setMessage(editingId ? "Project updated." : "Project added."); reset(); await load(); }
    else { setMessage(data.error ?? "Could not save the project."); setBusy(false); }
  }
  async function remove(item: Project) {
    if (!confirm(`Delete “${item.title}”?`)) return;
    const response = await fetch(`/api/admin/projects/${item.id}`, { method: "DELETE" });
    if (response.ok) { setMessage("Project deleted."); await load(); } else setMessage("Could not delete the project.");
  }
  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return <main className="adminPage">
    <header className="adminTop"><a className="brand" href="/"><span>AA</span><strong>Portfolio Admin</strong></a><div><small>Signed in as {displayName}</small><button type="button" onClick={() => void signOut()}>Sign out</button></div></header>
    <section className="adminHero"><div><p className="eyebrow"><span /> Private dashboard</p><h1>Manage your portfolio.</h1><p>Add a project once and publish it instantly across your public portfolio.</p></div><div className="adminStats"><div><strong>{counts.all}</strong><span>Total</span></div><div><strong>{counts.live}</strong><span>Published</span></div><div><strong>{counts.drafts}</strong><span>Drafts</span></div></div></section>
    <section className="adminWorkspace">
      <form className="projectForm" onSubmit={save}>
        <div className="formTitle"><div><small>{editingId ? "EDIT PROJECT" : "NEW PROJECT"}</small><h2>{editingId ? "Update project" : "Add to portfolio"}</h2></div>{editingId && <button type="button" onClick={reset}>Cancel</button>}</div>
        <label>Project title<input required value={draft.title} onChange={(e) => setDraft({...draft, title: e.target.value})} placeholder="Customer Statement" /></label>
        <div className="formRow"><label>Category<select value={draft.category} onChange={(e) => setDraft({...draft, category: e.target.value as Draft["category"]})}><option value="odoo">Odoo / ERP</option><option value="web">Web Development</option><option value="ai">AI</option></select></label><label>Card label<input value={draft.label} onChange={(e) => setDraft({...draft, label: e.target.value})} placeholder="Accounting · Reporting" /></label></div>
        <label>Description<textarea required rows={5} value={draft.description} onChange={(e) => setDraft({...draft, description: e.target.value})} placeholder="What the project solves and how it helps..." /></label>
        <label>Technologies <small>Separate with commas</small><input value={draft.technologies} onChange={(e) => setDraft({...draft, technologies: e.target.value})} placeholder="Odoo 18, Python, QWeb" /></label>
        <label>GitHub repository<input type="url" value={draft.repositoryUrl} onChange={(e) => setDraft({...draft, repositoryUrl: e.target.value})} placeholder="https://github.com/..." /></label>
        <div className="formRow"><label>Live URL<input type="url" value={draft.liveUrl} onChange={(e) => setDraft({...draft, liveUrl: e.target.value})} placeholder="https://..." /></label><label>Image URL<input type="url" value={draft.imageUrl} onChange={(e) => setDraft({...draft, imageUrl: e.target.value})} placeholder="https://..." /></label></div>
        <div className="formRow"><label>Display order<input type="number" value={draft.sortOrder} onChange={(e) => setDraft({...draft, sortOrder: Number(e.target.value)})} /></label><div className="checkGroup"><label><input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({...draft, featured: e.target.checked})} /> Featured</label><label><input type="checkbox" checked={draft.published} onChange={(e) => setDraft({...draft, published: e.target.checked})} /> Published</label></div></div>
        <button className="button primary" disabled={busy}>{busy ? "Saving..." : editingId ? "Save changes" : "Add project"}</button>{message && <p className="formMessage" role="status">{message}</p>}
      </form>
      <div className="adminList"><div className="listHead"><div><small>YOUR WORK</small><h2>All projects</h2></div><button onClick={() => void load()} disabled={busy}>Refresh</button></div>{busy && !items.length ? <p className="emptyState">Loading your projects...</p> : items.map((item) => <article className="adminProject" key={item.id}><div className="adminProjectTop"><span className={`status ${item.published ? "live" : "draft"}`}>{item.published ? "Published" : "Draft"}</span><small>{item.category.toUpperCase()} · #{item.sortOrder}</small></div><h3>{item.title}</h3><p>{item.description}</p><div className="adminTags">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="adminActions"><button onClick={() => edit(item)}>Edit</button><button className="danger" onClick={() => void remove(item)}>Delete</button></div></article>)}</div>
    </section>
  </main>;
}
