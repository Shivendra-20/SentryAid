import { FaUserShield } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { NavLink } from "react-router";
import { RiSkull2Fill } from "react-icons/ri";
import { FaChalkboard } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:bg-white lg:shadow-lg lg:flex-col lg:justify-between lg:min-h-screen pt-8">
      <div>
        <nav className="mt-6 space-y-2 middle">
          <NavLink
            to={"/admin"}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaUserShield className="mr-3" /> Admin Panel
          </NavLink>
          <NavLink
            to={"alertMessage"}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaMessage className="mr-3" /> Message
          </NavLink>
          <NavLink
            to={`/admin/heatMap`}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <RiSkull2Fill className="mr-3" /> Risk Zones
          </NavLink>
          <NavLink
            to={`/admin/bulletinBoard`}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            <FaChalkboard className="mr-3" /> Bulletin Board
          </NavLink>
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t hidden lg:flex">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/09/09/User-avatar-profile-icon-Graphics-17068385-1.jpg"
            alt="Profile"
            className="w-14 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Farah</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
