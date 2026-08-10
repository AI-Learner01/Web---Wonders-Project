import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 1. Import Link

const ChangePassword = ({ userData, triggerSuccess, triggerError, setActiveTab }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      triggerError("New passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userData?.email,
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        }),
      });

      const result = await res.json();

      if (result.success) {
        triggerSuccess("Password changed successfully!");
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setActiveTab('overview');
      } else {
        triggerError(result.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      triggerError("Server error occurred while updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-lg w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Security & Password</h2>
      <p className="text-xs text-gray-500 mb-6">Update your password to keep your account safe.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CURRENT PASSWORD FIELD */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              Current Password
            </label>
            {/* 🔑 FORGOT PASSWORD LINK (React Router) */}
            <Link
              to="/forgotpassword"
              className="text-xs text-[#167A44] font-medium hover:underline focus:outline-none"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={passwords.currentPassword}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          />
        </div>

        {/* NEW PASSWORD FIELD */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            New Password
          </label>
          <input
            type="password"
            required
            value={passwords.newPassword}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
        </div>

        {/* CONFIRM NEW PASSWORD FIELD */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            required
            value={passwords.confirmPassword}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#167A44] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#125E36] transition shadow-sm text-sm disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;