import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    icon: "/400X400.svg",
    apple: "/400X400.svg",
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
    "Gujarat Developer",
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
    siteName: `${APP_NAME} Portfolio`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-poppins`}>
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
                "@type": "Person",
                "@id": APP_URL,
                name: APP_NAME,
                jobTitle: APP_TITLE,
                description: APP_DESCRIPTION,
                url: APP_URL,
                image: `${APP_URL}/400X400.svg`,
                sameAs: [LINKED_IN_URL, GITHUB_URL, X_URL, LEETCODE_URL],
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
          <Navbar />
          {children}
          <ThemeToggle />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
