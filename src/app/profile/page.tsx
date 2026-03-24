import appName from "@/constants/appName";
import ProfileClient from "@/features/profile/client";
import { getUserSupabase } from "@/lib/getUserSupabase";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${appName} - Profile Settings`,
};

const Profile = async () => {
  const { profile, user } = await getUserSupabase();
  if (!profile || !user) {
    return redirect("/login");
  }
  return <ProfileClient profile={profile} user={user} />;
};

export default Profile;
