import React, { useState } from 'react';
import { LogIn, Lock, User, AlertCircle, Info, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { officialExamNotices } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { login } = useStudent();
  const [identifier, setIdentifier] = useState('2K21/IT/104');
  const [password, setPassword] = useState('••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your Roll Number or CNIC');
      return;
    }
    const success = login(identifier, password);
    if (!success) {
      setError('Invalid credentials. Please verify your Roll Number.');
    }
  };

  const fillDemoCredentials = () => {
    setIdentifier('2K21/IT/104');
    setPassword('student123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top University Banner */}
      <header className="bg-[#0c2340] text-white border-b border-slate-800 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-white p-0.5 shrink-0 overflow-hidden shadow-xs">
              <img
                src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                alt="University of Sindh Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase">
                University of Sindh, Jamshoro
              </h1>
              <p className="text-[11px] text-blue-200">
                Information & Communication Technology Centre (ITSC)
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Student LMS & ePortal Portal</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Official Notices & ITSC Helpdesk */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Campus photo banner */}
              <div className="relative rounded-md overflow-hidden h-40 sm:h-48 mb-5 border border-slate-200">
                <img
                  src="/src/assets/images/campus_landmark_view_1793558968083.jpg"
                  alt="Allama I.I. Kazi Campus, University of Sindh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-[11px] text-blue-200 font-medium">Allama I.I. Kazi Campus</p>
                    <h2 className="text-base font-bold">University of Sindh, Jamshoro</h2>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-900" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Important University Notices & Announcements
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Session 2026</span>
              </div>

              <div className="space-y-3">
                {officialExamNotices.slice(0, 3).map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-mono text-[11px] text-blue-900 font-semibold">{notice.circularNo}</span>
                      <span>{notice.date}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 leading-snug">
                      {notice.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">{notice.department}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpdesk Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">ITSC Helpline</div>
                  <div className="font-medium">+92-22-9213181</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">IT Support Email</div>
                  <div className="font-medium">itsc@usindh.edu.pk</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Office Location</div>
                  <div className="font-medium">ITSC Building, Jamshoro</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Student Login Form */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-3">
                <img
                  src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                  alt="University of Sindh Crest"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Student Portal Login</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your official University credentials to access LMS & ePortal
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Roll Number / CNIC or Passport
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 2K21/IT/104 or 41303-XXXXXXX-X"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:outline-hidden focus:ring-1 focus:ring-blue-900 focus:border-blue-900 font-mono"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Format: Batch/Discipline/Roll (e.g. 2K21/IT/104)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter portal password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:outline-hidden focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-900" />
                  <span>Remember my login</span>
                </label>
                <a
                  href="#itsc-helpdesk"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('To reset your password, contact ITSC Helpdesk with your University ID card or visit the ITSC Building, Jamshoro.');
                  }}
                  className="text-blue-900 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0c2340] hover:bg-[#16325c] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In to Student Portal</span>
              </button>
            </form>

            {/* Quick Demo Autofill Box */}
            <div className="mt-5 p-3 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900">Prototype Demo Account:</span>
                  <div>Roll: 2K21/IT/104 (BS Information Technology)</div>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="px-2.5 py-1 text-xs font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 rounded transition-colors cursor-pointer shrink-0"
                >
                  Autofill
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-500">
                Authorized for enrolled students of University of Sindh only.
                <br />
                Monitored by Information & Communication Technology Centre.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500">
        © University of Sindh, Jamshoro. All Rights Reserved. · Designed & Maintained by ITSC
      </footer>
    </div>
  );
};
