import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { LanguageProvider } from '@/components/LanguageProvider'
import ScrollResetOnLoad from '@/components/ScrollResetOnLoad'
import ScrollToTopOnRouteChange from '@/components/ScrollToTopOnRouteChange'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TROKA - AI-powered marketplace for smart trades",
  description:
    "Marketplace inteligente de intercambio impulsado por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-20 md:pb-0">

<LanguageProvider>

  <ScrollResetOnLoad />
  <ScrollToTopOnRouteChange />

  <Navbar />

{children}

<Footer />

<MobileBottomNav />

</LanguageProvider>

</body>
    </html>
  );
}
