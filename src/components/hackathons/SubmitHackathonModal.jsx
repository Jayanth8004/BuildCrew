import { useState, useRef } from 'react';

function generateHackathonId() {
  return `hack-${Date.now()}`;
}

function generateCircuitId() {
  return `BC-SUB-${Math.floor(1000 + Math.random() * 9000)}`;
}

const DEFAULT_HACKATHON_IMAGES = [
  {
    id: 'ai-future',
    label: 'AI & Neural Graphs',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbkVkD8ugQCopgjlKUdX6h2t7iGR8U7cAotGEX4gkVp2iZGYgNXuhDd7uv8XKPdDKxRc5LVG5-2ku_w-inG49pGRXEBeatfaGIbtDqTB4GZbf-12sVHdMJBR4s9dSwOvIgdwjHPZxHAYY6iul7GnOXO1wqM8s9NQjaFCIpekgajipka8rL8aNXyl4sNuZ5jWKKChl91y1bgaayoCYgzuMAvhhpxODIRFzAx9FdSUbydfyLDzrLu9E'
  },
  {
    id: 'treehacks',
    label: 'Campus Circuit',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtB4g7Rt44tR_ssttqy-nFfXkLTLAZI2Df_pV8LofmlYWdeXDlAnC6fnhQ66qUJoVhiB8N_EfeGIh-zXnAf5J_V1vfxmSf4p011-amDyMylMhus7E4kYmRMbUdv95aeAV0vo3nxOXQAbwzTZaC6vaVEBzPf-XH7hzEhloFXiREPRvxrefJyiczzW30Q-0N_ofN1fn6eiKB2EPMVUWRZMyYtUqNlh8l3NeruxibmJn46c33N5Tvbmd1'
  },
  {
    id: 'web3',
    label: 'Quantum & ZK',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX'
  },
  {
    id: 'health',
    label: 'Bio & HealthTech',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB'
  }
];

export default function SubmitHackathonModal({ isOpen, onClose, onSubmitHackathon, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    dates: '',
    location: '',
    mode: 'hybrid',
    prizePool: '',
    squadLimits: '2 to 4 Builders',
    website: '',
    tracks: ['ai'],
    description: '',
    image: DEFAULT_HACKATHON_IMAGES[0].url
  });

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (typeof base64 === 'string') {
        setFormData(prev => ({ ...prev, image: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  const trackOptions = [
    { id: 'ai', label: 'AI / ML' },
    { id: 'web3', label: 'Web3 & ZK' },
    { id: 'fintech', label: 'FinTech' },
    { id: 'healthtech', label: 'HealthTech' },
    { id: 'climate', label: 'Climate & Hardware' }
  ];

  const handleToggleTrack = (trackId) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.includes(trackId)
        ? prev.tracks.filter(t => t !== trackId)
        : [...prev.tracks, trackId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const chosenImage = formData.image || DEFAULT_HACKATHON_IMAGES[0].url;

    const newHackathon = {
      id: generateHackathonId(),
      circuitId: generateCircuitId(),
      title: formData.title.trim(),
      subtitle: formData.organizer?.trim() || 'Student Engineering Initiative',
      organizer: {
        name: formData.organizer?.trim() || 'Student Engineering Initiative',
        website: formData.website?.trim() || '#',
        partnerType: 'Community Submitter'
      },
      dates: formData.dates?.trim() || 'Upcoming 2026',
      location: formData.location?.trim() || 'Campus / Virtual',
      mode: formData.mode,
      prizePool: formData.prizePool?.trim() || 'Prizes & Grants TBD',
      squadLimits: formData.squadLimits,
      freeEntry: true,
      status: 'open',
      statusLabel: 'Pending Admin Review',
      registrationDeadline: 'Rolling Admissions',
      isFeatured: false,
      isVerified: false,
      tier: 'Community Proposal (Admin Reviewing)',
      registeredTeams: 1,
      maxCap: 300,
      seekersCount: 6,
      tracks: formData.tracks,
      trackLabels: formData.tracks.map(t => trackOptions.find(opt => opt.id === t)?.label || t),
      description: formData.description?.trim() || 'Collegiate hackathon organized by student community partners.',
      image: chosenImage,
      heroImage: chosenImage,
      coverImage: chosenImage,
      logo: chosenImage,
      bounties: [
        { track: 'Grand Prize', prize: formData.prizePool ? formData.prizePool.replace(/\$/g, '₹') : '₹10,000', sponsor: formData.organizer || 'Organizing Committee' }
      ],
      schedule: [
        { phase: 'Admin Sanction Review', date: 'In Progress', status: 'current' },
        { phase: 'Event Kickoff', date: formData.dates || 'Upcoming', status: 'upcoming' }
      ]
    };

    const submitFn = onSubmitHackathon || onSubmit;
    if (typeof submitFn === 'function') {
      submitFn(newHackathon);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">assignment_add</span>
              <span>Sanctioned Circuit Registry</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">Submit Hackathon</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Propose your campus event for official BuildCrew circuit verification &amp; squad matching.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <label className="text-xs font-bold uppercase text-outline block mb-1">
              Hackathon Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HackHarvard 2026, PennApps XXVIII..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                Host University / Club
              </label>
              <input
                type="text"
                placeholder="e.g. Harvard CS Club"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                Dates
              </label>
              <input
                type="text"
                placeholder="e.g. Oct 17–19, 2026"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Boston, MA or Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                Event Format / Mode
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm cursor-pointer"
              >
                <option value="in-person">In-Person Only</option>
                <option value="hybrid">Hybrid (In-Person + Virtual)</option>
                <option value="virtual">100% Virtual / Discord</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                Prize Pool (₹ / IND Rs)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹25,000 in Grants"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-outline block mb-1">
                Official Website Link
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-outline block mb-1.5">
              Select Primary Tracks
            </label>
            <div className="flex flex-wrap gap-2">
              {trackOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => handleToggleTrack(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    formData.tracks.includes(opt.id)
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-outline block mb-1">
              Short Event Description
            </label>
            <textarea
              rows={3}
              placeholder="Tell campus hackers what makes your hackathon unique, target audience, and key highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:border-secondary outline-none text-on-surface text-sm transition-all resize-none"
            />
          </div>

          {/* Hackathon Cover Image Section */}
          <div className="space-y-2 pt-2 border-t border-surface-container-high">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-outline block">
                Hackathon Banner Image
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">upload</span>
                <span>Upload from device</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageFileChange}
              className="hidden"
            />

            {/* Banner Preview */}
            <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-surface-container-high bg-surface-container-low group">
              <img
                src={formData.image || DEFAULT_HACKATHON_IMAGES[0].url}
                alt="Hackathon Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold cursor-pointer flex items-center gap-1 shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <span>Change Image</span>
                </button>
              </div>
            </div>

            {/* Quick Default Theme Presets */}
            <div>
              <span className="text-[11px] text-on-surface-variant font-medium block mb-1.5">
                Or pick a default circuit theme:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DEFAULT_HACKATHON_IMAGES.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                    className={`relative rounded-xl overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                      formData.image === preset.url
                        ? 'border-secondary ring-2 ring-secondary/30 bg-secondary/10'
                        : 'border-surface-container-high hover:border-outline'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-10 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-on-surface block truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary hover:bg-surface-tint text-on-primary text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              <span>Submit for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
