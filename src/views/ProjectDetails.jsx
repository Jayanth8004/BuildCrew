import React, { useState, useRef } from 'react';

export default function ProjectDetails({ 
  project, 
  onBack, 
  onApplySuccess 
}) {
  const [selectedRole, setSelectedRole] = useState(
    project.openVacancies?.[0]?.id || 'frontend'
  );
  const [whyAnswer, setWhyAnswer] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('https://github.com/jayanthv');
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const applicationCardRef = useRef(null);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    applicationCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleScrollToApply = () => {
    applicationCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleApplyFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const chosenRoleObj = project.openVacancies?.find(v => v.id === selectedRole);
      if (onApplySuccess) {
        onApplySuccess({
          projectId: project.id,
          projectTitle: project.title,
          role: chosenRoleObj?.title || 'Core Squad Engineer',
          submittedAt: 'Just now',
          status: 'Direct Lead Review',
          statusColor: 'bg-secondary-fixed text-on-secondary-fixed',
          note: `${project.lead?.name || 'Squad Lead'} has been notified of your application.`
        });
      }
    }, 700);
  };

  // Fallback defaults if viewing a custom newly-created project
  const leadName = project.lead?.name || 'Jayanth V.';
  const leadProgram = project.lead?.program || project.lead?.university || 'Stanford University';
  const openPositionsCount = project.openVacancies?.length || 1;
  const filledCount = project.filledCount || 2;
  const totalCapacity = project.totalCapacity || 4;
  const percentFilled = Math.round((filledCount / totalCapacity) * 100);

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Breadcrumbs & Quick Meta Bar */}
      <div className="flex items-center justify-between py-space-sm mb-space-md">
        <nav className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <button 
            type="button" 
            onClick={onBack}
            className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Projects</span>
          </button>
          <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
          <span className="text-on-surface-variant">Web &amp; AI</span>
          <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold truncate max-w-xs">{project.title}</span>
        </nav>
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            {project.sprintNotice || 'Sprint 2 Live · HackNova Track'}
          </span>
        </div>
      </div>

      {/* Hero Header Banner Card */}
      <div className="relative bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg lg:p-space-xl overflow-hidden mb-space-xl">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-xs">radio_button_checked</span>
              Active · Recruiting {openPositionsCount} Seats
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-xs text-secondary">workspace_premium</span>
              Top 5% Cohort Pick
            </span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">
              Published {project.publishedTime || '2 days ago'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl">
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                {project.fullTitle || project.title}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs leading-relaxed">
                {project.fullDescription || project.tagline}
              </p>
            </div>

            {/* Action Cluster */}
            <div className="flex items-center gap-space-sm shrink-0">
              <button
                type="button"
                id="quick-apply-btn"
                onClick={handleScrollToApply}
                className="flex items-center gap-space-xs px-5 py-3 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">bolt</span>
                <span>Apply for Open Role</span>
              </button>
              <button
                type="button"
                aria-label="Bookmark Project"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                    : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isBookmarked ? 'fill text-secondary' : ''}`}>
                  bookmark
                </span>
              </button>
              <button
                type="button"
                aria-label="Share Project Link"
                onClick={handleShare}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer relative"
              >
                <span className="material-symbols-outlined text-xl">share</span>
                {copiedLink && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-primary text-on-primary text-[11px] font-medium shadow whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Lead Creator Metadata Strip */}
          <div className="flex flex-wrap items-center gap-space-lg pt-space-md mt-space-xs bg-surface-container-low/60 rounded-xl p-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                src={project.lead?.leadAvatarFull || project.lead?.avatar}
                alt={leadName}
                className="w-11 h-11 rounded-full object-cover shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    {leadName}
                  </span>
                  <span className="material-symbols-outlined text-secondary text-sm" title="Verified Campus Builder">
                    verified
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {project.lead?.roleTitle || 'Lead Architect'} · {leadProgram}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-surface-container-high hidden md:block"></div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-base">terminal</span>
              <span className="text-on-surface font-semibold">{project.metaStats?.commits || '68 commits'}</span>
              <span>{project.metaStats?.branches || 'across 3 branches'}</span>
            </div>

            <div className="h-6 w-px bg-surface-container-high hidden md:block"></div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-base">hub</span>
              <span className="text-on-surface font-semibold">{project.categoryBadge || 'HackNova 2026'}</span>
              <span>Submission Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 2-Column Asymmetric Layout (8 : 4 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* LEFT 2/3 COLUMN: Deep Technical & Project Context */}
        <div className="lg:col-span-8 space-y-space-xl">
          {/* Section: The Problem */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl">
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">psychology_alt</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                The Problem We Are Solving
              </h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
              {project.problemSolving?.description || 
                'Collegiate student builders frequently struggle with tooling cohesion, semantic research fragmentation, and unstructured real-time group collaboration.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {(project.problemSolving?.cards || [
                {
                  icon: 'broken_image',
                  color: 'text-error',
                  title: 'Fragmented Artifacts',
                  desc: 'Over 65% of peer citations get lost between raw PDF annotations and collaborative deck assemblies.'
                },
                {
                  icon: 'sync_problem',
                  color: 'text-secondary',
                  title: 'Context Drift',
                  desc: 'Team members work off differing revisions of seminar debates without real-time state synchrony.'
                },
                {
                  icon: 'memory',
                  color: 'text-secondary',
                  title: 'Zero Vector Grounding',
                  desc: 'Standard GPT wrappers hallucinate non-existent page citations without local chunk verification.'
                }
              ]).map((card, idx) => (
                <div key={idx} className="bg-surface-container-low p-space-md rounded-xl">
                  <div className={`flex items-center gap-2 font-title-sm text-title-sm mb-1 ${card.color || 'text-on-surface'}`}>
                    <span className="material-symbols-outlined text-base">{card.icon}</span>
                    <span>{card.title}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: The Build & Architecture */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">deployed_code</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  The Build &amp; Architecture
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-md">
                {project.architecture?.badge || 'MERN + Python FastAPI Microservice'}
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
              {project.architecture?.summary || 
                'Engineered with microservices separating low-latency state synchronization from vector inference pipelines.'}
            </p>

            {/* Technical Pipeline Flow Visualization */}
            <div className="bg-surface-container-low rounded-xl p-space-lg mb-space-lg">
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-md font-semibold">
                Pipeline Ingestion &amp; Live Synthesis Flow
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
                {(project.architecture?.stages || [
                  {
                    stage: 'Stage 01',
                    icon: 'picture_as_pdf',
                    title: 'Document Parser',
                    desc: 'Chunking unstructured PDFs & lecture audio via PyMuPDF.',
                    tech: 'Python / Celery'
                  },
                  {
                    stage: 'Stage 02',
                    icon: 'alt_route',
                    title: 'Vector Embeddings',
                    desc: 'Voyage-3-large vectors stored in MongoDB Atlas.',
                    tech: 'FastAPI / Atlas'
                  },
                  {
                    stage: 'Stage 03',
                    icon: 'dynamic_feed',
                    title: 'State Sync Engine',
                    desc: 'Yjs CRDT protocol broadcasting canvas changes.',
                    tech: 'Node.js / WebSockets'
                  },
                  {
                    stage: 'Stage 04',
                    icon: 'draw',
                    title: 'Infinite Canvas',
                    desc: 'Hardware accelerated mind-node renderer.',
                    tech: 'React 19 / Fabric.js'
                  }
                ]).map((stage, idx) => (
                  <div key={idx} className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-secondary mb-2">
                        <span className="material-symbols-outlined text-lg">{stage.icon}</span>
                        <span className="font-label-sm text-label-sm">{stage.stage}</span>
                      </div>
                      <div className="font-title-sm text-title-sm text-on-surface font-semibold">{stage.title}</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{stage.desc}</p>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline mt-3 block">{stage.tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Tags Cluster */}
            <div className="flex flex-wrap items-center gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section: Roadmap & Sprints */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl">
            <div className="flex items-center justify-between mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">conversion_path</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Sprint Roadmap
                </h2>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">3-week intensive dev cycle</span>
            </div>

            <div className="space-y-space-md">
              {(project.sprints || [
                {
                  id: 1,
                  title: 'Sprint 1: Vectorization & Core Pipeline Backend',
                  status: 'Completed Nov 10',
                  state: 'done',
                  desc: 'Completed PDF vector embeddings microservice, MongoDB collection schema, and session auth middleware.'
                },
                {
                  id: 2,
                  title: 'Sprint 2: Real-time Canvas & Presence Sync',
                  status: 'In Progress (Current)',
                  state: 'in-progress',
                  desc: 'Connecting WebSocket rooms for real-time cursor sync, node dragging, live markdown editing, and citation card popovers.'
                },
                {
                  id: 3,
                  title: 'Sprint 3: HackNova Submission & User Testing',
                  status: 'Upcoming · Nov 24',
                  state: 'upcoming',
                  desc: 'Stress testing 50 concurrent researchers per whiteboard, polish motion curves, record live demo walkthrough for judges.'
                }
              ]).map((sprint) => (
                <div
                  key={sprint.id}
                  className={`flex items-start gap-space-md p-space-md rounded-xl ${
                    sprint.state === 'in-progress'
                      ? 'bg-surface-container-high/40 ring-1 ring-secondary/20'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                    sprint.state === 'done'
                      ? 'bg-surface-container-highest text-secondary'
                      : sprint.state === 'in-progress'
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container-highest text-outline'
                  }`}>
                    <span className="material-symbols-outlined text-lg">
                      {sprint.state === 'done' ? 'check' : sprint.state === 'in-progress' ? 'sync' : 'flag'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        {sprint.title}
                      </span>
                      {sprint.state === 'in-progress' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-secondary animate-ping"></span>
                          In Progress (Current)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                          {sprint.status}
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {sprint.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Current Squad */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">group</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Current Squad ({filledCount} of {totalCapacity})
                </h2>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {totalCapacity - filledCount} seats vacant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {(project.squadRoster || [
                {
                  name: project.lead?.name,
                  role: 'Backend & Infra Architecture',
                  badge: 'Lead',
                  school: project.lead?.university,
                  skills: 'FastAPI, LangChain, Mongo',
                  avatar: project.lead?.avatar
                }
              ]).map((member, idx) => (
                <div key={idx} className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                  <div className="flex items-start gap-space-sm">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                          {member.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                          {member.badge}
                        </span>
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">{member.role}</div>
                      <div className="font-label-sm text-label-sm text-outline mt-0.5">{member.school}</div>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm bg-surface-container-lowest/70 rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-sm">code</span>
                      <span>{member.skills}</span>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-secondary hover:text-on-secondary-fixed transition-colors flex items-center gap-0.5 font-label-sm text-label-sm"
                    >
                      <span>GitHub</span>
                      <span className="material-symbols-outlined text-xs">arrow_outward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Open Positions */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">person_search</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Open Positions
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Join the core team before the sprint milestone review
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-md text-label-md font-bold">
                {openPositionsCount} Open Seats
              </span>
            </div>

            <div className="space-y-space-md">
              {(project.openVacancies || []).map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="bg-surface-container-low rounded-xl p-space-lg transition-all hover:bg-surface-container"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
                    <div className="space-y-space-xs">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">
                          {vacancy.track}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {vacancy.seats}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        {vacancy.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                        {vacancy.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-space-xs">
                        {vacancy.skills?.map((sk, sidx) => (
                          <span
                            key={sidx}
                            className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-space-sm shrink-0">
                      <div className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
                        <span>{vacancy.hours}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(vacancy.id)}
                        className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-surface-tint transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Apply for {vacancy.title.split(' ')[0]} Role
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT 1/3 COLUMN: Sticky Application & Team Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-space-lg sticky top-20">
          {/* Squad Composition & Readiness Gauge */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Squad Readiness
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-bold">
                {percentFilled}% Confirmed
              </span>
            </div>

            <div className="flex items-center gap-space-lg mb-space-md">
              {/* Circular Gauge Inline SVG */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${percentFilled}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-none">
                    {filledCount}/{totalCapacity}
                  </span>
                  <span className="font-label-sm text-[10px] text-outline">members</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium truncate">Backend Lead</span>
                  <span className="text-secondary font-semibold">Filled</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface font-medium truncate">AI/ML Engineer</span>
                  <span className="text-secondary font-semibold">Filled</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-medium truncate">Frontend Engineer</span>
                  <span className="text-error font-semibold">Open</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-medium truncate">Product Designer</span>
                  <span className="text-error font-semibold">Open</span>
                </div>
              </div>
            </div>

            <div className="pt-space-sm bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
              <span>
                Commitment match score: <strong className="text-on-surface">{project.matchScore || 94}%</strong> based on your profile
              </span>
            </div>
          </div>

          {/* Quick Application Drawer / Box */}
          <div 
            ref={applicationCardRef}
            id="application-card" 
            className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg transition-all"
          >
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-xl">send</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Apply to Join</span>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Direct Lead Review</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              {leadName} responds within 24 hours. Accepted applicants receive GitHub write access &amp; Discord squad invites immediately.
            </p>

            {isSubmitted ? (
              <div className="p-space-md rounded-xl bg-surface-container text-on-surface text-center font-body-sm text-body-sm animate-modal">
                <div className="flex items-center justify-center gap-1.5 text-secondary font-bold mb-1">
                  <span className="material-symbols-outlined text-lg">task_alt</span>
                  <span>Application Dispatched!</span>
                </div>
                {leadName} has been notified. Check your notifications tab for status updates.
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-secondary text-label-md font-semibold hover:underline block mx-auto"
                >
                  Submit another role application
                </button>
              </div>
            ) : (
              <form 
                id="application-form" 
                onSubmit={handleApplyFormSubmit}
                className="space-y-space-md"
              >
                {/* Role Selector */}
                <div>
                  <label className="block font-title-sm text-title-sm text-on-surface mb-1.5">
                    Select Role
                  </label>
                  <select
                    id="role-select"
                    required
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-all cursor-pointer"
                  >
                    <option value="">Choose an open vacancy...</option>
                    {project.openVacancies?.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    )) || (
                      <option value="frontend">Frontend & Interactive Canvas Engineer</option>
                    )}
                  </select>
                </div>

                {/* Why are you interested */}
                <div>
                  <label className="block font-title-sm text-title-sm text-on-surface mb-1.5">
                    Why {project.title}?
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={whyAnswer}
                    onChange={(e) => setWhyAnswer(e.target.value)}
                    placeholder="Briefly describe what sparks your interest in research synthesis & your technical motivation..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-all resize-none"
                  />
                </div>

                {/* Top relevant skills */}
                <div>
                  <label className="block font-title-sm text-title-sm text-on-surface mb-1.5">
                    Top Relevant Skills
                  </label>
                  <input
                    type="text"
                    required
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="e.g. React 19, Fabric.js, Canvas API, Figma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-all"
                  />
                </div>

                {/* Portfolio / GitHub URL */}
                <div>
                  <label className="block font-title-sm text-title-sm text-on-surface mb-1.5">
                    Portfolio or GitHub URL
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourhandle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-all"
                  />
                </div>

                {/* Weekly availability */}
                <div>
                  <label className="block font-title-sm text-title-sm text-on-surface mb-1.5">
                    Weekly Availability
                  </label>
                  <div className="flex items-center gap-space-sm">
                    <input
                      type="number"
                      min={4}
                      max={30}
                      required
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(e.target.value)}
                      className="w-24 px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-all"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      hours / week until HackNova
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  id="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center justify-center gap-space-xs cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Project Repo & Meeting Logistics */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-md">
            <div className="font-title-sm text-title-sm text-on-surface font-semibold">
              Repository &amp; Cadence
            </div>
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-base">lock</span>
                  <span>Private GitHub Repo</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">Granted on join</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-base">forum</span>
                  <span>Squad Discord Channel</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">#studysync-ai</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-base">event_repeat</span>
                  <span>Weekly Sync Schedule</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Tues &amp; Sun 7 PM PT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
