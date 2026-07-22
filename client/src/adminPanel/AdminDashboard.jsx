function AdminDashboard({pendingCount, resolvedCount}) {

    return (
        <>
            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Pending Queries</h2>
                    <p className="text-5xl font-bold text-yellow-500 mt-3">
                        {pendingCount}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Resolved Queries</h2>
                    <p className="text-5xl font-bold text-green-600 mt-3">
                        {resolvedCount}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Total Queries</h2>
                    <p className="text-5xl font-bold text-blue-600 mt-3">
                        {pendingCount + resolvedCount}
                    </p>
                </div>

            </div>
        </>
    );
}

export default AdminDashboard;