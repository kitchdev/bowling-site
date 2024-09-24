import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/app/[lang]/components/Profile";
import Login from "@/app/[lang]/components/Login";
import { Locale } from "@/i18n-config";

const ProfilePage: React.FC = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Login />;
  }
  return (
    <>
      <Profile lang={lang} session={session} />
    </>
  );
};

export default ProfilePage;
