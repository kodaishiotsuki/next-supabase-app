"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";

import Loading from "../../loading";

// プロフィール
const Profile = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loadingLogout, setLoadingLogout] = useState(false);

  // ログアウト
  const logout = async () => {
    setLoadingLogout(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setLoadingLogout(false);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center">
        {loadingLogout ? (
          <Loading />
        ) : (
          <div
            className="inline-block text-red-500 cursor-pointer"
            onClick={logout}
          >
            ログアウト
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
