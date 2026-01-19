import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import BlogManagement from "./pages/BlogManagement";
import CreateBlog from "./pages/CreateBlog";
import BlogView from "./pages/BlogView";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar stays fixed at the top */}
      <Navbar />
      
      {/* ChatBox for contact */}
      <ChatBox />

      {/* Padding top to avoid content going under the navbar */}
      <div className="pt-20 px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/account-settings" element={<AccountSettings />} />
          <Route path="/dashboard/blogs" element={<BlogManagement />} />
          <Route path="/dashboard/blogs/create" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/dashboard/blogs/edit/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
