import React, { useState } from 'react';

export default function FindBuilders({ builders, onInvite }) {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [invitedMap, setInvitedMap] = useState({});

  const handleInviteClick = (builderId, builderName) => {
    setInvitedMap(prev => ({ ...prev, [builderId]: true }));
    if (onInvite) onInvite(builderName);
  };

  const filteredBuilders = builders.filter(b => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = b.name.toLowerCase().includes(q) ||
                    b.university.toLowerCase().includes(q) ||
                    b.skills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedRole !== 'all') {
      if (!b.role.toLowerCase().includes(selectedRole.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
      <div className="flex flex-col max-w-3xl">
        <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-base">group_add</span>
          <span>Student Builder Matchmaking</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
          Find Campus Teammates
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Scout verified student engineers, designers, and researchers seeking squads for upcoming hackathons.
        </p>
      </div>

      {/* Search & Filter bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col md:flex-row gap-space-md items-center justify-between">
        <div className="relative w-full md:w-96 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search builders by name, skill, university..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-xl outline-none focus:bg-surface-container-lowest shadow-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedRole('all')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              selectedRole === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            All Builders
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('backend')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              selectedRole === 'backend' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Backend
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('frontend')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              selectedRole === 'frontend' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Frontend
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('zk')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              selectedRole === 'zk' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Web3 / ZK
          </button>
        </div>
      </div>

      {/* Grid of Builder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filteredBuilders.map((b) => (
          <div
            key={b.id}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-space-sm">
              <img
                src={b.avatar}
                alt={b.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                    {b.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                    {b.match}
                  </span>
                </div>
                <div className="font-body-sm text-body-sm text-secondary font-medium">
                  {b.role}
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  {b.university} · {b.year}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low text-body-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface block text-label-sm uppercase tracking-wider mb-1">
                Target Objective:
              </span>
              {b.lookingFor}
            </div>

            <div>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-1.5">
                Verified Skill Set:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {b.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="px-2.5 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-space-xs border-t border-surface-container-low flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert(`Opening student portfolio for ${b.name}`)}
                className="py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm transition-all"
              >
                View Profile
              </button>
              <button
                type="button"
                onClick={() => handleInviteClick(b.id, b.name)}
                disabled={invitedMap[b.id]}
                className={`py-2 px-4 rounded-xl font-title-sm text-title-sm transition-all flex items-center gap-1 cursor-pointer ${
                  invitedMap[b.id]
                    ? 'bg-surface-container text-secondary font-semibold'
                    : 'bg-primary text-on-primary hover:bg-surface-tint active:scale-[0.98]'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {invitedMap[b.id] ? 'check' : 'person_add'}
                </span>
                <span>{invitedMap[b.id] ? 'Invited' : 'Invite to Squad'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
