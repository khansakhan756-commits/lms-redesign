import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  AlertCircle,
  Upload,
  User,
  Shield,
  RefreshCw,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const UpdateProfileImagePage: React.FC = () => {
  const { student, updateAvatar } = useStudent();
  const [previewUrl, setPreviewUrl] = useState<string>(student.avatarUrl);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAvatar(previewUrl);
    setStatusMessage('Profile photograph updated successfully for University Smart ID Card and LMS.');
    setTimeout(() => {
      setStatusMessage('');
    }, 3500);
  };

  const resetToDefault = () => {
    const defaultUrl = '/src/assets/images/student_passport_photo_1793558967509.jpg';
    setPreviewUrl(defaultUrl);
    updateAvatar(defaultUrl);
    setSelectedFileName('Official_Attested_Photo.jpg');
    setStatusMessage('Restored official university verified ID photograph.');
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Update Student Profile Photograph
              </h1>
              <p className="text-xs text-slate-500">
                Official student identity photograph for University Smart Cards, Examination Slips and LMS records
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Roll No: <span className="font-mono font-bold text-slate-900">{student.rollNo}</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{statusMessage}</span>
        </div>
      )}

      {/* Main Grid: Upload & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photograph Specifications */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-200">
            University Photographic Standards
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-blue-950 font-medium">
              Mandatory Background Color: <span className="font-bold underline">Solid Royal Blue</span> background is required by the Controller of Examinations and ITSC.
            </div>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Face Alignment:</strong> Full face directly facing the camera with eyes open and neutral expression. Both ears should be visible.
              </li>
              <li>
                <strong>Attire:</strong> Formal collared shirt, blazer or modest national dress (Shalwar Kameez).
              </li>
              <li>
                <strong>Lighting:</strong> Sharp, evenly illuminated photograph without heavy shadows or digital filter effects.
              </li>
              <li>
                <strong>Format & Resolution:</strong> JPG or PNG format, minimum 600x600 pixels (aspect ratio 1:1 or 35x45mm), file size under 2MB.
              </li>
              <li>
                <strong>Prohibited:</strong> Selfies, side angles, dark sunglasses, caps, and cropped group photos will be rejected by the Registrar ID Section.
              </li>
            </ul>
          </div>

          <form onSubmit={handleSave} className="pt-4 border-t border-slate-200 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Photo File from Computer:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 border border-slate-300 rounded p-1 cursor-pointer"
              />
              {selectedFileName && (
                <div className="text-[11px] text-slate-500 mt-1">
                  Selected file: <span className="font-mono text-slate-800">{selectedFileName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Save & Apply Photograph</span>
              </button>
              <button
                type="button"
                onClick={resetToDefault}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-300 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Verified Photo</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Photo Preview in Card & ID Format */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs flex flex-col items-center text-center">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4">
            Live Preview on Student Smart ID
          </h3>

          <div className="w-44 h-52 rounded-md border-2 border-slate-400 overflow-hidden shadow-xs bg-slate-100 mb-4 p-0.5">
            <img
              src={previewUrl}
              alt={student.name}
              className="w-full h-full object-cover rounded-xs"
            />
          </div>

          <div className="w-full bg-slate-50 p-3 rounded border border-slate-200 text-xs text-left space-y-1">
            <div>
              <span className="text-slate-400 text-[10px] uppercase">Candidate Name:</span>
              <div className="font-bold text-slate-900 uppercase truncate">{student.name}</div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Roll No:</span>
              <span className="font-mono font-bold text-blue-950">{student.rollNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Program:</span>
              <span className="text-slate-800 truncate text-[11px]">BS (IT) 4-Year</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="text-slate-800 truncate text-[11px]">IICT Jamshoro</span>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400">
            This image is embedded onto your Examination Slip, Transcripts, and Library Smart RFID card.
          </div>
        </div>
      </div>
    </div>
  );
};
