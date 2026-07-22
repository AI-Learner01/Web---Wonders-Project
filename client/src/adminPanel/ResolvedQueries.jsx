function ResolvedQueries({ resolved }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Resolved Queries</h1>

      {resolved.length === 0 ? (
        <p className="text-gray-500">No Resolved Queries</p>
      ) : (
        resolved.map((query) => (
          <div key={query._id} className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
            <h2 className="text-xl font-bold">{query.topic}</h2>

            <p className="mt-2">
              <span className="font-semibold">Contact:</span> {query.contact}
            </p>

            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Message:</span> {query.message}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              <span className="font-semibold">Created:</span>{" "}
              {new Date(query.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ResolvedQueries;