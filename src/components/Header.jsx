import React, { useState } from 'react';

export default function Header({ 
  onOpenCommandPalette, 
  searchQuery, 
  setSearchQuery,
  onSearchFocus,
  notificationCount = 2,
  onNavigateProfile,
  currentUser,
  onLogout,
  onOpenAdminDashboard
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearchFocus) {
      onSearchFocus();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      {/* Left: Active Search Bar & Campus Tag */}
      <div className="flex items-center gap-space-md">
        <div className="relative flex items-center w-84 group">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg pointer-events-none group-focus-within:text-secondary transition-colors">
            search
          </span>
          <input 
            type="text"
            value={searchQuery || ''}
            onChange={handleInputChange}
            className="w-full pl-9 pr-9 py-2 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-xl outline-none shadow-[0_1px_3px_rgba(15,23,42,0.04)] focus:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] border border-transparent focus:border-secondary/20 transition-all" 
            placeholder="Search projects, stacks, roles..." 
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 text-on-surface-variant hover:text-on-surface p-1 transition-colors cursor-pointer"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          ) : null}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md select-none">
          <span className="material-symbols-outlined text-secondary text-base leading-none">school</span>
          <span>{currentUser?.university || 'Stanford University'}</span>
          <span className="text-outline-variant">•</span>
          <span className="text-on-surface-variant font-medium">Fall 2026</span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-space-sm relative">
        {/* Admin Quick Switch (if current user is admin previewing student view) */}
        {currentUser?.role === 'admin' && (
          <button
            type="button"
            onClick={onOpenAdminDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs shadow-xs hover:bg-secondary/90 transition-all cursor-pointer mr-1"
          >
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            <span>Manage Hackathons</span>
          </button>
        )}

        {/* Activity Feed Button */}
        <div className="relative">
          <button 
            aria-label="Activity Feed" 
            onClick={() => setShowActivityFeed(!showActivityFeed)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer ${showActivityFeed ? 'bg-surface-container text-secondary' : ''}`}
          >
            <span className="material-symbols-outlined text-xl">campaign</span>
          </button>

          {showActivityFeed && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-space-md z-50 animate-modal">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-low mb-3">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">Campus Sprint Feed</span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">Live</span>
              </div>
              <div className="space-y-3 text-body-sm text-body-sm">
                <div className="flex gap-2.5 items-start">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-semibold text-on-surface">TreeHacks '26</span> track announced: Autonomous Agents with $15k bounty.
                    <span className="block text-outline text-[11px] mt-0.5">10m ago</span>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-semibold text-on-surface">StudySync AI</span> filled Backend Seat. 2 roles remaining.
                    <span className="block text-outline text-[11px] mt-0.5">42m ago</span>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-semibold text-on-surface">CalHacks 12</span> team registration opened for West Coast applicants.
                    <span className="block text-outline text-[11px] mt-0.5">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            aria-label="Notifications" 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer ${showNotifications ? 'bg-surface-container text-secondary' : ''}`}
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-space-md z-50 animate-modal">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-low mb-3">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">Notifications</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">{notificationCount} new</span>
              </div>
              <div className="space-y-3 text-body-sm text-body-sm">
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <div className="flex items-center justify-between text-on-surface font-semibold text-title-sm mb-1">
                    <span>Application Dispatched</span>
                    <span className="text-[11px] text-outline font-normal">Just now</span>
                  </div>
                  <p className="text-on-surface-variant text-body-sm">
                    Maya Chen was notified of your interest in <strong className="text-on-surface">StudySync AI</strong>.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <div className="flex items-center justify-between text-on-surface font-semibold text-title-sm mb-1">
                    <span>Squad Invite</span>
                    <span className="text-[11px] text-outline font-normal">2h ago</span>
                  </div>
                  <p className="text-on-surface-variant text-body-sm">
                    Rahul S. invited you to review the <strong className="text-on-surface">Campus Flow</strong> roadmap.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-surface-container-high mx-1"></div>

        {/* Profile Avatar Button & Menu */}
        <div className="relative">
          <img 
            alt="Profile" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_rgba(15,23,42,0.08)] cursor-pointer hover:ring-2 hover:ring-secondary/40 transition-all" 
            src={currentUser?.avatar || "https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG"}
          />

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-3 z-50 animate-modal">
              <div className="p-2.5 rounded-xl bg-surface-container-low mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">{currentUser?.name || 'Jayanth V.'}</span>
                  <span className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold uppercase ${
                    currentUser?.role === 'admin' ? 'bg-secondary text-on-secondary' : 'bg-secondary-fixed text-on-secondary-fixed'
                  }`}>
                    {currentUser?.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </div>
                <div className="text-[11px] text-on-surface-variant truncate mt-0.5">
                  {currentUser?.email || 'jayanth@stanford.edu'}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                {currentUser?.role === 'admin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      if (onOpenAdminDashboard) onOpenAdminDashboard();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container font-semibold text-secondary flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                    <span>Manage Hackathons</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigateProfile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container font-medium text-on-surface flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">account_circle</span>
                  <span>My Profile</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 cursor-pointer border-t border-surface-container-high/60 mt-1 pt-1.5"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
