import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Anter | Odoo & Software Developer",
  description: "Software development portfolio featuring Odoo ERP automation, Node.js backend systems, React applications, integrations, reporting, and AI work.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Ahmed Anter | Odoo & Software Developer",
    description: "Odoo ERP automation, Node.js backend systems, React applications, and AI work.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Ahmed Anter — Odoo Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Anter | Odoo & Software Developer",
    description: "Odoo ERP automation, Node.js backend systems, React applications, and AI work.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
