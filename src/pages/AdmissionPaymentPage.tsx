import React, { useState } from 'react';
import {
  CreditCard,
  Printer,
  CheckCircle2,
  Clock,
  Building2,
  Download,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { ChallanModal } from '../components/ChallanModal';
import { FeeChallan } from '../types';

export const AdmissionPaymentPage: React.FC = () => {
  const { student, academicChallans, payChallan } = useStudent();
  const [selectedChallan, setSelectedChallan] = useState<FeeChallan | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Admission & Fee Payment Details
              </h1>
              <p className="text-xs text-slate-500">
                Official merit list record, university enrollment verification and bank fee vouchers
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Designated Bank: <span className="font-semibold text-slate-800">Habib Bank Limited (HBL)</span>
          </div>
        </div>
      </div>

      {/* Admission Merit List Record */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-blue-900" />
            <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Directorate of Admissions – Verified Merit Record
            </h2>
          </div>
          <span className="px-2 py-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded">
            Confirmed Admission
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Admission Category</span>
            <span className="font-semibold text-slate-900 block mt-0.5">
              General Merit (Morning Shift)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">District / Domicile</span>
            <span className="font-medium text-slate-800 block mt-0.5">
              {student.district}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Entrance Test Score</span>
            <span className="font-mono font-bold text-blue-950 block mt-0.5">
              84.50% (Merit Rank: 14)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Enrolment Number</span>
            <span className="font-mono font-semibold text-slate-900 block mt-0.5">
              {student.enrollmentNo}
            </span>
          </div>
        </div>
      </div>

      {/* Semester Fee Challans Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xs text-slate-900 uppercase">
              Semester Academic & Examination Fee Vouchers
            </h2>
            <p className="text-[11px] text-slate-500">
              Payable at any online HBL Branch or via HBL Mobile App / Konnect
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            HBL Sindh University (0072)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-4">Challan No.</th>
                <th className="py-2.5 px-4">Description / Fee Head</th>
                <th className="py-2.5 px-4">Academic Semester</th>
                <th className="py-2.5 px-4">Issue Date</th>
                <th className="py-2.5 px-4">Due Date</th>
                <th className="py-2.5 px-4 text-right">Payable Amount</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {academicChallans.map((ch) => (
                <tr key={ch.challanNo} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-950">
                    {ch.challanNo}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {ch.title}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {ch.semester}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    {ch.issueDate}
                  </td>
                  <td className="py-3 px-4 text-red-700 font-mono font-semibold">
                    {ch.dueDate}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                    Rs. {ch.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {ch.status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        PAID ({ch.paidDate || 'Verified'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        UNPAID
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedChallan(ch)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors flex items-center gap-1 shrink-0 ml-auto cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Challan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <Building2 className="w-4 h-4 text-blue-900" />
          <span>University Bank Payment & Challan Instructions</span>
        </div>
        <p className="leading-relaxed">
          1. All admission, tuition and examination fees must be deposited through official 3-part bank challans at Habib Bank Limited (HBL) branches nationwide or through 1Bill KuickPay payment gateways.
        </p>
        <p className="leading-relaxed">
          2. After payment at the bank counter, the "University Copy" must be submitted to the Accounts Office (Academic Wing) or uploaded via Eportal for verification. Retain the "Student Copy" permanently for degree issuance.
        </p>
      </div>

      {/* Challan Modal */}
      <ChallanModal
        challan={selectedChallan}
        student={student}
        onClose={() => setSelectedChallan(null)}
        onMarkPaid={(no) => {
          payChallan(no);
          setSelectedChallan((prev) => (prev ? { ...prev, status: 'PAID', paidDate: 'Today' } : null));
        }}
      />
    </div>
  );
};
