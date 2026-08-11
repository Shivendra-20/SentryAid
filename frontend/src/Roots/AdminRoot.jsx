import { Outlet } from "react-router";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { RiSkull2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import { FaChalkboard } from "react-icons/fa";

const AdminRoot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-pink-50">
      {/* Mobile Header / Hamburger */}
      <div
        className={`lg:hidden ${
          isOpen ? "bg-white" : "bg-pink-50"
        }  shadow-md px-4 py-3 flex items-center justify-between`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-2 space-y-2 border-b">
          <NavLink
            to={"/admin"}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaUserShield className="inline mr-2" /> Admin Panel
          </NavLink>
          <NavLink
            to={"alertMessage"}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaMessage className="inline mr-2" /> Message
          </NavLink>
          <NavLink
            to={`/admin/heatMap`}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <RiSkull2Fill className="inline mr-2" /> Risk Zones
          </NavLink>
          <NavLink
            to={`/admin/bulletinBoard`}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaChalkboard className="inline mr-2" /> Bulletin Board
          </NavLink>
        </div>
      )}

      {/* Sidebar + Content for large screens */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar className="hidden lg:block w-64 flex-shrink-0" />

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-full sm:max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminRoot;
