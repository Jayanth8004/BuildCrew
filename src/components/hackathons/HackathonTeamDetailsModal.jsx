import { useState } from 'react';

export default function HackathonTeamDetailsModal({
  squad,
  isOpen,
  onClose,
  onApplyRole,
  showToast
}) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicationNote, setApplicationNote] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  if (!isOpen || !squad) return null;

  const handleApply = (role) => {
    setHasApplied(true);
    if (onApplyRole) {
      onApplyRole({
        projectId: squad.id,
        projectTitle: squad.title,
        role: role.title,
        note: applicationNote || `Interested in joining ${squad.title} for ${squad.hackathonTitle || 'the competition'}.`,
        submittedAt: 'Just now'
      });
    }
    if (showToast) {
      showToast(`Application sent to ${squad.lead?.name} for ${role.title}!`);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="relative p-6 sm:p-7 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-[11px] font-extrabold uppercase tracking-wide">
              {squad.hackathonTitle || 'HACKATHON SQUAD'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
              {squad.track || 'Track Bounty Contender'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              {squad.totalCapacity - squad.filledCount} Seats Open
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {squad.title}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/90 font-medium mt-1">
            {squad.tagline || squad.fullTitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className="material-symbols-outlined text-sm text-blue-400">group</span>
              <span>{squad.filledCount}/{squad.totalCapacity} Members Confirmed</span>
            </span>
            {squad.syncSchedule && (
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span className="material-symbols-outlined text-sm text-amber-400">schedule</span>
                <span>{squad.syncSchedule}</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm text-on-surface">
          {/* 1. Squad Overview & Concept */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
              Squad Concept &amp; Target Bounty
            </h4>
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
              {squad.description || squad.fullDescription || squad.tagline}
            </p>
          </div>

          {/* 2. Tech Stack */}
          {squad.techStack && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">
                Core Technologies &amp; Architecture
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {squad.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-surface-container-low text-on-surface font-semibold text-xs border border-surface-container-high/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3. Squad Roster */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-2.5">
              Confirmed Builders ({squad.members?.length || squad.filledCount})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {squad.members?.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center gap-3"
                >
                  <img
                    src={m.avatar || squad.lead?.avatar}
                    alt={m.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs sm:text-sm text-on-surface truncate">
                      {m.name}
                    </div>
                    <div className="text-xs text-secondary font-medium truncate">
                      {m.role}
                    </div>
                    <div className="text-[11px] text-outline truncate">
                      {m.university}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center gap-3">
                  <img
                    src={squad.lead?.avatar}
                    alt={squad.lead?.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-on-surface">{squad.lead?.name}</div>
                    <div className="text-xs text-secondary font-medium">{squad.lead?.role || squad.lead?.roleTitle}</div>
                    <div className="text-[11px] text-outline">{squad.lead?.university}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Open Vacancies */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-outline">
                Open Vacancies &amp; Roles Needed
              </h4>
              <span className="text-xs font-bold text-secondary">
                {squad.openVacancies?.length || 0} Openings
              </span>
            </div>

            <div className="space-y-2.5">
              {squad.openVacancies?.map((vac, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/80 hover:border-secondary/40 transition-all space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-sm text-on-surface block">
                        {vac.title}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {vac.desc || `Contribute to ${squad.title} core sprint.`}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold self-start sm:self-auto shrink-0">
                      {vac.seats || '1 seat open'}
                    </span>
                  </div>

                  {vac.skills && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-outline">Target Skills:</span>
                      {vac.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.2 rounded-md bg-surface-container-lowest text-[11px] font-medium text-on-surface border border-surface-container-high/60">
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/60">
                    <span className="text-[11px] text-outline font-medium">
                      Commitment: {vac.hours || '8–10 hrs/week'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApply(vac)}
                      disabled={hasApplied}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        hasApplied
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-primary hover:bg-surface-tint text-on-primary shadow-xs'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {hasApplied ? 'check_circle' : 'bolt'}
                      </span>
                      <span>{hasApplied ? 'Applied' : 'Apply for Role'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant truncate">
            <span className="material-symbols-outlined text-sm text-secondary">verified</span>
            <span>Squad registered for sanctioned collegiate track</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
