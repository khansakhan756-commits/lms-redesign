import React, { useState } from 'react';
import {
  DownloadCloud,
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { universityForms } from '../data/mockData';

export const DownloadsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadedForm, setDownloadedForm] = useState<string | null>(null);

  const categories = ['All', 'Examination', 'Academics', 'Transport', 'General'];

  const filteredForms = universityForms.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (fileName: string) => {
    setDownloadedForm(fileName);
    setTimeout(() => {
      setDownloadedForm(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Official University Forms & Proformas
              </h1>
              <p className="text-xs text-slate-500">
                Download verified applications for degrees, migration, transcript verification and student services
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Format: <span className="font-semibold text-slate-800">Printable Official PDF</span>
          </div>
        </div>
      </div>

      {downloadedForm && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Downloaded proforma: <span className="font-mono font-bold">{downloadedForm}</span></span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms by name..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
          />
        </div>
      </div>

      {/* Forms List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs divide-y divide-slate-100">
        {filteredForms.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No official forms matched your query.
          </div>
        ) : (
          filteredForms.map((form) => (
            <div
              key={form.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.2 bg-slate-100 text-slate-700 rounded text-[10.5px] font-semibold border border-slate-200">
                      {form.category}
                    </span>
                    <span className="text-[11px] text-slate-400">Revised: {form.revisedDate}</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {form.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    File: {form.fileName} · Size: {form.size} ({form.format})
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(form.fileName)}
                className="px-3.5 py-2 text-xs font-semibold text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Form</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Submission Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p className="leading-relaxed">
          <strong className="text-slate-900">Submission Procedure:</strong> Complete the downloaded application form in capital letters, attach required supporting documents (CNIC copy, paid bank challan, verified marks sheets), and submit at the relevant window of the Registrar Office / Controller of Examinations, Allama I.I. Kazi Campus, Jamshoro.
        </p>
      </div>
    </div>
  );
};
