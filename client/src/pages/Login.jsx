import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Set loading to true when making the request

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      // Assuming your backend returns user data like { user: { name, email, avatar }, token }
      const { user, token } = response.data;

      // Store user in localStorage (for Navbar)
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.warn("User object is undefined. Login response:", response.data);
      }

      // Optional: store token too
      localStorage.setItem("authToken", token);

      setError(""); // Clear any previous error

      // Redirect to homepage or dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Failed to log in. Please check your credentials and try again.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Login</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome back! Please log in to your account.
        </p>
      </motion.div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
