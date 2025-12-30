import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Inter } from "next/font/google";
import "./globals.css";
import AnimatedCursor from "./components/AnimatedCursor";

// Load fonts using next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Ushay - Portfolio",
  description: "Portfolio website of Ahmad Ushay - Programmer Analyst specializing in software development, data analysis, and system optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${inter.variable} antialiased`}
      >
        <AnimatedCursor />
        {children}
      </body>
    </html>
  );
}
