"use client";

import { getUserSupabase } from "@/lib/getUserSupabase";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUserProfile = () => {
  const [userInfo, setUserInfo] = useState<{
    user: User | null;
    profile: ProfileDB | null;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    (async () => {
      setIsPending(true);
      const res = await getUserSupabase();
      setIsPending(false);
      setUserInfo(res);
    })();
  }, []);
  return {
    userInfo,
    isPending,
  };
};

export default useUserProfile;
