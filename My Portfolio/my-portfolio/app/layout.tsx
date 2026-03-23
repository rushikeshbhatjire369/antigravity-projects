import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Nav } from "@/components/layout/Nav";

const syne = Syne({ subsets: ["latin"], weight: ["800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Rushikesh Bhatjire — Cloud & Infrastructure Engineer",
  description: "Cloud & Infrastructure Engineer from Nashik, India. Specializing in OpenStack, Linux, and Automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text scroll-smooth" suppressHydrationWarning>
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
