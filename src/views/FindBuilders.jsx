import React, { useState, useRef } from 'react';

const DEFAULT_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Alex R.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
  },
  {
    id: 'avatar-2',
    label: 'Rahul S.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmEZNtZGZBJt86mDapjBMA0jOqw7hClt5LtW8N3lZ1PQ1ZC9mxCwRPM0ZfJRe8FPjziwi8z-_eN14d36A7R-ixuMvlxN0uo5C1tIcO3PKyrDcVXCOAHrzgD10dDNX-1ahjrVulehRiTbJcd-o8XWvwMCQ-wXRLPvIzrI5cQ5jr2JctNHGF-GIFCXFEKkq3h6Ubriud652-Lvq5GUFgOVhef4OgN8z8bnkWKXgL3usgFpNzAG4LBHY'
  },
  {
    id: 'avatar-3',
    label: 'Sarah J.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB'
  },
  {
    id: 'avatar-4',
    label: 'Praveen K.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_'
  },
  {
    id: 'avatar-5',
    label: 'David K.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnDqHq7n8m_K6j4eGKbfcjul0Rdr1QG5Ai8saCMYCXkObI8mE9oih96TixdnmcMXtFEQlqlJewoM56m3xVQh80IrQnjI75C0okcQgPtX5VRLyQyG1xncpm5xM1SIeGzIhdLzcGFIWr8ybJVxQlX3eAktW5BI5tcsgx9mTd85e_M5KIx3k4DKPbO4vVPaoJaaSIwqtLbYIOZafGhQxDeE9kN9GO3OSsDJWyLRvcTHafkjcPmV0Rs2I'
  },
  {
    id: 'avatar-6',
    label: 'Maya C.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX'
  }
];

export default function FindBuilders({ builders, onInvite, onAddBuilder, onViewProfile, showToast }) {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [invitedMap, setInvitedMap] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Builder Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Fullstack Developer');
  const [newUniversity, setNewUniversity] = useState('Stanford CS');
  const [newYear, setNewYear] = useState("'26");
  const [newLookingFor, setNewLookingFor] = useState('Seeking hackathon team for high-impact AI/systems tracks');
  const [newSkillsInput, setNewSkillsInput] = useState('React, Python, Node.js');
  const [newAvatar, setNewAvatar] = useState(DEFAULT_AVATARS[0].url);

  const fileInputRef = useRef(null);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (typeof base64 === 'string') {
        setNewAvatar(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBuilderSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const skillsArr = newSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newBuilder = {
      id: `builder-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'Software Engineer',
      university: newUniversity.trim() || 'Collegiate Member',
      year: newYear.trim() || "'26",
      avatar: newAvatar || DEFAULT_AVATARS[0].url,
      match: '96% Match',
      lookingFor: newLookingFor.trim() || 'Seeking active squad for upcoming hackathon sprint',
      skills: skillsArr.length > 0 ? skillsArr : ['Fullstack', 'React', 'Node.js']
    };

    if (onAddBuilder) {
      onAddBuilder(newBuilder);
    }

    // Reset form
    setNewName('');
    setNewRole('Fullstack Developer');
    setNewSkillsInput('React, Python, Node.js');
    setNewLookingFor('Seeking hackathon team for high-impact AI/systems tracks');
    setNewAvatar(DEFAULT_AVATARS[0].url);
    setIsAddModalOpen(false);
  };

  const handleInviteClick = (builder) => {
    const bId = builder._id || builder.id;
    setInvitedMap(prev => ({ ...prev, [bId]: true }));
    if (onInvite) onInvite(builder);
  };

  const filteredBuilders = builders.filter(b => {
    const bName = b.name || '';
    const bUniv = b.university || b.college || '';
    const bRole = b.roleTitle || b.role || '';
    const bSkills = Array.isArray(b.skills) ? b.skills : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      const match = bName.toLowerCase().includes(q) ||
                    bUniv.toLowerCase().includes(q) ||
                    bSkills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedRole !== 'all') {
      if (!bRole.toLowerCase().includes(selectedRole.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col max-w-2xl">
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

        <div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>+ Add Worker / Builder</span>
          </button>
        </div>
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
            key={b._id || b.id}
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
                onClick={() => onViewProfile ? onViewProfile(b._id || b.id) : null}
                className="py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm transition-all cursor-pointer"
              >
                View Profile
              </button>
              <button
                type="button"
                onClick={() => handleInviteClick(b)}
                disabled={invitedMap[b._id || b.id]}
                className={`py-2 px-4 rounded-xl font-title-sm text-title-sm transition-all flex items-center gap-1 cursor-pointer ${
                  invitedMap[b._id || b.id]
                    ? 'bg-surface-container text-secondary font-semibold'
                    : 'bg-primary text-on-primary hover:bg-surface-tint active:scale-[0.98]'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {invitedMap[b._id || b.id] ? 'check' : 'person_add'}
                </span>
                <span>{invitedMap[b._id || b.id] ? 'Invited' : 'Invite to Squad'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Worker / Builder Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Talent Directory</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight">Add Worker / Builder</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Register a verified student builder to the collegiate matchmaking pool.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateBuilderSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
              <div>
                <label className="text-xs font-bold uppercase text-outline block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera, Devika S..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-outline block mb-1">
                    Primary Role / Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fullstack Developer, AI Researcher..."
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-outline block mb-1">
                    University / College &amp; Year
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Stanford CS"
                      value={newUniversity}
                      onChange={(e) => setNewUniversity(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
                    />
                    <input
                      type="text"
                      placeholder="'26"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-20 px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm text-center transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-outline block mb-1">
                  Target Objective / Squad Goal
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seeking high-intensity squad for TreeHacks systems track or AI track..."
                  value={newLookingFor}
                  onChange={(e) => setNewLookingFor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-outline block mb-1">
                  Verified Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React 19, Python, FastAPI, Tailwind, PyTorch"
                  value={newSkillsInput}
                  onChange={(e) => setNewSkillsInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
                />
              </div>

              {/* Profile Image & Avatar Selection */}
              <div className="pt-2 border-t border-surface-container-high space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-outline block">
                    Profile Avatar / Photo
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">upload</span>
                    <span>Upload photo from device</span>
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-2xl border border-surface-container-high">
                  <img
                    src={newAvatar || DEFAULT_AVATARS[0].url}
                    alt="Selected Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-secondary shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-on-surface block">
                      Selected Builder Photo
                    </span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Uploaded photos or chosen default avatars will be displayed across student squad cards.
                    </p>
                  </div>
                </div>

                {/* Default Preset Avatars */}
                <div>
                  <span className="text-[11px] text-on-surface-variant font-medium block mb-2">
                    Or select from curated default builder avatars:
                  </span>
                  <div className="grid grid-cols-6 gap-2">
                    {DEFAULT_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setNewAvatar(av.url)}
                        title={av.label}
                        className={`relative rounded-2xl overflow-hidden p-0.5 border-2 transition-all cursor-pointer ${
                          newAvatar === av.url
                            ? 'border-secondary ring-2 ring-secondary/30 scale-105'
                            : 'border-transparent hover:border-outline opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.label}
                          className="w-full h-12 object-cover rounded-xl"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-surface-tint text-on-primary text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Add Worker to Pool</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
