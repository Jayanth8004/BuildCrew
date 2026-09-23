import { useState } from 'react';

export default function AdminDashboard({
  currentUser,
  hackathons,
  onUpdateHackathons,
  showToast
}) {
  // 'list' | 'form'
  const [view, setView] = useState('list');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [hackToDelete, setHackToDelete] = useState(null);

  // Form State containing the 18 fields
  const emptyForm = {
    title: '',
    organizer: '',
    description: '',
    officialWebsite: '',
    registrationLink: '',
    registrationDeadline: '',
    hackathonStart: '',
    hackathonEnd: '',
    mode: 'in-person',
    location: '',
    registrationFee: '100% Free',
    minTeamSize: '2',
    maxTeamSize: '4',
    eligibility: 'Open to all enrolled university students worldwide.',
    tracks: '',
    prizePool: '$10,000',
    rules: 'All code must be created during the event. Open-source libraries permitted. Teams retain 100% IP ownership.',
    officialSource: 'University ACM Chapter & Official Host Website'
  };

  const [formData, setFormData] = useState(emptyForm);

  // Navigate to Add Hackathon Page
  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setEditingId(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Edit Hackathon Page with existing data populated
  const handleOpenEdit = (hack) => {
    setIsEditing(true);
    setEditingId(hack.id);

    // Extract team sizes if formatted as "X to Y"
    let minSize = '2';
    let maxSize = '4';
    const sizeStr = hack.squadLimits || hack.teamSize || '';
    const sizeMatch = sizeStr.match(/(\d+)\s*(?:to|–|-)\s*(\d+)/i);
    if (sizeMatch) {
      minSize = sizeMatch[1];
      maxSize = sizeMatch[2];
    }

    setFormData({
      title: hack.title || '',
      organizer: typeof hack.organizer === 'object' ? hack.organizer?.name || '' : hack.organizer || '',
      description: hack.description || '',
      officialWebsite: hack.officialWebsite || (typeof hack.organizer === 'object' ? hack.organizer?.website || '' : '') || '',
      registrationLink: hack.officialRegistrationLink || hack.registrationLink || '',
      registrationDeadline: hack.registrationDeadline || '',
      hackathonStart: hack.startDate || hack.dates?.split('–')[0]?.trim() || '',
      hackathonEnd: hack.endDate || hack.dates?.split('–')[1]?.trim() || '',
      mode: hack.mode || 'in-person',
      location: hack.location || '',
      registrationFee: hack.registrationFee || '100% Free',
      minTeamSize: hack.minTeamSize || minSize,
      maxTeamSize: hack.maxTeamSize || maxSize,
      eligibility: hack.eligibility || 'Open to enrolled college and university students.',
      tracks: Array.isArray(hack.trackLabels) ? hack.trackLabels.join(', ') : (Array.isArray(hack.tracks) ? hack.tracks.join(', ') : (hack.tracks || '')),
      prizePool: hack.prizePool || '',
      rules: Array.isArray(hack.rules) ? hack.rules.join('\n') : (hack.rules || ''),
      officialSource: hack.officialSource || (typeof hack.lastVerified === 'object' ? hack.lastVerified?.verifier || '' : hack.lastVerified || 'Collegiate Host Board')
    });

    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save / Publish Handler
  const handleSave = (shouldPublish) => {
    if (!formData.title.trim()) {
      alert('Please enter the hackathon name.');
      return;
    }

    const tracksArray = formData.tracks
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const rulesArray = formData.rules
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const datesString = formData.hackathonStart && formData.hackathonEnd
      ? `${formData.hackathonStart} – ${formData.hackathonEnd}`
      : formData.hackathonStart || 'TBD';

    const teamSizeString = `${formData.minTeamSize} to ${formData.maxTeamSize} members`;

    if (!isEditing) {
      // Create New Hackathon
      const newHack = {
        id: `hack-${Date.now()}`,
        title: formData.title.trim(),
        organizer: {
          name: formData.organizer || 'Organizing Committee',
          website: formData.officialWebsite || ''
        },
        description: formData.description,
        officialWebsite: formData.officialWebsite,
        officialRegistrationLink: formData.registrationLink,
        registrationLink: formData.registrationLink,
        registrationDeadline: formData.registrationDeadline,
        startDate: formData.hackathonStart,
        endDate: formData.hackathonEnd,
        dates: datesString,
        mode: formData.mode,
        location: formData.location || (formData.mode === 'virtual' ? 'Virtual Online' : 'Campus Venue'),
        registrationFee: formData.registrationFee,
        minTeamSize: formData.minTeamSize,
        maxTeamSize: formData.maxTeamSize,
        teamSize: teamSizeString,
        squadLimits: teamSizeString,
        eligibility: formData.eligibility,
        tracks: tracksArray.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')),
        trackLabels: tracksArray.length > 0 ? tracksArray : ['General Track'],
        prizePool: formData.prizePool || 'TBD',
        rules: rulesArray.length > 0 ? rulesArray : ['Standard hackathon rules apply.'],
        officialSource: formData.officialSource,
        status: shouldPublish ? 'open' : 'draft',
        statusLabel: shouldPublish ? 'Registration open' : 'Draft',
        isPublished: shouldPublish
      };

      onUpdateHackathons([newHack, ...hackathons]);
      showToast?.(`Hackathon "${newHack.title}" ${shouldPublish ? 'published successfully!' : 'saved as draft.'}`);
    } else {
      // Update Existing Hackathon
      const updated = hackathons.map(h => {
        if (h.id === editingId) {
          return {
            ...h,
            title: formData.title.trim(),
            organizer: {
              ...(typeof h.organizer === 'object' ? h.organizer : {}),
              name: formData.organizer,
              website: formData.officialWebsite || ''
            },
            description: formData.description,
            officialWebsite: formData.officialWebsite,
            officialRegistrationLink: formData.registrationLink,
            registrationLink: formData.registrationLink,
            registrationDeadline: formData.registrationDeadline,
            startDate: formData.hackathonStart,
            endDate: formData.hackathonEnd,
            dates: datesString,
            mode: formData.mode,
            location: formData.location,
            registrationFee: formData.registrationFee,
            minTeamSize: formData.minTeamSize,
            maxTeamSize: formData.maxTeamSize,
            teamSize: teamSizeString,
            squadLimits: teamSizeString,
            eligibility: formData.eligibility,
            tracks: tracksArray.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')),
            trackLabels: tracksArray.length > 0 ? tracksArray : h.trackLabels,
            prizePool: formData.prizePool,
            rules: rulesArray.length > 0 ? rulesArray : h.rules,
            officialSource: formData.officialSource,
            status: shouldPublish ? (h.status === 'draft' ? 'open' : h.status) : 'draft',
            statusLabel: shouldPublish ? (h.status === 'draft' ? 'Registration open' : h.statusLabel) : 'Draft',
            isPublished: shouldPublish
          };
        }
        return h;
      });

      onUpdateHackathons(updated);
      showToast?.(`Updated "${formData.title}" successfully!`);
    }

    setView('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleConfirmDelete = () => {
    if (!hackToDelete) return;
    const title = hackToDelete.title;
    const updated = hackathons.filter(h => h.id !== hackToDelete.id);
    onUpdateHackathons(updated);
    setHackToDelete(null);
    showToast?.(`Deleted "${title}" successfully.`);
  };

  // ========================================================
  // VIEW 1: MANAGE HACKATHONS LIST / TABLE PAGE
  // ========================================================
  if (view === 'list') {
    return (
      <div className="flex flex-col w-full pb-space-xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight uppercase">
              MANAGE HACKATHONS
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Add, update, and manage collegiate hackathons on BuildCrew.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary text-xs font-bold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Add Hackathon</span>
          </button>
        </div>

        {/* Desktop / Laptop Table */}
        <div className="hidden md:block bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-outline uppercase font-extrabold text-[10px] tracking-wider border-b border-surface-container-high">
              <tr>
                <th className="py-3.5 px-4">Hackathon Name</th>
                <th className="py-3.5 px-3">Organizer</th>
                <th className="py-3.5 px-3">Registration Deadline</th>
                <th className="py-3.5 px-3">Event Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-center">Edit</th>
                <th className="py-3.5 px-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60">
              {hackathons.map((h) => {
                const isPub = h.isPublished !== false;
                const orgName = typeof h.organizer === 'object' ? h.organizer?.name : h.organizer || 'Collegiate Host';

                return (
                  <tr key={h.id} className="hover:bg-surface-container-low/40 transition-colors">
                    {/* Hackathon Name */}
                    <td className="py-3.5 px-4 font-bold text-on-surface">
                      <span className="text-xs sm:text-sm block truncate max-w-[260px]" title={h.title}>
                        {h.title}
                      </span>
                    </td>

                    {/* Organizer */}
                    <td className="py-3.5 px-3 text-on-surface-variant font-medium">
                      <span className="truncate max-w-[180px] block" title={orgName}>
                        {orgName}
                      </span>
                    </td>

                    {/* Registration Deadline */}
                    <td className="py-3.5 px-3 text-amber-900 font-semibold">
                      {h.registrationDeadline || 'TBD'}
                    </td>

                    {/* Event Date */}
                    <td className="py-3.5 px-3 text-on-surface font-medium">
                      {h.dates || (h.startDate ? `${h.startDate} – ${h.endDate}` : 'TBD')}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isPub
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                        <span>{isPub ? 'Published' : 'Draft'}</span>
                      </span>
                    </td>

                    {/* Edit Action */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(h)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                        title="Edit Hackathon Information"
                      >
                        <span className="material-symbols-outlined text-sm text-secondary">edit</span>
                        <span>Edit</span>
                      </button>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setHackToDelete(h)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-700 transition-all cursor-pointer inline-flex items-center"
                        title="Delete Hackathon"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Stacked Cards */}
        <div className="md:hidden space-y-3">
          {hackathons.map((h) => {
            const isPub = h.isPublished !== false;
            const orgName = typeof h.organizer === 'object' ? h.organizer?.name : h.organizer || 'Collegiate Host';

            return (
              <div
                key={h.id}
                className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-on-surface truncate" title={h.title}>
                      {h.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant truncate mt-0.5">
                      {orgName}
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isPub
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                    <span>{isPub ? 'Published' : 'Draft'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-surface-container-low text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">Event Date</span>
                    <span className="font-semibold text-on-surface truncate block mt-0.5">
                      {h.dates || h.startDate || 'TBD'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">Registration Deadline</span>
                    <span className="font-semibold text-amber-900 truncate block mt-0.5">
                      {h.registrationDeadline || 'TBD'}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions: Edit, Delete */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-container-high/60">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(h)}
                    className="py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm text-secondary">edit</span>
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHackToDelete(h)}
                    className="py-1.5 px-2.5 rounded-xl hover:bg-red-50 text-red-600 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Dialog */}
        {hackToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-modal">
            <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">warning</span>
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">
                    Delete this hackathon?
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Are you sure you want to delete <strong>{hackToDelete.title}</strong>?
                  </p>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                This action will remove this hackathon from the admin list and the student Hackathons view.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setHackToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========================================================
  // VIEW 2: DEDICATED HACKATHON DETAILS PAGE (NOT A MODAL)
  // ========================================================
  return (
    <div className="flex flex-col w-full pb-space-xl space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Back button and page title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container-high/80">
        <div>
          <button
            type="button"
            onClick={() => setView('list')}
            className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline cursor-pointer mb-2"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Manage Hackathons</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight uppercase">
            {isEditing ? 'EDIT HACKATHON' : 'ADD HACKATHON'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            {isEditing ? `Modify information for ${formData.title || 'hackathon'}` : 'Fill in the hackathon details below.'}
          </p>
        </div>
      </div>

      {/* Form Container Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-surface-container-high shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(true);
          }}
          className="space-y-4 text-xs"
        >
          {/* 1. Hackathon Name & 2. Organizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Hackathon Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Stanford TreeHacks 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Organizer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                placeholder="e.g. Stanford ACM & TreeHacks Board"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="block font-bold text-on-surface mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a description of the hackathon..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium resize-none"
            />
          </div>

          {/* 4. Official Website & 5. Registration Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Official Website
              </label>
              <input
                type="url"
                value={formData.officialWebsite}
                onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                placeholder="https://treehacks.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Registration Link
              </label>
              <input
                type="url"
                value={formData.registrationLink}
                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                placeholder="https://treehacks.com/apply"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 6. Registration Deadline */}
          <div>
            <label className="block font-bold text-on-surface mb-1">
              Registration Deadline
            </label>
            <input
              type="text"
              value={formData.registrationDeadline}
              onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
              placeholder="e.g. Nov 01, 2026 at 11:59 PM PT"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
            />
          </div>

          {/* 7. Hackathon Start & 8. Hackathon End */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Hackathon Start
              </label>
              <input
                type="text"
                value={formData.hackathonStart}
                onChange={(e) => setFormData({ ...formData, hackathonStart: e.target.value })}
                placeholder="e.g. Nov 14, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Hackathon End
              </label>
              <input
                type="text"
                value={formData.hackathonEnd}
                onChange={(e) => setFormData({ ...formData, hackathonEnd: e.target.value })}
                placeholder="e.g. Nov 16, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 9. Mode & 10. Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Mode
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium cursor-pointer"
              >
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Stanford University, Stanford, CA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 11. Registration Fee & Team Sizes (12. Minimum Team Size & 13. Maximum Team Size) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Registration Fee
              </label>
              <input
                type="text"
                value={formData.registrationFee}
                onChange={(e) => setFormData({ ...formData, registrationFee: e.target.value })}
                placeholder="e.g. 100% Free"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Minimum Team Size
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.minTeamSize}
                onChange={(e) => setFormData({ ...formData, minTeamSize: e.target.value })}
                placeholder="e.g. 2"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Maximum Team Size
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.maxTeamSize}
                onChange={(e) => setFormData({ ...formData, maxTeamSize: e.target.value })}
                placeholder="e.g. 4"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 14. Eligibility */}
          <div>
            <label className="block font-bold text-on-surface mb-1">
              Eligibility
            </label>
            <input
              type="text"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              placeholder="e.g. Open to all enrolled university students worldwide"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
            />
          </div>

          {/* 15. Tracks & 16. Prize Pool */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">
                Tracks (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tracks}
                onChange={(e) => setFormData({ ...formData, tracks: e.target.value })}
                placeholder="e.g. AI Swarms, HealthTech, Climate, Hardware"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">
                Prize Pool
              </label>
              <input
                type="text"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                placeholder="e.g. $30,000+ Prizes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
              />
            </div>
          </div>

          {/* 17. Rules */}
          <div>
            <label className="block font-bold text-on-surface mb-1">
              Rules
            </label>
            <textarea
              rows={3}
              value={formData.rules}
              onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
              placeholder="Enter hackathon rules, fresh code policy, IP ownership..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium resize-none"
            />
          </div>

          {/* 18. Official Source */}
          <div>
            <label className="block font-bold text-on-surface mb-1">
              Official Source
            </label>
            <input
              type="text"
              value={formData.officialSource}
              onChange={(e) => setFormData({ ...formData, officialSource: e.target.value })}
              placeholder="e.g. Stanford University ACM Chapter & TreeHacks Board"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
            />
          </div>

          {/* Action Buttons: Save Draft | Publish */}
          <div className="pt-6 border-t border-surface-container-high flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setView('list')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer text-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs border border-surface-container-high transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-amber-700">draft</span>
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(true)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">publish</span>
              <span>Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
