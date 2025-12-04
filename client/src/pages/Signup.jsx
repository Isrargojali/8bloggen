import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate(); // To navigate to another page after sign-up

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check for valid email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Set loading to true when making the request

    try {
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      // Store user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setError(""); // Clear any previous error

      // Redirect user to the homepage or dashboard
      navigate("/");

    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  const handleError = (err) => {
    if (err.response) {
      const statusCode = err.response.status;
      const message = err.response?.data?.error || "An unexpected error occurred";

      if (statusCode === 400) {
        if (message.includes("User already exists")) {
          setError("This email is already registered. Please log in.");
        } else {
          setError(message);
        }
      } else if (statusCode === 500) {
        setError("Internal server error. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else if (err.request) {
      setError("Network error. Please check your internet connection.");
    } else {
      setError("An unexpected error occurred.");
    }

    console.error("Signup error:", err);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Sign Up</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create an account to get started with ATT BlogGen!
        </p>
      </motion.div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Sign In Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
