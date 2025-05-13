import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Sidebar from "../pages/Sidebar"; // ✅ your correct path
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(response.data.user.name);
        setEmail(response.data.user.email);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError("Failed to fetch user data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsUpdating(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You are not logged in.");
      navigate("/login");
      return;
    }

    if (!name || !email) {
      setError("Name and email are required.");
      setIsUpdating(false);
      return;
    }

    try {
      const payload = { name, email };
      if (password.trim()) payload.password = password;

      const response = await axios.put("/api/auth/user", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setPassword("");
      alert("Account updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || "Failed to update account.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin text-xl text-blue-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <h2 className="text-3xl font-semibold mb-6">Update Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (optional)"
          />
          <Button
            label={isUpdating ? "Updating..." : "Update Account"}
            className={`bg-blue-500 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdating}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
