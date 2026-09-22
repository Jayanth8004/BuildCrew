import React, { useState } from 'react';

export default function PostProjectModal({ isOpen, onClose, onAddProject }) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [type, setType] = useState('hackathon');
  const [techStackInput, setTechStackInput] = useState('React 19, FastAPI, Tailwind');
  const [rolesInput, setRolesInput] = useState('frontend, ai');
  const [campus, setCampus] = useState('stanford');
  const [totalCapacity, setTotalCapacity] = useState(4);
  const [categoryBadge, setCategoryBadge] = useState('HackNova 2026');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      fullTitle: `${title} — Collegiate Collaboration Sprint`,
      tagline,
      fullDescription: tagline,
      type,
      categoryBadge,
      recruitingBadge: 'Recruiting 2 Roles',
      urgency: 'high',
      matchScore: 95,
      publishedTime: 'Just now',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbkVkD8ugQCopgjlKUdX6h2t7iGR8U7cAotGEX4gkVp2iZGYgNXuhDd7uv8XKPdDKxRc5LVG5-2ku_w-inG49pGRXEBeatfaGIbtDqTB4GZbf-12sVHdMJBR4s9dSwOvIgdwjHPZxHAYY6iul7GnOXO1wqM8s9NQjaFCIpekgajipka8rL8aNXyl4sNuZ5jWKKChl91y1bgaayoCYgzuMAvhhpxODIRFzAx9FdSUbydfyLDzrLu9E',
      imageTag: 'Collegiate Sprint',
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      rolesNeeded: rolesInput.split(',').map(s => s.trim()).filter(Boolean),
      campus,
      filledCount: 1,
      totalCapacity: Number(totalCapacity) || 4,
      lead: {
        name: 'Jayanth V.',
        university: 'Stanford CS \'26',
        program: 'Stanford University',
        roleTitle: 'Project Creator',
        avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG'
      },
      openVacancies: [
        {
          id: 'dev-1',
          track: 'Core Contributor',
          title: 'Fullstack / Systems Engineer',
          seats: '1 seat available',
          desc: tagline,
          skills: techStackInput.split(',').map(s => s.trim()).slice(0, 3),
          hours: '8–10 hrs / week'
        }
      ]
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/40 backdrop-blur-sm animate-modal">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden z-10 p-space-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-space-md">
          <div>
            <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider mb-0.5">
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              <span>Launch Squad Recruitment</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Post a Project or Squad Vacancy
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Broadcast your hackathon idea, startup MVP, or research capstone to verified builders.
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. OmniVoice — Spatial P2P Audio for Real-time IDEs"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
            />
          </div>

          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">
              Elevator Pitch & Scope
            </label>
            <textarea
              required
              rows={3}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="What are you building, what problem does it solve, and what is your milestone timeline?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Project Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all cursor-pointer"
              >
                <option value="hackathon">Hackathon Sprint</option>
                <option value="startup">Startup Seed</option>
                <option value="research">Academic Research</option>
                <option value="capstone">Course Capstone</option>
              </select>
            </div>
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Event / Sprint Target
              </label>
              <input
                type="text"
                value={categoryBadge}
                onChange={(e) => setCategoryBadge(e.target.value)}
                placeholder="e.g. HackNova 2026 or TreeHacks"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              required
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="e.g. React 19, FastAPI, Pinecone, WebSockets"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Roles Needed (comma separated)
              </label>
              <input
                type="text"
                required
                value={rolesInput}
                onChange={(e) => setRolesInput(e.target.value)}
                placeholder="e.g. frontend, backend, uiux"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">
                Total Squad Size
              </label>
              <input
                type="number"
                min={2}
                max={6}
                value={totalCapacity}
                onChange={(e) => setTotalCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">
              Primary Campus Affiliation
            </label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all cursor-pointer"
            >
              <option value="stanford">Stanford University</option>
              <option value="cmu">Carnegie Mellon (CMU)</option>
              <option value="mit">MIT</option>
              <option value="berkeley">UC Berkeley</option>
              <option value="iit">IIT Delhi / Bombay</option>
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-surface-container-high/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">publish</span>
              <span>Publish Squad Vacancy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
