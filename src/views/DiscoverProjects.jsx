import React, { useState, useMemo } from 'react';

export default function DiscoverProjects({ 
  projects, 
  onSelectProject, 
  onQuickApply 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [techStackFilter, setTechStackFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [campusFilter, setCampusFilter] = useState('');
  const [activeFilterPill, setActiveFilterPill] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered logic
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Search input
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.tagline.toLowerCase().includes(q);
        const matchStack = p.techStack.some(t => t.toLowerCase().includes(q));
        const matchLead = p.lead?.name.toLowerCase().includes(q) || p.lead?.university.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchStack && !matchLead) return false;
      }

      // Tech stack dropdown
      if (techStackFilter) {
        const matchesStack = p.techStack.some(t => 
          t.toLowerCase().includes(techStackFilter.toLowerCase())
        );
        if (!matchesStack) return false;
      }

      // Role filter
      if (roleFilter) {
        if (!p.rolesNeeded.includes(roleFilter)) return false;
      }

      // Type filter
      if (typeFilter) {
        if (p.type !== typeFilter) return false;
      }

      // Campus filter
      if (campusFilter) {
        if (p.campus !== campusFilter) return false;
      }

      // Quick filter pill
      if (activeFilterPill === 'urgent') {
        if (p.urgency !== 'high') return false;
      } else if (activeFilterPill === 'hacknova') {
        if (!p.categoryBadge?.toLowerCase().includes('hacknova')) return false;
      } else if (activeFilterPill === 'ai') {
        const isAI = p.techStack.some(t => /fastapi|pinecone|langchain|rag|pytorch|ai/i.test(t)) ||
                     p.imageTag?.toLowerCase().includes('nlp') ||
                     p.rolesNeeded.includes('ai');
        if (!isAI) return false;
      } else if (activeFilterPill === 'beginner') {
        if (p.type === 'research') return false;
      }

      return true;
    });
  }, [projects, searchQuery, techStackFilter, roleFilter, typeFilter, campusFilter, activeFilterPill]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full space-y-space-lg pb-space-xl">
      {/* Top Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container-high p-space-lg shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                ACTIVE RECRUITMENT SPRINT
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                • Fall 2026 Cohorts
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Discover Projects
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Connect with student creators, join active teams, or scout talent across campuses.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container-lowest/80 backdrop-blur-md p-space-sm rounded-xl shadow-sm">
            <div className="px-space-md py-1 border-r border-surface-container-high">
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface leading-none">
                42
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Live Squads
              </div>
            </div>
            <div className="px-space-md py-1 border-r border-surface-container-high">
              <div className="font-headline-sm text-headline-sm font-bold text-secondary leading-none">
                19
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Urgently Hiring
              </div>
            </div>
            <div className="px-space-md py-1">
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface leading-none">
                94%
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Match Accuracy
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Structured Filter Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm space-y-space-md">
        {/* Primary Search & Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
          {/* Search Field */}
          <div className="md:col-span-4 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-xl pointer-events-none">
              search
            </span>
            <input
              id="projectSearchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search projects by stack, role, keyword, campus..."
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-xl outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Dropdown: Tech Stack */}
          <div className="md:col-span-2 relative">
            <select
              value={techStackFilter}
              onChange={(e) => {
                setTechStackFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-surface-container-low text-on-surface font-title-sm text-title-sm px-3.5 py-2.5 rounded-xl pr-8 cursor-pointer outline-none focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] transition-all"
            >
              <option value="">Tech Stack: All</option>
              <option value="react">React / React 19</option>
              <option value="nextjs">Next.js</option>
              <option value="nodejs">Node.js</option>
              <option value="python">Python / FastAPI</option>
              <option value="solidity">Solidity</option>
              <option value="mongodb">MongoDB Atlas</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Dropdown: Roles Needed */}
          <div className="md:col-span-2 relative">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-surface-container-low text-on-surface font-title-sm text-title-sm px-3.5 py-2.5 rounded-xl pr-8 cursor-pointer outline-none focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] transition-all"
            >
              <option value="">Roles: All Needed</option>
              <option value="frontend">Frontend Lead / Dev</option>
              <option value="backend">Backend Engineer</option>
              <option value="fullstack">Fullstack Engineer</option>
              <option value="ai">AI / ML Engineer</option>
              <option value="uiux">UI/UX Designer</option>
              <option value="devops">DevOps / Cloud</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Dropdown: Project Type */}
          <div className="md:col-span-2 relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-surface-container-low text-on-surface font-title-sm text-title-sm px-3.5 py-2.5 rounded-xl pr-8 cursor-pointer outline-none focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] transition-all"
            >
              <option value="">Type: All Types</option>
              <option value="hackathon">Hackathon Sprint</option>
              <option value="startup">Startup Seed</option>
              <option value="research">Academic Research</option>
              <option value="capstone">Course Capstone</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Dropdown: Campus/University */}
          <div className="md:col-span-2 relative">
            <select
              value={campusFilter}
              onChange={(e) => {
                setCampusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-surface-container-low text-on-surface font-title-sm text-title-sm px-3.5 py-2.5 rounded-xl pr-8 cursor-pointer outline-none focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] transition-all"
            >
              <option value="">Campus: Any Campus</option>
              <option value="stanford">Stanford University</option>
              <option value="cmu">Carnegie Mellon (CMU)</option>
              <option value="iit">IIT Delhi / Bombay</option>
              <option value="mit">MIT</option>
              <option value="berkeley">UC Berkeley</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
          <div className="flex flex-wrap items-center gap-space-xs" id="filterBadgesContainer">
            <button
              type="button"
              onClick={() => { setActiveFilterPill('all'); setCurrentPage(1); }}
              className={`filter-pill px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                activeFilterPill === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              All Projects
            </button>
            <button
              type="button"
              onClick={() => { setActiveFilterPill('urgent'); setCurrentPage(1); }}
              className={`filter-pill px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                activeFilterPill === 'urgent'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-error"></span>
              Recruiting Urgently
            </button>
            <button
              type="button"
              onClick={() => { setActiveFilterPill('hacknova'); setCurrentPage(1); }}
              className={`filter-pill px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                activeFilterPill === 'hacknova'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-sm text-secondary">bolt</span>
              HackNova 2026 Teams
            </button>
            <button
              type="button"
              onClick={() => { setActiveFilterPill('ai'); setCurrentPage(1); }}
              className={`filter-pill px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                activeFilterPill === 'ai'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-sm text-on-tertiary-container">psychology</span>
              AI/LLM Projects
            </button>
            <button
              type="button"
              onClick={() => { setActiveFilterPill('beginner'); setCurrentPage(1); }}
              className={`filter-pill px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                activeFilterPill === 'beginner'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Beginner Friendly
            </button>
          </div>

          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-base">swap_vert</span>
            <span>Sorted by: <strong>Match Score</strong></span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 rounded-2xl text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">No squads match your filters</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Try resetting dropdowns or clearing your search term.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setTechStackFilter('');
              setRoleFilter('');
              setTypeFilter('');
              setCampusFilter('');
              setActiveFilterPill('all');
            }}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-all inline-block mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {paginatedProjects.map((project) => {
            const fillPercent = Math.round((project.filledCount / project.totalCapacity) * 100);
            return (
              <div
                key={project.id}
                className="group bg-surface-container-lowest rounded-2xl p-space-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Status Bar & Type */}
                  <div className="flex items-center justify-between gap-space-xs mb-space-sm">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                      {project.categoryBadge}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                      project.urgency === 'high'
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-surface-container-high text-on-surface'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        project.urgency === 'high' ? 'bg-error animate-ping' : 'bg-secondary'
                      }`} />
                      {project.recruitingBadge}
                    </span>
                  </div>

                  {/* Project Hero Card Image */}
                  <div 
                    onClick={() => onSelectProject(project)}
                    className="relative w-full h-36 rounded-xl overflow-hidden mb-space-md bg-surface-container-low cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2.5 left-3 text-on-primary">
                      <span className="px-2 py-0.5 rounded-md bg-primary-container/80 backdrop-blur-sm font-label-sm text-label-sm font-medium">
                        {project.imageTag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-secondary transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {project.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-space-sm">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Open Positions Matrix */}
                  <div className="mt-space-md pt-space-sm border-t border-surface-container-high/60 space-y-1.5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">
                      Open Positions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.openVacancies?.map((v, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${
                            i === 0 
                              ? 'bg-secondary-fixed text-on-secondary-fixed' 
                              : 'bg-surface-container-highest text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xs">
                            {v.track?.toLowerCase().includes('design') ? 'palette' : 'code'}
                          </span>
                          {v.title.split(' ')[0]} {v.title.split(' ')[1] || ''}
                        </span>
                      )) || (
                        <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          Open Contributor
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="mt-space-md pt-space-sm border-t border-surface-container-high/60 space-y-space-sm">
                  {/* Team Roster & Capacity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={project.lead?.avatar}
                        alt={project.lead?.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-sm text-title-sm text-on-surface leading-tight font-semibold truncate">
                          {project.lead?.name}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight truncate">
                          {project.lead?.university}
                        </span>
                      </div>
                    </div>

                    {/* Capacity Gauge */}
                    <div className="flex items-center gap-1.5 text-right shrink-0">
                      <div className="w-16 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">
                        {project.filledCount}/{project.totalCapacity} Filled
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm transition-all text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickApply(project)}
                      className="py-2 px-3 rounded-xl bg-primary text-on-primary hover:bg-surface-tint active:scale-[0.98] font-title-sm text-title-sm transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Quick Apply</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination & Directory Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-title-sm text-title-sm text-on-surface font-semibold">
            Showing {Math.min(filteredProjects.length, itemsPerPage)} of {filteredProjects.length} Active Projects
          </span>
          <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
          <span className="hidden md:inline-block font-body-sm text-body-sm text-on-surface-variant">
            {Math.max(0, 42 - filteredProjects.length)} more matching campus opportunities
          </span>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl font-title-sm text-title-sm transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
