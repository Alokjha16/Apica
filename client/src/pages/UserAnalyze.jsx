import React, { useEffect, useState } from "react";

const UserAnalyze = () => {
  const [users, setUsers] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleRecommendation = async (id) => {
    setLoadingId(id);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/recommendation`
      );
      const data = await res.json();

      setRecommendations((prev) => ({
        ...prev,
        [id]: data.recommendation,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User AI Analysis</h1>

      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Income: ₹{user.monthlyIncome}</p>
            <p>Balance: ₹{user.accountBalance}</p>

            <button
              onClick={() => handleRecommendation(user._id)}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              disabled={loadingId === user._id}
            >
              {loadingId === user._id
                ? "Analyzing..."
                : "Get Recommendation"}
            </button>

            {recommendations[user._id] && (
              <div className="mt-4 bg-gray-100 p-3 rounded-lg whitespace-pre-line">
                {recommendations[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnalyze;
