import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import PostProjectModal from './components/PostProjectModal';
import QuickApplyModal from './components/QuickApplyModal';

import DiscoverProjects from './views/DiscoverProjects';
import ProjectDetails from './views/ProjectDetails';
import Hackathons from './views/Hackathons';
import FindBuilders from './views/FindBuilders';
import MyApplications from './views/MyApplications';
import MyProjects from './views/MyProjects';
import Profile from './views/Profile';

import {
  initialProjects,
  initialHackathons,
  initialSquadWins,
  initialBuilders,
  initialApplications
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('discover-projects');
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [squadWins] = useState(initialSquadWins);
  const [builders] = useState(initialBuilders);
  const [applications, setApplications] = useState(initialApplications);

  // Modals state
  const [quickApplyProject, setQuickApplyProject] = useState(null);
  const [isPostProjectOpen, setIsPostProjectOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddHackathon = (newHack) => {
    setHackathons(prev => [newHack, ...prev]);
    showToast(`Hackathon "${newHack.title}" submitted to circuit registry!`);
  };

  // Nav actions
  const handleSelectProject = (proj) => {
    setSelectedProject(proj);
    setActiveView('project-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectById = (id) => {
    const found = projects.find(p => p.id === id);
    if (found) {
      handleSelectProject(found);
    } else {
      setActiveView('discover-projects');
    }
  };

  const handleQuickApply = (proj) => {
    setQuickApplyProject(proj);
  };

  const handleApplySuccess = (newApp) => {
    const fullApp = {
      id: `app-${Date.now()}`,
      ...newApp
    };
    setApplications(prev => [fullApp, ...prev]);
    showToast(`Application sent for ${newApp.role} in ${newApp.projectTitle}!`);
  };

  const handleAddProject = (newProj) => {
    setProjects(prev => [newProj, ...prev]);
    setSelectedProject(newProj);
    setActiveView('project-details');
    showToast(`Project "${newProj.title}" launched successfully!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInviteBuilder = (builderName) => {
    showToast(`Invitation dispatched to ${builderName}!`);
  };

  const handleFindSquadFromHackathon = (hackathonTitle) => {
    setActiveView('discover-projects');
    showToast(`Filtering squads targeting ${hackathonTitle}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md antialiased">
      {/* Fixed Navigation Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
      />

      {/* Main Content Area (Offset by Sidebar: pl-72) */}
      <div className="pl-72 min-h-screen flex flex-col">
        {/* Sticky Top Header */}
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={applications.length}
          onNavigateProfile={() => setActiveView('profile')}
        />

        {/* Dynamic View Router */}
        <main className="w-full pt-16 bg-surface min-h-screen px-space-lg py-space-lg flex-1">
          {activeView === 'discover-projects' && (
            <DiscoverProjects
              projects={projects}
              onSelectProject={handleSelectProject}
              onQuickApply={handleQuickApply}
            />
          )}

          {activeView === 'project-details' && selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onBack={() => setActiveView('discover-projects')}
              onApplySuccess={handleApplySuccess}
            />
          )}

          {activeView === 'hackathons' && (
            <Hackathons
              hackathons={hackathons}
              squadWins={squadWins}
              onFindSquad={handleFindSquadFromHackathon}
              onAddHackathon={handleAddHackathon}
              showToast={showToast}
            />
          )}

          {activeView === 'find-builders' && (
            <FindBuilders
              builders={builders}
              onInvite={handleInviteBuilder}
            />
          )}

          {activeView === 'my-projects' && (
            <MyProjects
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenPostProject={() => setIsPostProjectOpen(true)}
            />
          )}

          {activeView === 'my-applications' && (
            <MyApplications
              applications={applications}
              onSelectProjectById={handleSelectProjectById}
            />
          )}

          {activeView === 'my-teams' && (
            <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
              <div className="flex flex-col max-w-3xl">
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-base">diversity_3</span>
                  <span>Active Squad Pods</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  My Teams &amp; Squads
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                  Collaborate in real-time with verified squad members preparing for upcoming hackathon milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                      HackNova 2026 Pod
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">Sprint 2 Live</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      StudySync AI
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Collaborative Note Synthesizer &amp; Vector Graph Engine
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between font-body-sm text-body-sm">
                    <span className="text-on-surface font-medium">Next Squad Sync</span>
                    <span className="text-secondary font-semibold">Sunday 7 PM PT</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/60">
                    <button
                      type="button"
                      onClick={() => handleSelectProjectById('studysync-ai')}
                      className="py-2 px-4 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-surface-tint transition-all cursor-pointer"
                    >
                      Open Squad Workspace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeView === 'profile' || activeView === 'settings') && (
            <Profile />
          )}
        </main>
      </div>

      {/* Quick Apply Modal */}
      <QuickApplyModal
        project={quickApplyProject}
        isOpen={Boolean(quickApplyProject)}
        onClose={() => setQuickApplyProject(null)}
        onApplySuccess={handleApplySuccess}
      />

      {/* Post Project Modal */}
      <PostProjectModal
        isOpen={isPostProjectOpen}
        onClose={() => setIsPostProjectOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        hackathons={hackathons}
        onSelectProject={handleSelectProject}
        onNavigate={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-body-sm text-body-sm animate-modal">
          <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-on-surface-variant hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
