import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  FileCheck2,
  CheckCircle2,
  CreditCard,
  Building2,
  BookOpen,
  Bus,
  FileText,
  Printer,
  Clock,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const EportalDashboardPage: React.FC = () => {
  const { student, activeProgram } = useStudent();
  const [activeTab, setActiveTab] = useState<'services' | 'requests'>('services');
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 'REQ-2026-904',
      service: 'Bonafide Student Certificate (For Higher Studies & Visa)',
      dateSubmitted: '18 Oct 2026',
      status: 'Ready for Collection',
      authority: 'Academic Section (Registrar Office)',
      feeStatus: 'Paid (Challan SU-4190)',
    },
    {
      id: 'REQ-2026-812',
      service: 'Duplicate Transport Point Bus Card (Route: Latifabad Unit 7)',
      dateSubmitted: '02 Oct 2026',
      status: 'Dispatched to Transport Section',
      authority: 'Transport Officer, Jamshoro',
      feeStatus: 'Paid (Challan SU-3810)',
    },
  ]);

  const [newRequestModal, setNewRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState('Bonafide Certificate');
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestPurpose) return;
    const newReq = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      service: selectedService,
      dateSubmitted: 'Today',
      status: 'Submitted / Under Verification',
      authority: 'Registrar Branch / ITSC',
      feeStatus: 'Pending Verification',
    };
    setServiceRequests([newReq, ...serviceRequests]);
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setNewRequestModal(false);
      setRequestPurpose('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                University of Sindh Eportal Services
              </h1>
              <p className="text-xs text-slate-500">
                Centralized online student e-services, verification records and clearance status
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewRequestModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors self-start sm:self-center cursor-pointer"
          >
            + New E-Service Application
          </button>
        </div>
      </div>

      {/* Student Enrollment Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-slate-500 block text-[11px]">Enrolment Number</span>
          <span className="font-mono font-bold text-slate-900 text-sm block mt-1">
            {student.enrollmentNo}
          </span>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Verified & Registered
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-slate-500 block text-[11px]">Academic Clearance</span>
          <span className="font-semibold text-slate-900 text-sm block mt-1">
            {student.semester}
          </span>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Regular Status
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-slate-500 block text-[11px]">Transport Bus Pass</span>
          <span className="font-semibold text-slate-900 text-sm block mt-1">
            Point No. 1 (Latifabad)
          </span>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Card Valid (2026)
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-slate-500 block text-[11px]">Library Clearance</span>
          <span className="font-semibold text-slate-900 text-sm block mt-1">
            Central Library (Allama Kazi)
          </span>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            No Overdue Fines
          </span>
        </div>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex border-b border-slate-200 bg-white px-4 pt-3 rounded-t-lg">
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'services'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Active Student E-Services
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'requests'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Submitted Applications ({serviceRequests.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'services' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Examination Slip (Admit Card)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Download and print the official signed Examination Slip for entry into university examination halls.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-medium">Available</span>
              <Link
                to="/course-selection"
                className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>View Slip</span>
                <Printer className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Semester Fee E-Challans
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate bank vouchers for tuition, lab, examination, and hostel fees payable at HBL counters.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">HBL Sindh Univ (0072)</span>
              <Link
                to="/admission-payments"
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                Access Challans
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Bonafide & Character Certificate
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Request an official letter signed by the Registrar certifying your active enrollment and good conduct.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Processing: 3-5 Days</span>
              <button
                onClick={() => {
                  setSelectedService('Bonafide Student Certificate');
                  setNewRequestModal(true);
                }}
                className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                Apply Online
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Transport Point Bus Pass
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Check authorized bus routes, renewal schedules, and verify your RFID bus pass record.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-medium">Valid for 2026</span>
              <Link
                to="/points-locations"
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                View Routes
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Central Library Membership
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Verify library OPAC account, textbook borrow privileges, and HEC Digital Library credentials.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-medium">Member Active</span>
              <Link
                to="/koha-library"
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                Koha Catalog
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-slate-900">
                Hostel Administration E-Pass
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Allotment order verification, gate pass permissions, and mess card renewal submissions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Allama Iqbal Hostel</span>
              <Link
                to="/hostel"
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                View Hostel
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              Student Application Tracking
            </h3>
            <span className="text-xs text-slate-500">ITSC Verification Portal</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                  <th className="py-2.5 px-4">Tracking ID</th>
                  <th className="py-2.5 px-4">Service Name</th>
                  <th className="py-2.5 px-4">Issuing Authority</th>
                  <th className="py-2.5 px-4">Date Applied</th>
                  <th className="py-2.5 px-4">Fee Clearance</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-blue-950">
                      {req.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {req.service}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {req.authority}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {req.dateSubmitted}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {req.feeStatus}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {newRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-lg p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              Submit E-Service Application
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select the service you wish to request from the University of Sindh administration.
            </p>

            {requestSuccess ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Application Submitted Successfully!</p>
                <p className="mt-1">Your request tracking ID has been generated.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateRequest} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select E-Service Category
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
                  >
                    <option value="Bonafide Student Certificate">Bonafide Student Certificate (Registrar)</option>
                    <option value="Character Certificate">Character & Good Conduct Certificate</option>
                    <option value="Semester Fee Verification">Semester Tuition Fee Verification & Clearance</option>
                    <option value="Transport Bus Point Pass Renewal">Transport Point Bus Pass Renewal (Session 2026)</option>
                    <option value="Transcript Verification for Abroad">Provisional Transcript Verification for WES/Abroad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Purpose & Justification
                  </label>
                  <textarea
                    rows={3}
                    value={requestPurpose}
                    onChange={(e) => setRequestPurpose(e.target.value)}
                    placeholder="Provide justification or purpose for this request..."
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewRequestModal(false)}
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
