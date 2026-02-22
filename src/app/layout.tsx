import type { Metadata } from "next";
import { Cormorant_Garamond, Fira_Code, Manrope, Noto_Sans_Thai } from "next/font/google";
import { MotionOrchestrator } from "@/components/portfolio/motion-orchestrator";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyLatin = Manrope({
  variable: "--font-body-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyThai = Noto_Sans_Thai({
  variable: "--font-body-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sukanya Kijjapalo | Portfolio",
    template: "%s | Sukanya Kijjapalo",
  },
  description:
    "Portfolio of Sukanya Kijjapalo (Fern): coordination, CRM operations, certification workflow, and measurable outcomes.",
  openGraph: {
    title: "Sukanya Kijjapalo | Portfolio",
    description: "Professional portfolio with certifications, client activity highlights, and project outcomes.",
    type: "website",
    siteName: "Sukanya Kijjapalo Portfolio",
    images: [
      {
        url: "/images/people/formal/fern-boardroom-professional.jpg",
        width: 1200,
        height: 630,
        alt: "Sukanya Kijjapalo professional portrait",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyLatin.variable} ${bodyThai.variable} ${headingFont.variable} ${firaCode.variable} antialiased`}>
        <MotionOrchestrator />
        <div className="app-shell flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
