import React, { useState, useMemo } from 'react';

export default function Hackathons({ 
  hackathons, 
  squadWins, 
  onFindSquad,
  onOpenPostProject 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState('all');
  const [activeTracks, setActiveTracks] = useState([]);
  const [squadSizeFilter, setSquadSizeFilter] = useState('all');
  const [feeFilter, setFeeFilter] = useState('free');
  const [statusFilter, setStatusFilter] = useState('all');
  const [connectedLead, setConnectedLead] = useState(false);

  const toggleTrack = (trackKey) => {
    setActiveTracks(prev => 
      prev.includes(trackKey) ? prev.filter(t => t !== trackKey) : [...prev, trackKey]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveMode('all');
    setActiveTracks([]);
    setSquadSizeFilter('all');
    setFeeFilter('all');
    setStatusFilter('all');
  };

  const filteredHackathons = useMemo(() => {
    return hackathons.filter(h => {
      // Flagship is rendered separately in top hero
      if (h.id === 'hacknova-2026') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = h.title.toLowerCase().includes(q);
        const matchesLoc = h.location.toLowerCase().includes(q);
        const matchesTracks = h.trackLabels?.some(tl => tl.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLoc && !matchesTracks) return false;
      }

      if (activeMode !== 'all' && h.mode !== activeMode) {
        return false;
      }

      if (activeTracks.length > 0) {
        const hasTrack = activeTracks.some(t => h.tracks?.includes(t));
        if (!hasTrack) return false;
      }

      if (statusFilter !== 'all') {
        if (statusFilter === 'open' && h.status !== 'open') return false;
        if (statusFilter === 'finished' && h.status !== 'finished') return false;
      }

      return true;
    });
  }, [hackathons, searchQuery, activeMode, activeTracks, statusFilter]);

  const flagship = hackathons.find(h => h.id === 'hacknova-2026') || hackathons[0];

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">military_tech</span>
            <span>Sanctioned Collegiate Circuit</span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant font-medium">Fall 2026 – Spring 2027</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Collegiate Hackathons &amp; Competitions
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Discover sanctioned collegiate hackathons, review prize tracks, and build winning multi-disciplinary squads.
          </p>
        </div>

        <div className="flex items-center gap-space-sm self-start lg:self-auto">
          <button
            type="button"
            onClick={() => alert('Circuit Schedule synced with your Stanford student calendar!')}
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-container-highest transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-secondary">calendar_month</span>
            <span>My Circuit Schedule</span>
          </button>
          <button
            type="button"
            onClick={onOpenPostProject}
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-surface-tint active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_task</span>
            <span>Submit Hackathon</span>
          </button>
        </div>
      </div>

      {/* Featured Flagship Banner / Hero Card */}
      {flagship && (
        <div className="relative w-full rounded-2xl bg-primary-container text-on-primary p-space-lg lg:p-space-xl overflow-hidden shadow-xl mb-space-lg">
          <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-secondary/25 blur-3xl pointer-events-none"></div>
          <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-on-tertiary-container/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Left 8 cols: Event thesis & CTAs */}
            <div className="lg:col-span-8 flex flex-col space-y-space-md">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  {flagship.badge || 'Featured Flagship 2026'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest/20 text-surface-container-lowest font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                  {flagship.statusLabel || 'Closes in 4 Days (Oct 14)'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest/20 text-surface-container-lowest font-label-sm text-label-sm">
                  Tier-1 Global Sanctioned
                </span>
              </div>

              <div>
                <h2 className="font-display text-display text-on-primary tracking-tight leading-tight">
                  {flagship.title}
                </h2>
                <p className="font-headline-sm text-headline-sm text-secondary-fixed mt-0.5 font-medium">
                  {flagship.subtitle}
                </p>
                <p className="font-body-md text-body-md text-surface-container-high max-w-2xl mt-space-xs">
                  Join 1,200 elite collegiate technologists at the intersection of autonomic agent swarms, verifiable hardware security, and decentralized infrastructure. Verified BuildCrew matchmaking enabled.
                </p>
              </div>

              {/* Key Meta Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
                <div className="p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest block">
                    Dates
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-on-primary block mt-0.5">
                    {flagship.dates}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest block">
                    Location
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-on-primary block mt-0.5 truncate">
                    {flagship.location.split(',')[0]}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest block">
                    Prize Pool
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-secondary-fixed block mt-0.5">
                    {flagship.prizePool}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest block">
                    Squad Limits
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-on-primary block mt-0.5">
                    {flagship.squadLimits}
                  </span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={() => onFindSquad('HackNova 2026')}
                  className="flex items-center gap-space-xs px-space-lg py-3 rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm font-bold shadow-lg hover:bg-secondary-container active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">group_add</span>
                  <span>Build a Squad</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Official HackNova 2026 Rules & Tracks PDF loaded.')}
                  className="flex items-center gap-space-xs px-space-lg py-3 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-title-sm text-title-sm backdrop-blur-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">rule</span>
                  <span>Explore Event Tracks &amp; Rules</span>
                </button>
                <div className="hidden sm:flex items-center gap-space-xs text-label-sm text-surface-container-high pl-2">
                  <span className="material-symbols-outlined text-sm text-secondary-fixed">verified</span>
                  <span>Fast-track BuildCrew Check-in</span>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Capacity Gauge + Visual Tile */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-space-md">
              <div className="rounded-xl bg-surface-container-lowest/10 backdrop-blur-md p-space-md flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-title-sm text-title-sm font-semibold text-on-primary">
                    Registration Capacity
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-fixed font-label-sm text-label-sm font-bold">
                    82% Full
                  </span>
                </div>
                {/* Capacity Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-surface-container-lowest/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-secondary-fixed via-secondary-container to-secondary h-3 rounded-full transition-all duration-1000"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-surface-container-high">
                    <span>410 Teams Registered</span>
                    <span>500 Max Cap</span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm border-t border-surface-container-lowest/10 flex items-center justify-between text-body-sm text-surface-container-high">
                  <span>Solo builders matching:</span>
                  <span className="font-title-sm text-title-sm text-secondary-fixed font-bold">
                    64 open squads
                  </span>
                </div>
              </div>

              {/* Flagship Venue Visual */}
              <div className="relative rounded-xl overflow-hidden shadow-inner h-36">
                <img
                  src={flagship.heroImage}
                  alt="MIT Stata Center HackNova Venue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-on-primary">
                  <span className="font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-secondary-fixed">pin_drop</span>
                    Cambridge, Massachusetts
                  </span>
                  <span className="font-label-sm text-label-sm text-surface-container-high font-medium">
                    In-Person &amp; Discord Virtual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Section */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-lg space-y-space-md">
        {/* Row 1: Search & Primary Selectors */}
        <div className="flex flex-col lg:flex-row gap-space-md items-center justify-between">
          <div className="relative w-full lg:w-96 flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              id="hackathon-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons by name, university, track, or tech..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-xl outline-none focus:bg-surface-container-lowest shadow-sm transition-all"
            />
          </div>

          {/* Mode Toggle Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mr-1">
              Mode:
            </span>
            {['all', 'in-person', 'virtual', 'hybrid'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`filter-mode-btn px-3 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer capitalize ${
                  activeMode === mode
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {mode === 'all' ? 'All' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Secondary Facets */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm border-t border-surface-container-low">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mr-1">
              Tracks:
            </span>
            {[
              { id: 'ai', label: 'AI / ML' },
              { id: 'web3', label: 'Web3' },
              { id: 'fintech', label: 'FinTech' },
              { id: 'healthtech', label: 'HealthTech' },
              { id: 'climate', label: 'Climate' }
            ].map((track) => {
              const isSelected = activeTracks.includes(track.id);
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className={`track-tag px-2.5 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed'
                  }`}
                >
                  <span>{track.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Squad Size Selector */}
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">groups</span>Size:
              </span>
              <select 
                value={squadSizeFilter}
                onChange={(e) => setSquadSizeFilter(e.target.value)}
                className="bg-transparent font-title-sm text-title-sm text-on-surface outline-none cursor-pointer"
              >
                <option value="all">Any Size</option>
                <option value="solo">Solo Permitted</option>
                <option value="2-4">2–4 Members</option>
              </select>
            </div>

            {/* Registration Fee Selector */}
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">payments</span>Fee:
              </span>
              <select 
                value={feeFilter}
                onChange={(e) => setFeeFilter(e.target.value)}
                className="bg-transparent font-title-sm text-title-sm text-on-surface outline-none cursor-pointer"
              >
                <option value="free">Free Entry Only</option>
                <option value="all">All (Free &amp; Paid)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">schedule</span>Status:
              </span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent font-title-sm text-title-sm text-on-surface outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="open">Registration Open</option>
                <option value="finished">Finished / Archive</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">filter_alt_off</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: 8:4 Asymmetric Bento Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Feed: Hackathon Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-space-md">
          <div className="flex items-center justify-between mb-1">
            <span className="font-title-sm text-title-sm font-bold text-on-surface flex items-center gap-2">
              <span>Sanctioned Collegiate Circuit</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                {filteredHackathons.length} Displayed
              </span>
            </span>
            <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
              <span>Sort by:</span>
              <button 
                type="button" 
                className="font-semibold text-on-surface flex items-center gap-0.5 hover:text-secondary transition-all cursor-pointer"
              >
                <span>Upcoming Date</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </div>

          {filteredHackathons.map((h) => {
            const isConcluded = h.status === 'finished';
            return (
              <div
                key={h.id}
                className={`bg-surface-container-lowest rounded-2xl p-space-md lg:p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${
                  isConcluded ? 'opacity-90' : ''
                }`}
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm pb-space-sm">
                    <div className="flex items-start gap-space-sm">
                      <div className={`w-14 h-14 rounded-xl bg-surface-container-high flex-shrink-0 overflow-hidden shadow-sm flex items-center justify-center ${isConcluded ? 'grayscale' : ''}`}>
                        <img
                          src={h.logo}
                          alt={h.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-headline-sm text-headline-sm font-bold text-on-surface transition-colors ${
                            !isConcluded ? 'group-hover:text-secondary' : ''
                          }`}>
                            {h.title}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                            h.mode === 'hybrid'
                              ? 'bg-secondary-fixed text-on-secondary-fixed'
                              : 'bg-surface-container-high text-on-surface'
                          }`}>
                            {h.location}
                          </span>
                        </div>
                        <p className="font-title-sm text-title-sm text-on-surface-variant mt-0.5">
                          {h.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between text-right">
                      <span className="font-title-md text-title-md font-bold text-on-surface">
                        {h.dates}
                      </span>
                      <span className={`font-label-sm text-label-sm font-semibold flex items-center gap-1 ${
                        isConcluded ? 'text-outline' : 'text-secondary'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isConcluded ? 'bg-outline' : 'bg-secondary'}`}></span>
                        {h.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="py-space-xs grid grid-cols-2 sm:grid-cols-4 gap-2 text-body-sm text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-outline">pin_drop</span>
                      <span className="truncate">{h.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-outline">groups</span>
                      <span>{h.squadLimits}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-outline">wallet</span>
                      <span className="font-semibold text-on-surface">{h.freeEntry ? 'Free Entry' : 'Registered Entry'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-outline">
                        {isConcluded ? 'military_tech' : 'trophy'}
                      </span>
                      <span className={isConcluded ? 'font-semibold text-secondary' : ''}>
                        {h.prizePool}
                      </span>
                    </div>
                  </div>

                  {/* Tracks Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-space-sm pb-space-md">
                    <span className="font-label-sm text-label-sm text-outline mr-1">Tracks:</span>
                    {h.trackLabels?.map((trackLabel, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm"
                      >
                        {trackLabel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Rail */}
                <div className="pt-space-sm border-t border-surface-container-low flex flex-wrap items-center justify-between gap-space-sm">
                  {isConcluded ? (
                    <div className="flex items-center gap-space-xs text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-base text-secondary">emoji_events</span>
                      <span>{h.archiveHighlight}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-space-xs">
                      {h.seekerAvatars && (
                        <div className="flex -space-x-2 overflow-hidden">
                          {h.seekerAvatars.map((av, avidx) => (
                            <img
                              key={avidx}
                              src={av}
                              alt="Seeker"
                              className="inline-block h-7 w-7 rounded-full object-cover ring-2 ring-surface-container-lowest"
                            />
                          ))}
                        </div>
                      )}
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        {h.seekersCount} BuildCrew students looking for teammates
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-space-xs">
                    {isConcluded ? (
                      <button
                        type="button"
                        onClick={() => alert(`Reviewing archived submissions for ${h.title}`)}
                        className="px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">history_edu</span>
                        <span>View Archive / Results</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => alert(`Details for ${h.title}: Registration closes soon. Verified university check-in available.`)}
                          className="px-space-md py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onFindSquad(h.title)}
                          className="px-space-md py-2 rounded-xl bg-primary hover:bg-surface-tint text-on-primary font-title-sm text-title-sm flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">person_search</span>
                          <span>Find Squad</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Rail: Circuit Hub Analytics & Squad Wins (4 cols) */}
        <div className="lg:col-span-4 space-y-space-md">
          {/* Circuit Squad Matchmaker Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <h4 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-lg">auto_awesome</span>
                <span>Squad Match Radar</span>
              </h4>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Active</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Based on your profile (Frontend + PyTorch), 7 teams preparing for TreeHacks are looking for your exact skills.
            </p>

            {/* Seat Matrix preview */}
            <div className="p-space-sm rounded-xl bg-surface-container-low space-y-2 mb-space-md">
              <div className="flex justify-between items-center text-label-sm">
                <span className="font-bold text-on-surface">Target: TreeHacks "OmniVoice"</span>
                <span className="text-secondary font-semibold">3/4 Filled</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <div className="p-1.5 rounded-lg bg-surface-container-highest text-center">
                  <span className="font-label-sm text-[10px] block text-on-surface font-medium">Backend</span>
                  <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                </div>
                <div className="p-1.5 rounded-lg bg-surface-container-highest text-center">
                  <span className="font-label-sm text-[10px] block text-on-surface font-medium">Design</span>
                  <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                </div>
                <div className="p-1.5 rounded-lg bg-surface-container-highest text-center">
                  <span className="font-label-sm text-[10px] block text-on-surface font-medium">ML Eng</span>
                  <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                </div>
                <div className="p-1.5 rounded-lg bg-secondary-fixed text-center border-2 border-secondary/40 animate-pulse">
                  <span className="font-label-sm text-[10px] block text-on-secondary-fixed font-bold">You (Web)</span>
                  <span className="material-symbols-outlined text-xs text-secondary">add</span>
                </div>
              </div>
            </div>

            {connectedLead ? (
              <div className="p-2.5 rounded-xl bg-surface-container text-center text-secondary font-semibold text-title-sm">
                <span className="material-symbols-outlined text-base align-middle mr-1">done</span>
                Connected! Discord invite sent.
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConnectedLead(true)}
                className="w-full py-2 px-space-md rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm font-semibold hover:bg-secondary-container transition-all cursor-pointer"
              >
                Connect with OmniVoice Lead
              </button>
            )}
          </div>

          {/* Recent Squad Wins Widget */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-xl text-secondary">trophy</span>
                <h4 className="font-title-md text-title-md font-bold text-on-surface">
                  Recent Squad Wins
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                Verified
              </span>
            </div>

            {/* Metric Callout */}
            <div className="p-space-md rounded-xl bg-surface-container-low my-space-sm flex items-baseline justify-between">
              <div>
                <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight">
                  $180k+
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block mt-0.5">
                  Won by verified campus teams
                </span>
              </div>
              <div className="text-right">
                <span className="font-title-md text-title-md font-bold text-secondary">24</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Hackathons
                </span>
              </div>
            </div>

            {/* Wins List */}
            <div className="space-y-space-sm divide-y divide-surface-container-low">
              {squadWins.map((win, widx) => (
                <div key={widx} className="pt-space-sm flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-xs ${
                      win.rank === '1st' ? 'text-secondary' : 'text-on-surface-variant'
                    }`}>
                      {win.rank}
                    </div>
                    <div>
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface block leading-tight">
                        {win.team}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {win.event}
                      </span>
                    </div>
                  </div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    {win.amount}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => alert('Opening BuildCrew Collegiate Hall of Fame...')}
              className="w-full text-center mt-space-md font-label-md text-label-md text-secondary hover:underline font-semibold cursor-pointer"
            >
              View all 48 hall-of-fame squads →
            </button>
          </div>

          {/* Travel Grant / Fast Track Info Widget */}
          <div className="bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl p-space-md shadow-sm">
            <div className="flex items-center gap-space-xs text-secondary mb-1">
              <span className="material-symbols-outlined text-lg">flight_takeoff</span>
              <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                Campus Travel Subsidies
              </span>
            </div>
            <h5 className="font-title-sm text-title-sm font-bold text-on-surface">
              Need help traveling to hackathons?
            </h5>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              BuildCrew partners with corporate patrons to reimburse bus, flight, and lodging tickets for verified cross-campus squads.
            </p>
            <button
              type="button"
              onClick={() => alert('Eligibility check: Stanford CS \'26 is eligible for $250 travel stipends to Boston & NYC circuits.')}
              className="mt-space-sm px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-title-sm text-title-sm font-semibold shadow-sm hover:bg-surface transition-all cursor-pointer"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
