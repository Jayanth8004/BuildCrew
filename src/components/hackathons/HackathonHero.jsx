export default function HackathonHero({ flagship, onFindSquad, onOpenDetails }) {
  if (!flagship) return null;

  const capacityPercent = Math.min(100, Math.round(((flagship.registeredTeams || 410) / (flagship.maxCap || 500)) * 100));

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl mb-6 border border-indigo-800/40">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-indigo-600/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" 
      />

      <div className="relative z-10 p-6 sm:p-8 lg:p-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Event Specs & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-xs font-bold tracking-wide uppercase shadow-sm">
                  <span className="material-symbols-outlined text-sm text-blue-400">verified</span>
                  {flagship.tier || 'Tier-1 Global Sanctioned'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {flagship.statusLabel || 'Registration Open'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono font-medium backdrop-blur-sm border border-white/10">
                  {flagship.circuitId || 'BC-CIRC-2026-01'}
                </span>
              </div>

              {/* Event Titles */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {flagship.title}
                </h2>
                <p className="text-base sm:text-lg font-semibold text-blue-200 mt-1">
                  {flagship.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {flagship.description}
                </p>
              </div>

              {/* Key Metadata Metric Cards with Clear Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="material-symbols-outlined text-sm text-blue-400">calendar_month</span>
                    <span>Dates</span>
                  </div>
                  <span className="text-sm font-extrabold text-white block mt-1">
                    {flagship.dates}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="material-symbols-outlined text-sm text-indigo-400">location_on</span>
                    <span>Location</span>
                  </div>
                  <span className="text-sm font-extrabold text-white block mt-1 truncate" title={flagship.location}>
                    {flagship.location.split(',')[0]}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <span className="material-symbols-outlined text-sm text-amber-400">military_tech</span>
                    <span>Prize Pool</span>
                  </div>
                  <span className="text-sm font-black text-amber-300 block mt-1">
                    {flagship.prizePool}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="material-symbols-outlined text-sm text-emerald-400">groups</span>
                    <span>Squad Size</span>
                  </div>
                  <span className="text-sm font-extrabold text-white block mt-1">
                    {flagship.squadLimits}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onFindSquad(flagship.title)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">group_add</span>
                <span>Build a Squad</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenDetails(flagship)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 backdrop-blur-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">info</span>
                <span>Full Circuit Brief</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 pl-2">
                <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                <span className="font-medium">Fast-track BuildCrew Lounge Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Capacity Status & Venue Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-3.5">
            {/* Live Registration Capacity Box */}
            <div className="p-5 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-blue-400">trending_up</span>
                  Registration Capacity
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-black">
                  {capacityPercent}% Reserved
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 h-2.5 rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{flagship.registeredTeams || 410} Confirmed Squads</span>
                  <span>{flagship.maxCap || 500} Max Limit</span>
                </div>
              </div>

              {/* Matchmaking status ticker */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Solo builders in matchmaking:</span>
                <span className="font-extrabold text-cyan-300">
                  {flagship.soloMatches || flagship.seekersCount || 64} open squads
                </span>
              </div>
            </div>

            {/* Venue & Organizer Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-36 group shrink-0">
              <img
                src={flagship.heroImage}
                alt="Venue Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-white">
                  <span className="material-symbols-outlined text-sm text-blue-400">location_on</span>
                  {flagship.location}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900/90 text-blue-200 text-[11px] font-bold backdrop-blur-sm border border-white/20 capitalize">
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
