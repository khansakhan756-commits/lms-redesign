import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  GraduationCap,
  Laptop,
  CalendarCheck2,
  FileCheck,
  Award,
  CreditCard,
  Gift,
  DownloadCloud,
  ClipboardCheck,
  FileSpreadsheet,
  Bus,
  BookOpen,
  Building,
  ShieldCheck,
  Camera,
  LogOut,
  X,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, student } = useStudent();

  const navItems = [
    { to: '/', label: 'LMS Dashboard', icon: LayoutDashboard },
    { to: '/eportal', label: 'Eportal Dashboard', icon: Globe },
    { to: '/choose-program', label: 'Choose Program', icon: GraduationCap },
    { to: '/virtual-classroom', label: 'Virtual Class Room', icon: Laptop },
    { to: '/attendance', label: 'Attendance', icon: CalendarCheck2 },
    { to: '/course-selection', label: 'Course Selection / Examination Form', icon: FileCheck },
    { to: '/results', label: 'Exams Result Notice Board', icon: Award },
    { to: '/admission-payments', label: 'Admission', icon: CreditCard },
    { to: '/scholarship', label: 'Scholarship', icon: Gift },
    { to: '/downloads', label: 'Downloads', icon: DownloadCloud },
    { to: '/course-evaluation', label: 'Course Evaluation', icon: ClipboardCheck },
    { to: '/hec-survey', label: 'HEC Survey Form', icon: FileSpreadsheet },
    { to: '/points-locations', label: 'Points Pick/Drop Locations', icon: Bus },
    { to: '/koha-library', label: 'Koha Library', icon: BookOpen },
    { to: '/hostel', label: 'Hostel', icon: Building },
    { to: '/covid-vaccine', label: 'COVID Vaccine Details', icon: ShieldCheck },
    { to: '/update-profile-image', label: 'Update Profile Image', icon: Camera },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0c2340] text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Crest Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded bg-white p-0.5 shrink-0 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                alt="University of Sindh Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs font-bold tracking-tight text-white uppercase leading-tight">
                University of Sindh
              </h1>
              <p className="text-[11px] text-blue-200/80 font-medium">Jamshoro, Sindh</p>
              <div className="text-[10px] text-slate-400 font-mono">ITSC Student LMS</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick User summary in sidebar */}
        <div className="px-4 py-2.5 bg-[#091a30] border-b border-slate-800 flex items-center gap-2.5 text-xs">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-8 h-8 rounded-full object-cover border border-blue-400/40"
          />
          <div className="min-w-0 flex-1">
            <div className="text-white font-medium text-[11px] truncate uppercase">{student.name}</div>
            <div className="text-slate-400 font-mono text-[10px]">{student.rollNo}</div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin">
          <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/30 text-white border-l-2 border-blue-400 pl-[10px]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Logout CTA at bottom */}
        <div className="p-3 border-t border-slate-800 bg-[#091a30]">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-300 hover:text-red-100 hover:bg-red-950/40 border border-red-900/40 rounded transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
