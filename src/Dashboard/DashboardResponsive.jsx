import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AuthContext } from "../Contexts/AuthProvider";

const DashboardResponsive = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="drawer lg:drawer-open max-w-[100vw]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col-reverse w-[100vw] lg:w-[65vw] xl:w-[72vw] mx-auto">
        <Dashboard></Dashboard>
        {/* Page content here */}
        <div className="navbar bg-base-300 lg:hidden justify-between">
          <Link to="/" className="shrink-0">
            <h2 className={`ml-2 text-2xl font-bold gradient-text`}>
              Dashboard
            </h2>
          </Link>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost hover:bg-inherit text-xl drawer-button"
          >
            <FaBars />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content dashboard flex-nowrap overflow-auto">
          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <h2 className={`ml-2 text-2xl lg:ps-0 font-bold gradient-text`}>
                Dashboard
              </h2>
            </div>
          </div>
          <div className="flex gap-3 p-4 mb-4 bg-neutral/10 rounded-md">
            <div className="mask mask-squircle w-8 h-8">
              {/* admin photo */}
              <img src={user?.photoURL} />
            </div>
            <div>
              <h3 className="font-bold text-neutral"></h3>
              <p className="opacity-60 text-xs">admin</p>
            </div>
          </div>
          {/* Sidebar content here */}
          {/* 
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-classes">Manage Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
              </li>
            </>
          )} */}

          <div className="divider" />

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/instructors"></NavLink>
          </li>
          <li>
            <NavLink to="/classes"></NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardResponsive;
