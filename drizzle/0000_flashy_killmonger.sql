CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`description` text NOT NULL,
	`technologies` text DEFAULT '[]' NOT NULL,
	`repository_url` text DEFAULT '' NOT NULL,
	`live_url` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `projects` (`title`,`category`,`label`,`description`,`technologies`,`repository_url`,`featured`,`published`,`sort_order`) VALUES
('Sale Stock Guard','odoo','Sales · Inventory','Prevents sales workflows from confirming quantities that exceed available stock, with clear validation and predictable inventory behavior.','["Odoo 18","Python","ORM","XML"]','https://github.com/Ahmed-Anter1/odoo-sale-stock-guard',1,1,10),
('Customer Statement','odoo','Accounting · Reporting','A complete customer statement workflow that helps finance teams review balances, transactions, and partner account activity.','["Odoo 18","Python","QWeb","Accounting"]','https://github.com/Ahmed-Anter1/odoo-customer-statement',1,1,20),
('MRP Batch Scaling','odoo','Manufacturing','Scales manufacturing quantities and component consumption consistently for changing production batch requirements.','["Odoo 18","MRP","Python","ORM"]','https://github.com/Ahmed-Anter1/odoo-mrp-batch-scaling',1,1,30),
('WhatsApp Document Sharing','odoo','Integration · Documents','Shares business documents through a controlled WhatsApp workflow with validation, secure payload handling, and operational feedback.','["Odoo 18","REST API","QWeb","Python"]','https://github.com/Ahmed-Anter1/odoo-whatsapp-document-sharing',1,1,40),
('Serial Quotation Workflow','odoo','Sales · Traceability','Brings serial-controlled product selection into quotations to improve traceability before delivery and reduce fulfillment mistakes.','["Odoo 18","Sales","Stock","XML"]','https://github.com/Ahmed-Anter1/odoo-serial-quotation-workflow',1,1,50),
('Automated Sales Returns','odoo','Returns · Accounting','Coordinates product returns, reverse stock movements, and credit-note preparation through a guided business workflow.','["Odoo 18","Stock","Accounting","Python"]','https://github.com/Ahmed-Anter1/odoo-automated-sales-returns',1,1,60),
('HR Management & Time Tracking System','web','Full-Stack · Desktop','A comprehensive HR platform covering employee records, payroll operations, attendance, reporting, notifications, role-based access, and a companion Electron time-tracking application.','["Node.js","Express.js","React","MongoDB","Electron","Socket.IO"]','https://github.com/Ahmed-Anter1/HR-System1',1,1,110),
('E-Commerce API & Dashboard','web','Full-Stack Web','An e-commerce REST API and React dashboard with authentication, admin and user authorization, product workflows, wishlist management, and an embedded API testing interface.','["Node.js","Express.js","MongoDB","React","JWT","Bcrypt"]','https://github.com/Ahmed-Anter1/backend-e-commerce',1,1,120),
('Nafsyetak Clinic Frontend','web','React Application','A responsive clinic interface with authentication, protected routes, admin navigation, service pages, forms, charts, and an API integration architecture.','["React 18","React Router","Axios","i18next","Recharts"]','https://github.com/Ahmed-Anter1/Nafsyetak2',1,1,130),
('Book Management API','web','Backend API','A secured CRUD API for managing books and users, including registration, login, password hashing, JWT authentication, MongoDB persistence, and modular controllers.','["Node.js","Express.js","MongoDB","Mongoose","JWT"]','https://github.com/Ahmed-Anter1/Book-Management-with-authentication-App',1,1,140),
('MAISYS — Medical AI System','ai','Graduation Project','A medical AI platform combining a medical chatbot, lab test explanation, symptom checking, drug-interaction guidance, and research-paper assistance in one experience.','["Artificial Intelligence","Medical NLP","React","Node.js"]','',1,1,210);
