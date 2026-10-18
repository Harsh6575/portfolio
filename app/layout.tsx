import type { Metadata, Viewport } from "next";
import { Hind, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  APP_URL,
  APP_NAME,
  APP_TITLE,
  APP_DESCRIPTION,
  CURRENT_COMPANY,
  GITHUB_URL,
  LINKED_IN_URL,
  X_URL,
  LEETCODE_URL,
} from "@/constants";

const hind = Hind({
  subsets: ["latin"],
  variable: "--font-hind",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  other: {
    "vercel-deployment-url": APP_URL,
  },
  title: {
    default: `${APP_NAME} | ${APP_TITLE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: `${APP_NAME} Portfolio`,
  authors: [{ name: APP_NAME, url: APP_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,

  icons: {
    icon: "/hv-logo.svg",
    apple: "/hv-logo.svg",
  },

  keywords: [
    "Harsh Vansjaliya",
    "Software Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Algorithmic Trading",
    "Fintech Software Engineer",
    "REST API Developer",
    "PostgreSQL Developer",
    "India Developer",
    "Portfolio",
    "Web Development",
    "BullMQ",
    "n8n",
    "Stripe",
    "Python Developer",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} | ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/preview.png`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Software Developer Portfolio`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/preview.png`],
    creator: "@HarshVansjaliya",
  },

  alternates: {
    canonical: APP_URL,
  },

  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFCFA" },
    { media: "(prefers-color-scheme: dark)", color: "#090D16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hind.variable} ${spaceMono.variable} antialiased font-hind`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          key={"harsh-vansjaliya-portfolio"}
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: APP_NAME,
                url: APP_URL,
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": APP_URL,
                name: APP_NAME,
                jobTitle: APP_TITLE,
                description: APP_DESCRIPTION,
                url: APP_URL,
                image: `${APP_URL}/hv-logo.svg`,
                sameAs: [LINKED_IN_URL, GITHUB_URL, X_URL, LEETCODE_URL],
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "IN",
                },
                worksFor: {
                  "@type": "Organization",
                  name: CURRENT_COMPANY,
                },
                alumniOf: {
                  "@type": "EducationalOrganization",
                  name: "SVIT Vasad (GTU)",
                },
                knowsAbout: [
                  "Full-Stack Development",
                  "Backend Development",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "Docker",
                  "Redis",
                  "BullMQ",
                  "n8n Automation",
                  "Stripe",
                  "System Design",
                  "API Architecture",
                  "Fintech Systems",
                ],
              }),
            }}
          />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <ThemeToggle />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
