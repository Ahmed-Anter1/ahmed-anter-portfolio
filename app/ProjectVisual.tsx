type ProjectVisualProps = {
  title: string;
  category: "odoo" | "web" | "ai";
  label: string;
  imageUrl?: string;
};

type PreviewConfig = {
  app: string;
  section: string;
  action: string;
  stats: [string, string][];
  columns: string[];
  rows: [string, string, string][];
};

const previews: Record<string, PreviewConfig> = {
  "Sale Stock Guard": { app: "Odoo", section: "Sales / Inventory", action: "New quotation", stats: [["Available", "248"], ["Reserved", "61"], ["Blocked", "3"]], columns: ["Product", "Requested", "On hand"], rows: [["Office Chair", "12", "38"], ["Storage Box", "25", "18"], ["Desk Lamp", "8", "46"]] },
  "Customer Statement": { app: "Odoo", section: "Accounting / Partners", action: "Export PDF", stats: [["Balance", "$24.8K"], ["Overdue", "$3.2K"], ["Invoices", "18"]], columns: ["Document", "Due date", "Balance"], rows: [["INV/2026/041", "Sep 18", "$4,850"], ["INV/2026/037", "Sep 04", "$2,100"], ["PAY/2026/019", "Aug 29", "-$1,250"]] },
  "MRP Batch Scaling": { app: "Odoo", section: "Manufacturing / Orders", action: "Scale batch", stats: [["Batch", "2.5×"], ["Components", "14"], ["Ready", "92%"]], columns: ["Component", "Required", "Reserved"], rows: [["Raw Material A", "125 kg", "125 kg"], ["Packaging", "500", "500"], ["Additive C", "7.5 kg", "6.8 kg"]] },
  "WhatsApp Document Sharing": { app: "Odoo", section: "Documents / Sharing", action: "Send document", stats: [["Queued", "4"], ["Delivered", "126"], ["Failed", "1"]], columns: ["Document", "Recipient", "Status"], rows: [["Quotation S041", "+966 ••• 218", "Delivered"], ["Invoice I118", "+20 ••• 774", "Delivered"], ["Order PO32", "+218 ••• 901", "Queued"]] },
  "Serial Quotation Workflow": { app: "Odoo", section: "Sales / Quotations", action: "Add serial", stats: [["Lines", "7"], ["Assigned", "6"], ["Pending", "1"]], columns: ["Product", "Serial", "Status"], rows: [["Device Pro", "SN-24081", "Assigned"], ["Device Pro", "SN-24084", "Assigned"], ["Control Unit", "Not selected", "Pending"]] },
  "Automated Sales Returns": { app: "Odoo", section: "Sales / Returns", action: "Create return", stats: [["Received", "16"], ["Refunded", "12"], ["Review", "4"]], columns: ["Return", "Customer", "Stage"], rows: [["RET/0019", "Delta Market", "Refunded"], ["RET/0020", "North Trade", "Received"], ["RET/0021", "Green Point", "Review"]] },
  "HR Management & Time Tracking System": { app: "HR Workspace", section: "Team / Time tracking", action: "Add employee", stats: [["Employees", "48"], ["Present", "43"], ["Hours", "326"]], columns: ["Employee", "Today", "Status"], rows: [["Mona Hassan", "08:12", "Active"], ["Omar Khaled", "07:48", "Active"], ["Sara Ali", "06:35", "On break"]] },
  "E-Commerce API & Dashboard": { app: "Commerce Admin", section: "Orders / Overview", action: "Add product", stats: [["Revenue", "$18.4K"], ["Orders", "286"], ["Pending", "14"]], columns: ["Order", "Customer", "Status"], rows: [["#1048", "Ahmed Samir", "Paid"], ["#1047", "Nour Adel", "Processing"], ["#1046", "Hana Tarek", "Shipped"]] },
  "Nafsyetak Clinic": { app: "Nafsyetak", section: "Clinic / Appointments", action: "New booking", stats: [["Today", "12"], ["Confirmed", "9"], ["Waiting", "3"]], columns: ["Patient", "Time", "Status"], rows: [["Patient #184", "10:30", "Confirmed"], ["Patient #201", "11:15", "Waiting"], ["Patient #176", "12:00", "Confirmed"]] },
  "Book Management API": { app: "Books API", section: "API / Request history", action: "New request", stats: [["Endpoints", "14"], ["Uptime", "99.9%"], ["Avg", "84 ms"]], columns: ["Method", "Endpoint", "Result"], rows: [["GET", "/api/books", "200 OK"], ["POST", "/api/auth/login", "200 OK"], ["PATCH", "/api/books/:id", "204"]] },
  "MAISYS — Medical AI System": { app: "MAISYS", section: "Medical AI workspace", action: "Start session", stats: [["Tools", "5"], ["Sources", "Verified"], ["Mode", "Research"]], columns: ["Tool", "Last activity", "Status"], rows: [["Lab test explainer", "2 min ago", "Ready"], ["Symptom checker", "Yesterday", "Ready"], ["Research assistant", "Sep 16", "Ready"]] },
};

const fallback: PreviewConfig = { app: "Project Workspace", section: "Dashboard / Overview", action: "Open project", stats: [["Tasks", "24"], ["Complete", "18"], ["Review", "6"]], columns: ["Item", "Updated", "Status"], rows: [["Core workflow", "Today", "Complete"], ["API integration", "Yesterday", "Review"], ["Documentation", "Sep 15", "Complete"]] };

export default function ProjectVisual({ title, category, label, imageUrl = "" }: ProjectVisualProps) {
  const isCustomImage = Boolean(imageUrl) && !imageUrl.startsWith("/project-covers/");
  if (isCustomImage) return <div className="projectMedia"><img src={imageUrl} alt={`${title} screenshot`} loading="lazy" /></div>;

  const preview = previews[title] ?? fallback;
  if (category === "ai") return <AiPreview title={title} label={label} />;
  if (category === "web" && title.includes("API")) return <ApiPreview title={title} preview={preview} />;
  if (category === "web") return <WebAppPreview title={title} label={label} preview={preview} />;
  return <OdooPreview title={title} label={label} preview={preview} />;
}

function OdooPreview({ title, label, preview }: { title: string; label: string; preview: PreviewConfig }) {
  return <div className="projectMedia projectPreview preview-odoo" aria-label={`${title} Odoo interface preview`}>
    <div className="previewTopbar"><strong>{preview.app}</strong><span>{preview.section}</span><i>•••</i></div>
    <div className="previewWorkspace">
      <aside><b>{title.slice(0, 1)}</b><span className="active"/><span/><span/><span/></aside>
      <section>
        <header><div><small>{label}</small><strong>{title}</strong></div><em>{preview.action}</em></header>
        <div className="previewStats">{preview.stats.map(([name, value]) => <div key={name}><small>{name}</small><b>{value}</b></div>)}</div>
        <div className="previewTable">
          <div className="previewRow previewHead">{preview.columns.map((column) => <span key={column}>{column}</span>)}</div>
          {preview.rows.map((row) => <div className="previewRow" key={row.join("")}><span>{row[0]}</span><span>{row[1]}</span><span className="previewStatus">{row[2]}</span></div>)}
        </div>
      </section>
    </div>
  </div>;
}

function WebAppPreview({ title, label, preview }: { title: string; label: string; preview: PreviewConfig }) {
  return <div className="projectMedia webAppPreview" aria-label={`${title} web application preview`}>
    <div className="browserBar"><span className="browserDots"><i/><i/><i/></span><small>app.local/dashboard</small><b>↗</b></div>
    <div className="webAppBody">
      <nav><strong>{preview.app}</strong><span className="selected">Overview</span><span>Activity</span><span>Reports</span></nav>
      <section>
        <header><div><small>{label}</small><b>{title}</b></div><em>{preview.action}</em></header>
        <div className="webAppMetrics">{preview.stats.map(([name, value]) => <div key={name}><span>{name}</span><strong>{value}</strong></div>)}</div>
        <div className="webAppContent">
          <div className="miniChart"><span style={{height:"32%"}}/><span style={{height:"48%"}}/><span style={{height:"40%"}}/><span style={{height:"67%"}}/><span style={{height:"57%"}}/><span style={{height:"82%"}}/><span style={{height:"72%"}}/></div>
          <div className="activityList">{preview.rows.map((row) => <div key={row.join("")}><b>{row[0]}</b><span>{row[1]}</span><em>{row[2]}</em></div>)}</div>
        </div>
      </section>
    </div>
  </div>;
}

function ApiPreview({ title, preview }: { title: string; preview: PreviewConfig }) {
  const endpoint = title.startsWith("Book") ? "/api/books" : "/api/orders";
  return <div className="projectMedia apiPreview" aria-label={`${title} API console preview`}>
    <div className="apiTop"><strong>{preview.app}</strong><span>API Console</span><i>development</i></div>
    <div className="apiWorkspace">
      <aside><small>COLLECTIONS</small><b>Authentication</b><b className="active">{title.startsWith("Book") ? "Books" : "Orders"}</b><b>Users</b></aside>
      <section>
        <div className="requestLine"><strong>GET</strong><span>{endpoint}</span><em>Send</em></div>
        <div className="apiTabs"><b>Body</b><span>Headers</span><span>Tests</span><i>200 OK · 84 ms</i></div>
        <pre>{`{\n  "success": true,\n  "count": 3,\n  "data": [ ... ]\n}`}</pre>
      </section>
    </div>
  </div>;
}

function AiPreview({ title, label }: { title: string; label: string }) {
  return <div className="projectMedia aiWorkspace" aria-label={`${title} medical AI workspace preview`}>
    <div className="aiTop"><strong>MAISYS</strong><span>{label}</span><i>● System ready</i></div>
    <div className="aiBody">
      <aside><small>MEDICAL TOOLS</small><b className="active">Medical chat</b><b>Lab explainer</b><b>Symptoms</b><b>Drug checker</b><b>Research papers</b></aside>
      <section>
        <header><div><small>ASSISTANT SESSION</small><strong>Medical information workspace</strong></div><span>New session</span></header>
        <div className="aiMessage userMessage">Explain these lab results in simple terms.</div>
        <div className="aiMessage assistantMessage"><b>MA</b><p>I can help explain the values and highlight questions to discuss with your doctor.</p></div>
        <div className="aiInput"><span>Ask a medical question...</span><b>↑</b></div>
      </section>
    </div>
  </div>;
}
