import React from "react";

/**
 * About Component
 * 
 * Description:
 * Provides an overview of the AuraAvenue travel platform, detailing its mission,
 * core offerings, and unique value propositions in a responsive glassmorphic layout.
 * 
 * @returns {React.ReactNode}
 */

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

export default function About() {
  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-clip bg-cover bg-center bg-no-repeat py-8 sm:py-16 px-3 sm:px-6 flex items-center justify-center relative antialiased"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Dark Blur Backdrop Overlay for Contrast */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Main Glass Card Container */}
      <div className="relative z-10 max-w-5xl w-full bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-white/40 space-y-6 sm:space-y-10 box-border">
        
        {/* Top Header Row */}
        <div className="text-center space-y-2 sm:space-y-3 pb-5 sm:pb-6 border-b border-slate-100">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Discover AuraAvenue
          </span>
          <h1 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Redefining Travel & Journey Planning
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AuraAvenue is a modern travel platform designed to help travelers discover breathtaking 
            destinations, plan seamless journeys, and create lasting memories with total confidence.
          </p>
        </div>

        {/* Info Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-emerald-50/80 to-white p-5 sm:p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition space-y-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg sm:text-xl shrink-0 font-bold">
              🌍
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We aim to inspire exploration by providing curated destination insights, authentic trip package choices, and an effortless platform that simplifies trip management from start to finish.
            </p>
          </div>

          {/* What We Offer Card */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg sm:text-xl shrink-0 font-bold">
              ✈️
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight">
              What We Offer
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {[
                "Handpicked tourist destinations & hidden gems",
                "Detailed travel guides & itinerary recommendations",
                "High-resolution destination media galleries",
                "Direct customer query assistance & support",
                "Fast, intuitive booking experience",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 sm:p-8 rounded-2xl shadow-xl space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
            <span>💡</span> Unique Value
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
            Why Choose AuraAvenue?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            AuraAvenue combines technology with curated travel expertise. Whether you're planning a quick weekend retreat or an extended vacation, our platform provides verified package options, transparent details, and dedicated support to make every journey extraordinary.
          </p>
        </div>

        {/* Footer Tagline */}
        <div className="text-center pt-2 text-[11px] sm:text-xs text-slate-400">
          © {new Date().getFullYear()} AuraAvenue. All rights reserved.
        </div>
      </div>
    </div>
  );
}