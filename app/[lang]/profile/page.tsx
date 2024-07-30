import React from "react";
import { getServerSession } from "next-auth";
import Profile from "@/app/[lang]/components/Profile";
import Login2 from "@/app/[lang]/components/Login2";
const ProfilePage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    return <Login2 />;
  }
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
