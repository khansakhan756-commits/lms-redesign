import React, { useState } from 'react';
import {
  Bus,
  Search,
  MapPin,
  Clock,
  Phone,
  User,
  ShieldCheck,
  Building,
  Info,
} from 'lucide-react';
import { pointBusRoutes } from '../data/mockData';

export const PointsLocationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPointNo, setSelectedPointNo] = useState<number | null>(1);

  const filteredRoutes = pointBusRoutes.filter((route) => {
    const query = searchQuery.toLowerCase();
    const matchesName = route.routeName.toLowerCase().includes(query);
    const matchesDriver = route.driverName.toLowerCase().includes(query);
    const matchesStop = route.stops.some((s) => s.toLowerCase().includes(query));
    const matchesPointNo = route.pointNo.toString().includes(query);
    return matchesName || matchesDriver || matchesStop || matchesPointNo;
  });

  const activeRoute = pointBusRoutes.find((r) => r.pointNo === selectedPointNo) || pointBusRoutes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Sindh University Points Pick & Drop Locations
              </h1>
              <p className="text-xs text-slate-500">
                Transport Section Jamshoro · Daily fleet schedule between Hyderabad, Kotri & Allama I.I. Kazi Campus
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
            Student Transport Fleet: <span className="font-semibold text-slate-900">35 Active Points</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by stop name (e.g. Latifabad, Qasimabad, Autobahn, Kotri)..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900"
          />
        </div>
        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filteredRoutes.length}</span> matching routes
        </div>
      </div>

      {/* Main Grid: Routes List & Route Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Route Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredRoutes.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-xs text-slate-500">
              No point bus routes matched your search.
            </div>
          ) : (
            filteredRoutes.map((route) => {
              const isSelected = route.pointNo === selectedPointNo;
              return (
                <div
                  key={route.pointNo}
                  onClick={() => setSelectedPointNo(route.pointNo)}
                  className={`bg-white border rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-900 ring-1 ring-blue-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-900 rounded font-mono">
                      Point #{route.pointNo}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Bus: {route.vehicleNo}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 leading-snug">
                    {route.routeName}
                  </h3>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3 h-3 text-blue-900" />
                      Depart: {route.morningPickupTime}
                    </span>
                    <span>·</span>
                    <span>Arrival: {route.campusArrivalTime}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Route Detailed Stoppage Timeline */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
          <div className="pb-4 border-b border-slate-200 mb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-bold bg-blue-900 text-white rounded font-mono">
                  Point No. {activeRoute.pointNo}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Vehicle Plate: {activeRoute.vehicleNo} (Seating: {activeRoute.capacity})
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {activeRoute.routeName}
              </h2>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
              <div className="font-semibold text-slate-800">Assigned Driver:</div>
              <div className="flex items-center gap-1 text-slate-900 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeRoute.driverName}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-900 font-mono text-[11px] mt-0.5">
                <Phone className="w-3 h-3 text-blue-800" />
                <span>{activeRoute.contactNo}</span>
              </div>
            </div>
          </div>

          {/* Schedule Times */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded border border-slate-200 text-xs mb-5">
            <div>
              <span className="text-slate-500 block text-[10px]">Morning First Pickup</span>
              <span className="font-bold text-blue-950 font-mono">{activeRoute.morningPickupTime}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Campus Arrival Time</span>
              <span className="font-bold text-emerald-800 font-mono">{activeRoute.campusArrivalTime}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Evening Return Departure</span>
              <span className="font-bold text-red-700 font-mono">{activeRoute.eveningDepartureTime}</span>
            </div>
          </div>

          {/* Stoppage Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Route Stoppage Sequence
            </h4>
            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
              {activeRoute.stops.map((stop, idx) => (
                <div key={idx} className="relative flex items-center justify-between">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-white border-2 border-blue-900 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900">
                      {stop}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {idx === 0
                        ? 'Origin Station'
                        : idx === activeRoute.stops.length - 1
                        ? 'Final Campus Terminal'
                        : `Designated Stoppage #${idx + 1}`}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Stop #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Section Help Desk */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Transport Incharge Helpline: 022-9213192</span>
            <span>Central Bus Terminal, University of Sindh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
