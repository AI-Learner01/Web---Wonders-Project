import React, { useState, useEffect } from 'react';

const EditProfile = ({ userData, refreshProfile, triggerSuccess, triggerError, setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    city: 'Surat',
    postalCode: '395007'
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill DB Data on mount or userData prop update
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        country: userData.country || 'India',
        city: userData.city || 'Surat',
        postalCode: userData.postalCode || '395007'
      });
    }
  }, [userData]);

  const getInitial = () => {
    return formData.name && formData.name.trim().length > 0
      ? formData.name.trim()[0].toUpperCase()
      : 'U';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Endpoint to update user details
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,"ngrok-skip-browser-warning": "true"},
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        triggerSuccess(result.message || "Profile updated successfully!");
        if (refreshProfile) refreshProfile();
        setActiveTab('overview');
      } else {
        triggerError(result.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      triggerError("Server communication error while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-5">
        <div className="w-16 h-16 rounded-full bg-[#167A44] text-white font-bold text-2xl flex items-center justify-center shadow-md shrink-0">
          {getInitial()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {formData.name || 'User Profile'}
          </h2>
          <p className="text-sm text-gray-500">
            {formData.city}, {formData.country}
          </p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Email Address (Read Only)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
            Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-[#167A44] transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="px-5 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-200 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#167A44] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#125E36] transition shadow-sm text-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;