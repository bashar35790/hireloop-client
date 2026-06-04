import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import Logo from "./components/Logo";
import Link from "next/link";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireLoop",
  description: "HireLoop hiring platform for job seekers, recruiters, and admins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
      data-theme="light"
      suppressHydrationWarning
      cz-shortcut-listen="true"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 ">
        <Navbar
          brand={
            <Link href="/" className="flex items-center gap-3 rounded-full transition hover:opacity-90">
              <Logo />
              <div>
                <p className="text-lg font-semibold text-white">hire<span className="text-cyan-400">loop</span></p>
              </div>
            </Link>
          }
          items={[
            { label: "Browse Jobs", href: "#browse" },
            { label: "Company", href: "#company" },
            { label: "Pricing", href: "#pricing", isActive: true },
          ]}
          rightContent={
            <>
              <Link href="#signin" className="text-sm font-medium text-slate-200 transition hover:text-white">
                Sign In
              </Link>
              <Link
                href="#get-started"
                className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95"
              >
                Get Started
              </Link>
            </>
          }
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
