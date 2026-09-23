export type PortfolioProject = {
  id: number;
  title: string;
  category: "odoo" | "web" | "ai";
  label: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  stack: string[];
};

const initialDate = "2026-09-01T00:00:00.000Z";

function project(id: number, title: string, category: PortfolioProject["category"], label: string, description: string, technologies: string[], repositoryUrl: string, imageUrl: string, liveUrl = ""): PortfolioProject {
  return { id, title, category, label, description, technologies, repositoryUrl, liveUrl, imageUrl, featured: true, published: true, sortOrder: id, createdAt: initialDate, updatedAt: initialDate, stack: technologies };
}

export const defaultProjects: PortfolioProject[] = [
  project(1, "Sale Stock Guard", "odoo", "Sales · Inventory", "Prevents sales workflows from confirming quantities that exceed available stock, with clear validation and predictable inventory behavior.", ["Odoo 18", "Python", "ORM", "XML"], "https://github.com/Ahmed-Anter1/odoo-sale-stock-guard", "/project-covers/sale-stock-guard.webp"),
  project(2, "Customer Statement", "odoo", "Accounting · Reporting", "A complete customer statement workflow that helps finance teams review balances, transactions, and partner account activity.", ["Odoo 18", "Python", "QWeb", "Accounting"], "https://github.com/Ahmed-Anter1/odoo-customer-statement", "/project-covers/customer-statement.webp"),
  project(3, "MRP Batch Scaling", "odoo", "Manufacturing", "Scales manufacturing quantities and component consumption consistently for changing production batch requirements.", ["Odoo 18", "MRP", "Python", "ORM"], "https://github.com/Ahmed-Anter1/odoo-mrp-batch-scaling", "/project-covers/mrp-batch-scaling.webp"),
  project(4, "WhatsApp Document Sharing", "odoo", "Integration · Documents", "Shares business documents through a controlled WhatsApp workflow with validation, secure payload handling, and operational feedback.", ["Odoo 18", "REST API", "QWeb", "Python"], "https://github.com/Ahmed-Anter1/odoo-whatsapp-document-sharing", "/project-covers/whatsapp-document-sharing.webp"),
  project(5, "Serial Quotation Workflow", "odoo", "Sales · Traceability", "Brings serial-controlled product selection into quotations to improve traceability before delivery and reduce fulfillment mistakes.", ["Odoo 18", "Sales", "Stock", "XML"], "https://github.com/Ahmed-Anter1/odoo-serial-quotation-workflow", "/project-covers/serial-quotation-workflow.webp"),
  project(6, "Automated Sales Returns", "odoo", "Returns · Accounting", "Coordinates product returns, reverse stock movements, and credit-note preparation through a guided business workflow.", ["Odoo 18", "Stock", "Accounting", "Python"], "https://github.com/Ahmed-Anter1/odoo-automated-sales-returns", "/project-covers/automated-sales-returns.webp"),
  project(7, "HR Management & Time Tracking System", "web", "Full-Stack · Desktop", "A comprehensive HR platform covering employee records, payroll operations, attendance, reporting, notifications, role-based access, and a companion Electron time-tracking application.", ["Node.js", "Express.js", "React", "MongoDB", "Electron", "Socket.IO"], "https://github.com/Ahmed-Anter1/HR-System1", "/project-covers/hr-management-time-tracking.webp"),
  project(8, "E-Commerce API & Dashboard", "web", "Full-Stack Web", "An e-commerce REST API and React dashboard with authentication, admin and user authorization, product workflows, wishlist management, and an embedded API testing interface.", ["Node.js", "Express.js", "MongoDB", "React", "JWT", "Bcrypt"], "https://github.com/Ahmed-Anter1/backend-e-commerce", "/project-covers/ecommerce-api-dashboard.webp"),
  project(9, "Nafsyetak Clinic", "web", "Freelance · Full-Stack Platform", "An end-to-end bilingual clinic platform with secure authentication, role-based admin workflows, service and booking management, MongoDB persistence, and protected email-based password recovery.", ["Node.js", "Express.js", "React 18", "MongoDB", "Mongoose", "JWT", "Nodemailer", "Vercel"], "https://github.com/Ahmed-Anter1/Nafsyetak-clinc", "/project-covers/nafsyetak-clinic-frontend.webp", "https://nafsyetak-clinic.vercel.app"),
  project(10, "Book Management API", "web", "Backend API", "A secured CRUD API for managing books and users, including registration, login, password hashing, JWT authentication, MongoDB persistence, and modular controllers.", ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"], "https://github.com/Ahmed-Anter1/Book-Management-with-authentication-App", "/project-covers/book-management-api.webp"),
  project(11, "MAISYS — Medical AI System", "ai", "Medical AI · Graduation Project", "A medical AI platform combining a medical chatbot, lab-test explanation, symptom checking, drug-interaction guidance, and research-paper assistance.", ["Artificial Intelligence", "Medical NLP", "React", "APIs"], "", "/project-covers/maisys-medical-ai.webp"),
];
