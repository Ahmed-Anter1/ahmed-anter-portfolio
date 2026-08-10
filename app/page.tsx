import { getPublishedProjects } from "./projects";

const fallbackFeaturedProjects = [
  {
    title: "Sale Stock Guard",
    tag: "Sales · Inventory",
    description:
      "Prevents sales workflows from confirming quantities that exceed available stock, with clear validation and predictable inventory behavior.",
    stack: ["Odoo 18", "Python", "ORM", "XML"],
    href: "https://github.com/Ahmed-Anter1/odoo-sale-stock-guard",
  },
  {
    title: "Customer Statement",
    tag: "Accounting · Reporting",
    description:
      "A complete customer statement workflow that helps finance teams review balances, transactions, and partner account activity.",
    stack: ["Odoo 18", "Python", "QWeb", "Accounting"],
    href: "https://github.com/Ahmed-Anter1/odoo-customer-statement",
  },
  {
    title: "MRP Batch Scaling",
    tag: "Manufacturing",
    description:
      "Scales manufacturing quantities and component consumption consistently for changing production batch requirements.",
    stack: ["Odoo 18", "MRP", "Python", "ORM"],
    href: "https://github.com/Ahmed-Anter1/odoo-mrp-batch-scaling",
  },
  {
    title: "WhatsApp Document Sharing",
    tag: "Integration · Documents",
    description:
      "Shares business documents through a controlled WhatsApp workflow with validation, secure payload handling, and operational feedback.",
    stack: ["Odoo 18", "REST API", "QWeb", "Python"],
    href: "https://github.com/Ahmed-Anter1/odoo-whatsapp-document-sharing",
  },
  {
    title: "Serial Quotation Workflow",
    tag: "Sales · Traceability",
    description:
      "Brings serial-controlled product selection into quotations to improve traceability before delivery and reduce fulfillment mistakes.",
    stack: ["Odoo 18", "Sales", "Stock", "XML"],
    href: "https://github.com/Ahmed-Anter1/odoo-serial-quotation-workflow",
  },
  {
    title: "Automated Sales Returns",
    tag: "Returns · Accounting",
    description:
      "Coordinates product returns, reverse stock movements, and credit-note preparation through a guided business workflow.",
    stack: ["Odoo 18", "Stock", "Accounting", "Python"],
    href: "https://github.com/Ahmed-Anter1/odoo-automated-sales-returns",
  },
];

const caseStudies = [
  "Sales, Inventory & Accounting Automation",
  "Multi-Pricelist & UoM Pricing",
  "Serial Return Wizard",
  "Partner Phone Search",
  "Negative Stock Control",
  "Inventory Pricelist Visibility",
  "Product Brand Inventory",
  "Landed Cost Currency",
  "Financial Reporting",
  "Merged Invoice Reporting",
  "Employee Sales Commission",
  "MRP WhatsApp Workflow",
  "Role-Based Access Control",
  "Sensitive Data & Menu Security",
];

const fallbackWebProjects = [
  {
    title: "HR Management & Time Tracking System",
    type: "Full-Stack · Desktop",
    description:
      "A comprehensive HR platform covering employee records, payroll operations, attendance, reporting, notifications, role-based access, and a companion Electron time-tracking application.",
    stack: ["Node.js", "Express.js", "React", "MongoDB", "Electron", "Socket.IO"],
    href: "https://github.com/Ahmed-Anter1/HR-System1",
  },
  {
    title: "E-Commerce API & Dashboard",
    type: "Full-Stack Web",
    description:
      "An e-commerce REST API and React dashboard with authentication, admin and user authorization, product workflows, wishlist management, and an embedded API testing interface.",
    stack: ["Node.js", "Express.js", "MongoDB", "React", "JWT", "Bcrypt"],
    href: "https://github.com/Ahmed-Anter1/backend-e-commerce",
  },
  {
    title: "Nafsyetak Clinic Frontend",
    type: "React Application",
    description:
      "A responsive clinic interface with authentication, protected routes, admin navigation, service pages, forms, charts, and an API integration architecture.",
    stack: ["React 18", "React Router", "Axios", "i18next", "Recharts"],
    href: "https://github.com/Ahmed-Anter1/Nafsyetak2",
  },
  {
    title: "Book Management API",
    type: "Backend API",
    description:
      "A secured CRUD API for managing books and users, including registration, login, password hashing, JWT authentication, MongoDB persistence, and modular controllers.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
    href: "https://github.com/Ahmed-Anter1/Book-Management-with-authentication-App",
  },
];

const skills = [
  "Odoo Development",
  "Python",
  "Odoo ORM",
  "PostgreSQL",
  "XML / QWeb",
  "JavaScript / OWL",
  "REST APIs",
  "Odoo.sh",
  "Git & GitHub",
  "ERP Workflows",
  "Node.js / Express.js",
  "React.js",
  "MongoDB / Mongoose",
];

export const dynamic = "force-dynamic";

export default async function Home() {
  let storedProjects: Awaited<ReturnType<typeof getPublishedProjects>> = [];
  let databaseAvailable = true;
  try { storedProjects = await getPublishedProjects(); } catch { databaseAvailable = false; }
  const odooProjects = storedProjects.filter((item) => item.category === "odoo");
  const managedWebProjects = storedProjects.filter((item) => item.category === "web");
  const aiProjects = storedProjects.filter((item) => item.category === "ai");
  const visibleOdooProjects = databaseAvailable ? odooProjects.map((item) => ({ title: item.title, tag: item.label, description: item.description, stack: item.stack, href: item.repositoryUrl || item.liveUrl, imageUrl: item.imageUrl })) : fallbackFeaturedProjects.map((item) => ({ ...item, imageUrl: "" }));
  const visibleWebProjects = databaseAvailable ? managedWebProjects.map((item) => ({ title: item.title, type: item.label, description: item.description, stack: item.stack, href: item.repositoryUrl || item.liveUrl, imageUrl: item.imageUrl })) : fallbackWebProjects.map((item) => ({ ...item, imageUrl: "" }));
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Ahmed Anter home">
          <span>AA</span>
          <strong>Ahmed Anter</strong>
        </a>
        <div className="navLinks">
          <a href="#work">Odoo</a>
          <a href="#web-work">Web</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="navCta" href="/Ahmed_Anter_Odoo_Developer_CV.docx" download>
          Download CV
        </a>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span /> Odoo Developer · Cairo, Egypt</p>
          <h1>I build reliable ERP workflows and practical web applications.</h1>
          <p className="heroText">
            Odoo developer with backend and React experience, focused on reliable
            business automation, APIs, and maintainable software products.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#work">Explore my work <span>↘</span></a>
            <a className="button secondary" href="https://github.com/Ahmed-Anter1" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="heroPanel" aria-label="Developer profile summary">
          <div className="panelTop"><span className="dot red"/><span className="dot amber"/><span className="dot green"/><small>developer.profile</small></div>
          <div className="codeBlock">
            <p><b>const</b> developer = {'{'}</p>
            <p className="indent">name: <em>&quot;Ahmed Anter&quot;</em>,</p>
            <p className="indent">focus: <em>&quot;Odoo ERP&quot;</em>,</p>
            <p className="indent">versions: [<em>&quot;18&quot;</em>, <em>&quot;19&quot;</em>],</p>
            <p className="indent">workflow: <em>&quot;Odoo.sh + Git&quot;</em>,</p>
            <p className="indent">status: <em>&quot;Open to opportunities&quot;</em></p>
            <p>{'};'}</p>
          </div>
          <div className="availability"><span/> Available for Odoo Developer roles</div>
        </div>
      </section>

      <section className="metrics shell" aria-label="Portfolio overview">
        <div><strong>{visibleOdooProjects.length}</strong><span>Complete public addons</span></div>
        <div><strong>14+</strong><span>Technical case studies</span></div>
        <div><strong>{visibleWebProjects.length}</strong><span>Selected web projects</span></div>
        <div><strong>1</strong><span>Medical AI platform</span></div>
      </section>

      <section className="section shell" id="work">
        <div className="sectionHead">
          <div><p className="eyebrow"><span /> Selected work</p><h2>Installable Odoo addons</h2></div>
          <p>Independent portfolio implementations built to demonstrate real ERP problem-solving without exposing proprietary client code.</p>
        </div>
        <div className="projectGrid">
          {visibleOdooProjects.map((project, index) => (
            <article className="projectCard" key={project.title}>
              {project.imageUrl && <div className="projectMedia"><img src={project.imageUrl} alt={`${project.title} screenshot`} loading="lazy" /></div>}
              <div className="projectNumber">0{index + 1}</div>
              <p className="projectTag">{project.tag}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>View repository <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell caseSection">
        <div className="sectionHead compact">
          <div><p className="eyebrow"><span /> More solutions</p><h2>Odoo case studies</h2></div>
          <a href="https://github.com/Ahmed-Anter1/Odoo/tree/main/projects" target="_blank" rel="noreferrer">Browse all on GitHub ↗</a>
        </div>
        <div className="caseGrid">
          {caseStudies.map((study) => <div className="caseItem" key={study}><span>◆</span>{study}</div>)}
        </div>
      </section>

      <section className="section shell webSection" id="web-work">
        <div className="sectionHead">
          <div><p className="eyebrow"><span /> Web development</p><h2>Backend &amp; React projects</h2></div>
          <p>Selected applications built with Node.js, Express.js, MongoDB, and React—from secured REST APIs to complete operational dashboards.</p>
        </div>
        <div className="webGrid">
          {visibleWebProjects.map((project, index) => (
            <article className="webCard" key={project.title}>
              {project.imageUrl && <div className="projectMedia"><img src={project.imageUrl} alt={`${project.title} screenshot`} loading="lazy" /></div>}
              <div className="webCardTop"><span>WEB / 0{index + 1}</span><small>{project.type}</small></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={project.href} target="_blank" rel="noreferrer">View repository <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      {aiProjects.length > 0 && <section className="section shell webSection" id="ai-work">
        <div className="sectionHead">
          <div><p className="eyebrow"><span /> Artificial intelligence</p><h2>AI projects</h2></div>
          <p>Selected AI-assisted products focused on practical, accessible user experiences.</p>
        </div>
        <div className="webGrid">
          {aiProjects.map((project, index) => <article className="webCard" key={project.id}>
            {project.imageUrl && <div className="projectMedia"><img src={project.imageUrl} alt={`${project.title} screenshot`} loading="lazy" /></div>}
            <div className="webCardTop"><span>AI / {String(index + 1).padStart(2, "0")}</span><small>{project.label}</small></div>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            {(project.repositoryUrl || project.liveUrl) && <a href={project.liveUrl || project.repositoryUrl} target="_blank" rel="noreferrer">View project <span>↗</span></a>}
          </article>)}
        </div>
      </section>}

      <section className="section shell" id="about">
        <div className="aboutGrid">
          <div>
            <p className="eyebrow"><span /> Beyond ERP</p>
            <h2>MAISYS — Medical AI System</h2>
            <p className="largeCopy">A graduation project that brings five AI-assisted healthcare tools into one accessible platform.</p>
            <div className="featureList">
              <span>Medical chatbot</span><span>Lab test explainer</span><span>Symptom checker</span><span>Drug interaction checker</span><span>Research paper assistant</span>
            </div>
            <p className="disclaimer">Designed as an informational and decision-support experience, not a substitute for professional medical diagnosis or treatment.</p>
          </div>
          <div className="aboutCard">
            <p className="miniLabel">My toolkit</p>
            <div className="skillCloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <hr/>
            <p className="miniLabel">How I work</p>
            <p>I collaborate closely with implementation specialists to turn functional ERP requirements into maintainable technical solutions, then use Odoo.sh and Git for structured delivery and debugging.</p>
          </div>
        </div>
      </section>

      <section className="section shell timelineSection">
        <p className="eyebrow"><span /> Experience</p>
        <h2>From implementation to development</h2>
        <div className="timeline">
          <div className="timelineItem active"><time>Oct 2025 — Present</time><div><h3>Odoo Developer</h3><p>Building custom modules, workflow automation, reports, integrations, and operational controls across core Odoo applications.</p></div></div>
          <div className="timelineItem"><time>Feb 2026 — May 2026</time><div><h3>Part-Time Odoo Developer</h3><p>Delivered focused customizations, validations, reporting improvements, and maintainable ERP enhancements.</p></div></div>
          <div className="timelineItem"><time>Jul 2025 — Oct 2025</time><div><h3>Odoo Implementation Trainee</h3><p>Learned end-to-end ERP workflows, requirements analysis, testing, documentation, and functional configuration.</p></div></div>
          <div className="timelineItem"><time>Jun 2026</time><div><h3>B.Sc. Computer Science & AI</h3><p>Benha University — programming, software engineering, databases, algorithms, and artificial intelligence.</p></div></div>
        </div>
      </section>

      <section className="contact shell" id="contact">
        <p className="eyebrow"><span /> Let&apos;s work together</p>
        <h2>Have an Odoo challenge worth solving?</h2>
        <p>I&apos;m open to Odoo Developer opportunities in Egypt, Saudi Arabia, the UAE, and remote teams.</p>
        <div className="heroActions">
          <a className="button primary" href="mailto:anterahmed818@gmail.com">Email me <span>↗</span></a>
          <a className="button secondary" href="https://www.linkedin.com/in/ahmed-anter-dev" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>

      <footer className="footer shell"><span>© 2026 Ahmed Anter</span><span>Built with React &amp; Node.js · Designed for clarity</span></footer>
    </main>
  );
}
