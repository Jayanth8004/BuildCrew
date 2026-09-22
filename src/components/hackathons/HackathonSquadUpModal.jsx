import { useState } from 'react';

export default function HackathonSquadUpModal({
  hackathon,
  isOpen,
  onClose,
  projects = [],
  builders = [],
  onApplySquad,
  onInviteBuilder,
  onCreateSquad,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('squads'); // 'squads' | 'builders' | 'create'
  const [appliedSquads, setAppliedSquads] = useState({});
  const [invitedBuilders, setInvitedBuilders] = useState({});

  // Create Squad Form state
  const [squadTitle, setSquadTitle] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [rolesNeeded, setRolesNeeded] = useState('Frontend Engineer, AI/ML Specialist');
  const [squadPitch, setSquadPitch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !hackathon) return null;

  // Filter squads relevant to this hackathon
  const hackathonSquads = projects.filter(p => {
    const titleMatch = p.categoryBadge?.toLowerCase().includes(hackathon.title.toLowerCase().split(' ')[0].toLowerCase());
    const hackNovaMatch = hackathon.id.includes('hacknova') && (p.categoryBadge?.includes('HackNova') || p.id === 'studysync-ai');
    const treeHacksMatch = hackathon.id.includes('treehacks') && (p.categoryBadge?.includes('TreeHacks') || p.sprintNotice?.includes('TreeHacks') || p.id === 'studysync-ai');
    return titleMatch || hackNovaMatch || treeHacksMatch || true; // Fallback to relevant active squads
  }).slice(0, 4);

  const handleApply = (squad) => {
    setAppliedSquads(prev => ({ ...prev, [squad.id]: true }));
    if (onApplySquad) {
      onApplySquad({
        projectId: squad.id,
        projectTitle: squad.title,
        role: squad.openVacancies?.[0]?.title || 'Core Squad Contributor',
        submittedAt: 'Just now',
        status: 'Pending Lead Review',
        statusColor: 'bg-secondary-fixed text-on-secondary-fixed',
        note: `Applied to join ${squad.title} for ${hackathon.title}.`
      });
    }
    if (showToast) {
      showToast(`Application submitted to ${squad.lead?.name || 'squad lead'} for ${hackathon.title}!`);
    }
  };

  const handleInvite = (builder) => {
    setInvitedBuilders(prev => ({ ...prev, [builder.id]: true }));
    if (onInviteBuilder) {
      onInviteBuilder(builder.name);
    }
    if (showToast) {
      showToast(`Squad invitation dispatched to ${builder.name}!`);
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!squadTitle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newSquad = {
        id: `squad-${Date.now()}`,
        title: squadTitle,
        fullTitle: `${squadTitle} — ${hackathon.title} Squad`,
        tagline: squadPitch || `Building for ${hackathon.title} in ${selectedTrack || 'General Track'}`,
        fullDescription: squadPitch,
        type: 'hackathon',
        categoryBadge: hackathon.title.split(' ')[0] + ' 2026',
        recruitingBadge: 'Recruiting 2 Roles',
        urgency: 'high',
        matchScore: 96,
        publishedTime: 'Just now',
        image: hackathon.heroImage || hackathon.coverImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbkVkD8ugQCopgjlKUdX6h2t7iGR8U7cAotGEX4gkVp2iZGYgNXuhDd7uv8XKPdDKxRc5LVG5-2ku_w-inG49pGRXEBeatfaGIbtDqTB4GZbf-12sVHdMJBR4s9dSwOvIgdwjHPZxHAYY6iul7GnOXO1wqM8s9NQjaFCIpekgajipka8rL8aNXyl4sNuZ5jWKKChl91y1bgaayoCYgzuMAvhhpxODIRFzAx9FdSUbydfyLDzrLu9E',
        imageTag: selectedTrack || 'Hackathon Sprint',
        techStack: ['React 19', 'FastAPI', 'Tailwind', 'Python'],
        rolesNeeded: rolesNeeded.split(',').map(r => r.trim()).filter(Boolean),
        campus: 'stanford',
        filledCount: 1,
        totalCapacity: 4,
        lead: {
          name: 'Jayanth V.',
          university: 'Stanford CS \'26',
          roleTitle: 'Squad Founder',
          avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG'
        },
        openVacancies: rolesNeeded.split(',').map((r, i) => ({
          id: `vac-${i}`,
          track: 'Core Contributor',
          title: r.trim(),
          seats: '1 seat open',
          desc: `Looking for a strong ${r.trim()} to build for ${hackathon.title}.`,
          skills: ['Problem Solving', 'Git', 'Fast Prototyping'],
          hours: '10–12 hrs / week'
        }))
      };

      if (onCreateSquad) {
        onCreateSquad(newSquad);
      }
      setIsSubmitting(false);
      onClose();
      if (showToast) {
        showToast(`Squad "${squadTitle}" registered for ${hackathon.title}!`);
      }
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-[11px] font-extrabold uppercase tracking-wide">
              {hackathon.circuitId || 'CIRCUIT MATCHMAKING'}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {hackathon.dates} · {hackathon.location?.split(',')[0]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
              {hackathon.logo ? (
                <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain rounded" />
              ) : (
                <span className="material-symbols-outlined text-2xl text-secondary">terminal</span>
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Squad Up for {hackathon.title}
              </h2>
              <p className="text-xs text-blue-200/90 font-medium mt-0.5">
                Join verified teams, scout solo hackers, or register your own squad.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-2.5 border-b border-surface-container-high bg-surface-container-low shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('squads')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'squads'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">groups</span>
            <span>Active Squads</span>
            <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-extrabold">
              {hackathonSquads.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('builders')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'builders'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">person_search</span>
            <span>Solo Hackers Seeking Squad</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold">
              {builders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'create'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Create Squad</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: ACTIVE SQUADS */}
          {activeTab === 'squads' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
                <span>Verified student teams actively scouting teammates for {hackathon.title}:</span>
                <span className="text-secondary font-bold">Direct Lead Review</span>
              </div>

              {hackathonSquads.map((squad) => {
                const isApplied = appliedSquads[squad.id];
                const openCount = squad.totalCapacity - squad.filledCount;
                return (
                  <div
                    key={squad.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/70 hover:border-secondary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-title-md font-bold text-on-surface truncate">
                          {squad.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold shrink-0">
                          {openCount} {openCount === 1 ? 'seat open' : 'seats open'}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-1">
                        {squad.tagline}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[11px] font-bold text-secondary">Seeking:</span>
                        {squad.openVacancies?.map((v, vidx) => (
                          <span
                            key={vidx}
                            className="px-2 py-0.5 rounded-md bg-surface-container-lowest text-on-surface text-[11px] font-semibold border border-surface-container-high/60"
                          >
                            {v.title}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-on-surface-variant">
                        <img src={squad.lead?.avatar} alt={squad.lead?.name} className="w-4 h-4 rounded-full object-cover" />
                        <span>Lead: <strong className="text-on-surface">{squad.lead?.name}</strong> ({squad.lead?.university})</span>
                        <span>•</span>
                        <span>{squad.filledCount}/{squad.totalCapacity} Members</span>
                      </div>
                    </div>

                    <div className="shrink-0 pt-2 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleApply(squad)}
                        disabled={isApplied}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isApplied
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-primary hover:bg-surface-tint text-on-primary shadow-sm active:scale-[0.98]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isApplied ? 'check_circle' : 'bolt'}
                        </span>
                        <span>{isApplied ? 'Application Sent' : 'Request to Join Squad'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SOLO BUILDERS SEEKING SQUAD */}
          {activeTab === 'builders' && (
            <div className="space-y-3">
              <div className="text-xs text-on-surface-variant font-medium">
                Verified student technologists seeking squads for {hackathon.title}:
              </div>

              {builders.map((builder) => {
                const isInvited = invitedBuilders[builder.id];
                return (
                  <div
                    key={builder.id}
                    className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/70 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={builder.avatar} alt={builder.name} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-title-sm font-bold text-on-surface truncate">
                            {builder.name}
                          </h4>
                          <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                            {builder.match}
                          </span>
                        </div>
                        <p className="text-xs text-secondary font-semibold truncate">
                          {builder.role} · {builder.university}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {builder.skills.slice(0, 3).map((sk, sidx) => (
                            <span key={sidx} className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-[10px] text-on-surface-variant font-medium">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => handleInvite(builder)}
                        disabled={isInvited}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isInvited
                            ? 'bg-surface-container text-secondary font-semibold'
                            : 'bg-primary hover:bg-surface-tint text-on-primary shadow-xs'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isInvited ? 'check' : 'person_add'}
                        </span>
                        <span>{isInvited ? 'Invited' : 'Invite'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: CREATE NEW SQUAD FOR THIS HACKATHON */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/60 text-xs text-blue-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">flag</span>
                <span>
                  Your squad will be automatically tagged with <strong>{hackathon.title}</strong> and listed in the circuit directory.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Squad / Project Idea Name
                </label>
                <input
                  type="text"
                  required
                  value={squadTitle}
                  onChange={(e) => setSquadTitle(e.target.value)}
                  placeholder="e.g. NeuroSync, VeriMesh, BioShield..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest text-xs sm:text-sm text-on-surface outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Target Prize Track
                </label>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest text-xs sm:text-sm text-on-surface outline-none transition-all font-medium cursor-pointer"
                >
                  <option value="">Select track bounty...</option>
                  {hackathon.bounties?.map((b, bidx) => (
                    <option key={bidx} value={b.track}>
                      {b.track} ({b.prize})
                    </option>
                  )) || hackathon.trackLabels?.map((tl, tidx) => (
                    <option key={tidx} value={tl}>{tl}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Roles Needed (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={rolesNeeded}
                  onChange={(e) => setRolesNeeded(e.target.value)}
                  placeholder="e.g. Frontend Lead, Python Backend, UX Designer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest text-xs sm:text-sm text-on-surface outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Brief Pitch &amp; Tech Stack Plan
                </label>
                <textarea
                  rows={3}
                  required
                  value={squadPitch}
                  onChange={(e) => setSquadPitch(e.target.value)}
                  placeholder="What is your squad concept, what problem does it address, and what core technologies will you deploy?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest text-xs sm:text-sm text-on-surface outline-none transition-all font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('squads')}
                  className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface transition-all cursor-pointer"
                >
                  Back to Squads
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-xs font-bold text-on-primary shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  <span>{isSubmitting ? 'Registering Squad...' : 'Register Squad for ' + hackathon.title.split(' ')[0]}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 sm:p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
            <span>All squads adhere to the official collegiate circuit code of conduct.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary font-bold hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
