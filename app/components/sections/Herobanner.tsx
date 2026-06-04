"use client";

import { useState } from "react";

export default function HeroBanner() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", jobSearch, locationSearch);
  };

  const trendingPositions = [
    "Trending Position",
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  return (
    <section className="relative w-full  bg-slate-950 overflow-hidden">
      {/* Curved gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-violet-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-linear-to-tl from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-linear-to-l from-violet-500/15 to-transparent rounded-full blur-3xl opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-32">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-medium text-slate-300">
              50,000+ <span className="text-slate-400">NEW JOBS THIS MONTH</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
          HireLoop connects top talent with world-class companies. Browse thousands of curated
          opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-2 bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-full p-2">
            {/* Job Title Input */}
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Job title, skill or company"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Divider */}
            <div className="w-px bg-slate-700/50" />

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Location or Remote"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="mr-1 px-6 py-3 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 rounded-full text-white font-semibold shadow-lg shadow-violet-500/30 hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Trending Positions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trendingPositions.map((position, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                index === 0
                  ? "border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50"
                  : "border-slate-700/50 bg-slate-900/30 text-slate-400 hover:text-slate-300 hover:bg-slate-900/50"
              }`}
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
