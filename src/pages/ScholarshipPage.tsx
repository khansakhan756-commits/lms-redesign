import React, { useState } from 'react';
import {
  Gift,
  Calendar,
  CheckCircle2,
  Clock,
  Building,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { availableScholarships } from '../data/mockData';

export const ScholarshipPage: React.FC = () => {
  const [scholarshipsList, setScholarshipsList] = useState(availableScholarships);
  const [applyModalId, setApplyModalId] = useState<string | null>(null);
  const [familyIncome, setFamilyIncome] = useState('45,000');
  const [statement, setStatement] = useState('');
  const [appliedNotice, setAppliedNotice] = useState(false);

  const selectedForApply = scholarshipsList.find((s) => s.id === applyModalId);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalId) return;
    setScholarshipsList((prev) =>
      prev.map((s) =>
        s.id === applyModalId
          ? {
              ...s,
              status: 'Under Review',
              appliedDate: 'Today',
              trackingId: `SU-SFAO-${Math.floor(1000 + Math.random() * 9000)}`,
            }
          : s
      )
    );
    setAppliedNotice(true);
    setTimeout(() => {
      setAppliedNotice(false);
      setApplyModalId(null);
      setStatement('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Scholarship Announcements & Financial Aid
              </h1>
              <p className="text-xs text-slate-500">
                Students Financial Aid Office (SFAO) · Higher Education Commission & Provincial Schemes
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            SFAO Desk: <span className="font-semibold text-slate-900">Administration Block Room 12</span>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="space-y-4">
        {scholarshipsList.map((sch) => (
          <div
            key={sch.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-[10.5px] font-bold bg-slate-100 text-slate-700 rounded border border-slate-200">
                  {sch.category}
                </span>
                {sch.status === 'Selected' ? (
                  <span className="px-2 py-0.5 text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Selected & Awarded
                  </span>
                ) : sch.status === 'Under Review' ? (
                  <span className="px-2 py-0.5 text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Under Verification ({sch.trackingId})
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10.5px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                    Open for Applications
                  </span>
                )}
              </div>

              <h2 className="text-sm font-bold text-slate-900">{sch.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{sch.sponsor}</p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[11px]">Financial Stipend:</span>
                  <span className="font-semibold text-blue-950">{sch.stipendAmount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Application Deadline:</span>
                  <span className="font-semibold text-red-700 font-mono">{sch.deadline}</span>
                </div>
                <div className="sm:col-span-2 pt-1 border-t border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Eligibility Criteria:</span>
                  <span className="text-slate-800">{sch.eligibility}</span>
                </div>
              </div>

              {sch.trackingId && (
                <div className="mt-2 text-[11px] text-slate-500 font-mono">
                  Submitted Record: <span className="text-blue-900 font-semibold">{sch.trackingId}</span>
                  {sch.appliedDate && ` · Applied: ${sch.appliedDate}`}
                </div>
              )}
            </div>

            <div className="shrink-0 self-start md:self-center">
              {sch.status === 'Open' ? (
                <button
                  onClick={() => setApplyModalId(sch.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors cursor-pointer"
                >
                  Apply Online
                </button>
              ) : sch.status === 'Selected' ? (
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 inline-block">
                    Disbursed into Account
                  </span>
                </div>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded cursor-not-allowed"
                >
                  Application Logged
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SFAO Required Documents Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
          <AlertCircle className="w-4 h-4 text-blue-900" />
          <span>Mandatory Documents Required for SFAO Scholarship Verification</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Attested copy of Student CNIC / B-Form and Father's/Guardian's CNIC.</li>
          <li>Father's / Guardian's Salary Slip or Income Affidavit on Rs. 100/- Stamp Paper attested by First Class Magistrate.</li>
          <li>Attested copies of paid electricity and gas utility bills for the preceding three months.</li>
          <li>Copies of last semester examination marks certificate issued by Controller of Examinations.</li>
        </ul>
      </div>

      {/* Application Modal */}
      {applyModalId && selectedForApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-lg p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              Apply for {selectedForApply.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verify your applicant details and provide financial declaration.
            </p>

            {appliedNotice ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Application Successfully Submitted!</p>
                <p className="mt-1">Tracking ID has been issued to the SFAO committee.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="mt-4 space-y-4">
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant:</span>
                    <span className="font-bold text-slate-900">MUHAMMAD ALI SIDDIQUI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span className="font-mono text-slate-900">2K21/IT/104</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program:</span>
                    <span className="text-slate-800">BS (IT) 4-Year (8th Semester)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Gross Family Income (PKR)
                  </label>
                  <input
                    type="text"
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brief Statement of Financial Need
                  </label>
                  <textarea
                    rows={3}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Briefly state your family financial circumstances..."
                    className="w-full text-xs p-2 border border-slate-300 rounded"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalId(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
