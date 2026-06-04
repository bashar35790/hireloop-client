"use client";

import Image from "next/image";
import globeImage from "@/assets/images/globe.png";

interface StatCard {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const stats: StatCard[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
      </svg>
    ),
    number: "50K",
    label: "Active Jobs",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
    number: "12K",
    label: "Companies",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 20H4V6h10V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10v-2zm4.5-5h-3v-4h3V9h2v4h3v2h-3v4h-2v-4z" />
      </svg>
    ),
    number: "2M",
    label: "Job Seekers",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    number: "97%",
    label: "Satisfaction Rate",
  },
];

export default function Statistic() {
  return (
    <section className="relative w-full bg-slate-950 overflow-hidden">
      {/* Globe background section */}
      <div className="relative w-full h-96 md:h-125 flex items-center justify-center">
        {/* Blue glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-200 h-200 bg-linear-to-b from-blue-600/30 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Globe image - centered and prominent */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={globeImage}
              alt="Globe"
              width={500}
              height={500}
              className="object-contain opacity-80"
              priority
            />
          </div>
        </div>

        {/* Text overlay - positioned on globe */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
            Assisting over 15,000 job seekers<br />
            find their dream positions.
          </h2>
        </div>
      </div>

      {/* Stats cards section */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-20 md:-mt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-md border border-slate-800/60 rounded-2xl p-8 text-center hover:border-slate-700/80 hover:bg-black/60 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 text-slate-300">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="text-5xl font-bold text-white mb-3">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-slate-400 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
