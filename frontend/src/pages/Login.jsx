import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import api from "../api/axios";

export default function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setRole(res.data.role);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-cyan-500">
      
      <div className="flex flex-col md:flex-row bg-white">
        <div className="w-full p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center md:text-left">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Login to manage surgeries, doctors, patients, and operation theatres.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-500 text-center md:text-left">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-semibold cursor-pointer hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
