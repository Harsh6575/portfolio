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

export const metadata: Metadata = {
  title: "Harsh Vansjaliya | Software Developer",
  description: "Software Developer transitioning to Backend Development. Building scalable solutions and trading systems.",
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