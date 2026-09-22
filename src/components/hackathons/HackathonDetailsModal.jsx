import { useState } from 'react';

export default function HackathonDetailsModal({
  hackathon,
  isOpen,
  onClose,
  onFindSquad
}) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !hackathon) return null;

  const isConcluded = hackathon.status === 'finished';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Branding */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs text-blue-400">verified</span>
              {hackathon.circuitId || 'CIRCUIT SANCTIONED'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
              {hackathon.tier || 'Sanctioned Collegiate Circuit'}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isConcluded ? 'bg-white/10 text-slate-400' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
            }`}>
              {hackathon.statusLabel}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md">
              {hackathon.logo ? (
                <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain rounded-lg" />
              ) : (
                <span className="material-symbols-outlined text-3xl text-secondary">terminal</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {hackathon.title}
              </h2>
              <p className="text-sm font-medium text-blue-200/90 mt-0.5">
                {hackathon.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2.5">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <span className="material-symbols-outlined text-sm text-blue-400">calendar_month</span>
                  {hackathon.dates}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-blue-400">location_on</span>
                  {hackathon.location}
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <span className="material-symbols-outlined text-sm text-amber-400">military_tech</span>
                  {hackathon.prizePool}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-surface-container-high bg-surface-container-low shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Overview &amp; Tracks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Timeline &amp; Schedule
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('circuit')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'circuit'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">settings_suggest</span>
            <span>Circuit Specs (Admin)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-on-surface">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Event Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">
                  Event Brief
                </h4>
                <p className="text-sm text-on-surface leading-relaxed">
                  {hackathon.description || 'Join elite collegiate engineering squads competing in rapid software and hardware prototyping sprints.'}
                </p>
              </div>

              {/* Key Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
                  <span className="text-[11px] font-bold uppercase text-outline block">Mode</span>
                  <span className="font-semibold text-on-surface mt-0.5 capitalize block">
                    {hackathon.mode}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
                  <span className="text-[11px] font-bold uppercase text-outline block">Squad Limits</span>
                  <span className="font-semibold text-on-surface mt-0.5 block">
                    {hackathon.squadLimits}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
                  <span className="text-[11px] font-bold uppercase text-outline block">Registration Fee</span>
                  <span className="font-semibold text-on-surface mt-0.5 block">
                    {hackathon.freeEntry ? '100% Free' : 'Patron Sponsored'}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
                  <span className="text-[11px] font-bold uppercase text-outline block">Deadline</span>
                  <span className="font-semibold text-on-surface mt-0.5 block text-secondary">
                    {hackathon.registrationDeadline || 'Rolling Admissions'}
                  </span>
                </div>
              </div>

              {/* Prize Tracks & Bounties Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-3 flex items-center justify-between">
                  <span>Sponsored Tracks &amp; Bounties</span>
                  <span className="text-secondary font-semibold font-mono">Total {hackathon.prizePool}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hackathon.bounties && hackathon.bounties.length > 0 ? (
                    hackathon.bounties.map((bounty, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/80 hover:border-secondary/30 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-on-surface text-sm">
                            {bounty.track}
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs shrink-0">
                            {bounty.prize}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm text-secondary">token</span>
                          <span>Bounty Sponsor: <strong>{bounty.sponsor}</strong></span>
                        </div>
                      </div>
                    ))
                  ) : (
                    hackathon.trackLabels?.map((track, tIdx) => (
                      <div key={tIdx} className="p-3 rounded-xl bg-surface-container-low text-xs font-medium">
                        {track}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Eligibility & Travel Grant */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-xs space-y-1">
                <span className="font-bold text-blue-900 block flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-blue-600">flight_takeoff</span>
                  BuildCrew Collegiate Travel Subsidy &amp; Housing
                </span>
                <p className="text-blue-800 leading-relaxed">
                  Teams verified through BuildCrew with cross-campus members are eligible for up to $250 travel stipends and priority hacker check-in.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">
                Official Hackathon Milestones
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
                {hackathon.schedule && hackathon.schedule.length > 0 ? (
                  hackathon.schedule.map((item, sIdx) => (
                    <div key={sIdx} className="relative flex items-start gap-4">
                      <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-surface-container-lowest ${
                        item.status === 'completed'
                          ? 'bg-secondary'
                          : item.status === 'current'
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-surface-container-high'
                      }`} />
                      <div className="flex-1 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-on-surface">
                            {item.phase}
                          </span>
                          <span className="text-xs font-semibold text-secondary">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-on-surface-variant">Schedule timeline will be confirmed by organizers 2 weeks prior to event.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'circuit' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-outline">Sanctioned Circuit Metadata</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Admin Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-outline block">Circuit Protocol ID:</span>
                    <span className="font-mono font-bold text-on-surface">{hackathon.circuitId || 'BC-CIRC-2026'}</span>
                  </div>
                  <div>
                    <span className="text-outline block">Sanction Tier:</span>
                    <span className="font-bold text-on-surface">{hackathon.tier || 'Tier-1 Global'}</span>
                  </div>
                  <div>
                    <span className="text-outline block">Registered Squads (Sync):</span>
                    <span className="font-bold text-on-surface">{hackathon.registeredTeams || 320} squads</span>
                  </div>
                  <div>
                    <span className="text-outline block">Host University Partner:</span>
                    <span className="font-bold text-on-surface">{hackathon.organizer?.name || 'Verified ACM Chapter'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs space-y-1.5">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-700">admin_panel_settings</span>
                  Upcoming Admin Management Hooks
                </span>
                <p className="text-amber-800 leading-relaxed">
                  This schema is mapped directly for the incoming BuildCrew Admin Console. Administrators will be able to edit bounty tiers, manage squad check-in verification codes, and toggle featured placement without schema migration.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-surface-container-low border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {hackathon.organizer?.website && (
              <a
                href={hackathon.organizer.website}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Official Site</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
            {!isConcluded && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onFindSquad(hackathon.title);
                }}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-surface-tint text-on-primary text-xs font-bold shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">group_add</span>
                <span>Squad Up for {hackathon.title.split(' ')[0]}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
