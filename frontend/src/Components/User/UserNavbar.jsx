import { FaUser, FaTachometerAlt, FaUserShield } from "react-icons/fa";
import { FaChalkboard } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router";
import { RiSkull2Fill } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";

const UserNavbar = ({ userInfo }) => {
  return (
    <aside className="w-full lg:w-64 bg-white shadow-lg flex flex-col justify-between h-full lg:pt-8">
      <div>
        <nav className="lg:mt-6 space-y-2 middle">
          <NavLink
            to={`/users/${userInfo._id}`}
            end
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <FaTachometerAlt className="mr-3" /> Dashboard
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/volunteerRanking`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <FaRankingStar className="mr-3" /> Ranking
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/volunteerRanking`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <FaUserShield className="mr-3" /> Incident Report
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/editProfile`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <AiFillEdit className="mr-3" /> Edit Profile
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/heatMap`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <RiSkull2Fill className="mr-3" /> Risk Zones
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/sos`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
          >
            <FaHandsHelping className="mr-3" /> Send SOS
          </NavLink>
          <NavLink
            to={`/users/${userInfo._id}/bulletinBoard`}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-pink-50 rounded-lg"
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
            <p className="text-sm font-semibold">{userInfo.name}</p>
            <p className="text-xs text-gray-500">{userInfo.type}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserNavbar;
