export default function AccessDenied({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6 space-y-4 max-w-lg mx-auto animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shadow-xs">
        <span className="material-symbols-outlined text-3xl">lock</span>
      </div>
      
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
          <span>Error 403 · Forbidden</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
          Access Denied
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          The Hackathon Management Console is strictly reserved for BuildCrew founders and system administrators. Your account does not have authorization to access administrative controls.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
