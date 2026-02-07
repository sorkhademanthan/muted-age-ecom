import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Layout Components
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { ToastContainer } from "@/components/ui/toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Optional: helpful for Tailwind
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muted Age",
  description: "Redefining modern luxury.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white`}>
        
        {/* GLOBAL OVERLAYS (Hidden by default, triggered by Zustand) */}
        <MobileMenu />
        <CartDrawer />
        <ToastContainer />

        {/* STICKY HEADER */}
        <Header />

        {/* MAIN CONTENT (Grows to fill space) */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
        
      </body>
    </html>
  );
}