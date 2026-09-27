import React from 'react';

export default function MyApplications({ applications, onSelectProjectById }) {
  return (
    <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
      <div className="flex flex-col max-w-3xl">
        <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-base">assignment</span>
          <span>Application Tracker</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
          My Squad Applications
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Review the status of your applications to live squads, hackathon teams, and startup seeds.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-md">
        {(!applications || applications.length === 0) ? (
          <div className="py-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">assignment_late</span>
            <p className="font-body-lg text-body-lg text-on-surface font-semibold">No applications dispatched yet</p>
            <p className="font-body-sm text-body-sm mt-1">Explore Discover Projects to join active campus squads.</p>
          </div>
        ) : (
          <div className="space-y-space-md">
            {applications.map((app, idx) => {
              const projectTitle = app.projectTitle || app.project?.title || 'Squad Project';
              const targetProjectId = (typeof app.project === 'object' && app.project !== null)
                ? (app.project._id || app.project.id)
                : (app.project || app.projectId);
              const roleName = app.role || app.requestedRole || 'Squad Member';
              const applicationNote = app.note || app.message || '';
              const submittedDate = app.submittedAt || (app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recently');

<<<<<<< HEAD
              return (
                <div
                  key={app._id || app.id || idx}
                  className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-surface-container transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        {projectTitle}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold capitalize ${app.statusColor || 'bg-secondary-fixed text-on-secondary-fixed'}`}>
                        {app.status || 'pending'}
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm text-secondary font-medium">
                      Applied Position: <span className="text-on-surface font-semibold">{roleName}</span>
                    </div>
                    {applicationNote && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                        {applicationNote}
                      </p>
                    )}
                    <span className="text-outline text-[11px] block mt-1">Submitted {submittedDate}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {targetProjectId && (
                      <button
                        type="button"
                        onClick={() => onSelectProjectById(targetProjectId)}
                        className="py-2 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface font-title-sm text-title-sm shadow-sm transition-all cursor-pointer border border-surface-container-high/50"
                      >
                        View Project
                      </button>
                    )}
                  </div>
=======
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectProjectById(app.projectId || app.project?._id || app.project)}
                    className="py-2 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface font-title-sm text-title-sm shadow-sm transition-all cursor-pointer font-medium"
                  >
                    View Project
                  </button>
>>>>>>> 3d61564a6a9ef8106187e4ce1f697519b02f3748
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
