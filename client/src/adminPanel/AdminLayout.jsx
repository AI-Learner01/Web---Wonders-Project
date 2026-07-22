import { useState, useEffect } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import PendingQueries from "./PendingQueries";
import ResolvedQueries from "./ResolvedQueries";
import AdminOtpLogs from "./AdminOtpLogs";

function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [pendingQueries, setPendingQueries] = useState([]);
  const [resolvedQueries, setResolvedQueries] = useState([]);
  const [otpLogs, setOtpLogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPendingQueries();
    fetchResolvedQueries();
    checkCurrentUser();
    fetchAdminOtpLogs();
  }, []);

  async function checkCurrentUser() {
    try {
      const response = await fetch("http://localhost:5000/auth/verify-token", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser({ email: data.email, role: data.role });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchPendingQueries() {
    try {
      const response = await fetch("http://localhost:5000/admin/pending-queries", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setPendingQueries(data.queries ?? []);
      }
    } catch (err) {
      console.error("Error fetching pending queries:", err);
    }
  }

  async function fetchResolvedQueries() {
    try {
      const response = await fetch("http://localhost:5000/admin/resolved-queries", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setResolvedQueries(data.queries ?? []);
      }
    } catch (err) {
      console.error("Error fetching resolved queries:", err);
    }
  }

  async function fetchAdminOtpLogs() {
    try {
      const response = await fetch("http://localhost:5000/admin/admin-otp", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setOtpLogs(data.otpLogs ?? []);
      }
    } catch (err) {
      console.error("Error fetching OTP logs:", err);
    }
  }

  async function handleQueryResolved(queryId, message) {
    try {
      const response = await fetch("http://localhost:5000/admin/resolve-query", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: queryId,
          message: message,
          resolvedBy: currentUser?.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPendingQueries();
        await fetchResolvedQueries();
        setActivePage("dashboard");
      } else {
        alert("Error - " + (data.message || "Failed to resolve query"));
        setActivePage("dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error - " + err.message);
      setActivePage("dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-tight text-gray-900">
            Aura<span className="text-emerald-600">Avenue</span>
          </span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-md">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">
            {currentUser?.email || "admin@aura.com"}
          </span>
          <button className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold px-4 py-2 rounded-xl transition duration-200">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1">
        <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          {activePage === "dashboard" && (
            <AdminDashboard
              pendingCount={pendingQueries.length}
              resolvedCount={resolvedQueries.length}
              totalCount={pendingQueries.length + resolvedQueries.length}
            />
          )}

          {activePage === "pending" && (
            <PendingQueries
              pending={pendingQueries}
              solve={handleQueryResolved}
            />
          )}

          {activePage === "resolved" && (
            <ResolvedQueries resolved={resolvedQueries} />
          )}

          {activePage === "admin-otps" && (
            <AdminOtpLogs logs={otpLogs} refreshLogs={fetchAdminOtpLogs} />
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;