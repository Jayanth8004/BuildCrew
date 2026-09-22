export default function HackathonCard({
  hackathon,
  viewMode = 'grid',
  onSelect,
  onFindSquad
}) {
  const isConcluded = hackathon.status === 'finished';
  const isUpcoming = hackathon.status === 'upcoming';

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelect(hackathon)}
        className="group bg-surface-container-lowest hover:bg-surface-container-low/80 rounded-2xl p-4 sm:p-5 border border-surface-container-high/70 hover:border-secondary/40 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Left: Identity & Branding */}
        <div className="flex items-center gap-3.5 min-w-[280px]">
          <div className={`w-12 h-12 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0 border border-surface-container-high overflow-hidden shadow-sm ${isConcluded ? 'grayscale' : ''}`}>
            {hackathon.logo ? (
              <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain rounded-lg" />
            ) : (
              <span className="material-symbols-outlined text-2xl text-secondary">terminal</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-title-md font-extrabold text-on-surface group-hover:text-secondary transition-colors">
                {hackathon.title}
              </h4>
              {hackathon.isVerified && (
                <span className="material-symbols-outlined text-base text-secondary" title="Sanctioned Circuit Event">
                  verified
                </span>
              )}
            </div>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {hackathon.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-on-surface-variant">
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Dates</span>
            <span className="font-bold text-on-surface">{hackathon.dates}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Location</span>
            <span className="font-bold text-on-surface truncate block max-w-[140px]" title={hackathon.location}>
              {hackathon.location}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-amber-800/80 block">Prize Pool</span>
            <span className="font-extrabold text-amber-900">{hackathon.prizePool}</span>
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container-high/60">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            isConcluded
              ? 'bg-surface-container text-on-surface-variant'
              : isUpcoming
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isConcluded ? 'bg-outline' : isUpcoming ? 'bg-amber-500' : 'bg-emerald-600'
            }`} />
            {hackathon.statusLabel}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onSelect(hackathon)}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer"
            >
              Details
            </button>
            {!isConcluded && (
              <button
                type="button"
                onClick={() => onFindSquad(hackathon.title)}
                className="px-4 py-1.5 rounded-xl bg-primary hover:bg-surface-tint text-on-primary text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">person_search</span>
                <span>Squad Up</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div 
      className={`group bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high/80 hover:border-secondary/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
        isConcluded ? 'opacity-90' : ''
      }`}
    >
      <div>
        {/* Top Header Tag Strip */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1 border border-secondary/20">
              <span className="material-symbols-outlined text-xs">verified</span>
              {hackathon.circuitId || 'CIRCUIT EVENT'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold capitalize">
              {hackathon.mode}
            </span>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
            isConcluded
              ? 'bg-surface-container text-on-surface-variant'
              : isUpcoming
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              isConcluded ? 'bg-outline' : isUpcoming ? 'bg-amber-500' : 'bg-emerald-600'
            }`} />
            {hackathon.statusLabel}
          </span>
        </div>

        {/* Branding & Title Row */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className={`w-14 h-14 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0 border border-surface-container-high shadow-sm group-hover:scale-105 transition-transform ${isConcluded ? 'grayscale' : ''}`}>
            {hackathon.logo ? (
              <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain rounded-lg" />
            ) : (
              <span className="material-symbols-outlined text-3xl text-secondary">terminal</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              onClick={() => onSelect(hackathon)}
              className="text-lg font-extrabold text-on-surface tracking-tight group-hover:text-secondary transition-colors cursor-pointer truncate"
              title={hackathon.title}
            >
              {hackathon.title}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5 truncate">
              {hackathon.subtitle}
            </p>
          </div>
        </div>

        {/* Description snippet */}
        {hackathon.description && (
          <p className="text-xs text-on-surface-variant/90 leading-relaxed mb-4 line-clamp-2">
            {hackathon.description}
          </p>
        )}

        {/* Specs Bento Box with High Contrast Badges */}
        <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-surface-container-low/80 border border-surface-container-high/60 mb-4 text-xs">
          <div className="flex items-center gap-2.5 text-on-surface min-w-0">
            <span className="w-7 h-7 rounded-xl bg-blue-100/90 text-blue-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">calendar_month</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Dates</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5">{hackathon.dates}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-on-surface min-w-0">
            <span className="w-7 h-7 rounded-xl bg-indigo-100/90 text-indigo-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">location_on</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Location</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5" title={hackathon.location}>
                {hackathon.location.split(',')[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-on-surface min-w-0">
            <span className="w-7 h-7 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">military_tech</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-amber-800/80 block leading-none">Prize Pool</span>
              <span className="font-extrabold text-xs text-amber-900 truncate block mt-0.5">{hackathon.prizePool}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-on-surface min-w-0">
            <span className="w-7 h-7 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">groups</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Squad</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5">{hackathon.squadLimits}</span>
            </div>
          </div>
        </div>

        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {hackathon.trackLabels?.slice(0, 3).map((track, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-semibold border border-surface-container-high/60"
            >
              {track}
            </span>
          ))}
          {hackathon.trackLabels && hackathon.trackLabels.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-bold">
              +{hackathon.trackLabels.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Matchmaking Seekers & Actions */}
      <div className="pt-3.5 border-t border-surface-container-high/70 flex items-center justify-between gap-2">
        {isConcluded ? (
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
            <span className="material-symbols-outlined text-base text-amber-600">emoji_events</span>
            <span className="font-semibold truncate">{hackathon.archiveHighlight}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            {hackathon.seekerAvatars && hackathon.seekerAvatars.length > 0 && (
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                {hackathon.seekerAvatars.slice(0, 3).map((av, avIdx) => (
                  <img
                    key={avIdx}
                    src={av}
                    alt="Seeker"
                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-surface-container-lowest"
                  />
                ))}
              </div>
            )}
            <span className="text-[11px] text-on-surface-variant font-medium truncate">
              <strong className="text-on-surface font-bold">{hackathon.seekersCount || 20}+</strong> looking for squad
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelect(hackathon)}
            className="px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer"
          >
            Details
          </button>
          {!isConcluded && (
            <button
              type="button"
              onClick={() => onFindSquad(hackathon.title)}
              className="px-4 py-1.5 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">person_search</span>
              <span>Squad Up</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
