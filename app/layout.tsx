import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const APP_URL = `https://harsh-vansjaliya.vercel.app`;
const APP_NAME = "Harsh Vansjaliya";
const APP_DESCRIPTION = "Software Developer with 2+ years of experience, specializing in backend development and building scalable solutions. Experienced in Next.js, TypeScript, Spring Boot, and algorithmic trading systems.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  other: {
    'vercel-deployment-url': APP_URL,
  },
  title: {
    default: `${APP_NAME} | Software Developer`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  applicationName: `${APP_NAME} Portfolio`,
  authors: [{ name: APP_NAME, url: APP_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,

  icons: {
    icon: '/400X400.svg',
    apple: '/400X400.svg',
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
    "Python Developer"
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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

  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Core SEO */}
        <title>Harsh Vansjaliya | Software Developer</title>
        <meta
          name="description"
          content="Software Developer with 2+ years of experience, specializing in backend development and building scalable solutions. Experienced in Next.js, TypeScript, Spring Boot, and algorithmic trading systems."
        />
        <meta name="application-name" content="Harsh Vansjaliya Portfolio" />
        <meta name="author" content="Harsh Vansjaliya" />
        <meta name="publisher" content="Harsh Vansjaliya" />

        {/* OpenGraph (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://harsh-vansjaliya.vercel.app" />
        <meta property="og:site_name" content="Harsh Vansjaliya Portfolio" />
        <meta
          property="og:title"
          content="Harsh Vansjaliya | Software Developer"
        />
        <meta
          property="og:description"
          content="Software Developer with 2+ years of experience, specializing in backend development and building scalable solutions."
        />
        <meta
          property="og:image"
          content="https://harsh-vansjaliya.vercel.app/preview.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Harsh Vansjaliya | Software Developer"
        />
        <meta
          name="twitter:description"
          content="Software Developer with 2+ years of experience, specializing in backend development and scalable web applications."
        />
        <meta
          name="twitter:image"
          content="https://harsh-vansjaliya.vercel.app/preview.png"
        />
        <meta name="twitter:creator" content="@your_twitter_handle" />

        {/* Favicon / App Icons */}
        <link rel="icon" href="/400X400.svg" />
        <link rel="apple-touch-icon" href="/400X400.svg" />
        <link rel="canonical" href="https://harsh-vansjaliya.vercel.app" />
      </head>
      <body
        className={`${poppins.variable} antialiased font-poppins`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}