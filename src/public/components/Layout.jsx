"use client";

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Info,
  Menu,
  X,
  Moon,
  Sun,
  Paperclip,
  User,
  MonitorCog,
} from "lucide-react";
import useDarkMode from "../../store/darkMode";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, SetDarkMode, SetLightMode } = useDarkMode();
  console.log(isDarkMode);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    // setIsDarkMode();
    console.log(isDarkMode);

    if (isDarkMode == "true") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
      SetLightMode();
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
      SetDarkMode();
    }
  };

  const menuItems = [
    { icon: Paperclip, text: "Report", path: "/" },
    { icon: User, text: "Employee", path: "/employee" },
  ];

  return (
    <div className={`h-screen flex ${isDarkMode == "true" ? "dark" : ""}`}>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-border
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          dark:bg-gray-800 dark:border-gray-700
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border dark:border-gray-700">
          <span
            className={`md:text-md text-sm w-full font-semibold  flex items-center justify-center gap-3  ${
              isDarkMode == "true" ? "text-white" : "text-black"
            }`}
          >
            <span>Daily Report System</span> <MonitorCog />
          </span>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md lg:hidden hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={20} className="mr-3" />
              <span>{item.text}</span>
            </NavLink>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="absolute bottom-0 w-full border-t border-border p-4 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full px-4 py-3 text-sm rounded-md text-foreground hover:bg-muted dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isDarkMode == "false" ? (
              <>
                <Sun size={20} className="mr-3" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={20} className="mr-3" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center h-16 px-6 border-b border-border dark:border-gray-700 bg-background dark:bg-gray-800">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-muted dark:hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-secondary p-6 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
