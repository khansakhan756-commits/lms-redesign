import React, { useState } from 'react';
import {
  Laptop,
  FileText,
  Download,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  User,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { currentCourses, courseMaterials } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const VirtualClassRoomPage: React.FC = () => {
  const { assignments, submitAssignment } = useStudent();
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('IT-411');
  const [activeTab, setActiveTab] = useState<'materials' | 'assignments' | 'live'>('materials');
  const [uploadModalFor, setUploadModalFor] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState(false);

  const selectedCourse = currentCourses.find((c) => c.code === selectedCourseCode) || currentCourses[0];
  const filteredMaterials = courseMaterials.filter((m) => m.courseCode === selectedCourseCode);
  const filteredAssignments = assignments.filter((a) => a.courseCode === selectedCourseCode);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadModalFor || !selectedFileName) return;
    submitAssignment(uploadModalFor, selectedFileName);
    setUploadFeedback(true);
    setTimeout(() => {
      setUploadFeedback(false);
      setUploadModalFor(null);
      setSelectedFileName('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Virtual Class Room</h1>
              <p className="text-xs text-slate-500">
                Course lecture handouts, lab manual downloads, assignment submissions & video lecture access
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium self-start sm:self-center">
            Academic Session 2026 · Semester VIII
          </div>
        </div>
      </div>

      {/* Course Selector Horizontal Scroll / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {currentCourses.map((c) => {
          const isSelected = c.code === selectedCourseCode;
          return (
            <button
              key={c.code}
              onClick={() => setSelectedCourseCode(c.code)}
              className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`text-[10px] font-mono font-bold ${
                  isSelected ? 'text-blue-200' : 'text-blue-900'
                }`}
              >
                {c.code}
              </div>
              <div className="font-semibold text-xs leading-snug truncate mt-0.5">
                {c.title}
              </div>
              <div
                className={`text-[10px] mt-1.5 truncate ${
                  isSelected ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {c.instructor}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Course Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-mono font-bold text-blue-900">{selectedCourse.code}</span>
              <span>·</span>
              <span>{selectedCourse.type} Course</span>
              <span>·</span>
              <span>{selectedCourse.creditHours} Credit Hours (Th: {selectedCourse.theoryCredit}, Lab: {selectedCourse.labCredit})</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">{selectedCourse.title}</h2>
            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Instructor: <span className="font-semibold text-slate-800">{selectedCourse.instructor}</span></span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Lecture Materials ({filteredMaterials.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Assignments ({filteredAssignments.length})
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Live Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'materials' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 uppercase">
              Course Lecture Files & Handouts
            </h3>
            <span className="text-xs text-slate-500">Official Syllabus Distribution</span>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No lecture materials currently uploaded for this course. Please check back after next scheduled lecture.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredMaterials.map((mat) => (
                <div key={mat.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">{mat.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span className="px-1.5 py-0.2 bg-slate-100 rounded text-slate-700 font-mono text-[10px] font-bold">
                          {mat.type}
                        </span>
                        <span>·</span>
                        <span>{mat.size}</span>
                        <span>·</span>
                        <span>Uploaded on {mat.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={mat.downloadUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Initiated download for: ${mat.title}`);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors flex items-center gap-1.5 shrink-0 ml-4 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-xs text-slate-500">
              No active homework or lab assignments pending for this course.
            </div>
          ) : (
            filteredAssignments.map((asg) => (
              <div key={asg.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 text-[10.5px] font-bold rounded ${
                          asg.status === 'Submitted'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {asg.status}
                      </span>
                      <span className="text-xs text-slate-500">Total Marks: {asg.totalMarks}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{asg.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Assigned: {asg.assignedDate}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-semibold text-red-700">
                        <Clock className="w-3.5 h-3.5" />
                        Due: {asg.dueDate}
                      </span>
                    </div>

                    {asg.submittedFile && (
                      <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs flex items-center justify-between">
                        <span className="text-slate-600 font-mono text-[11px] truncate">
                          Submitted File: {asg.submittedFile}
                        </span>
                        {asg.grade && (
                          <span className="font-bold text-blue-900 ml-2">Score: {asg.grade}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="self-start sm:self-center">
                    {asg.status === 'Pending' ? (
                      <button
                        onClick={() => setUploadModalFor(asg.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Solution</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setUploadModalFor(asg.id)}
                        className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Re-upload</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'live' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Online Video Classroom & Faculty Consultation
                </h3>
                <p className="text-xs text-slate-500">
                  ITSC Google Workspace for Education / Microsoft Teams integration
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Regular lectures are conducted physically in Departmental Lecture Halls. In case of inclement weather, official holidays, or special weekend review sessions, the instructor streams online using the secure meeting room below.
            </p>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-semibold text-slate-800">Mondays & Wednesdays (09:00 AM – 10:30 AM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room Status:</span>
                <span className="text-emerald-700 font-semibold">Active Portal Link</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Class on Google Meet (ITSC Portal)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Upload Modal */}
      {uploadModalFor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-md p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              Submit Course Assignment Solution
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Upload your PDF, ZIP or DOC file containing your report or source code.
            </p>

            {uploadFeedback ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Assignment Uploaded Successfully!</p>
                <p className="mt-1">Your teacher has been notified of your submission.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select File (.pdf, .zip, .docx)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 border border-slate-300 rounded p-1"
                  />
                  {!selectedFileName && (
                    <div className="mt-2 text-[11px] text-slate-500">
                      Or simulate attaching file:
                      <button
                        type="button"
                        onClick={() => setSelectedFileName(`2K21_IT_104_Lab_${Date.now().toString().slice(-4)}.pdf`)}
                        className="ml-2 text-blue-900 underline font-mono"
                      >
                        Sample_Lab_Report.pdf
                      </button>
                    </div>
                  )}
                  {selectedFileName && (
                    <div className="mt-2 text-xs text-slate-700 font-mono">
                      Selected: <span className="font-bold text-blue-900">{selectedFileName}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadModalFor(null);
                      setSelectedFileName('');
                    }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedFileName}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 rounded cursor-pointer"
                  >
                    Confirm Submission
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
