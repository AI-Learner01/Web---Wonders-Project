import React, { useState } from "react";

/**
 * Send Notification Component
 * 
 * Allows Admin to broadcast notifications & emails to all registered users.
 */
function SendNotification({ triggerSuccess, triggerError }) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "SYSTEM",
    link: "",
    sendEmailFlag: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.message.trim()) {
      triggerError("Title and Message cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/notifications/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        triggerSuccess(data.message || "Notification sent to all users!");
        // Reset Form
        setFormData({
          title: "",
          message: "",
          type: "SYSTEM",
          link: "",
          sendEmailFlag: true,
        });
      } else {
        triggerError(data.message || "Failed to broadcast notification.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Server connection failed. Could not send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Broadcast Notification
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Send in-app notifications and emails to all registered users.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Notification Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 🌴 New Kerala Backwaters Package Added!"
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Notification Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="SYSTEM">⚡ SYSTEM (Notice / Update)</option>
                <option value="PACKAGE_ADD">🏖️ PACKAGE_ADD (New Package)</option>
                <option value="OFFER">🏷️ OFFER (Discount / Promo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Redirect Link (Optional)
              </label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="e.g. /packages"
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write detailed notification message for users..."
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="sendEmailFlag"
              name="sendEmailFlag"
              checked={formData.sendEmailFlag}
              onChange={handleChange}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
            <label htmlFor="sendEmailFlag" className="text-sm font-medium text-gray-700 cursor-pointer">
              📧 Send Email Notification to all active users
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all shadow-md ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
              }`}
            >
              {loading ? "Broadcasting..." : "📢 Broadcast Notification Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendNotification;