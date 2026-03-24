"use client";

import { getUserSupabase } from "@/lib/getUserSupabase";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = () => {
  const { data: userInfo, isPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserSupabase,
    initialData: {
      profile: null,
      user: null,
    },
  });
  return {
    userInfo,
    isPending,
  };
};

export default useUserProfile;
