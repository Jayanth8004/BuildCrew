import { useState, useMemo } from 'react';
import HackathonCard from '../components/hackathons/HackathonCard';
import HackathonDetailsModal from '../components/hackathons/HackathonDetailsModal';

export default function AdminDashboard({
  currentUser,
  hackathons,
  onUpdateHackathons,
  onResetDefaults,
  showToast,
  onNavigate
}) {
  // Navigation: 'list' | 'form'
  const [view, setView] = useState('list');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Table filters & sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [modeFilter, setModeFilter] = useState('all'); // 'all' | 'online' | 'offline' | 'hybrid'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'prize' | 'title'

  // Modals & previews
  const [hackToDelete, setHackToDelete] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [previewHackathon, setPreviewHackathon] = useState(null);
  const [showLiveFormPreview, setShowLiveFormPreview] = useState(true);

  // Initial Empty Form Template for the 18 fields
  const emptyForm = {
    title: '',
    organizer: '',
    description: '',
    officialWebsite: '',
    registrationLink: '',
    registrationDeadline: '',
    hackathonStart: '',
    hackathonEnd: '',
    mode: 'Hybrid', // 'Online' | 'Offline' | 'Hybrid'
    location: '',
    registrationFee: '100% Free',
    minTeamSize: '2',
    maxTeamSize: '4',
    eligibility: 'Open to all currently enrolled undergraduate, master\'s, and PhD students worldwide.',
    tracks: ['AI & Autonomous Agents', 'Web3 & Infra', 'HealthTech', 'Open Innovation'],
    prizePool: '$25,000 Grants',
    rules: [
      'Fresh Code Policy: All architecture code, frontend components, and model pipelines must be created during the official sprint period.',
      'Intellectual Property: Participating squads retain 100% ownership, copyright, and patent rights over their prototypes.',
      'Squad Capacity: Strict adherence to minimum and maximum builder limits per registered squad.',
      'Submission Standards: Each squad must provide a public GitHub repository, working demo, and 2-minute walkthrough pitch.'
    ],
    officialSource: 'Collegiate ACM Chapter & Sanctioning Board'
  };

  const [formData, setFormData] = useState(emptyForm);
  const [trackInput, setTrackInput] = useState('');
  const [newRuleInput, setNewRuleInput] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Common quick track presets for fast tagging
  const suggestedTracks = [
    'AI & Agents',
    'Machine Learning',
    'Web3 & Infra',
    'FinTech',
    'HealthTech',
    'BioTech',
    'ClimateTech',
    'Hardware & IoT',
    'Cybersecurity',
    'EdTech',
    'Open Track'
  ];

  // Common fee presets
  const feePresets = ['100% Free', '$0 with Student ID', 'Free (Host Funded)', '$15 Registration'];

  // Common prize presets
  const prizePresets = ['$10,000 Grants', '$25,000 Grants', '$45,000 Grants', '$60,000+ Prizes'];

  // Normalize mode strings helper
  const normalizeMode = (m) => {
    if (!m) return 'Hybrid';
    const lower = m.toLowerCase();
    if (lower === 'virtual' || lower === 'online') return 'Online';
    if (lower === 'in-person' || lower === 'offline') return 'Offline';
    return 'Hybrid';
  };

  // Convert raw team size string if formatted as "X to Y"
  const parseTeamSizes = (hack) => {
    let minSize = '2';
    let maxSize = '4';
    const sizeStr = hack.squadLimits || hack.teamSize || '';
    const sizeMatch = sizeStr.match(/(\d+)\s*(?:to|–|-)\s*(\d+)/i);
    if (sizeMatch) {
      minSize = sizeMatch[1];
      maxSize = sizeMatch[2];
    }
    return {
      min: hack.minTeamSize || minSize,
      max: hack.maxTeamSize || maxSize
    };
  };

  // Open Form to Add New Hackathon
  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setTrackInput('');
    setNewRuleInput('');
    setFormErrors({});
    setIsEditing(false);
    setEditingId(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Form to Edit Existing Hackathon
  const handleOpenEdit = (hack) => {
    setIsEditing(true);
    setEditingId(hack.id);
    setFormErrors({});

    const { min, max } = parseTeamSizes(hack);

    // Extract tracks
    let tracksArr = [];
    if (Array.isArray(hack.trackLabels) && hack.trackLabels.length > 0) {
      tracksArr = [...hack.trackLabels];
    } else if (Array.isArray(hack.tracks) && hack.tracks.length > 0) {
      tracksArr = hack.tracks.map(t => t.toUpperCase());
    } else if (typeof hack.tracks === 'string') {
      tracksArr = hack.tracks.split(',').map(t => t.trim()).filter(Boolean);
    }

    // Extract rules
    let rulesArr;
    if (Array.isArray(hack.rules) && hack.rules.length > 0) {
      rulesArr = [...hack.rules];
    } else if (typeof hack.rules === 'string') {
      rulesArr = hack.rules.split('\n').map(r => r.trim()).filter(Boolean);
    } else {
      rulesArr = emptyForm.rules;
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
      mode: normalizeMode(hack.mode),
      location: hack.location || '',
      registrationFee: hack.registrationFee || '100% Free',
      minTeamSize: min,
      maxTeamSize: max,
      eligibility: hack.eligibility || emptyForm.eligibility,
      tracks: tracksArr.length > 0 ? tracksArr : emptyForm.tracks,
      prizePool: hack.prizePool || '$10,000 Grants',
      rules: rulesArr,
      officialSource: hack.officialSource || (typeof hack.lastVerified === 'object' ? hack.lastVerified?.verifier || '' : hack.lastVerified || 'Collegiate Host Board')
    });

    setTrackInput('');
    setNewRuleInput('');
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Duplicate / Clone Existing Hackathon
  const handleDuplicate = (hack) => {
    const cloned = {
      ...hack,
      id: `hack-clone-${Date.now()}`,
      circuitId: `BC-CIRC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${hack.title} (Copy)`,
      status: 'draft',
      statusLabel: 'Draft',
      isPublished: false
    };

    onUpdateHackathons([cloned, ...hackathons]);
    showToast?.(`Cloned "${hack.title}" as a draft!`);
  };

  // Quick Toggle Publish / Unpublish directly from table
  const handleTogglePublish = (hack) => {
    const willBePublished = !hack.isPublished;
    const updated = hackathons.map(h => {
      if (h.id === hack.id) {
        return {
          ...h,
          isPublished: willBePublished,
          status: willBePublished ? (h.status === 'draft' ? 'open' : h.status) : 'draft',
          statusLabel: willBePublished ? (h.status === 'draft' ? 'Registration open' : h.statusLabel) : 'Draft'
        };
      }
      return h;
    });

    onUpdateHackathons(updated);
    showToast?.(
      willBePublished
        ? `"${hack.title}" is now published and visible to students.`
        : `"${hack.title}" converted to draft.`
    );
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Hackathon Name is required.';
    if (!formData.organizer.trim()) errors.organizer = 'Organizer is required.';
    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (parseInt(formData.minTeamSize, 10) > parseInt(formData.maxTeamSize, 10)) {
      errors.teamSize = 'Minimum team size cannot be greater than maximum team size.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form Save Handler (Draft or Publish)
  const handleSave = (shouldPublish) => {
    if (!validateForm()) {
      showToast?.('Please resolve the highlighted form errors.');
      return;
    }

    const teamSizeString = `${formData.minTeamSize} to ${formData.maxTeamSize} Builders`;
    const datesString = formData.hackathonStart && formData.hackathonEnd
      ? `${formData.hackathonStart} – ${formData.hackathonEnd}`
      : formData.hackathonStart || 'TBD';

    const tracksClean = formData.tracks.length > 0 ? formData.tracks : ['General Innovation'];
    const trackKeys = tracksClean.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, ''));

    const defaultLocation =
      formData.mode === 'Online'
        ? 'Virtual Online (Discord & Zoom)'
        : formData.location || 'Campus Arena Venue';

    if (!isEditing) {
      // Create New
      const newHack = {
        id: `hack-${Date.now()}`,
        circuitId: `BC-CIRC-${Math.floor(1000 + Math.random() * 9000)}`,
        title: formData.title.trim(),
        subtitle: `Organized by ${formData.organizer.trim()}`,
        organizer: {
          name: formData.organizer.trim(),
          website: formData.officialWebsite.trim() || ''
        },
        description: formData.description.trim(),
        officialWebsite: formData.officialWebsite.trim(),
        officialRegistrationLink: formData.registrationLink.trim(),
        registrationLink: formData.registrationLink.trim(),
        registrationDeadline: formData.registrationDeadline.trim() || 'TBD',
        startDate: formData.hackathonStart.trim(),
        endDate: formData.hackathonEnd.trim(),
        dates: datesString,
        mode: formData.mode,
        location: defaultLocation,
        registrationFee: formData.registrationFee.trim() || '100% Free',
        minTeamSize: formData.minTeamSize,
        maxTeamSize: formData.maxTeamSize,
        teamSize: teamSizeString,
        squadLimits: teamSizeString,
        eligibility: formData.eligibility.trim(),
        tracks: trackKeys,
        trackLabels: tracksClean,
        prizePool: formData.prizePool.trim() || '$10,000 Grants',
        rules: formData.rules.length > 0 ? formData.rules : emptyForm.rules,
        officialSource: formData.officialSource.trim(),
        status: shouldPublish ? 'open' : 'draft',
        statusLabel: shouldPublish ? 'Registration open' : 'Draft',
        isPublished: shouldPublish,
        registeredTeams: 0,
        maxCap: 500,
        lastVerified: {
          verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          verifier: formData.officialSource || 'BuildCrew Collegiate Sanctioning Board'
        }
      };

      onUpdateHackathons([newHack, ...hackathons]);
      showToast?.(`Hackathon "${newHack.title}" ${shouldPublish ? 'published live!' : 'saved as draft.'}`);
    } else {
      // Update Existing
      const updated = hackathons.map(h => {
        if (h.id === editingId) {
          return {
            ...h,
            title: formData.title.trim(),
            subtitle: `Organized by ${formData.organizer.trim()}`,
            organizer: {
              ...(typeof h.organizer === 'object' ? h.organizer : {}),
              name: formData.organizer.trim(),
              website: formData.officialWebsite.trim() || ''
            },
            description: formData.description.trim(),
            officialWebsite: formData.officialWebsite.trim(),
            officialRegistrationLink: formData.registrationLink.trim(),
            registrationLink: formData.registrationLink.trim(),
            registrationDeadline: formData.registrationDeadline.trim() || 'TBD',
            startDate: formData.hackathonStart.trim(),
            endDate: formData.hackathonEnd.trim(),
            dates: datesString,
            mode: formData.mode,
            location: defaultLocation,
            registrationFee: formData.registrationFee.trim() || '100% Free',
            minTeamSize: formData.minTeamSize,
            maxTeamSize: formData.maxTeamSize,
            teamSize: teamSizeString,
            squadLimits: teamSizeString,
            eligibility: formData.eligibility.trim(),
            tracks: trackKeys,
            trackLabels: tracksClean,
            prizePool: formData.prizePool.trim() || h.prizePool,
            rules: formData.rules.length > 0 ? formData.rules : h.rules,
            officialSource: formData.officialSource.trim(),
            status: shouldPublish ? (h.status === 'draft' ? 'open' : h.status) : 'draft',
            statusLabel: shouldPublish ? (h.status === 'draft' ? 'Registration open' : h.statusLabel) : 'Draft',
            isPublished: shouldPublish
          };
        }
        return h;
      });

      onUpdateHackathons(updated);
      showToast?.(`Updated "${formData.title}" ${shouldPublish ? 'and published!' : 'as draft.'}`);
    }

    setView('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!hackToDelete) return;
    const title = hackToDelete.title;
    const updated = hackathons.filter(h => h.id !== hackToDelete.id);
    onUpdateHackathons(updated);
    setHackToDelete(null);
    showToast?.(`Deleted "${title}" from circuit database.`);
  };

  // Tracks chip actions
  const handleAddTrack = () => {
    const trimmed = trackInput.trim();
    if (trimmed && !formData.tracks.includes(trimmed)) {
      setFormData({ ...formData, tracks: [...formData.tracks, trimmed] });
      setTrackInput('');
    }
  };

  const handleRemoveTrack = (trackName) => {
    setFormData({
      ...formData,
      tracks: formData.tracks.filter(t => t !== trackName)
    });
  };

  // Rules list actions
  const handleAddRule = () => {
    const trimmed = newRuleInput.trim();
    if (trimmed) {
      setFormData({ ...formData, rules: [...formData.rules, trimmed] });
      setNewRuleInput('');
    }
  };

  const handleRemoveRule = (index) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index)
    });
  };

  const handleUpdateRule = (index, value) => {
    const updated = [...formData.rules];
    updated[index] = value;
    setFormData({ ...formData, rules: updated });
  };

  // Calculate stats for Executive Strip
  const stats = useMemo(() => {
    const total = hackathons.length;
    const published = hackathons.filter(h => h.isPublished !== false).length;
    const drafts = total - published;

    // Sum prize money
    let totalPrizesNumeric = 0;
    hackathons.forEach(h => {
      const match = (h.prizePool || '').replace(/[^0-9]/g, '');
      if (match) totalPrizesNumeric += parseInt(match, 10);
    });

    return {
      total,
      published,
      drafts,
      prizeSum: totalPrizesNumeric > 0 ? `$${totalPrizesNumeric.toLocaleString()}+` : '$150,000+'
    };
  }, [hackathons]);

  // Filtered and sorted hackathons for Table
  const filteredHackathons = useMemo(() => {
    return hackathons.filter(h => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = h.title?.toLowerCase().includes(q);
        const orgName = typeof h.organizer === 'object' ? h.organizer?.name : h.organizer || '';
        const matchesOrg = orgName.toLowerCase().includes(q);
        const matchesLoc = h.location?.toLowerCase().includes(q);
        const matchesTracks = h.trackLabels?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesOrg && !matchesLoc && !matchesTracks) {
          return false;
        }
      }

      // Status Filter
      const isPub = h.isPublished !== false;
      if (statusFilter === 'published' && !isPub) return false;
      if (statusFilter === 'draft' && isPub) return false;

      // Mode Filter
      if (modeFilter !== 'all') {
        const norm = normalizeMode(h.mode).toLowerCase();
        if (norm !== modeFilter.toLowerCase()) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'prize') {
        const prizeA = parseInt((a.prizePool || '').replace(/[^0-9]/g, ''), 10) || 0;
        const prizeB = parseInt((b.prizePool || '').replace(/[^0-9]/g, ''), 10) || 0;
        return prizeB - prizeA;
      }
      // Newest default
      return 0;
    });
  }, [hackathons, searchQuery, statusFilter, modeFilter, sortBy]);

  // Dynamic preview object mirroring live form state
  const livePreviewObj = useMemo(() => {
    return {
      id: editingId || 'preview-draft',
      circuitId: 'PREVIEW-CIRCUIT',
      title: formData.title || 'Untitled Hackathon',
      subtitle: formData.organizer ? `Organized by ${formData.organizer}` : 'Organizing Committee',
      organizer: {
        name: formData.organizer || 'Organizing Committee',
        website: formData.officialWebsite || ''
      },
      description: formData.description || 'Provide an inspiring summary for university builders and creators...',
      officialRegistrationLink: formData.registrationLink || '#',
      registrationDeadline: formData.registrationDeadline || 'TBD',
      dates: formData.hackathonStart && formData.hackathonEnd
        ? `${formData.hackathonStart} – ${formData.hackathonEnd}`
        : formData.hackathonStart || 'TBD',
      mode: formData.mode,
      location: formData.location || (formData.mode === 'Online' ? 'Virtual Online' : 'Campus Venue'),
      registrationFee: formData.registrationFee || '100% Free',
      teamSize: `${formData.minTeamSize} to ${formData.maxTeamSize} Builders`,
      squadLimits: `${formData.minTeamSize} to ${formData.maxTeamSize} Builders`,
      trackLabels: formData.tracks.length > 0 ? formData.tracks : ['General Track'],
      prizePool: formData.prizePool || '$10,000',
      status: 'open',
      statusLabel: 'Registration open',
      rules: formData.rules,
      eligibility: formData.eligibility
    };
  }, [formData, editingId]);

  // ========================================================
  // VIEW 1: MANAGE HACKATHONS LIST / TABLE PAGE
  // ========================================================
  if (view === 'list') {
    return (
      <div className="flex flex-col w-full pb-space-xl space-y-6">
        {/* Top Header & Quick Add */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-surface-container-high/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-wider mb-0.5">
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>ADMIN CONSOLE · HACKATHON CIRCUIT MANAGEMENT</span>
              {currentUser && (
                <span className="text-[11px] text-on-surface-variant font-medium normal-case ml-2 pl-2 border-l border-surface-container-high hidden sm:inline">
                  Operator: <strong className="text-on-surface">{currentUser.name}</strong>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight uppercase">
              MANAGE HACKATHONS
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Create, modify, verify, duplicate, and schedule collegiate competitions across the platform.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-surface-container-high transition-all cursor-pointer"
              title="Restore standard circuit seed data"
            >
              <span className="material-symbols-outlined text-sm text-outline">history</span>
              <span>Reset to Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>+ Add Hackathon</span>
            </button>
          </div>
        </div>

        {/* Executive Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-surface-container-lowest border-secondary shadow-xs'
                : 'bg-surface-container-low/70 border-surface-container-high/70 hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-outline tracking-wider">Total Circuit Events</span>
              <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">terminal</span>
              </span>
            </div>
            <div className="text-2xl font-black text-on-surface mt-2">{stats.total}</div>
            <span className="text-[11px] text-on-surface-variant mt-0.5 block">Registered competitions</span>
          </div>

          <div
            onClick={() => setStatusFilter('published')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'published'
                ? 'bg-surface-container-lowest border-emerald-500 shadow-xs'
                : 'bg-surface-container-low/70 border-surface-container-high/70 hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Live &amp; Published</span>
              <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">visibility</span>
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-2">{stats.published}</div>
            <span className="text-[11px] text-on-surface-variant mt-0.5 block">Active on student portal</span>
          </div>

          <div
            onClick={() => setStatusFilter('draft')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'draft'
                ? 'bg-surface-container-lowest border-amber-500 shadow-xs'
                : 'bg-surface-container-low/70 border-surface-container-high/70 hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Drafts &amp; Staging</span>
              <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">draft</span>
              </span>
            </div>
            <div className="text-2xl font-black text-amber-900 mt-2">{stats.drafts}</div>
            <span className="text-[11px] text-on-surface-variant mt-0.5 block">Unpublished / Admin only</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/70">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-purple-800 tracking-wider">Cumulative Grants</span>
              <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">military_tech</span>
              </span>
            </div>
            <div className="text-2xl font-black text-purple-900 mt-2">{stats.prizeSum}</div>
            <span className="text-[11px] text-on-surface-variant mt-0.5 block">Available prize capital</span>
          </div>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="p-3.5 bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-outline pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons by name, organizer, venue, or track..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Controls: Status Tabs, Mode Selector, Sort Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pills */}
            <div className="flex items-center p-1 bg-surface-container-low rounded-xl text-xs font-bold">
              {[
                { id: 'all', label: 'All' },
                { id: 'published', label: 'Published' },
                { id: 'draft', label: 'Drafts' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mode Select */}
            <div className="flex items-center gap-1">
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="bg-surface-container-low px-2.5 py-1.5 rounded-xl text-xs font-bold text-on-surface outline-none border border-surface-container-high cursor-pointer"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-low px-2.5 py-1.5 rounded-xl text-xs font-bold text-on-surface outline-none border border-surface-container-high cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="prize">Highest Prize</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-outline uppercase font-extrabold text-[10px] tracking-wider border-b border-surface-container-high">
              <tr>
                <th className="py-3.5 px-4">Hackathon Name</th>
                <th className="py-3.5 px-3">Organizer</th>
                <th className="py-3.5 px-3">Registration Deadline</th>
                <th className="py-3.5 px-3">Event Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-center">Toggle Live</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60">
              {filteredHackathons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
                    <p className="font-bold text-sm text-on-surface">No hackathons match your search criteria.</p>
                    <p className="text-xs text-outline mt-1">Try resetting the filters or adding a new hackathon.</p>
                  </td>
                </tr>
              ) : (
                filteredHackathons.map((h) => {
                  const isPub = h.isPublished !== false;
                  const orgName = typeof h.organizer === 'object' ? h.organizer?.name : h.organizer || 'Collegiate Host';
                  const normMode = normalizeMode(h.mode);

                  return (
                    <tr key={h.id} className="hover:bg-surface-container-low/40 transition-colors">
                      {/* Name & Mode */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-xl text-secondary mt-0.5">terminal</span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-on-surface block truncate max-w-[240px]" title={h.title}>
                              {h.title}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-surface-container text-on-surface-variant uppercase">
                                {normMode}
                              </span>
                              <span className="text-[10px] text-outline">
                                {h.circuitId || 'BC-CIRC'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Organizer */}
                      <td className="py-3.5 px-3 text-on-surface-variant font-medium">
                        <span className="truncate max-w-[170px] block" title={orgName}>
                          {orgName}
                        </span>
                      </td>

                      {/* Registration Deadline */}
                      <td className="py-3.5 px-3 text-amber-900 font-semibold">
                        <span className="truncate max-w-[150px] block">
                          {h.registrationDeadline || 'TBD'}
                        </span>
                      </td>

                      {/* Event Date */}
                      <td className="py-3.5 px-3 text-on-surface font-medium">
                        <span className="truncate max-w-[150px] block">
                          {h.dates || (h.startDate ? `${h.startDate} – ${h.endDate}` : 'TBD')}
                        </span>
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

                      {/* Quick Toggle Live */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(h)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            isPub
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                          }`}
                          title={isPub ? 'Unpublish to Draft' : 'Publish Live to Students'}
                        >
                          {isPub ? 'Unpublish' : 'Publish'}
                        </button>
                      </td>

                      {/* Actions: Edit, Duplicate, Preview, Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live Preview Button */}
                          <button
                            type="button"
                            onClick={() => setPreviewHackathon(h)}
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer"
                            title="Preview Student View"
                          >
                            <span className="material-symbols-outlined text-base text-secondary">visibility</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(h)}
                            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            title="Modify Hackathon Data"
                          >
                            <span className="material-symbols-outlined text-sm text-secondary">edit</span>
                            <span>Edit</span>
                          </button>

                          {/* Clone Button */}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(h)}
                            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
                            title="Duplicate as Draft"
                          >
                            <span className="material-symbols-outlined text-base">content_copy</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => setHackToDelete(h)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-700 transition-all cursor-pointer"
                            title="Delete Hackathon"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Responsive Cards */}
        <div className="md:hidden space-y-3">
          {filteredHackathons.map((h) => {
            const isPub = h.isPublished !== false;
            const orgName = typeof h.organizer === 'object' ? h.organizer?.name : h.organizer || 'Collegiate Host';
            const normMode = normalizeMode(h.mode);

            return (
              <div
                key={h.id}
                className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container text-on-surface-variant uppercase">
                        {normMode}
                      </span>
                      <span className="text-[10px] text-outline">
                        {h.circuitId || 'BC-CIRC'}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-on-surface truncate" title={h.title}>
                      {h.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant truncate mt-0.5">
                      {orgName}
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
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
                    <span className="text-[10px] uppercase font-bold text-amber-800 block">Registration Deadline</span>
                    <span className="font-semibold text-amber-900 truncate block mt-0.5">
                      {h.registrationDeadline || 'TBD'}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-surface-container-high/60">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(h)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        isPub
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isPub ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(h)}
                      className="p-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-bold"
                      title="Clone"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
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
                      className="p-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {hackToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-modal">
            <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">warning</span>
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">
                    Delete Hackathon?
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Are you sure you want to remove <strong>{hackToDelete.title}</strong>?
                  </p>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                This action is permanent and will eliminate this hackathon from both the admin directory and the student platform.
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
                  <span>Confirm Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset to Defaults Confirmation Modal */}
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-modal">
            <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">restart_alt</span>
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">
                    Reset Circuit Data to Defaults?
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Restore original mock hackathons (TreeHacks, CalHacks, etc.)
                  </p>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Any custom hackathons added, edited, or deleted during this session will be reverted to the original platform seed list.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsResetConfirmOpen(false);
                    onResetDefaults?.();
                  }}
                  className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-fixed text-on-secondary font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  <span>Yes, Reset to Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Preview Modal for Table Rows */}
        {previewHackathon && (
          <HackathonDetailsModal
            hackathon={previewHackathon}
            isOpen={Boolean(previewHackathon)}
            onClose={() => setPreviewHackathon(null)}
            onFindSquad={() => {
              setPreviewHackathon(null);
              onNavigate?.('hackathons');
            }}
          />
        )}
      </div>
    );
  }

  // ========================================================
  // VIEW 2: DEDICATED PROFESSIONAL 18-FIELD FORM EDITOR
  // ========================================================
  return (
    <div className="flex flex-col w-full pb-space-xl space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-surface-container-high/80">
        <div>
          <button
            type="button"
            onClick={() => setView('list')}
            className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline cursor-pointer mb-1.5"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Manage Hackathons</span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight uppercase">
            {isEditing ? 'EDIT HACKATHON' : 'ADD HACKATHON'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            {isEditing
              ? `Modifying circuit registry data for "${formData.title || 'hackathon'}"`
              : 'Complete the official 18-point collegiate hackathon registration sheet below.'}
          </p>
        </div>

        {/* Live Preview Toggle Pill */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLiveFormPreview(!showLiveFormPreview)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              showLiveFormPreview
                ? 'bg-secondary text-on-secondary border-secondary shadow-xs'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-base">preview</span>
            <span>{showLiveFormPreview ? 'Hide Live Card Preview' : 'Show Live Card Preview'}</span>
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${showLiveFormPreview ? 'lg:grid-cols-12' : ''} gap-6 items-start`}>
        {/* Main 18-Field Form Editor */}
        <div className={`${showLiveFormPreview ? 'lg:col-span-8' : 'w-full'} space-y-6`}>
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-8 border border-surface-container-high shadow-xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(true);
              }}
              className="space-y-6 text-xs"
            >
              {/* SECTION 1: IDENTITY */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">badge</span>
                  <span>1. Identity &amp; Organizer</span>
                </div>

                {/* 1. Hackathon Name */}
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Hackathon Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (formErrors.title) setFormErrors({ ...formErrors, title: null });
                    }}
                    placeholder="e.g. Stanford TreeHacks 2026"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border text-xs text-on-surface font-medium outline-none focus:border-secondary transition-all ${
                      formErrors.title ? 'border-red-500 bg-red-50/20' : 'border-surface-container-high'
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">{formErrors.title}</p>
                  )}
                </div>

                {/* 2. Organizer */}
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Organizer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={(e) => {
                      setFormData({ ...formData, organizer: e.target.value });
                      if (formErrors.organizer) setFormErrors({ ...formErrors, organizer: null });
                    }}
                    placeholder="e.g. Stanford ACM & TreeHacks Organizing Committee"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border text-xs text-on-surface font-medium outline-none focus:border-secondary transition-all ${
                      formErrors.organizer ? 'border-red-500 bg-red-50/20' : 'border-surface-container-high'
                    }`}
                  />
                  {formErrors.organizer && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">{formErrors.organizer}</p>
                  )}
                </div>

                {/* 3. Description */}
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (formErrors.description) setFormErrors({ ...formErrors, description: null });
                    }}
                    placeholder="Provide a compelling overview of the hackathon theme, target participants, and challenges..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border text-xs text-on-surface font-medium outline-none focus:border-secondary transition-all resize-y ${
                      formErrors.description ? 'border-red-500 bg-red-50/20' : 'border-surface-container-high'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">{formErrors.description}</p>
                  )}
                </div>
              </div>

              {/* SECTION 2: PORTALS & LINKS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">link</span>
                  <span>2. Official Links &amp; Portals</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 4. Official Website */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-on-surface">
                        Official Website
                      </label>
                      {formData.officialWebsite && (
                        <a
                          href={formData.officialWebsite.startsWith('http') ? formData.officialWebsite : `https://${formData.officialWebsite}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-secondary hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Test Link</span>
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={formData.officialWebsite}
                      onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                      placeholder="https://treehacks.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                  </div>

                  {/* 5. Registration Link */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-on-surface">
                        Registration Link
                      </label>
                      {formData.registrationLink && (
                        <a
                          href={formData.registrationLink.startsWith('http') ? formData.registrationLink : `https://${formData.registrationLink}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-secondary hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Test Link</span>
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={formData.registrationLink}
                      onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                      placeholder="https://treehacks.com/apply"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: TIMELINES & SCHEDULE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>3. Dates &amp; Deadlines</span>
                </div>

                {/* 6. Registration Deadline [ Date + Time ] */}
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Registration Deadline <span className="text-outline font-normal">[ Date + Time ]</span>
                  </label>
                  <input
                    type="text"
                    value={formData.registrationDeadline}
                    onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                    placeholder="e.g. Nov 01, 2026 at 11:59 PM PT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                  />
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-xs text-amber-700">alarm</span>
                    <span>Display hint: Specify date, time, and timezone (e.g., Nov 01, 2026 at 11:59 PM PT).</span>
                  </div>
                </div>

                {/* 7. Hackathon Start & 8. Hackathon End */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Hackathon Start <span className="text-outline font-normal">[ Date + Time ]</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hackathonStart}
                      onChange={(e) => setFormData({ ...formData, hackathonStart: e.target.value })}
                      placeholder="e.g. Nov 14, 2026 · 5:00 PM PT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Hackathon End <span className="text-outline font-normal">[ Date + Time ]</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hackathonEnd}
                      onChange={(e) => setFormData({ ...formData, hackathonEnd: e.target.value })}
                      placeholder="e.g. Nov 16, 2026 · 2:00 PM PT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: FORMAT & VENUE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>4. Mode &amp; Location</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* 9. Mode [ Online / Offline / Hybrid ] */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1.5">
                      Mode <span className="text-outline font-normal">[ Online / Offline / Hybrid ]</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Online', icon: 'language', desc: 'Virtual' },
                        { id: 'Offline', icon: 'apartment', desc: 'In-Person' },
                        { id: 'Hybrid', icon: 'devices', desc: 'Dual' }
                      ].map(modeOpt => (
                        <button
                          key={modeOpt.id}
                          type="button"
                          onClick={() => {
                            const newLoc =
                              modeOpt.id === 'Online' && (!formData.location || formData.location.includes('Campus'))
                                ? 'Virtual Online (Discord & Zoom)'
                                : formData.location;
                            setFormData({ ...formData, mode: modeOpt.id, location: newLoc });
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                            formData.mode === modeOpt.id
                              ? 'bg-secondary text-on-secondary border-secondary shadow-xs'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-surface-container-high'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">{modeOpt.icon}</span>
                          <span className="font-bold text-xs">{modeOpt.id}</span>
                          <span className="text-[10px] opacity-75">{modeOpt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 10. Location */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder={formData.mode === 'Online' ? 'e.g. Virtual Online (Discord & Zoom)' : 'e.g. Stanford University, Stanford, CA'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <span className="text-[11px] text-outline mt-1 block">
                      Physical campus address or online coordination hubs.
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 5: PARTICIPATION SPECS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">groups</span>
                  <span>5. Fees &amp; Squad Specs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 11. Registration Fee */}
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
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {feePresets.map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setFormData({ ...formData, registrationFee: preset })}
                          className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-[10px] font-semibold text-on-surface"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 12. Minimum Team Size */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Minimum Team Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.minTeamSize}
                      onChange={(e) => {
                        setFormData({ ...formData, minTeamSize: e.target.value });
                        if (formErrors.teamSize) setFormErrors({ ...formErrors, teamSize: null });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <span className="text-[10px] text-outline mt-1 block">Usually 1 to 2 builders.</span>
                  </div>

                  {/* 13. Maximum Team Size */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Maximum Team Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.maxTeamSize}
                      onChange={(e) => {
                        setFormData({ ...formData, maxTeamSize: e.target.value });
                        if (formErrors.teamSize) setFormErrors({ ...formErrors, teamSize: null });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <span className="text-[10px] text-outline mt-1 block">Usually 4 to 5 builders.</span>
                  </div>
                </div>
                {formErrors.teamSize && (
                  <p className="text-[11px] text-red-500 font-semibold">{formErrors.teamSize}</p>
                )}

                {/* 14. Eligibility */}
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Eligibility
                  </label>
                  <textarea
                    rows={2}
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. Open to all enrolled undergraduate, master's, and PhD students worldwide. Valid .edu email or student ID required."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium resize-none"
                  />
                </div>
              </div>

              {/* SECTION 6: TRACKS & PRIZE POOL */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider pb-1 border-b border-surface-container-high/60">
                  <span className="material-symbols-outlined text-base">military_tech</span>
                  <span>6. Tracks, Bounties &amp; Rules</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 15. Tracks (Interactive Tag Manager) */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-on-surface mb-1">
                      Tracks <span className="text-outline font-normal">(Interactive Tag Manager)</span>
                    </label>

                    {/* Chips Display */}
                    <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high min-h-[46px] mb-2">
                      {formData.tracks.map((track, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-bold text-xs border border-surface-container-high shadow-xs"
                        >
                          <span>{track}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTrack(track)}
                            className="hover:text-red-500 cursor-pointer flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </span>
                      ))}

                      {/* Input inside pill area */}
                      <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                        <input
                          type="text"
                          value={trackInput}
                          onChange={(e) => setTrackInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault();
                              handleAddTrack();
                            }
                          }}
                          placeholder="Type track name and hit Enter..."
                          className="bg-transparent text-xs text-on-surface placeholder:text-outline outline-none w-full py-1"
                        />
                        {trackInput && (
                          <button
                            type="button"
                            onClick={handleAddTrack}
                            className="px-2 py-0.5 rounded-md bg-secondary text-on-secondary text-[11px] font-bold cursor-pointer shrink-0"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase text-outline">Quick Add:</span>
                      {suggestedTracks.map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            if (!formData.tracks.includes(st)) {
                              setFormData({ ...formData, tracks: [...formData.tracks, st] });
                            }
                          }}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                            formData.tracks.includes(st)
                              ? 'bg-secondary-fixed text-on-secondary-fixed font-bold'
                              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          + {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 16. Prize Pool */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Prize Pool
                    </label>
                    <input
                      type="text"
                      value={formData.prizePool}
                      onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                      placeholder="e.g. $45,000 Grants"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {prizePresets.map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setFormData({ ...formData, prizePool: preset })}
                          className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-[10px] font-semibold text-on-surface"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 18. Official Source */}
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Official Source &amp; Verifier
                    </label>
                    <input
                      type="text"
                      value={formData.officialSource}
                      onChange={(e) => setFormData({ ...formData, officialSource: e.target.value })}
                      placeholder="e.g. Stanford University ACM Chapter & Sanctioning Board"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <span className="text-[10px] text-outline mt-1 block">Sanctioning entity for credential verification.</span>
                  </div>
                </div>

                {/* 17. Rules (Interactive Rules List Manager) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-bold text-on-surface">
                      Competition Rules &amp; Policies ({formData.rules.length} items)
                    </label>
                  </div>

                  <div className="space-y-2 mb-3">
                    {formData.rules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/70"
                      >
                        <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {rIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={rule}
                          onChange={(e) => handleUpdateRule(rIdx, e.target.value)}
                          className="flex-1 bg-transparent text-xs text-on-surface outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveRule(rIdx)}
                          className="text-on-surface-variant hover:text-red-500 p-1 cursor-pointer"
                          title="Remove rule"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Rule input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newRuleInput}
                      onChange={(e) => setNewRuleInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddRule();
                        }
                      }}
                      placeholder="Add a new rule (e.g., All code must be submitted via public GitHub repository)..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-xs text-on-surface font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddRule}
                      className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer shrink-0"
                    >
                      + Add Rule
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION CONTROLS: [ Save Draft ] [ Publish ] */}
              <div className="pt-6 border-t border-surface-container-high flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {/* [ Save Draft ] */}
                  <button
                    type="button"
                    onClick={() => handleSave(false)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs border border-surface-container-high transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm text-amber-700">draft</span>
                    <span>Save Draft</span>
                  </button>

                  {/* [ Publish ] */}
                  <button
                    type="button"
                    onClick={() => handleSave(true)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">publish</span>
                    <span>Publish</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Live Student-Facing Preview Card */}
        {showLiveFormPreview && (
          <div className="lg:col-span-4 sticky top-20 space-y-3">
            <div className="p-3 bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-surface-container-high/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>LIVE STUDENT CARD PREVIEW</span>
                </span>
                <span className="text-[10px] text-outline font-semibold">Real-Time Sync</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mb-3">
                This shows exactly how the hackathon will be rendered to enrolled builders across the platform:
              </p>

              <HackathonCard
                hackathon={livePreviewObj}
                onSelect={() => setPreviewHackathon(livePreviewObj)}
                onFindSquad={() => {}}
              />
            </div>
          </div>
        )}
      </div>

      {/* Live Preview Modal for Form State */}
      {previewHackathon && (
        <HackathonDetailsModal
          hackathon={previewHackathon}
          isOpen={Boolean(previewHackathon)}
          onClose={() => setPreviewHackathon(null)}
          onFindSquad={() => {}}
        />
      )}
    </div>
  );
}
