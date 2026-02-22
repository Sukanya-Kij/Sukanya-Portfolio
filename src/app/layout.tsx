import type { Metadata } from "next";
import { Fira_Code, Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sukanya Kijjapalo | Portfolio",
    template: "%s | Sukanya Kijjapalo",
  },
  description:
    "Portfolio of Sukanya Kijjapalo (Fern): coordination, CRM operations, certification workflow, and measurable business outcomes.",
  openGraph: {
    title: "Sukanya Kijjapalo | Portfolio",
    description:
      "Coordination and operations portfolio with experience, projects, and certificate repository.",
    type: "website",
    siteName: "Sukanya Kijjapalo Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${firaCode.variable} antialiased`}>{children}</body>
    </html>
  );
}
