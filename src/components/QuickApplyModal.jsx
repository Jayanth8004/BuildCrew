import React, { useState } from 'react';

export default function QuickApplyModal({ project, isOpen, onClose, onApplySuccess }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [motivation, setMotivation] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com/jayanthv');
  const [hours, setHours] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onApplySuccess) {
        onApplySuccess({
          projectId: project.id,
          projectTitle: project.title,
          role: selectedRole || (project.openVacancies?.[0]?.title || 'Core Contributor'),
          submittedAt: 'Just now',
          status: 'Pending Lead Review',
          statusColor: 'bg-secondary-fixed text-on-secondary-fixed',
          note: `Application submitted to ${project.lead?.name || 'project lead'}.`
        });
      }
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/40 backdrop-blur-sm animate-modal">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden z-10 p-space-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-space-md">
          <div>
            <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider mb-0.5">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Quick Squad Application</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {project.title}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Lead: {project.lead?.name} ({project.lead?.university})
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 bg-secondary-fixed text-secondary rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <h3 className="font-title-md text-title-md font-bold text-on-surface">
              Application Dispatched!
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto">
              {project.lead?.name} has been notified with your profile details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Select Role to Apply For
              </label>
              <select
                required
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all cursor-pointer"
              >
                <option value="">Choose an open position...</option>
                {project.openVacancies?.map(v => (
                  <option key={v.id} value={v.title}>
                    {v.title} ({v.hours})
                  </option>
                )) || (
                  <option value="Frontend Developer">Frontend Developer</option>
                )}
              </select>
            </div>

            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Why this squad?
              </label>
              <textarea
                required
                rows={2}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="What excites you about this problem space and what can you ship?"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                  Key Skills
                </label>
                <input
                  type="text"
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React 19, FastAPI"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
                />
              </div>
              <div>
                <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                  Weekly Commitment
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={4}
                    max={30}
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">hrs / week</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Portfolio or GitHub URL
              </label>
              <input
                type="url"
                required
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Direct Apply</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
