import React, { useEffect } from "react";

const ProfileNotifications = ({
  notifications = [],
  loading = false,
  onMarkAsRead = () => {},
  refreshNotifications = () => {},
}) => {
  // Profile tab visible hone par backend me unreadNotifications array empty kar do
  useEffect(() => {
    onMarkAsRead();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <div className="p-2 bg-emerald-100 text-[#167A44] rounded-full shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="p-2 bg-amber-100 text-amber-600 rounded-full shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-blue-100 text-blue-600 rounded-full shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const handleNotificationClick = (link) => {
    if (!link || link.trim() === "") return;
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs flex justify-center items-center h-64 text-gray-500 font-medium">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          <p className="text-xs text-gray-500 mt-1">
            Stay updated with your bookings and account activity.
          </p>
        </div>

        <div>
          <button
            onClick={refreshNotifications}
            className="text-xs text-gray-600 hover:text-gray-800 font-semibold px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center gap-1.5"
          >
            <span>Refresh</span>
            <span>🔄</span>
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-gray-500 font-medium">No notifications available</p>
          </div>
        ) : (
          notifications.map((item) => {
            const notificationId = item._id || item.id;
            const hasLink = Boolean(item.link && item.link.trim() !== "");

            return (
              <div
                key={notificationId}
                className="flex items-start justify-between gap-4 p-4 rounded-xl border bg-white border-gray-100 shadow-2xs hover:border-gray-200 transition"
              >
                <div
                  onClick={() => handleNotificationClick(item.link)}
                  className={`flex items-start gap-3 flex-1 ${hasLink ? "cursor-pointer" : ""}`}
                >
                  {getIcon(item.type)}
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 flex-wrap">
                      <span>{item.title}</span>
                      {hasLink && (
                        <span className="text-[10px] bg-emerald-50 text-[#167A44] px-1.5 py-0.5 rounded font-medium border border-emerald-100">
                          Click to view ↗
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">{item.message}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block font-medium">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProfileNotifications;