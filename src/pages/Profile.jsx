import React from "react";

const Profile = () => {
  console.log("Profile page is rendering.");
  return (
    <div>
      <h1 className="text-4xl font-bold">User Profile Page</h1>
      <p>This page should only be visible to logged-in users.</p>
    </div>
  );
};

export default Profile;
