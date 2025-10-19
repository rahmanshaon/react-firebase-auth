import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  console.log("Main layout is rendering.");
  return (
    // Use flexbox to structure the layout
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* The 'flex-grow' class makes this div take up all available space */}
      <main className="flex-grow p-8">
        <Outlet />
      </main>

      <footer className="text-center p-4 bg-gray-800 text-white">
        This is the footer
      </footer>
    </div>
  );
};

export default MainLayout;
