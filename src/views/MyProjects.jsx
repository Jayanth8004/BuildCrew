import React from 'react';

export default function MyProjects({ projects, currentUser, onSelectProject, onOpenPostProject }) {
  const myCreated = projects.filter(p => {
    if (!currentUser) return false;
    const isOwnerId = p.createdBy === currentUser._id || p.createdBy?._id === currentUser._id;
    const isLeadMatch = currentUser.name && p.lead?.name === currentUser.name;
    return isOwnerId || isLeadMatch;
  });

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            <span>Squad Lead Dashboard</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            My Posted Projects
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Manage your project roster, review candidate applications, and assign squad roles.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPostProject}
          className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-surface-tint active:scale-[0.98] transition-all shadow-md cursor-pointer self-start lg:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Post New Squad</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-md">
        {myCreated.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">workspaces</span>
            <p className="font-body-lg text-body-lg text-on-surface font-semibold">You haven't posted any squads yet</p>
            <p className="font-body-sm text-body-sm mt-1">Have an idea for HackNova or TreeHacks? Start recruiting teammates now.</p>
            <button
              type="button"
              onClick={onOpenPostProject}
              className="mt-4 px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm shadow-md hover:bg-secondary-container transition-all cursor-pointer"
            >
              Post a Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {myCreated.map(p => (
              <div
                key={p._id || p.id}
                className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                      {p.categoryBadge}
                    </span>
                    <span className="text-secondary font-semibold font-label-sm text-label-sm">
                      {p.filledCount}/{p.totalCapacity} Members
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface mt-2">
                    {p.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    {p.tagline}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/60">
                  <button
                    type="button"
                    onClick={() => onSelectProject(p)}
                    className="py-1.5 px-3 rounded-xl bg-surface-container-lowest text-on-surface font-title-sm text-title-sm hover:bg-surface shadow-sm transition-all cursor-pointer"
                  >
                    Manage Roster
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
