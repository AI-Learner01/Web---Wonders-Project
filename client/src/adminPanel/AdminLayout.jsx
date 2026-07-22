import { useState, useEffect } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import PendingQueries from "./PendingQueries";
import ResolvedQueries from "./ResolvedQueries";
import AdminOtpLogs from "./AdminOtpLogs"; // 👈 1. Naya Component Import Kiya

function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  const [pendingQueries, setPendingQueries] = useState([]);
  const [resolvedQueries, setResolvedQueries] = useState([]);
  const [otpLogs, setOtpLogs] = useState([]); // 👈 2. OTP Logs State
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPendingQueries();
    fetchResolvedQueries();
    checkCurrentUser();
    fetchAdminOtpLogs(); // 👈 3. Call on load
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

  // 👈 4. Naya API Function Admin OTP Logs Ke Liye
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

  // Final resolve function
  async function handleQueryResolved(queryId, message) {
    try {
      const response = await fetch("http://localhost:5000/admin/resolve-query", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: queryId,
          message: message,
          resolvedBy: currentUser?.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Okay query has resolved");
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 p-8">
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

          {/* 👈 5. Naya Page Route */}
          {activePage === "admin-otps" && (
            <AdminOtpLogs logs={otpLogs} refreshLogs={fetchAdminOtpLogs} />
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;