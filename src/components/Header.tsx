import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, ChevronDown, User, LogOut, Shield, GraduationCap, Building2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { student, activeProgram, logout } = useStudent();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (pathname: string): { title: string; category: string } => {
    switch (pathname) {
      case '/':
        return { title: 'LMS Dashboard', category: 'Learning Management System' };
      case '/eportal':
        return { title: 'Eportal Dashboard', category: 'Student E-Services' };
      case '/choose-program':
        return { title: 'Choose Program', category: 'Academic Enrollment' };
      case '/virtual-classroom':
        return { title: 'Virtual Class Room', category: 'Online Lectures & Materials' };
      case '/attendance':
        return { title: 'Course Attendance Record', category: 'Attendance Monitoring' };
      case '/course-selection':
        return { title: 'Course Selection / Examination Form', category: 'Examinations Branch' };
      case '/results':
        return { title: 'Exams Result Notice Board', category: 'Official Gazette' };
      case '/admission-payments':
        return { title: 'Admission & Payment Details', category: 'Finance & Accounts' };
      case '/scholarship':
        return { title: 'Scholarship Announcements', category: 'Financial Assistance' };
      case '/downloads':
        return { title: 'Official Forms & Proformas', category: 'Student Downloads' };
      case '/course-evaluation':
        return { title: 'Course & Teacher Evaluation (QEC)', category: 'Quality Enhancement' };
      case '/hec-survey':
        return { title: 'HEC Student Satisfaction Survey', category: 'Higher Education Commission' };
      case '/points-locations':
        return { title: 'Points Pick/Drop Locations', category: 'Transport Section' };
      case '/koha-library':
        return { title: 'Central Library Koha OPAC', category: 'Allama I.I. Kazi Library' };
      case '/hostel':
        return { title: 'Hostel Forms & Fee Challans', category: 'Hostel Administration' };
      case '/covid-vaccine':
        return { title: 'COVID Vaccine Immunization Record', category: 'Health & Medical' };
      case '/update-profile-image':
        return { title: 'Update Profile Image', category: 'Identity Management' };
      default:
        return { title: 'Student Portal', category: 'University of Sindh' };
    }
  };

  const { title, category } = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left zone: Toggle button & Contextual Title / Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>University of Sindh</span>
            <span aria-hidden="true">/</span>
            <span className="truncate">{category}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
            {title}
          </h2>
        </div>
      </div>

      {/* Right zone: Program badge & Student profile menu */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Active Program indicator (hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900">
          <GraduationCap className="w-3.5 h-3.5 text-blue-700 shrink-0" />
          <span className="font-semibold">{student.rollNo}</span>
          <span className="text-blue-300">·</span>
          <span className="text-slate-600 truncate max-w-[140px] md:max-w-xs">{activeProgram.name}</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-lg hover:bg-slate-100 transition-colors text-left cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-300 shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight uppercase truncate max-w-[150px]">
                {student.name.split(' ')[0]} {student.name.split(' ')[1]}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">{student.rollNo}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
                <p className="font-semibold text-slate-900 uppercase text-[11px] truncate">
                  {student.name}
                </p>
                <p className="text-[10px] font-mono text-blue-900 mt-0.5">Roll: {student.rollNo}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{student.email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/choose-program"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>Choose / Change Program</span>
                </Link>
                <Link
                  to="/update-profile-image"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Update Profile Image</span>
                </Link>
                <Link
                  to="/covid-vaccine"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>COVID Immunization</span>
                </Link>
                <Link
                  to="/admission-payments"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Fee Challans</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
