import React from 'react';

const ProfileSidebar = ({ activeTab, setActiveTab, userData }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '✈️' },
    { id: 'itineraries', label: 'Saved Itineraries', icon: '🗺️' },
    { id: 'favorites', label: 'Favorite Packages', icon: '❤️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }, // 👈 ADDED HERE
    { id: 'edit', label: 'Edit Profile', icon: '✏️' },
    { id: 'security', label: 'Security & Password', icon: '🔒' },
  ];

  const email = userData?.email || "user@domain.com";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between p-4 shrink-0">
      <div>
        <p className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Profile Menu
        </p>

        <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-[#167A44]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info */}
      <div className="hidden md:block border-t border-gray-100 pt-4 mt-auto">
        <p className="text-xs font-medium text-gray-700 truncate">{userData?.name || 'User'}</p>
        <p className="text-[11px] text-gray-400 truncate">{email}</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;