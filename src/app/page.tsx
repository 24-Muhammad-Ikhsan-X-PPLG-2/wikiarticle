import { createClient } from "@/supabase/server";
import Landing from "@/features/landing/client";
import { getUserSupabase } from "@/lib/getUserSupabase";

const Home = async () => {
  const { profile, user } = await getUserSupabase();
  return <Landing user={user} profile={profile} />;
};

export default Home;
