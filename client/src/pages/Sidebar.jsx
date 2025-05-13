// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserCog, FaPenFancy, FaPlus, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  const navItems = [
    { label: "Home", path: "/dashboard", icon: <FaHome /> },
    { label: "Account Settings", path: "/dashboard/account-settings", icon: <FaUserCog /> },
    { label: "Blog Management", path: "/dashboard/blogs", icon: <FaPenFancy /> },
    { label: "Create Blog", path: "/dashboard/blogs/create", icon: <FaPlus /> },
  ];

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  // Listen for screen size changes
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // initialize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`min-h-screen bg-white border-r shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="px-4 py-6 flex flex-col gap-6">
        {/* Toggle Button for Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-blue-600 self-end"
        >
          <FaBars size={20} />
        </button>

        {/* Logo or title */}
        {!collapsed && (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
        )}

        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
