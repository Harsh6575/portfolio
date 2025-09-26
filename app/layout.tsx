import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100","200","300", "400", "500", "600", "700","800","900"],
});

const APP_URL = `https://harsh-vansjaliya.vercel.app`;

export const metadata: Metadata = {
  title: "Harsh Vansjaliya | Software Developer",
  description: "Software Developer transitioning to Backend Development. Building scalable solutions and trading systems.",
  icons: {
    icon: '/400X400.svg'
  },
  openGraph: {
    title: "Harsh Vansjaliya | Software Developer",
    description: "Check out my portfolio showcasing my work in Next.js, React, and more.",
    url: `${APP_URL}/`,
    type: "website",
    images: [
      {
        url: `${APP_URL}/preview.png`, // image URL
        width: 1200,
        height: 630,
        alt: "Harsh Vansjaliya Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Vansjaliya | Software Developer",
    description: "Explore my portfolio showcasing projects and skills.",
    images: [`${APP_URL}/preview.png`], // Same as Open Graph
  },
  keywords: ["Harsh Vansjaliya", "Portfolio", "Developer", "Harsh", "Vansjaliya", "Harsh Vansjaliya's portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-poppins`}
      >
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}