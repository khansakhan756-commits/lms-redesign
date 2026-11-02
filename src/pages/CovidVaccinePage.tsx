import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  FileText,
  UploadCloud,
  ExternalLink,
} from 'lucide-react';
import { studentVaccineData } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const CovidVaccinePage: React.FC = () => {
  const { student } = useStudent();
  const [data, setData] = useState(studentVaccineData);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedCertificateName, setUploadedCertificateName] = useState('');
  const [feedback, setFeedback] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedCertificateName) return;
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
      setShowUploadModal(false);
      setUploadedCertificateName('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                COVID-19 Immunization Record
              </h1>
              <p className="text-xs text-slate-500">
                National Immunization Management System (NIMS) · Verified with NADRA & Sindh University Health Centre
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Update NADRA Certificate</span>
          </button>
        </div>
      </div>

      {/* Verification Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Official Health Status</div>
              <h2 className="text-sm font-bold text-slate-900">
                Fully Vaccinated & Certified by NIMS NADRA
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded self-start sm:self-center font-mono">
            STATUS: {data.verificationStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded border border-slate-200 mb-6">
          <div>
            <span className="text-slate-500 block text-[11px]">NIMS Certificate Number</span>
            <span className="font-mono font-bold text-blue-950 text-xs block mt-0.5">
              {data.certificateNo}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Verified CNIC</span>
            <span className="font-mono font-semibold text-slate-800 block mt-0.5">
              {data.cnic}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Student Name</span>
            <span className="font-semibold text-slate-900 uppercase block mt-0.5">
              {student.name}
            </span>
          </div>
        </div>

        {/* Doses Timeline Table */}
        <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-3">
          Administered Vaccination Doses
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-3">Dose Type</th>
                <th className="py-2.5 px-3">Vaccine Formulation</th>
                <th className="py-2.5 px-3">Administration Date</th>
                <th className="py-2.5 px-3">Vaccination Center</th>
                <th className="py-2.5 px-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.doses.map((dose) => (
                <tr key={dose.doseNumber} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    Dose #{dose.doseNumber} (Primary)
                  </td>
                  <td className="py-3 px-3 font-medium text-blue-950">
                    {dose.vaccineName}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    {dose.date}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {dose.center}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-700 font-semibold">
                    NADRA Logged
                  </td>
                </tr>
              ))}
              {data.booster && (
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    Booster Dose
                  </td>
                  <td className="py-3 px-3 font-medium text-blue-950">
                    {data.booster.vaccineName}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    {data.booster.date}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {data.booster.center}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-700 font-semibold">
                    NADRA Logged
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Health Advisory */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p className="leading-relaxed">
          <strong className="text-slate-900">Health Centre Policy:</strong> In compliance with the Government of Sindh Health Department and Higher Education Commission instructions, valid COVID-19 immunization records are required for campus entry, hostel allotment and issuance of semester examination slips.
        </p>
      </div>

      {/* Upload Certificate Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-md p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              Upload NADRA Immunization Certificate
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Upload PDF or image scan of your official NADRA COVID-19 certificate.
            </p>

            {feedback ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Certificate Submitted!</p>
                <p className="mt-1">Verified with NIMS database.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select File (PDF, PNG, JPG)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedCertificateName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 border border-slate-300 rounded p-1"
                  />
                  {!uploadedCertificateName && (
                    <div className="mt-2 text-[11px] text-slate-500">
                      Or simulate attaching file:
                      <button
                        type="button"
                        onClick={() => setUploadedCertificateName(`NADRA_Certificate_${student.rollNo.replace(/\//g, '_')}.pdf`)}
                        className="ml-2 text-blue-900 underline font-mono"
                      >
                        Sample_NADRA_Doc.pdf
                      </button>
                    </div>
                  )}
                  {uploadedCertificateName && (
                    <div className="mt-2 text-xs text-slate-700 font-mono">
                      Selected: <span className="font-bold text-blue-900">{uploadedCertificateName}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadedCertificateName('');
                    }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!uploadedCertificateName}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 rounded cursor-pointer"
                  >
                    Upload & Verify
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
