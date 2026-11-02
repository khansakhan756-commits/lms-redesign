import React, { useState } from 'react';
import {
  Building,
  Printer,
  CheckCircle2,
  Clock,
  Phone,
  User,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import { hostelRecord } from '../data/mockData';
import { useStudent } from '../context/StudentContext';
import { ChallanModal } from '../components/ChallanModal';
import { FeeChallan } from '../types';

export const HostelPage: React.FC = () => {
  const { student, hostelFeeChallans, payChallan } = useStudent();
  const [selectedChallan, setSelectedChallan] = useState<FeeChallan | null>(null);
  const [applyTransferModal, setApplyTransferModal] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferReason, setTransferReason] = useState('');

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferReason) return;
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setApplyTransferModal(false);
      setTransferReason('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Hostel Administration & Fee Challans
              </h1>
              <p className="text-xs text-slate-500">
                Provost Office Jamshoro · Accommodation Allotments, Mess Clearance and Banking Vouchers
              </p>
            </div>
          </div>
          <button
            onClick={() => setApplyTransferModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors self-start sm:self-center cursor-pointer"
          >
            Apply for Room Transfer
          </button>
        </div>
      </div>

      {/* Hostel Allotment Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
          <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
            Verified Hostel Allotment Order
          </h2>
          <span className="px-2 py-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded">
            Allotted & Occupied
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Hostel Facility</span>
            <span className="font-semibold text-slate-900 block mt-0.5">
              {hostelRecord.hostelName}
            </span>
            <span className="text-[11px] text-slate-500">{hostelRecord.block}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">Room & Bed Allotment</span>
            <span className="font-mono font-bold text-blue-950 text-sm block mt-0.5">
              Room: {hostelRecord.roomNo}
            </span>
            <span className="text-[11px] text-slate-600">{hostelRecord.bedNo}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">Allotment Validity</span>
            <span className="font-semibold text-slate-800 block mt-0.5">
              Until {hostelRecord.validTill}
            </span>
            <span className="text-[11px] text-slate-500">Allotted: {hostelRecord.allotmentDate}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">Hostel Mess Status</span>
            <span className="font-semibold text-emerald-700 block mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mess Card Active
            </span>
            <span className="text-[11px] text-slate-500">Cooperative Dining System</span>
          </div>
        </div>

        {/* Administration Contacts */}
        <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded">
          <div>
            <span className="text-slate-500 block text-[10px]">Provost (Boys Hostels):</span>
            <span className="font-semibold text-slate-800">{hostelRecord.provostName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Hostel Warden:</span>
            <span className="font-semibold text-slate-800">{hostelRecord.wardenName}</span>
            <span className="text-slate-500 ml-2 font-mono text-[11px]">({hostelRecord.wardenContact})</span>
          </div>
        </div>
      </div>

      {/* Hostel Fee Challans Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xs text-slate-900 uppercase">
              Hostel Accommodation & Utility Vouchers
            </h2>
            <p className="text-[11px] text-slate-500">
              Paid and pending hostel fee vouchers for Habib Bank Limited (0072)
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Allama Iqbal Hostel
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-4">Challan No.</th>
                <th className="py-2.5 px-4">Description</th>
                <th className="py-2.5 px-4">Session Term</th>
                <th className="py-2.5 px-4">Issue Date</th>
                <th className="py-2.5 px-4">Due Date</th>
                <th className="py-2.5 px-4 text-right">Amount</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hostelFeeChallans.map((ch) => (
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
                      <span>View Voucher</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hostel Rules Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 space-y-1">
        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
          <ShieldAlert className="w-4 h-4 text-blue-900" />
          <span>Hostel Discipline and Gate Timings</span>
        </div>
        <p>• Hostel gates are securely closed at 10:00 PM for all residential students.</p>
        <p>• Electric heaters, air conditioners, and unauthorized cooking stoves are strictly prohibited in hostel rooms.</p>
        <p>• Guests or day-scholars are strictly prohibited from staying overnight without written authorization from the Warden.</p>
      </div>

      {/* Transfer Request Modal */}
      {applyTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-md p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              Hostel Room / Block Transfer Request
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Submit application to the Provost Hostels for change of room or block.
            </p>

            {transferSuccess ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Transfer Application Logged!</p>
                <p className="mt-1">Application forwarded to Warden Allama Iqbal Hostel.</p>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="mt-4 space-y-4">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
                  <div>Current Room: <strong className="text-slate-900">{hostelRecord.roomNo} ({hostelRecord.hostelName})</strong></div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Hostel / Room Type
                  </label>
                  <select className="w-full text-xs p-2 border border-slate-300 rounded">
                    <option>Allama Iqbal Hostel (Single Room)</option>
                    <option>Mirza Kalich Beg Hostel</option>
                    <option>Hyder Bux Jatoi Hostel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason for Transfer
                  </label>
                  <textarea
                    rows={3}
                    value={transferReason}
                    onChange={(e) => setTransferReason(e.target.value)}
                    placeholder="Specify reason for requesting room change..."
                    className="w-full text-xs p-2 border border-slate-300 rounded"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyTransferModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded cursor-pointer"
                  >
                    Submit Transfer Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
