import React from 'react';
import { Link } from 'react-router-dom';
import {
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
  ArrowRight,
  UserCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { officialExamNotices } from '../data/mockData';

export const LMSDashboardPage: React.FC = () => {
  const { student, activeProgram } = useStudent();

  const lmsModules = [
    {
      title: 'Virtual Class Room',
      description: 'Access lecture slide notes, lab manuals, assignments and online classroom sessions.',
      icon: Laptop,
      to: '/virtual-classroom',
    },
    {
      title: 'Course Attendance',
      description: 'Review course-wise lecture attendance records, class schedules, and eligibility.',
      icon: CalendarCheck2,
      to: '/attendance',
    },
    {
      title: 'Course Selection / Exam Form',
      description: 'Register semester courses, submit regular/improver examination forms, and view slips.',
      icon: FileCheck,
      to: '/course-selection',
    },
    {
      title: 'Exams Result Notice Board',
      description: 'View semester-wise result gazettes, official marks certificates, and GPA records.',
      icon: Award,
      to: '/results',
    },
    {
      title: 'Admission & Payment Details',
      description: 'View merit list status, enrollment details, and generate printable HBL fee challans.',
      icon: CreditCard,
      to: '/admission-payments',
    },
    {
      title: 'Scholarship Announcements',
      description: 'Apply for Sindh HEC Indigenous, Ehsaas, and institutional merit scholarships.',
      icon: Gift,
      to: '/scholarship',
    },
    {
      title: 'University Downloads',
      description: 'Download official university forms, degree applications, and migration proformas.',
      icon: DownloadCloud,
      to: '/downloads',
    },
    {
      title: 'Course Evaluation (QEC)',
      description: 'Complete mandatory Quality Enhancement Cell teacher and course evaluation forms.',
      icon: ClipboardCheck,
      to: '/course-evaluation',
    },
    {
      title: 'HEC Survey Form',
      description: 'Submit the Higher Education Commission institutional and student feedback surveys.',
      icon: FileSpreadsheet,
      to: '/hec-survey',
    },
    {
      title: 'Points Pick/Drop Locations',
      description: 'Explore university bus points, route stoppages across Hyderabad, and morning timings.',
      icon: Bus,
      to: '/points-locations',
    },
    {
      title: 'Central Library (Koha OPAC)',
      description: 'Search Allama I.I. Kazi library catalog, view issued textbooks and check due dates.',
      icon: BookOpen,
      to: '/koha-library',
    },
    {
      title: 'Hostel Forms & Challans',
      description: 'Check room and bed allotment details, provost contacts, and generate hostel challans.',
      icon: Building,
      to: '/hostel',
    },
    {
      title: 'COVID Vaccine Details',
      description: 'NADRA immunization verification certificate record and vaccination doses status.',
      icon: ShieldCheck,
      to: '/covid-vaccine',
    },
    {
      title: 'Update Profile Image',
      description: 'Upload your official student ID photograph conforming to university guidelines.',
      icon: Camera,
      to: '/update-profile-image',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-900 tracking-wide uppercase">
              Student Learning Management System
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Welcome, {student.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Official academic portal for students of University of Sindh, Jamshoro.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center">
            <Link
              to="/choose-program"
              className="px-3.5 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-blue-800" />
              <span>Choose Your Program</span>
            </Link>
            <Link
              to="/eportal"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors flex items-center gap-1.5"
            >
              <span>Eportal Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Student Profile Information Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-900" />
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              Student Profile Information
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Enrollment: {student.enrollmentNo}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Student Photo */}
          <div className="md:col-span-3 flex flex-col items-center text-center p-3 bg-slate-50 rounded border border-slate-200">
            <div className="w-32 h-36 rounded border-2 border-slate-300 overflow-hidden bg-slate-200 mb-3 shadow-xs">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-bold text-slate-900 text-xs uppercase leading-tight">
              {student.name}
            </div>
            <div className="text-blue-950 font-mono font-semibold text-xs mt-0.5">
              Roll No: {student.rollNo}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              CNIC: {student.cnic}
            </div>
            <Link
              to="/update-profile-image"
              className="mt-3 text-[11px] text-blue-800 hover:underline flex items-center gap-1"
            >
              <Camera className="w-3 h-3" />
              <span>Update Photo</span>
            </Link>
          </div>

          {/* Academic & Department Details */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3.5 gap-x-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Degree Program</span>
              <span className="font-semibold text-slate-900 leading-snug">
                {student.degreeProgram}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Department / Institute</span>
              <span className="font-semibold text-slate-900 leading-snug">
                {student.department}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Roll Number</span>
              <span className="font-bold text-blue-950 font-mono">
                {student.rollNo}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Father's Name</span>
              <span className="font-medium text-slate-800 uppercase">
                {student.fatherName}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Faculty</span>
              <span className="font-medium text-slate-800">
                {student.faculty}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Campus</span>
              <span className="font-medium text-slate-800">
                {student.campus}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Academic Session</span>
              <span className="font-medium text-slate-800 font-mono">
                {student.academicSession}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Shift & Semester</span>
              <span className="font-medium text-slate-800">
                {student.shift} ({student.semester})
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Currently Active Program</span>
              <span className="font-semibold text-blue-900">
                {activeProgram.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main LMS Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
            Main LMS Modules & Student Services
          </h2>
          <span className="text-xs text-slate-500">
            Select a module to view records and perform operations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {lmsModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                to={mod.to}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-900/60 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded bg-blue-50 group-hover:bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-950 transition-colors">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-900 group-hover:text-blue-950">
                  <span>Open Section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Official Circulars & Notices */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-900" />
            <h2 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
              Official University Notifications & Circulars
            </h2>
          </div>
          <span className="text-xs text-slate-500">Office of Controller & Registrar</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-3">Circular No.</th>
                <th className="py-2.5 px-3">Subject / Title</th>
                <th className="py-2.5 px-3">Issuing Authority</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {officialExamNotices.map((notice) => (
                <tr key={notice.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-blue-950 font-medium">
                    {notice.circularNo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {notice.title}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {notice.department}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                    {notice.date}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      to="/results"
                      className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-950 font-semibold"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
