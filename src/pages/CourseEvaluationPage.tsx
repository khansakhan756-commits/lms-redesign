import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building,
  User,
} from 'lucide-react';
import { currentCourses, qecEvaluationQuestions } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const CourseEvaluationPage: React.FC = () => {
  const { submittedEvaluations, submitCourseEvaluation } = useStudent();
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('IT-411');
  const [ratings, setRatings] = useState<Record<number, number>>({
    0: 5,
    1: 4,
    2: 5,
    3: 4,
    4: 5,
    5: 4,
    6: 5,
    7: 4,
  });
  const [comments, setComments] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const isAlreadySubmitted = submittedEvaluations.includes(selectedCourseCode);
  const selectedCourse = currentCourses.find((c) => c.code === selectedCourseCode) || currentCourses[0];

  const handleRatingChange = (qIdx: number, val: number) => {
    setRatings((prev) => ({ ...prev, [qIdx]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCourseEvaluation(selectedCourseCode);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Course & Teacher Evaluation (QEC Proforma 10)
              </h1>
              <p className="text-xs text-slate-500">
                Quality Enhancement Cell (QEC) · Mandatory semester feedback for academic accreditation
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            Confidentiality: <span className="font-semibold text-slate-900">100% Anonymous Survey</span>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Evaluation for {selectedCourse.code} ({selectedCourse.title}) successfully submitted to QEC Directorate.
          </span>
        </div>
      )}

      {/* Select Course Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Select Enrolled Course to Evaluate:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {currentCourses.map((c) => {
            const isSub = submittedEvaluations.includes(c.code);
            const isSelected = c.code === selectedCourseCode;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCourseCode(c.code)}
                className={`p-2.5 rounded text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-blue-200' : 'text-blue-900'
                    }`}
                  >
                    {c.code}
                  </span>
                  {isSub && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-emerald-300' : 'text-emerald-600'
                      }`}
                    />
                  )}
                </div>
                <div className="text-[11px] font-medium leading-tight truncate mt-1">
                  {c.title}
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    isSub
                      ? isSelected
                        ? 'text-emerald-200'
                        : 'text-emerald-700 font-semibold'
                      : isSelected
                      ? 'text-blue-200'
                      : 'text-amber-700 font-medium'
                  }`}
                >
                  {isSub ? 'Submitted' : 'Pending Evaluation'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Evaluation Form Body */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-200 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs text-slate-500 font-mono">
                Evaluating Course: <strong className="text-blue-900">{selectedCourse.code}</strong>
              </span>
              <h2 className="text-base font-bold text-slate-900">{selectedCourse.title}</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Instructor: <span className="font-semibold">{selectedCourse.instructor}</span> · Department: {selectedCourse.semester}
              </p>
            </div>
            {isAlreadySubmitted && (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold self-start">
                Evaluation Completed
              </span>
            )}
          </div>
        </div>

        {isAlreadySubmitted ? (
          <div className="p-8 text-center text-xs text-slate-600">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">
              You have already submitted this evaluation
            </h3>
            <p className="max-w-md mx-auto mt-1 text-slate-500">
              Thank you for contributing to the academic quality enhancement process at University of Sindh. Your responses are encrypted and anonymous.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded border border-slate-200 flex items-center justify-between">
              <span>Rating Scale: <strong>1 = Strongly Disagree</strong>, 2 = Disagree, 3 = Neutral, 4 = Agree, <strong>5 = Strongly Agree</strong></span>
            </div>

            <div className="divide-y divide-slate-100">
              {qecEvaluationQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-semibold text-slate-400 mr-2 font-mono">
                      {idx + 1}.
                    </span>
                    <span className="text-xs font-medium text-slate-800">{q}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <label
                        key={score}
                        className={`w-9 h-8 flex flex-col items-center justify-center rounded text-xs font-semibold cursor-pointer border transition-colors ${
                          ratings[idx] === score
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          value={score}
                          checked={ratings[idx] === score}
                          onChange={() => handleRatingChange(idx, score)}
                          className="sr-only"
                        />
                        <span>{score}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional comments */}
            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Constructive Remarks or Suggestions for Course Improvement (Optional)
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share specific suggestions regarding lab equipment, textbook clarity, or syllabus coverage..."
                className="w-full text-xs p-3 border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors cursor-pointer"
              >
                Submit QEC Evaluation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
