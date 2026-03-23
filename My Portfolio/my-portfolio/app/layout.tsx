import type { Metadata } from "next";
import { Orbitron, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import { AudioVisualizer } from "@/components/ui/AudioVisualizer";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-display" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "RB // Cloud & Infrastructure Engineer",
  description: "Portfolio of a Cyberpunk Infrastructure Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceMono.variable} ${inter.variable} font-body text-[var(--text)] bg-[var(--bg)] antialiased overflow-x-hidden selection:bg-[var(--accent)] selection:text-[var(--bg)]`}>
        <NeuralBackground />
        <PageTransition />
        <ScrollProgress />
        <AudioVisualizer />
        <CustomCursor />
        <Nav />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
