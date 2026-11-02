import React from 'react';
import { X, Printer, CheckCircle2, Building2 } from 'lucide-react';
import { FeeChallan, StudentProfile } from '../types';

interface ChallanModalProps {
  challan: FeeChallan | null;
  student: StudentProfile;
  onClose: () => void;
  onMarkPaid?: (challanNo: string) => void;
}

export const ChallanModal: React.FC<ChallanModalProps> = ({
  challan,
  student,
  onClose,
  onMarkPaid,
}) => {
  if (!challan) return null;

  const copies = [
    { title: 'BANK COPY', subtitle: 'To be retained by HBL Branch' },
    { title: 'UNIVERSITY COPY', subtitle: 'To be submitted to Accounts / Department' },
    { title: 'STUDENT COPY', subtitle: 'To be kept safely by the student' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden border border-slate-200">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-900" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                Official Bank Challan Voucher – {challan.challanNo}
              </h3>
              <p className="text-xs text-slate-500">
                Habib Bank Limited (HBL) · Sindh University Branch Jamshoro (0072)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {challan.status === 'UNPAID' && onMarkPaid && (
              <button
                onClick={() => onMarkPaid(challan.challanNo)}
                className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Simulate Payment
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Challan (3-Part)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable 3-part Challan Body */}
        <div className="p-4 sm:p-6 bg-slate-100/60 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border border-slate-300 rounded shadow-xs print:shadow-none print:border-none print:p-0">
            {copies.map((copy, idx) => (
              <div
                key={copy.title}
                className={`p-3.5 border border-slate-300 rounded text-xs flex flex-col justify-between ${
                  idx > 0 ? 'border-dashed' : ''
                }`}
              >
                {/* Header */}
                <div className="text-center pb-2 border-b border-slate-200">
                  <div className="w-10 h-10 mx-auto mb-1">
                    <img
                      src="/src/assets/images/usindh_crest_logo_1793558966506.jpg"
                      alt="University of Sindh"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-tight text-[11px]">
                    University of Sindh, Jamshoro
                  </h4>
                  <p className="text-[10px] text-slate-600 font-medium">Finance & Accounts Division</p>
                  <div className="mt-1.5 py-0.5 px-2 bg-slate-100 font-bold text-blue-950 text-[10px] tracking-wide inline-block border border-slate-300 rounded-xs">
                    {copy.title}
                  </div>
                  <p className="text-[9px] text-slate-500 italic mt-0.5">{copy.subtitle}</p>
                </div>

                {/* Bank Account Info */}
                <div className="mt-2 text-[10.5px] bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank:</span>
                    <span className="font-semibold text-slate-800">{challan.bankName}</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-slate-500">Branch:</span>
                    <span className="font-medium text-slate-800 text-[10px]">Sindh Univ. Br. (0072)</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-slate-500">Account No:</span>
                    <span className="font-mono font-semibold text-slate-900">{challan.accountNo}</span>
                  </div>
                </div>

                {/* Student Details */}
                <div className="mt-2 space-y-1 text-[10.5px] border-b border-slate-200 pb-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Challan No:</span>
                    <span className="font-mono font-bold text-blue-950">{challan.challanNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue Date:</span>
                    <span className="text-slate-800 font-mono">{challan.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold text-red-700">Due Date:</span>
                    <span className="font-bold text-red-700 font-mono">{challan.dueDate}</span>
                  </div>
                  <div className="pt-1">
                    <div className="text-slate-500 text-[10px]">Student Name:</div>
                    <div className="font-semibold text-slate-900 uppercase truncate">{student.name}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Father's Name:</span>
                    <span className="text-slate-800 truncate uppercase">{student.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span className="font-bold text-slate-900 font-mono">{student.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program:</span>
                    <span className="text-slate-800 truncate text-[10px]">BS (IT) 4-Yr (Morning)</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mt-2 flex-1">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="text-left font-medium pb-1">Head of Account</th>
                        <th className="text-right font-medium pb-1">Amount (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {challan.breakdown.map((item) => (
                        <tr key={item.item}>
                          <td className="py-1 text-slate-700 pr-1 leading-tight">{item.item}</td>
                          <td className="py-1 text-right font-mono text-slate-900 tabular-nums">
                            {item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t border-slate-300 font-bold bg-slate-50">
                        <td className="py-1 text-slate-900">Total Payable:</td>
                        <td className="py-1 text-right font-mono text-blue-950 tabular-nums text-[11px]">
                          Rs. {challan.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Status Stamp */}
                <div className="mt-3 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">Voucher Status:</span>
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        challan.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {challan.status === 'PAID'
                        ? `PAID (${challan.paidDate || 'VERIFIED'})`
                        : 'PAYABLE AT HBL COUNTER'}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-dotted border-slate-300 flex justify-between text-[9px] text-slate-400">
                    <span>Cashier / Officer Sig.</span>
                    <span>Bank Stamp & Date</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
