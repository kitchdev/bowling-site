import React from "react";
import { getServerSession } from "next-auth";
import Profile from "@/app/[lang]/components/Profile";
import Login from "@/app/[lang]/components/Login";
const ProfilePage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    return <Login />;
  }
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
