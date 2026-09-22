import { useState } from 'react';

export default function HackathonSidebar({ squadWins, onOpenHallOfFame, onCheckTravelGrant }) {
  const [connectedLead, setConnectedLead] = useState(false);

  return (
    <div className="space-y-space-md">
      {/* 1. Squad Match Radar */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/70 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-base">radar</span>
            </span>
            <h4 className="font-title-md font-bold text-on-surface">
              Squad Match Radar
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Pods
          </span>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed mb-3.5">
          Based on your skills (<strong>React 19 + PyTorch</strong>), 7 squads preparing for TreeHacks are actively scouting your profile.
        </p>

        {/* Seat Matrix preview */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 space-y-2.5 mb-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-on-surface">Target: TreeHacks "OmniVoice"</span>
            <span className="text-secondary font-semibold text-[11px]">3/4 Confirmed</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <div className="p-2 rounded-xl bg-surface-container-lowest text-center border border-surface-container-high/50">
              <span className="text-[10px] block text-on-surface font-semibold">Backend</span>
              <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-lowest text-center border border-surface-container-high/50">
              <span className="text-[10px] block text-on-surface font-semibold">Design</span>
              <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-lowest text-center border border-surface-container-high/50">
              <span className="text-[10px] block text-on-surface font-semibold">ML Eng</span>
              <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
            </div>
            <div className="p-2 rounded-xl bg-secondary-fixed text-center border border-secondary/40 animate-pulse">
              <span className="text-[10px] block text-on-secondary-fixed font-bold">You (Web)</span>
              <span className="material-symbols-outlined text-xs text-secondary mt-0.5">add</span>
            </div>
          </div>
        </div>

        {connectedLead ? (
          <div className="p-2.5 rounded-xl bg-secondary-fixed/50 border border-secondary/20 text-center text-on-secondary-fixed font-semibold text-xs flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-secondary">done_all</span>
            <span>Connected! Discord invite sent to lead.</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConnectedLead(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary-container active:scale-[0.98] text-on-secondary font-semibold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">send</span>
            <span>Connect with OmniVoice Lead</span>
          </button>
        )}
      </div>

      {/* 2. Recent Squad Wins */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/70 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/60 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-base">emoji_events</span>
            </span>
            <h4 className="font-title-md font-bold text-on-surface">
              Recent Circuit Wins
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
            Verified
          </span>
        </div>

        {/* Big metric ticker */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/50 flex items-baseline justify-between mb-3.5">
          <div>
            <span className="text-2xl font-extrabold text-on-surface tracking-tight block">
              $180k+
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              Won by verified squads
            </span>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-secondary block">24 Podiums</span>
            <span className="text-[11px] text-on-surface-variant">Circuit 2026</span>
          </div>
        </div>

        {/* Podium list */}
        <div className="space-y-2.5 divide-y divide-surface-container-high/50">
          {squadWins.map((win, widx) => (
            <div key={widx} className="pt-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  win.rank === '1st'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {win.rank}
                </span>
                <div className="min-w-0">
                  <span className="font-bold text-xs text-on-surface block truncate">
                    {win.team}
                  </span>
                  <span className="text-[11px] text-on-surface-variant block truncate">
                    {win.event}
                  </span>
                </div>
              </div>
              <span className="font-bold text-xs text-on-surface shrink-0">
                {win.amount}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenHallOfFame}
          className="w-full text-center mt-4 text-xs text-secondary hover:text-primary font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <span>View all 48 hall-of-fame squads</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* 3. Travel Grants */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-surface-container-low border border-blue-200/60 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-lg">flight_takeoff</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            Campus Travel Subsidies
          </span>
        </div>
        <h5 className="font-title-sm font-bold text-on-surface">
          Traveling for away circuits?
        </h5>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          BuildCrew partners with corporate patrons to reimburse bus, flights, and stay for multi-campus squads.
        </p>
        <button
          type="button"
          onClick={onCheckTravelGrant}
          className="w-full mt-1 py-2 px-3.5 rounded-xl bg-surface-container-lowest hover:bg-white text-on-surface font-semibold text-xs border border-surface-container-high/80 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Check Travel Eligibility</span>
          <span className="material-symbols-outlined text-sm text-secondary">open_in_new</span>
        </button>
      </div>
    </div>
  );
}
