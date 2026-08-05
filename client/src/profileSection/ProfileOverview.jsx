import React from 'react';

const ProfileOverview = ({ userData, setActiveTab }) => {
  if (!userData) return null;

  // Real DB Fields mapping (name, email, phone, role/status)
  const name = userData.name || userData.fullName || "User";
  const email = userData.email || "N/A";
  const phone = userData.phone || "N/A";
  const role = userData.role ? userData.role.toUpperCase() : "USER";

  const getInitial = () => {
    return name ? name.trim()[0].toUpperCase() : 'U';
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#167A44] text-white font-bold text-2xl flex items-center justify-center shadow-md shrink-0">
            {getInitial()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">{name}</h2>
              <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md ${
                role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {role}
              </span>
            </div>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('edit')}
          className="text-sm bg-emerald-50 text-[#167A44] px-4 py-2 rounded-lg font-semibold hover:bg-emerald-100 transition self-start sm:self-auto flex items-center gap-1.5"
        >
          <span>Edit Profile</span>
          <span>✏️</span>
        </button>
      </div>

      {/* Details Card */}
      <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Full Name
            </span>
            <span className="text-gray-800 font-semibold text-base">{name}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Email Address
            </span>
            <span className="text-gray-800 font-semibold text-base">{email}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Phone Number
            </span>
            <span className="text-gray-800 font-semibold text-base">{phone}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Account Status
            </span>
            <div>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold inline-block">
                Active Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;