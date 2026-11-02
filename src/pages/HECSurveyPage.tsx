import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { hecSurveyQuestions } from '../data/mockData';
import { useStudent } from '../context/StudentContext';

export const HECSurveyPage: React.FC = () => {
  const { isHECSurveySubmitted, submitHECSurvey, student } = useStudent();
  const [answers, setAnswers] = useState<Record<number, string>>({
    0: 'Satisfied',
    1: 'Satisfied',
    2: 'Neutral',
    3: 'Very Satisfied',
    4: 'Satisfied',
    5: 'Satisfied',
    6: 'Neutral',
  });
  const [remarks, setRemarks] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const options = ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'];

  const handleOptionChange = (idx: number, opt: string) => {
    setAnswers((prev) => ({ ...prev, [idx]: opt }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitHECSurvey();
    setSubmittedNotice(true);
    setTimeout(() => {
      setSubmittedNotice(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                HEC National Student Satisfaction Survey
              </h1>
              <p className="text-xs text-slate-500">
                Higher Education Commission Pakistan · Quality Assurance Agency (QAA) Institutional Assessment
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            Survey Session: <span className="font-semibold text-slate-900">Academic Year 2026</span>
          </div>
        </div>
      </div>

      {submittedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Your HEC survey response has been recorded and submitted to the QAA Portal.
          </span>
        </div>
      )}

      {/* Survey Form Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-200 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase">
              Institutional Facilities & Campus Experience
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              University of Sindh, Jamshoro · Faculty of Natural Sciences
            </p>
          </div>
          {isHECSurveySubmitted && (
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold self-start">
              Survey Completed
            </span>
          )}
        </div>

        {isHECSurveySubmitted ? (
          <div className="p-8 text-center text-xs text-slate-600">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">
              Survey Submitted Successfully
            </h3>
            <p className="max-w-md mx-auto mt-1 text-slate-500">
              Thank you for participating in the HEC Quality Assurance survey for University of Sindh.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="divide-y divide-slate-100">
              {hecSurveyQuestions.map((question, qIdx) => (
                <div key={qIdx} className="py-4">
                  <p className="text-xs font-semibold text-slate-800 mb-2.5">
                    <span className="text-slate-400 font-mono mr-1.5">{qIdx + 1}.</span>
                    {question}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <label
                        key={opt}
                        className={`p-2 rounded text-center text-xs font-medium border cursor-pointer transition-colors ${
                          answers[qIdx] === opt
                            ? 'bg-blue-900 text-white border-blue-900 font-semibold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`hec-q-${qIdx}`}
                          value={opt}
                          checked={answers[qIdx] === opt}
                          onChange={() => handleOptionChange(qIdx, opt)}
                          className="sr-only"
                        />
                        <span className="block truncate text-[11px]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                General Recommendations for Higher Education Commission (HEC)
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Mention any specific recommendations regarding research grants, transport routes, or campus libraries..."
                className="w-full text-xs p-3 border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded transition-colors cursor-pointer"
              >
                Submit HEC Survey
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
