import React, { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('Jayanth V.');
  const [campus, setCampus] = useState('Stanford University');
  const [year, setYear] = useState('BS Computer Science \'26');
  const [bio, setBio] = useState('Fullstack & Systems enthusiast. Passionate about real-time distributed canvas tools, WebSockets, and PyTorch multi-modal pipelines.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-space-lg max-w-4xl">
      <div className="flex flex-col">
        <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-base">verified</span>
          <span>Verified Student Identity</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
          Builder Profile &amp; Badges
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Manage your verified campus credentials, technical skills, and hackathon circuit presence.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg space-y-space-lg">
        {/* User Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md pb-space-md border-b border-surface-container-low">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG"
            alt="Jayanth"
            className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-secondary-fixed"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                Verified Stanford Hacker
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {campus} · {year}
            </p>
            <div className="flex items-center gap-3 pt-1 text-label-sm text-secondary font-semibold">
              <span>94% Match Rating</span>
              <span>•</span>
              <span>4 Hackathons Completed</span>
              <span>•</span>
              <span>$35k Prizes Contributed</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-space-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>
            <div>
              <label className="block font-title-sm text-title-sm text-on-surface mb-1">Campus Affiliation</label>
              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">Academic Program & Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all"
            />
          </div>

          <div>
            <label className="block font-title-sm text-title-sm text-on-surface mb-1">Builder Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saved ? (
              <span className="text-secondary font-semibold text-title-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Profile changes saved!
              </span>
            ) : <span></span>}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
