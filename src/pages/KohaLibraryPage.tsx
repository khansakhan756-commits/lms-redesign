import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  ExternalLink,
  BookMarked,
} from 'lucide-react';
import { libraryCatalog } from '../data/mockData';
import { KohaBook } from '../types';

export const KohaLibraryPage: React.FC = () => {
  const [books, setBooks] = useState<KohaBook[]>(libraryCatalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'title' | 'author' | 'callNo'>('all');
  const [renewNotice, setRenewNotice] = useState<string | null>(null);

  const filteredBooks = books.filter((b) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    if (searchType === 'title') return b.title.toLowerCase().includes(q);
    if (searchType === 'author') return b.author.toLowerCase().includes(q);
    if (searchType === 'callNo') return b.callNo.toLowerCase().includes(q);
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.callNo.toLowerCase().includes(q) ||
      b.accessionNo.toLowerCase().includes(q)
    );
  });

  const borrowedBooks = books.filter((b) => b.status === 'Checked Out');

  const handleRenew = (accNo: string, title: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.accessionNo === accNo
          ? {
              ...b,
              dueDate: '15 Dec 2026',
            }
          : b
      )
    );
    setRenewNotice(`Book "${title}" renewed successfully until 15 Dec 2026.`);
    setTimeout(() => {
      setRenewNotice(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Allama I.I. Kazi Central Library (Koha OPAC)
              </h1>
              <p className="text-xs text-slate-500">
                Integrated Library System · Online Public Access Catalog & Student Circulation Desk
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            Borrowing Status: <span className="font-semibold text-emerald-800">Clear · No Fines Due</span>
          </div>
        </div>
      </div>

      {renewNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{renewNotice}</span>
        </div>
      )}

      {/* Currently Issued Books to Student */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-blue-900" />
            <h2 className="font-bold text-xs text-slate-900 uppercase">
              Books Currently Borrowed on Your Student Card
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Card Limit: 2 / 4 Volumes Issued
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {borrowedBooks.map((book) => (
            <div
              key={book.accessionNo}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-mono text-[11px] font-semibold text-blue-900 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    Acc: {book.accessionNo}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-slate-700">Call No: {book.callNo}</span>
                  <span>·</span>
                  <span>{book.edition}</span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">Author(s): {book.author}</p>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span>Issued: {book.borrowDate}</span>
                  <span>·</span>
                  <span className="font-semibold text-emerald-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    Due Date: {book.dueDate}
                  </span>
                  <span>·</span>
                  <span className="text-slate-600">Fine: Rs. {book.fineAmount || 0}</span>
                </div>
              </div>

              <button
                onClick={() => handleRenew(book.accessionNo, book.title)}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors shrink-0 self-start sm:self-center cursor-pointer"
              >
                Renew 30 Days
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Koha OPAC Catalog Search */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-3">
          Search Central Library Koha Catalog (Books & Journals)
        </h3>

        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            className="text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 w-full sm:w-44"
          >
            <option value="all">Keyword (All Fields)</option>
            <option value="title">Book Title</option>
            <option value="author">Author Name</option>
            <option value="callNo">Dewey Call Number</option>
          </select>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. Distributed Systems, Artificial Intelligence, Database, Tanenbaum)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-left">
                <th className="py-2.5 px-3">Accession No.</th>
                <th className="py-2.5 px-3">Title & Edition</th>
                <th className="py-2.5 px-3">Author(s)</th>
                <th className="py-2.5 px-3">Call Number</th>
                <th className="py-2.5 px-3">Shelf Status</th>
                <th className="py-2.5 px-3 text-right">Hold Request</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr key={book.accessionNo} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-blue-950">
                    {book.accessionNo}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-900">{book.title}</div>
                    <div className="text-[11px] text-slate-500">{book.edition}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {book.author}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {book.callNo}
                  </td>
                  <td className="py-2.5 px-3">
                    {book.status === 'Available' ? (
                      <span className="px-2 py-0.5 text-[10.5px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                        Available on Shelf
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10.5px] font-semibold bg-slate-100 text-slate-600 rounded">
                        Checked Out
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => alert(`Hold reserved for ${book.title}. Please collect from Circulation Desk within 48 hours.`)}
                      className="px-2.5 py-1 text-xs font-medium text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded transition-colors cursor-pointer"
                    >
                      Reserve Hold
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
