"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/50 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-800 ring-1 ring-slate-700 flex items-center justify-center">
                <span className="text-white font-semibold">H</span>
              </div>
              <h3 className="text-xl font-semibold text-white">hireloop</h3>
            </div>
            <p className="mt-4 max-w-xs text-slate-400">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link href="#" aria-label="facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.3h-1.2c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </Link>
              <Link href="#" aria-label="pinterest" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-violet-800 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2a10 10 0 100 20c-.9 0-1.7-.1-2.5-.3.1-.7.3-1.9.3-1.9s.4-.9.4-2.1c0-2.1-1.2-3.7-1.2-3.7-1 1.9-.2 3 .1 3.3.6.5 1.9.3 2.5-.1.1-.8.4-1.4.7-1.7-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.4.8-1.9-.1-.2-.4-1.2.1-2.5 0 0 .7-.2 2.4.9.7-.2 1.4-.4 2.1-.4.7 0 1.4.1 2.1.4 1.7-1.1 2.4-.9 2.4-.9.5 1.3.2 2.3.1 2.5.5.5.8 1.1.8 1.9 0 2.8-1.8 3.4-3.3 3.6.4.3.8 1 .8 2 0 1.4.1 2.5.1 2.9 0 .4-.3.7-.7.7A10 10 0 0012 2z" />
                </svg>
              </Link>
              <Link href="#" aria-label="linkedin" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.2c0-2-.1-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.4V24h-4z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-violet-400">Product</h4>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-slate-200">Job discovery</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Worker AI</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Companies</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Salary data</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-violet-400">Navigations</h4>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-slate-200">Help center</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Career library</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-violet-400">Resources</h4>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-slate-200">Brand Guideline</Link></li>
              <li><Link href="#" className="hover:text-slate-200">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800/50 pt-6 text-sm text-slate-500">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p>Copyright 2024 — Programming Hero</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-slate-300">Terms & Policy</Link>
              <span className="text-slate-600">•</span>
              <Link href="#" className="hover:text-slate-300">Privacy Guideline</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
