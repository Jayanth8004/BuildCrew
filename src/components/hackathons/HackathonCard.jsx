export default function HackathonCard({
  hackathon,
  viewMode = 'grid',
  onSelect,
  onFindSquad
}) {
  const isConcluded = hackathon.status === 'closed' || hackathon.status === 'finished';
  const isClosingSoon = hackathon.status === 'closing-soon';
  const isUpcoming = hackathon.status === 'upcoming';
  const isTeamFull = hackathon.status === 'team-full';

  // Status Badge Configuration
  const getStatusBadge = () => {
    if (isClosingSoon) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          <span>{hackathon.statusLabel || 'Closing soon'}</span>
        </span>
      );
    }
    if (isTeamFull) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
          <span>{hackathon.statusLabel || 'Team full'}</span>
        </span>
      );
    }
    if (isUpcoming) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>{hackathon.statusLabel || 'Upcoming'}</span>
        </span>
      );
    }
    if (isConcluded) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant border border-surface-container-high flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
          <span>{hackathon.statusLabel || 'Registration closed'}</span>
        </span>
      );
    }
    // Default: Registration open
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        <span>{hackathon.statusLabel || 'Registration open'}</span>
      </span>
    );
  };

  const orgName = typeof hackathon.organizer === 'object' ? hackathon.organizer?.name : hackathon.organizer || 'Collegiate Host';
  const regLink = hackathon.officialRegistrationLink || (typeof hackathon.organizer === 'object' ? hackathon.organizer?.website : '') || '#';

  // ========================================================
  // LIST VIEW
  // ========================================================
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelect(hackathon)}
        className="group bg-surface-container-lowest hover:bg-surface-container-low/80 rounded-2xl p-4 sm:p-5 border border-surface-container-high/70 hover:border-secondary/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Left: Branding & Circuit Badge */}
        <div className="flex items-center gap-3.5 min-w-[260px]">
          <div className={`w-12 h-12 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0 border border-surface-container-high overflow-hidden shadow-xs ${isConcluded ? 'grayscale opacity-75' : ''}`}>
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
              <span className="material-symbols-outlined text-base text-secondary" title="Sanctioned Circuit Event">
                verified
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {orgName} · {hackathon.mode}
            </p>
          </div>
        </div>

        {/* Center: Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-on-surface-variant">
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Dates</span>
            <span className="font-bold text-on-surface">{hackathon.dates}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Deadline</span>
            <span className="font-bold text-amber-800 truncate block">{hackathon.registrationDeadline || 'TBD'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Prize Pool</span>
            <span className="font-extrabold text-amber-900">{hackathon.prizePool}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-outline block">Team Size</span>
            <span className="font-bold text-on-surface">{hackathon.squadLimits || hackathon.teamSize || '2–4'}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container-high/60" onClick={(e) => e.stopPropagation()}>
          {getStatusBadge()}

          <button
            type="button"
            onClick={() => onSelect(hackathon)}
            className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer"
          >
            View Details
          </button>

          {!isConcluded && (
            <button
              type="button"
              onClick={() => onFindSquad(hackathon)}
              className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-surface-tint text-on-primary text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>Build a Team</span>
            </button>
          )}

          {regLink !== '#' && (
            <a
              href={regLink}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all inline-flex items-center justify-center"
              title="Official Registration"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  // ========================================================
  // GRID VIEW (Default)
  // ========================================================
  return (
    <div 
      className={`group bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high/80 hover:border-secondary/40 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between ${
        isConcluded ? 'opacity-85' : ''
      }`}
    >
      <div>
        {/* Top Header Tag Strip */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1 border border-secondary/20">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>{hackathon.circuitId || 'CIRCUIT EVENT'}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold capitalize">
              {hackathon.mode}
            </span>
          </div>

          {getStatusBadge()}
        </div>

        {/* Branding & Title Row (What is the hackathon?) */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className={`w-13 h-13 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0 border border-surface-container-high shadow-xs group-hover:scale-105 transition-transform ${isConcluded ? 'grayscale opacity-75' : ''}`}>
            {hackathon.logo ? (
              <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain rounded-lg" />
            ) : (
              <span className="material-symbols-outlined text-3xl text-secondary">terminal</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              onClick={() => onSelect(hackathon)}
              className="text-lg font-black text-on-surface tracking-tight group-hover:text-secondary transition-colors cursor-pointer truncate"
              title={hackathon.title}
            >
              {hackathon.title}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium truncate mt-0.5">
              Organized by {orgName}
            </p>
          </div>
        </div>

        {/* Description snippet */}
        {hackathon.description && (
          <p className="text-xs text-on-surface-variant/90 leading-relaxed mb-3.5 line-clamp-2">
            {hackathon.description}
          </p>
        )}

        {/* Core Info Bento Box (Dates, Deadline, Team Size, Fee, Prize, Eligibility) */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-surface-container-low/80 border border-surface-container-high/60 mb-3.5 text-xs">
          {/* When does it happen? */}
          <div className="flex items-center gap-2 text-on-surface min-w-0">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Dates</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5">{hackathon.dates}</span>
            </div>
          </div>

          {/* When is the deadline? */}
          <div className="flex items-center gap-2 text-on-surface min-w-0">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm">alarm</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-amber-800 block leading-none">Deadline</span>
              <span className="font-bold text-xs text-amber-900 truncate block mt-0.5">{hackathon.registrationDeadline || 'TBD'}</span>
            </div>
          </div>

          {/* What is the team size? */}
          <div className="flex items-center gap-2 text-on-surface min-w-0">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm">groups</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Team Size</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5">{hackathon.squadLimits || hackathon.teamSize || '2 to 4'}</span>
            </div>
          </div>

          {/* Is there a fee? */}
          <div className="flex items-center gap-2 text-on-surface min-w-0">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm">payments</span>
            </span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-outline block leading-none">Entry Fee</span>
              <span className="font-bold text-xs text-on-surface truncate block mt-0.5">{hackathon.registrationFee || 'Free ($0)'}</span>
            </div>
          </div>

          {/* What is the prize? */}
          <div className="flex items-center gap-2 text-on-surface min-w-0 col-span-2 pt-1 border-t border-surface-container-high/40">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm">military_tech</span>
            </span>
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] uppercase font-bold text-amber-800/80 leading-none">Prize Pool:</span>
              <span className="font-black text-xs text-amber-900">{hackathon.prizePool}</span>
            </div>
          </div>
        </div>

        {/* Tracks (What are the tracks?) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
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

      {/* Card Action Controls: View Details, Build a Team, Official Registration */}
      <div className="pt-3 border-t border-surface-container-high/70 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(hackathon)}
          className="flex-1 min-w-[90px] py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer text-center"
        >
          View Details
        </button>

        {!isConcluded && (
          <button
            type="button"
            onClick={() => onFindSquad(hackathon)}
            className="flex-1 min-w-[100px] py-2 px-3 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">groups</span>
            <span>Build a Team</span>
          </button>
        )}

        {regLink !== '#' && (
          <a
            href={regLink}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all inline-flex items-center justify-center gap-1 shrink-0"
            title="Open Official Registration"
          >
            <span className="hidden xl:inline text-[11px]">Register</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        )}
      </div>
    </div>
  );
}
