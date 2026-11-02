import React, { useState } from 'react';
import {
  Award,
  Printer,
  CheckCircle2,
  Calendar,
  Building,
  DownloadCloud,
  X,
  FileText,
} from 'lucide-react';
import { semesterResults, officialExamNotices } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const ExamsResultNoticeBoardPage: React.FC = () => {
  const { student } = useStudent();
  const [selectedSemesterIdx, setSelectedSemesterIdx] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const currentResult = semesterResults[selectedSemesterIdx] || semesterResults[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Exams Result Notice Board
              </h1>
              <p className="text-xs text-slate-500">
                Official semester result gazettes, marks breakdowns and provisional transcript verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Provisional Marks Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Semester Switcher Tabs */}
      <div className="flex gap-2">
        {semesterResults.map((res, idx) => (
          <button
            key={res.semesterName}
            onClick={() => setSelectedSemesterIdx(idx)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              idx === selectedSemesterIdx
                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {res.semesterName}
          </button>
        ))}
      </div>

      {/* Performance Summary Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Examination Session</span>
            <span className="font-semibold text-slate-900 block mt-0.5">
              {currentResult.examSession}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Semester GPA</span>
            <span className="font-mono font-bold text-blue-950 text-sm block mt-0.5 tabular-nums">
              {currentResult.gpa.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Cumulative CGPA</span>
            <span className="font-mono font-bold text-emerald-700 text-sm block mt-0.5 tabular-nums">
              {currentResult.cgpa.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Official Status</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
              {currentResult.status} (Passed)
            </span>
          </div>
        </div>
      </div>

      {/* Course-by-Course Marks Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-xs text-slate-900 uppercase">
            Subject-Wise Marks & Grade Points
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Total Score: {currentResult.obtainedMarks} / {currentResult.totalMarks} ({currentResult.percentage}%)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-4">Code</th>
                <th className="py-2.5 px-4">Subject Title</th>
                <th className="py-2.5 px-4 text-center">Credit Hours</th>
                <th className="py-2.5 px-4 text-center">Marks Obtained</th>
                <th className="py-2.5 px-4 text-center">Max Marks</th>
                <th className="py-2.5 px-4 text-center">Letter Grade</th>
                <th className="py-2.5 px-4 text-center">Grade Point</th>
                <th className="py-2.5 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentResult.courses.map((course) => (
                <tr key={course.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-950">
                    {course.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {course.title}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-700">
                    {course.creditHours}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-900 tabular-nums">
                    {course.marksObtained}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-500 tabular-nums">
                    {course.totalMarks}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-blue-900">
                    {course.grade}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-800 tabular-nums">
                    {course.gradePoint.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-700 font-medium">
                    {course.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gazette Circulars from Examinations Branch */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-3">
          Controller of Examinations Gazette Notifications
        </h3>
        <div className="space-y-2">
          {officialExamNotices.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50"
            >
              <div>
                <span className="text-[10px] font-mono font-semibold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded">
                  {n.circularNo}
                </span>
                <p className="text-xs font-semibold text-slate-900 mt-1">{n.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{n.department} · {n.date}</p>
              </div>
              <button
                onClick={() => alert(`Downloading gazette copy for ${n.circularNo}...`)}
                className="px-2.5 py-1 text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1 shrink-0 self-start sm:self-center cursor-pointer"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>PDF Gazette</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Marks Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="no-print p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Provisional Marks Certificate (Verified)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Certificate
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Certificate Page */}
            <div className="p-8 border-4 border-double border-slate-900 m-4 rounded bg-white">
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <div className="w-14 h-14 mx-auto mb-2">
                  <img
                    src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                    alt="University of Sindh Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                  University of Sindh, Jamshoro
                </h2>
                <p className="text-xs font-semibold text-slate-700 uppercase">
                  Examinations Department · Semester Cell
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-slate-100 font-bold text-xs uppercase border border-slate-400">
                  Provisional Detailed Marks Certificate (DMC)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 mt-4 pb-4 border-b border-slate-300 text-xs">
                <div>Candidate Name: <span className="font-bold uppercase">{student.name}</span></div>
                <div>Father's Name: <span className="font-semibold uppercase">{student.fatherName}</span></div>
                <div>Roll Number: <span className="font-mono font-bold">{student.rollNo}</span></div>
                <div>Enrolment No: <span className="font-mono">{student.enrollmentNo}</span></div>
                <div>Degree Program: <span className="font-medium">{student.degreeProgram}</span></div>
                <div>Semester: <span className="font-medium">{currentResult.semesterName}</span></div>
              </div>

              <div className="mt-4">
                <table className="w-full text-xs border border-slate-400">
                  <thead className="bg-slate-100 border-b border-slate-400 font-bold text-slate-800">
                    <tr>
                      <th className="p-2 text-left border-r border-slate-400">Course Code & Title</th>
                      <th className="p-2 text-center border-r border-slate-400">Credit</th>
                      <th className="p-2 text-center border-r border-slate-400">Max</th>
                      <th className="p-2 text-center border-r border-slate-400">Obtained</th>
                      <th className="p-2 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {currentResult.courses.map((c) => (
                      <tr key={c.code}>
                        <td className="p-2 font-medium border-r border-slate-400">{c.code} - {c.title}</td>
                        <td className="p-2 text-center font-mono border-r border-slate-400">{c.creditHours}</td>
                        <td className="p-2 text-center font-mono border-r border-slate-400">{c.totalMarks}</td>
                        <td className="p-2 text-center font-mono font-bold border-r border-slate-400">{c.marksObtained}</td>
                        <td className="p-2 text-center font-mono font-bold">{c.grade}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-900 font-bold bg-slate-50">
                      <td className="p-2">Grand Total / Cumulative GPA:</td>
                      <td className="p-2 text-center font-mono">16</td>
                      <td className="p-2 text-center font-mono">{currentResult.totalMarks}</td>
                      <td className="p-2 text-center font-mono">{currentResult.obtainedMarks}</td>
                      <td className="p-2 text-center font-mono text-blue-950">GPA: {currentResult.gpa.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-10 pt-4 border-t border-slate-400 grid grid-cols-2 gap-8 text-xs text-center">
                <div>
                  <div className="font-medium text-slate-800">_____________________________</div>
                  <div className="font-semibold text-slate-900 mt-1">Prepared by / Incharge Tabulator</div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">_____________________________</div>
                  <div className="font-semibold text-slate-900 mt-1">Controller of Examinations</div>
                  <div className="text-[10px] text-slate-500">University of Sindh, Jamshoro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
