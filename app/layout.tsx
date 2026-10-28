import type { Metadata, Viewport } from "next";
import { Figtree, League_Spartan } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Analytics } from "@vercel/analytics/next";
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

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  weight: ["700"],
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
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${leagueSpartan.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
