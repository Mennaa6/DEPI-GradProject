import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../assets/logo2.png";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample notifications
  const notifications = [
    { id: 1, text: "New order received", time: "5 min ago", unread: true },
    { id: 2, text: "Server error reported", time: "1 hour ago", unread: true },
    { id: 3, text: "New user registered", time: "2 hours ago", unread: false },
    { id: 4, text: "Monthly report ready", time: "Yesterday", unread: false },
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left: Toggle button and logo */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <FaBars size={18} />
          </button>

          <div className="hidden md:flex items-center ml-3  rounded-md px-3 py-1.5">
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Right: Notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none relative"
            >
              <FaBell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                        notification.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full ${
                            notification.unread ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-800">
                            {notification.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none relative">
            <FaEnvelope size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center"
            >
              <img alt="User" className="w-8 h-8 rounded-full object-cover" />
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-700"></span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800"></p>
                  <p className="text-xs text-gray-500 truncate"></p>
                </div>
                <a
                  href="#profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaUserCircle className="mr-3 text-gray-500" />
                  Profile
                </a>
                <a
                  href="#settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCog className="mr-3 text-gray-500" />
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-3 text-gray-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
