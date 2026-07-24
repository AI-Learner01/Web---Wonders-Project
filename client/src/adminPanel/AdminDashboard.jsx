import React from "react";

// Admin Dashboard Component

/**
 * 
 *this component displays the admin dashboard with key metrics about customer inquiries.
 * @param {number} pendingCount - Number of pending queries
 * @param {number} resolvedCount - Number of resolved queries
 * @param {number} totalCount - Total number of queries (optional, defaults to sum of pending and resolved)
 * @returns JSX Element representing the admin dashboard
 */

function AdminDashboard({ pendingCount, resolvedCount, totalCount }) {//props destructuring for counts of queries
  const metrics = [
    {
      title: "Pending Queries",
      value: pendingCount,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-200",
      accent: "bg-amber-500",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Resolved Queries",
      value: resolvedCount,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-200",
      accent: "bg-emerald-500",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: "Total Queries",
      value: totalCount ?? pendingCount + resolvedCount,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-200",
      accent: "bg-indigo-500",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of customer inquiries and support status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between`}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 ${m.accent}`} />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{m.title}</span>
              <div className={`p-2.5 rounded-xl ${m.bgColor}`}>{m.icon}</div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${m.color}`}>
                {m.value}
              </span>
              <span className="text-xs text-gray-400 font-medium">tickets</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;