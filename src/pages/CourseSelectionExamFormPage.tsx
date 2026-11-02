import React, { useState } from 'react';
import {
  FileCheck,
  Printer,
  CheckCircle2,
  Calendar,
  Building,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import { currentCourses } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const CourseSelectionExamFormPage: React.FC = () => {
  const { student, activeProgram } = useStudent();
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(true);

  const totalCreditHours = currentCourses.reduce((acc, c) => acc + c.creditHours, 0);

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Course Selection / Examination Form
              </h1>
              <p className="text-xs text-slate-500">
                Semester course registration, exam candidate verification, and admit card slip
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setShowSlipModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Examination Slip (Admit Card)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Status Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Examination Session</span>
            <span className="font-semibold text-slate-900 block mt-0.5">
              Semester-VIII Regular Annual 2026
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Form Clearance Status</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Approved by Director IICT
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Assigned Examination Centre</span>
            <span className="font-medium text-slate-900 block mt-0.5">
              Hall No. 01, Faculty of Natural Sciences
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Fee Verification</span>
            <span className="font-mono text-slate-800 font-medium block mt-0.5">
              Paid (Challan SU-CH-2026-98124)
            </span>
          </div>
        </div>
      </div>

      {/* Selected Courses Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xs text-slate-900 uppercase">
              Registered Courses for Semester-VIII
            </h2>
            <p className="text-[11px] text-slate-500">
              Department: {student.department} · {activeProgram.name}
            </p>
          </div>
          <div className="text-xs font-semibold text-blue-900 font-mono">
            Total Credits: {totalCreditHours}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-4">#</th>
                <th className="py-2.5 px-4">Course Code</th>
                <th className="py-2.5 px-4">Course Title</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-center">Theory Cr.</th>
                <th className="py-2.5 px-4 text-center">Lab Cr.</th>
                <th className="py-2.5 px-4 text-center">Total Cr.</th>
                <th className="py-2.5 px-4 text-right">Registration Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentCourses.map((c, idx) => (
                <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-950">{c.code}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{c.title}</td>
                  <td className="py-3 px-4 text-slate-600">{c.type}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-700">{c.theoryCredit}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-700">{c.labCredit}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">{c.creditHours}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                      Regular Enrolled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examination Code of Conduct Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
          <AlertCircle className="w-4 h-4 text-blue-900" />
          <span>Instructions for Examination Candidates</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Candidates must bring their original Student Identity Card and printed Examination Slip to every session.</li>
          <li>Mobile phones, smartwatches, and programmable devices are strictly prohibited inside the exam hall.</li>
          <li>No candidate will be admitted to the examination room after 30 minutes from the commencement time.</li>
        </ul>
      </div>

      {/* Examination Slip (Admit Card) Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl w-full max-w-3xl overflow-hidden">
            {/* Modal Controls (No Print) */}
            <div className="no-print p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Official Examination Slip (Admit Card) Preview
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintSlip}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Slip
                </button>
                <button
                  onClick={() => setShowSlipModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Admit Card Body */}
            <div className="p-6 sm:p-8 border-2 border-slate-800 m-4 rounded bg-white">
              <div className="text-center pb-4 border-b-2 border-slate-800">
                <div className="w-14 h-14 mx-auto mb-2">
                  <img
                    src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                    alt="University of Sindh Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
                  University of Sindh, Jamshoro
                </h2>
                <p className="text-xs font-semibold text-slate-700 uppercase">
                  Office of the Controller of Examinations
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-slate-100 font-bold text-xs uppercase border border-slate-400">
                  Semester Final Examination Slip (Admit Card) · 2026
                </div>
              </div>

              {/* Student details in admit card */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 pb-4 border-b border-slate-300 text-xs">
                <div className="sm:col-span-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Full Name:</span>
                    <span className="font-bold text-slate-900 uppercase">{student.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Father's Name:</span>
                    <span className="font-semibold text-slate-800 uppercase">{student.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll Number:</span>
                    <span className="font-mono font-bold text-blue-950 text-sm">{student.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrollment Number:</span>
                    <span className="font-mono text-slate-900">{student.enrollmentNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Discipline & Batch:</span>
                    <span className="font-medium text-slate-800">BS (IT) 4-Year · 2K21 Batch (Morning)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Exam Centre:</span>
                    <span className="font-semibold text-slate-900">Hall-01, Faculty of Natural Sciences</span>
                  </div>
                </div>

                <div className="sm:col-span-1 flex flex-col items-center justify-center p-2 border border-slate-300 rounded bg-slate-50">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-24 h-28 object-cover border border-slate-300"
                  />
                  <div className="text-[9px] text-slate-500 mt-1 uppercase font-mono">Attested Photo</div>
                </div>
              </div>

              {/* Examination papers schedule */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase">
                  Approved Examination Papers
                </h4>
                <table className="w-full text-[11px] border border-slate-300">
                  <thead className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-700">
                    <tr>
                      <th className="p-1.5 text-left border-r border-slate-300">Code</th>
                      <th className="p-1.5 text-left border-r border-slate-300">Subject Paper</th>
                      <th className="p-1.5 text-center border-r border-slate-300">Credit</th>
                      <th className="p-1.5 text-center">Invigilator Sig.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentCourses.map((c) => (
                      <tr key={c.code}>
                        <td className="p-1.5 font-mono font-bold border-r border-slate-300">{c.code}</td>
                        <td className="p-1.5 font-medium border-r border-slate-300">{c.title}</td>
                        <td className="p-1.5 text-center font-mono border-r border-slate-300">{c.creditHours}</td>
                        <td className="p-1.5 text-center text-slate-300 font-mono">___________</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature section */}
              <div className="mt-8 pt-4 border-t border-slate-400 grid grid-cols-2 gap-8 text-[11px] text-center">
                <div>
                  <div className="font-medium text-slate-800">_____________________________</div>
                  <div className="font-semibold text-slate-900 mt-1">Candidate's Signature</div>
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
