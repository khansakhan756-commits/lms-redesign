import React, { useState } from 'react';
import {
  CalendarCheck2,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Calendar,
  X,
  Info,
} from 'lucide-react';
import { currentCourses, courseAttendanceLog } from '../data/mockData';
import { AttendanceDetail } from '../types';

export const AttendancePage: React.FC = () => {
  const [selectedCourseForLog, setSelectedCourseForLog] = useState<string | null>(null);

  const selectedLog: AttendanceDetail[] = selectedCourseForLog
    ? courseAttendanceLog[selectedCourseForLog] || []
    : [];

  const selectedCourseObj = currentCourses.find((c) => c.code === selectedCourseForLog);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Course Attendance Record</h1>
              <p className="text-xs text-slate-500">
                Official attendance register maintained by faculty instructors for Semester-VIII
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            Regulation: <span className="font-semibold text-slate-900">75% Minimum Attendance</span> Required for Examination Slip
          </div>
        </div>
      </div>

      {/* Attendance Summary Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
            Semester VIII Course-Wise Attendance Sheet
          </h2>
          <span className="text-xs text-slate-500 font-mono">Roll: 2K21/IT/104</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-3">Course Code</th>
                <th className="py-2.5 px-3">Course Title</th>
                <th className="py-2.5 px-3">Instructor In-Charge</th>
                <th className="py-2.5 px-3 text-center">Credit Hrs</th>
                <th className="py-2.5 px-3 text-center">Conducted</th>
                <th className="py-2.5 px-3 text-center">Attended</th>
                <th className="py-2.5 px-3 text-center">Absent</th>
                <th className="py-2.5 px-3 text-center">Percentage</th>
                <th className="py-2.5 px-3 text-center">Exam Eligibility</th>
                <th className="py-2.5 px-3 text-right">Lecture Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentCourses.map((c) => {
                const absentClasses = c.totalClasses - c.attendedClasses;
                const isEligible = c.attendancePercentage >= 75;
                return (
                  <tr key={c.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-blue-950">
                      {c.code}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {c.title}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {c.instructor}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700">
                      {c.creditHours}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700 tabular-nums">
                      {c.totalClasses}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold text-emerald-700 tabular-nums">
                      {c.attendedClasses}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-red-600 tabular-nums">
                      {absentClasses}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 tabular-nums">
                      {c.attendancePercentage}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      {isEligible ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          Short Attendance
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedCourseForLog(c.code)}
                        className="px-2.5 py-1 text-xs font-medium text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors cursor-pointer"
                      >
                        View Dates
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* University Attendance Statutory Rule */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
          <Info className="w-4 h-4 text-blue-900" />
          <span>Statutory Rule: University of Sindh Semester Regulations (Clause 14.2)</span>
        </div>
        <p className="leading-relaxed">
          Students falling below 75% aggregate attendance in any theory or practical course are debarred from appearing in the Semester Final Examinations. Medical certificates or official sports representation leaves must be verified by the Chief Medical Officer, Sindh University Health Centre, and submitted to the Institute Director within 7 days of absence.
        </p>
      </div>

      {/* Date-by-date Lecture Attendance Modal */}
      {selectedCourseForLog && selectedCourseObj && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {selectedCourseObj.code} – Daily Attendance Register
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCourseObj.title} · Instructor: {selectedCourseObj.instructor}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourseForLog(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {selectedLog.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No individual daily logs entered for this course yet. Total aggregate lectures attended: {selectedCourseObj.attendedClasses} / {selectedCourseObj.totalClasses}.
                </div>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Day & Time Slot</th>
                      <th className="py-2 px-3">Curriculum Topic Covered</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedLog.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-800">{log.date}</td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {log.day} ({log.timeSlot})
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-medium">
                          {log.topic}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                              log.status === 'Present'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedCourseForLog(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
