import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Analytics } from "@vercel/analytics/next";
import { TOTAL_EXPERIENCE } from "@/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const APP_URL = `https://harsh-vansjaliya.vercel.app`;
const APP_NAME = "Harsh Vansjaliya";
const APP_DESCRIPTION = `Software Developer with ${TOTAL_EXPERIENCE}+ years of experience, specializing in backend development and building scalable solutions. Experienced in Next.js, TypeScript, Spring Boot, and algorithmic trading systems.`;

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  other: {
    "vercel-deployment-url": APP_URL,
  },
  title: {
    default: `${APP_NAME} | Software Developer`,
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
    "Spring Boot Developer",
    "React Developer",
    "Algorithmic Trading",
    "Gujarat Developer",
    "India Developer",
    "Portfolio",
    "Web Development",
    "Microservices",
    "Java Developer",
    "Python Developer",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: `${APP_NAME} Portfolio`,
    title: `${APP_NAME} | Backend & Full Stack Developer`,
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
    title: `${APP_NAME} | Software Developer`,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/preview.png`],
    creator: "@your_twitter_handle", // Add your Twitter handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add these when you set them up
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
          <Navbar />
          {children}
          <Footer />
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
