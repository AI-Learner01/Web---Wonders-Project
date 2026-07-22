import { useState } from "react";

function PendingQueries({ pending, solve }) {
  const [reply, setReply] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  function handleReplyChange(id, value) {
    setReply((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleResolve(queryId) {
    const message = reply[queryId]?.trim();

    if (!message) {
      alert("Error - Reply cannot be empty");
      return;
    }

    setLoadingId(queryId);

    // Call layout function with ID & message
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
              <strong>Contact:</strong> {query.contact}
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
    </div>
  );
}

export default PendingQueries;