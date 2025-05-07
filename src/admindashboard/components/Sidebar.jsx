import { NavLink, useLocation } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaBox,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <FaHome size={18} /> },
    { path: "/admin/products", name: "Products", icon: <FaBox size={18} /> },
    { path: "/admin/users", name: "Users", icon: <FaUsers size={18} /> },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <FaShoppingCart size={18} />,
    },
  ];

  const handleOverlayClick = (e) => {
    if (isMobile && isOpen && e.target === e.currentTarget) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleOverlayClick}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {isOpen ? (
            <p className="font-semibold text-gray-800 text-xl">Admin Panel</p>
          ) : (
            <span className="text-xl font-bold text-primary-600"></span>
          )}
          {isMobile ? (
            <button onClick={toggleSidebar} className="lg:hidden">
              <FaTimes className="text-gray-500" />
            </button>
          ) : (
            <button onClick={toggleSidebar} className="hidden lg:block">
              {isOpen ? (
                <FaChevronLeft className="text-gray-500" />
              ) : (
                <FaChevronRight className="text-gray-500" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } ${!isOpen ? "justify-center" : ""}`
                  }
                >
                  <span className="text-current">{item.icon}</span>
                  {isOpen && (
                    <span className="ml-3 text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
