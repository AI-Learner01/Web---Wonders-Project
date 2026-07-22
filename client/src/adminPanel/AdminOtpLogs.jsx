import React from 'react';

function AdminOtpLogs({ logs = [] }) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
                Admin OTP Logs
            </h1>
            <p className="text-gray-500 mb-8">
                Monitored OTP attempts made on Developer & Admin email accounts.
            </p>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 text-sm font-semibold text-gray-600">Admin Email</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">OTP Code</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Date & Time</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Security Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-semibold text-gray-800">{log.email}</td>
                                    <td className="p-4 font-mono text-red-600">{log.otp || 'N/A'}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {log.createdAt ? new Date(log.createdAt).toLocaleString() : 'Recently'}
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            Admin Protected
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-400">
                                    No admin OTP attempts recorded.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminOtpLogs;