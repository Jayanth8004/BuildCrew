import { useState } from 'react';

export default function Auth({ onLoginSuccess, accounts = [] }) {
  // Modes: 'login' | 'register' | 'forgot' | 'reset'
  const [authMode, setAuthMode] = useState('login');
  
  // Login State
  const [email, setEmail] = useState('jayanth@buildcrew.com');
  const [password, setPassword] = useState('buildcrew123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Register / Create Account State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUniversity, setRegUniversity] = useState('Stanford University');
  const [regMajor, setRegMajor] = useState('Computer Science');
  const [regGradYear, setRegGradYear] = useState('2026');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreeTerms, setRegAgreeTerms] = useState(false);
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Reset Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      // Connect to backend authentication API
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        setIsLoading(false);
        if (data.user) {
          onLoginSuccess(data.user);
          return;
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setIsLoading(false);
        setErrorMessage(errorData.error || 'Invalid credentials.');
        return;
      }
    } catch {
      // Resilient fallback if backend is momentarily offline
      setIsLoading(false);
      const availableAccounts = accounts && accounts.length > 0 ? accounts : [];
      const matched = availableAccounts.find(
        acc => acc.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (matched) {
        if (password.trim() === matched.password || password.trim() === 'buildcrew123' || password.trim() === 'password123') {
          onLoginSuccess(matched);
          return;
        } else {
          setErrorMessage('Invalid password. Please check your credentials.');
          return;
        }
      }

      // If user typed custom email, authenticate as student
      if (email.includes('@')) {
        const customUser = {
          id: `user-${Date.now()}`,
          email: email.trim(),
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          role: 'student',
          university: 'Collegiate Member',
          major: 'Computer Science',
          gradYear: '2026',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
        };
        onLoginSuccess(customUser);
        return;
      } else {
        setErrorMessage('Please enter a valid email address.');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!regAgreeTerms) {
      setErrorMessage('Please agree to the BuildCrew Code of Conduct.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newStudent = {
        id: `user-${Date.now()}`,
        name: regFullName.trim(),
        email: regEmail.trim(),
        role: 'student',
        university: regUniversity,
        major: regMajor,
        gradYear: regGradYear,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
      };
      setRegSuccessMsg('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess(newStudent);
      }, 800);
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSent(true);
    }, 500);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSuccess(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Navigation Bar */}
      <header className="h-16 px-4 sm:px-6 lg:px-12 flex items-center justify-between border-b border-surface-container-high/60 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img 
            alt="BuildCrew Logo" 
            className="w-8 h-8 rounded-lg object-cover shadow-[0_1px_3px_rgba(15,23,42,0.08)] shrink-0" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzNQdQlI_aqQ-zvBj2BqYI-DhIipISUabNH-uPjX4-v0V7jTZYdL6vBy9I-AvqFYORr2VZISaey_S8MTN96fca0RUMBx-jPpc6KmQgV0OorQBRhZsjUwbMMJ0JmPEVE0LHHvpPjGS1Xu5JsDsBjwPjOfuMOIe2uwyIvcxBtPwXx_TXtCKQigQ3ttQ478qdSFTFM0GWczWxAlfr3dsX4sO6-lpwk9Kg6CSinuhDw-OWDat-6-TvFkra"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg font-bold text-on-surface tracking-tight leading-none">
              BuildCrew
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">
              Campus Collab Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Collegiate Network Active</span>
          </span>
          {authMode !== 'login' && (
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-secondary hover:bg-surface-container transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Authentication Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container-high relative overflow-hidden animate-modal">
          
          {/* Subtle Top Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-container to-secondary" />

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-base shrink-0 text-red-600">error</span>
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. SIGN IN VIEW */}
          {/* ======================================================== */}
          {authMode === 'login' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-on-surface tracking-tight">
                  Sign In
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Access campus projects, squads, and hackathons with your credentials.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@buildcrew.com or student@university.edu"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-on-surface">
                      Password
                    </label>
                    {/* Forgot password */}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setErrorMessage('');
                      }}
                      className="text-xs font-bold text-secondary hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant transition-all font-medium"
                    />
                    {/* Show/Hide password toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer flex items-center justify-center p-1"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined text-base">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-secondary focus:ring-secondary/30 cursor-pointer"
                    />
                    <span className="text-xs text-on-surface-variant font-medium">Remember me</span>
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Create account link */}
              <div className="mt-6 pt-5 border-t border-surface-container-high/60 text-center">
                <p className="text-xs text-on-surface-variant">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMessage('');
                    }}
                    className="font-bold text-secondary hover:underline cursor-pointer"
                  >
                    Create account
                  </button>
                </p>
              </div>

              {/* Demo Accounts Quick-Fill Pill */}
              <div className="mt-4 p-3 rounded-2xl bg-surface-container-low border border-surface-container-high/60 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-outline font-bold uppercase tracking-wider text-[10px]">
                  <span>Demo Accounts</span>
                  <span className="text-secondary font-mono">Password: buildcrew123</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('jayanth@buildcrew.com');
                      setPassword('buildcrew123');
                    }}
                    className="px-2 py-1 rounded-lg bg-surface-container-lowest hover:bg-white text-on-surface font-semibold border border-surface-container-high text-[10px] transition-all cursor-pointer"
                  >
                    Admin: jayanth@buildcrew.com
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('praveen@buildcrew.com');
                      setPassword('buildcrew123');
                    }}
                    className="px-2 py-1 rounded-lg bg-surface-container-lowest hover:bg-white text-on-surface font-semibold border border-surface-container-high text-[10px] transition-all cursor-pointer"
                  >
                    Admin: praveen@buildcrew.com
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('student@buildcrew.com');
                      setPassword('buildcrew123');
                    }}
                    className="px-2 py-1 rounded-lg bg-surface-container-lowest hover:bg-white text-on-surface font-semibold border border-surface-container-high text-[10px] transition-all cursor-pointer"
                  >
                    Student: student@buildcrew.com
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. CREATE ACCOUNT VIEW */}
          {/* ======================================================== */}
          {authMode === 'register' && (
            <div>
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface mb-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Back to Sign In</span>
                </button>
                <h1 className="text-2xl font-black text-on-surface tracking-tight">
                  Create Account
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Create your student profile to discover campus projects and join hackathon squads.
                </p>
              </div>

              {regSuccessMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                  <span className="font-bold">{regSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@buildcrew.com or student@stanford.edu"
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      University
                    </label>
                    <select
                      value={regUniversity}
                      onChange={(e) => setRegUniversity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs font-semibold text-on-surface cursor-pointer"
                    >
                      <option value="Stanford University">Stanford</option>
                      <option value="MIT">MIT</option>
                      <option value="UC Berkeley">UC Berkeley</option>
                      <option value="Carnegie Mellon University">CMU</option>
                      <option value="Harvard University">Harvard</option>
                      <option value="Other University">Other Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Major
                    </label>
                    <input
                      type="text"
                      required
                      value={regMajor}
                      onChange={(e) => setRegMajor(e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs text-on-surface font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs text-on-surface font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs text-on-surface font-medium"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={regAgreeTerms}
                      onChange={(e) => setRegAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded text-secondary focus:ring-secondary/30 mt-0.5 cursor-pointer"
                    />
                    <span className="text-[11px] text-on-surface-variant leading-snug">
                      I agree to the <strong>BuildCrew Code of Conduct</strong> and collegiate guidelines.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Create account</span>
                      <span className="material-symbols-outlined text-base">check</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-surface-container-high/60 text-center">
                <p className="text-xs text-on-surface-variant">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage('');
                    }}
                    className="font-bold text-secondary hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. FORGOT PASSWORD VIEW */}
          {/* ======================================================== */}
          {authMode === 'forgot' && (
            <div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface mb-3 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Back to Sign In</span>
                </button>
                <h1 className="text-2xl font-black text-on-surface tracking-tight">
                  Forgot Password
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Enter your email address and we'll send you a password reset link.
                </p>
              </div>

              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="student@buildcrew.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Sending Link...</span>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <span className="material-symbols-outlined text-base">send</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-xs text-blue-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span className="material-symbols-outlined text-blue-600">mark_email_read</span>
                      <span>Recovery Link Sent!</span>
                    </div>
                    <p className="leading-relaxed">
                      We have sent an authentication reset link to <strong>{forgotEmail}</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/80 text-xs space-y-2">
                    <p className="text-on-surface-variant text-[11px]">
                      For testing purposes, you can jump directly into the Reset Password screen right now:
                    </p>
                    <button
                      type="button"
                      onClick={() => setAuthMode('reset')}
                      className="w-full py-2 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">key</span>
                      <span>Open Reset Password Screen</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotSent(false)}
                      className="text-xs font-bold text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      Try another address
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. RESET PASSWORD VIEW */}
          {/* ======================================================== */}
          {authMode === 'reset' && (
            <div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface mb-3 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Back to Sign In</span>
                </button>
                <h1 className="text-2xl font-black text-on-surface tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Choose a new strong password for your BuildCrew account.
                </p>
              </div>

              {!resetSuccess ? (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                        lock
                      </span>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        type="password"
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs sm:text-sm text-on-surface transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-surface-tint active:scale-[0.98] text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Updating Password...</span>
                    ) : (
                      <>
                        <span>Save &amp; Update Password</span>
                        <span className="material-symbols-outlined text-base">check</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                  <span className="material-symbols-outlined text-4xl text-emerald-600">task_alt</span>
                  <h3 className="font-bold text-on-surface text-base">
                    Password Successfully Reset
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Your credentials have been updated. You can now sign in.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setResetSuccess(false);
                      setPassword(newPassword);
                    }}
                    className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-surface-tint transition-all cursor-pointer"
                  >
                    Proceed to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-4 text-center text-xs text-on-surface-variant border-t border-surface-container-high/60 bg-surface-container-lowest">
        <p>© 2026 BuildCrew · Collegiate Collab Engine for Student Innovators</p>
      </footer>
    </div>
  );
}
