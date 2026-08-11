import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import VolunteerNavbar from "../Components/Volunteer/VolunteerNavbar";

const VolunteerRoot = () => {
  const [volunteerInfo, setVolunteerInfo] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("volunteer"));
    setVolunteerInfo(user);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* Navbar / Sidebar */}
      <VolunteerNavbar volunteerInfo={volunteerInfo} />

      {/* Main content */}
      <div className="flex-1">
        {/* lg:ml-64 adds left margin on large screens to prevent overlap */}
        <Outlet />
      </div>
    </div>
  );
};

export default VolunteerRoot;
