function AdminSidebar({ activePage, setActivePage }) {

    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen">

            <button
                onClick={() => setActivePage("dashboard")}
                className={`block w-full text-left px-6 py-4 ${
                    activePage === "dashboard"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                }`}
            >
                Dashboard
            </button>

            <button
                onClick={() => setActivePage("pending")}
                className={`block w-full text-left px-6 py-4 ${
                    activePage === "pending"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                }`}
            >
                Pending Queries
            </button>

            <button
                onClick={() => setActivePage("resolved")}
                className={`block w-full text-left px-6 py-4 ${
                    activePage === "resolved"
                        ? "bg-green-100"
                        : "hover:bg-green-100"
                }`}
            >
                Resolved Queries
            </button>

        </aside>
    );
}

export default AdminSidebar;