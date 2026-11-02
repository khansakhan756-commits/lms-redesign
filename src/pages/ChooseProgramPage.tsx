import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Building, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const ChooseProgramPage: React.FC = () => {
  const { programs, activeProgram, switchProgram, student } = useStudent();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSelect = (id: string, name: string) => {
    switchProgram(id);
    setSuccessMessage(`Active program changed to ${name}. Academic workspace updated.`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Choose / Switch Your Program</h1>
            <p className="text-xs text-slate-500">
              Select an enrolled degree program to view corresponding course registrations, results, and fee accounts
            </p>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((prog) => {
          const isSelected = prog.id === activeProgram.id;
          return (
            <div
              key={prog.id}
              className={`bg-white rounded-lg border p-5 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-900 shadow-xs ring-1 ring-blue-900'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {prog.degree}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Currently Selected
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">Available</span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {prog.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {prog.department}
                </p>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      Academic Batch:
                    </span>
                    <span className="font-semibold text-slate-800">{prog.batch}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      Class Shift:
                    </span>
                    <span className="font-medium text-slate-800">{prog.shift}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Building className="w-3.5 h-3.5" />
                      Faculty:
                    </span>
                    <span className="text-slate-800">Faculty of Natural Sciences</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Enrollment Status:</span>
                    <span className="font-semibold text-emerald-700">{prog.status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                {isSelected ? (
                  <button
                    disabled
                    className="w-full py-2 px-3 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200 rounded cursor-default"
                  >
                    Active Program in Workspace
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelect(prog.id, prog.name)}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors cursor-pointer"
                  >
                    Switch to this Program
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Regulation Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
          <AlertCircle className="w-4 h-4 text-blue-900" />
          <span>University Regulation on Multiple Program Enrollments</span>
        </div>
        <p className="leading-relaxed">
          As per the Academic Council regulations of University of Sindh Jamshoro, regular morning degree students may pursue permitted evening postgraduate diplomas or certificate courses concurrently upon written clearance from the Dean, Faculty of Natural Sciences. If your enrolled program is missing from this list, please present your admission challan at ITSC Desk 04.
        </p>
      </div>
    </div>
  );
};
