function AdminSidebar({ activePage, setActivePage }) {

    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen">

            <button
                onClick={() => setActivePage("dashboard")}
                className={`block w-full text-left px-6 py-4 ${activePage === "dashboard"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                    }`}
            >
                Dashboard
            </button>

            <button
                onClick={() => setActivePage("pending")}
                className={`block w-full text-left px-6 py-4 ${activePage === "pending"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                    }`}
            >
                Pending Queries
            </button>

            <button
                onClick={() => setActivePage("resolved")}
                className={`block w-full text-left px-6 py-4 ${activePage === "resolved"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                    }`}
            >
                Resolved Queries
            </button>

            <button
                onClick={() => setActivePage("admin-otps")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activePage === "admin-otps"
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                Admin OTP Logs
            </button>

        </aside>
    );
}

export default AdminSidebar;