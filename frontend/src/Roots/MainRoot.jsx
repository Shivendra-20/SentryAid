import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Common Components/Navbar";

const MainRoot = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <div>
      {!isRoot && <Navbar />}
      <Outlet />
    </div>
  );
};

export default MainRoot;
