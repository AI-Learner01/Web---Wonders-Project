import { useState, useEffect } from "react";

/**
 * Admin Layout Component
 * 
 * This component serves as the main layout for the admin panel, providing navigation and rendering different sections based on the active page.
 * @returns JSX Element representing the admin layout
 * 
 */

import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import PendingQueries from "./PendingQueries";
import ResolvedQueries from "./ResolvedQueries";
import AdminOtpLogs from "./AdminOtpLogs";

// 📥 Reusable Cards Import
import ErrorModal from "../ReusableCards/ErrorModal.jsx";
import SuccessModal from "../ReusableCards/SuccessModal.jsx";

function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [pendingQueries, setPendingQueries] = useState([]);
  const [resolvedQueries, setResolvedQueries] = useState([]);
  const [otpLogs, setOtpLogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // 🔴 🟢 Modals State
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setIsErrorOpen(true);
  };

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setIsSuccessOpen(true);
  };

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
      } else {
        triggerError(data.message || "Failed to fetch pending queries.");
      }
    } catch (err) {
      console.error("Error fetching pending queries:", err);
      triggerError("Server error while fetching pending queries.");
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
      } else {
        triggerError(data.message || "Failed to fetch resolved queries.");
      }
    } catch (err) {
      console.error("Error fetching resolved queries:", err);
      triggerError("Server error while fetching resolved queries.");
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
      } else {
        triggerError(data.message || "Failed to fetch OTP logs.");
      }
    } catch (err) {
      console.error("Error fetching OTP logs:", err);
      triggerError("Server error while fetching OTP logs.");
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
        // 📩 Server ka exact success response render hoga
        triggerSuccess(data.message || "Query resolved successfully!");
      } else {
        // 📩 Server ka exact error message card me render hoga
        triggerError(data.message || "Failed to resolve query.");
        setActivePage("dashboard");
      }
    } catch (err) {
      console.error(err);
      triggerError(err.message || "Server connection failed.");
      setActivePage("dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800">
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

      {/* 🔴 ERROR MODAL CARD */}
      <ErrorModal
        isOpen={isErrorOpen}
        message={errorMsg}
        onClose={() => setIsErrorOpen(false)}
      />

      {/* 🟢 SUCCESS MODAL CARD */}
      <SuccessModal
        isOpen={isSuccessOpen}
        message={successMsg}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}

export default AdminLayout;