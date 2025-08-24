import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile({ role, setRole }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        alert("Failed to load profile. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token"); 
      setRole(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);

      if (err.response) {
        alert(`Logout failed: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        alert("Logout failed: No response from server");
      } else {
        alert("Logout failed: " + err.message);
      }
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {user ? (
        <div className="border rounded p-4 bg-gray-50">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Unable to load profile.</p>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
