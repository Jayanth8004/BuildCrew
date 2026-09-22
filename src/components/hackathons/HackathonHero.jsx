export default function HackathonHero({ flagship, onFindSquad, onOpenDetails }) {
  if (!flagship) return null;

  const capacityPercent = Math.min(100, Math.round(((flagship.registeredTeams || 410) / (flagship.maxCap || 500)) * 100));

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg mb-6 border border-indigo-800/40">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* Left Column: Event Specs & CTAs (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-[11px] font-bold tracking-wide uppercase">
                  <span className="material-symbols-outlined text-xs text-blue-400">star</span>
                  {flagship.badge || 'Featured Flagship'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {flagship.statusLabel || 'Registration Open'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-mono border border-white/10">
                  {flagship.circuitId || 'BC-CIRC-2026-01'}
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                {flagship.title}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-blue-200 mt-0.5">
                {flagship.subtitle}
              </p>
              <p className="text-xs text-slate-300 mt-1.5 max-w-2xl line-clamp-2 leading-relaxed">
                {flagship.description}
              </p>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dates</span>
                <span className="text-xs font-bold text-white block mt-0.5 truncate">{flagship.dates}</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Location</span>
                <span className="text-xs font-bold text-white block mt-0.5 truncate" title={flagship.location}>
                  {flagship.location.split(',')[0]}
                </span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">Prize Pool</span>
                <span className="text-xs font-black text-amber-300 block mt-0.5 truncate">{flagship.prizePool}</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Squad Limits</span>
                <span className="text-xs font-bold text-white block mt-0.5 truncate">{flagship.squadLimits}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onFindSquad(flagship.title)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">group_add</span>
                <span>Build a Squad</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenDetails(flagship)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 backdrop-blur-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">info</span>
                <span>Full Circuit Brief</span>
              </button>

              <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-300 pl-2">
                <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                <span>Fast-track BuildCrew Check-in Lounge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Capacity Status & Mini Venue (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-3">
            {/* Live Registration Capacity Box */}
            <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-blue-400">trending_up</span>
                  Registration Capacity
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-[10px] font-black">
                  {capacityPercent}% Reserved
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-300 h-2 rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-medium text-slate-300">
                  <span>{flagship.registeredTeams || 410} Confirmed Squads</span>
                  <span>{flagship.maxCap || 500} Max Limit</span>
                </div>
              </div>

              {/* Matchmaking status ticker */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Solo builders looking:</span>
                <span className="font-extrabold text-cyan-300">
                  {flagship.soloMatches || flagship.seekersCount || 64} open squads
                </span>
              </div>
            </div>

            {/* Compact Venue Preview Card */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 h-28 group shrink-0">
              <img
                src={flagship.heroImage}
                alt="Venue Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 font-bold text-white truncate">
                  <span className="material-symbols-outlined text-xs text-blue-400">location_on</span>
                  {flagship.location}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-blue-200 text-[10px] font-bold backdrop-blur-sm border border-white/20 capitalize shrink-0">
                  {flagship.mode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
