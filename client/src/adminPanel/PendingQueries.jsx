import { useState } from "react";

/**
 * 
 * Pending Queries Component
 * 
 * This component displays a list of pending customer queries, allowing the admin to view details and respond to each query.
 */

// 📥 Reusable Error Modal Import
import ErrorModal from "../ReusableCards/ErrorModal.jsx";

function PendingQueries({ pending, solve }) {
  const [reply, setReply] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  // 🔴 Error Modal State
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setIsErrorOpen(true);
  };

  function handleReplyChange(id, value) {
    setReply((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleResolve(queryId) {
    const message = reply[queryId]?.trim();

    if (!message) {
      triggerError("Reply message cannot be empty.");// Trigger error modal if reply is empty
      return;
    }

    setLoadingId(queryId);

    // Call layout function with ID & message (Errors inside solve will be handled by AdminLayout)
    await solve(queryId, message);

    setLoadingId(null);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Pending Queries</h1>

      {pending.length === 0 ? (
        <p className="text-gray-500">No Pending Queries</p>
      ) : (
        pending.map((query) => (
          <div key={query._id} className="bg-white rounded-xl shadow-md border p-5">
            <h2 className="text-xl font-bold">{query.topic}</h2>

            <p className="mt-2">
              <strong>Contact:</strong> {query.contact || query.emailOrPhone}
            </p>

            <p className="mt-2">
              <strong>Message:</strong> {query.message}
            </p>

            <textarea
              className="w-full mt-4 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              placeholder="Write your reply..."
              value={reply[query._id] || ""}
              onChange={(e) => handleReplyChange(query._id, e.target.value)}
            />

            <button
              disabled={loadingId === query._id}
              onClick={() => handleResolve(query._id)}
              className={`mt-4 px-5 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                loadingId === query._id
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loadingId === query._id ? "Resolving..." : "Resolve"}
            </button>
          </div>
        ))
      )}

      {/* 🔴 ERROR MODAL CARD */}
      <ErrorModal
        isOpen={isErrorOpen}
        message={errorMsg}
        onClose={() => setIsErrorOpen(false)}
      />
    </div>
  );
}

export default PendingQueries;