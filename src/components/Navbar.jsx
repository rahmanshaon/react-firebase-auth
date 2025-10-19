import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  // Get user and logOut function from context
  const { user, logOut } = useContext(AuthContext);
  console.log("Navbar rendering. Current user:", user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {/* Only show profile link if user is logged in */}
      {user && (
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          React Auth
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          // If user is logged in, show their info and a logout button
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* Use user's photo or a default one */}
                <img
                  src={user.photoURL || "https://i.ibb.co.com/zWY7nWbW/user.png"}
                  alt="user profile"
                />
              </div>
            </div>
            <span>{user.displayName || "No Name"}</span>
            <button onClick={handleLogOut} className="btn btn-sm btn-ghost">
              Sign Out
            </button>
          </div>
        ) : (
          // If no user, show the login button
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
