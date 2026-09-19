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
  "Nafsyetak Clinic Frontend": { app: "Nafsyetak", section: "Clinic / Appointments", action: "New booking", stats: [["Today", "12"], ["Confirmed", "9"], ["Waiting", "3"]], columns: ["Patient", "Time", "Status"], rows: [["Patient #184", "10:30", "Confirmed"], ["Patient #201", "11:15", "Waiting"], ["Patient #176", "12:00", "Confirmed"]] },
  "Book Management API": { app: "Books API", section: "API / Request history", action: "New request", stats: [["Endpoints", "14"], ["Uptime", "99.9%"], ["Avg", "84 ms"]], columns: ["Method", "Endpoint", "Result"], rows: [["GET", "/api/books", "200 OK"], ["POST", "/api/auth/login", "200 OK"], ["PATCH", "/api/books/:id", "204"]] },
  "MAISYS — Medical AI System": { app: "MAISYS", section: "Medical AI workspace", action: "Start session", stats: [["Tools", "5"], ["Sources", "Verified"], ["Mode", "Research"]], columns: ["Tool", "Last activity", "Status"], rows: [["Lab test explainer", "2 min ago", "Ready"], ["Symptom checker", "Yesterday", "Ready"], ["Research assistant", "Sep 16", "Ready"]] },
};

const fallback: PreviewConfig = { app: "Project Workspace", section: "Dashboard / Overview", action: "Open project", stats: [["Tasks", "24"], ["Complete", "18"], ["Review", "6"]], columns: ["Item", "Updated", "Status"], rows: [["Core workflow", "Today", "Complete"], ["API integration", "Yesterday", "Review"], ["Documentation", "Sep 15", "Complete"]] };

export default function ProjectVisual({ title, category, label, imageUrl = "" }: ProjectVisualProps) {
  const isCustomImage = Boolean(imageUrl) && !imageUrl.startsWith("/project-covers/");
  if (isCustomImage) return <div className="projectMedia"><img src={imageUrl} alt={`${title} screenshot`} loading="lazy" /></div>;

  const preview = previews[title] ?? fallback;
  return <div className={`projectMedia projectPreview preview-${category}`} aria-label={`${title} interface preview`}>
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
