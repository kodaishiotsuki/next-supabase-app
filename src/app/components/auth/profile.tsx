"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../loading";
import useStore from "@/store";
import Image from "next/image";

// プロフィール
const Profile = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const nameRef = useRef<HTMLInputElement>(null!);
  const [email, setEmail] = useState<string>(null!);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  //画像のアップロード
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // ファイルを取得
      const files = e.target.files;
      if (files?.length) {
        setAvatar(files[0]);
        // 画像をプレビュー
        const reader = new FileReader();
        // ファイル読み込み後の処理
        reader.onloadend = function () {
          setAvatarUrl(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      }
    },
    []
  );

  useEffect(() => {
    if (user?.id) {
      // プロフィール取得
      const getProfile = async () => {
        const { data: userData, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();

        // プロフィール取得失敗
        if (error) {
          alert(error.message);
          return;
        }

        // 名前設定
        if (userData.name) {
          nameRef.current.value = userData.name;
        }

        // 画像URL設定
        if (userData.avatar_url) {
          setAvatarUrl(userData.avatar_url);
        }
      };

      getProfile();
      setEmail(user.email!);
    }
  }, [user, supabase]);

  // プロフィールの更新
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let newAvatarUrl = avatarUrl;

    // 画像をアップロードした場合
    if (avatar) {
      const { data: uploadedData, error: uploadError } = await supabase.storage
        .from("profile")
        .upload(`${user?.id}/${uuidv4()}`, avatar);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const oldAvatarPath = avatarUrl?.split("/").slice(-1)[0];
      // 古い画像を削除
      if (oldAvatarPath) {
        await supabase.storage
          .from("profile")
          .remove([`${user?.id}/${oldAvatarPath}`]);
      }

      // 画像のURLを取得
      const { data: urlData } = await supabase.storage
        .from("profile")
        .getPublicUrl(uploadedData.path);

      newAvatarUrl = urlData.publicUrl;
    }

    // プロフィール更新
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: nameRef.current.value,
        avatar_url: newAvatarUrl,
      })
      .eq("id", user?.id);

    if (updateError) {
      alert(updateError.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
    setLoading(false);
  };

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
      <form onSubmit={updateProfile}>
        <div className="mb-5">
          <label className="flex justify-center mb-5 cursor-pointer">
            <input type="file" onChange={onUploadImage} className="hidden" />
            <Image
              src={avatarUrl || "/default.png"}
              className="rounded-full"
              alt="avatar"
              width={100}
              height={100}
            />
          </label>
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">名前</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={nameRef}
            type="text"
            id="name"
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">メールアドレス</div>
          <div>{email}</div>
        </div>

        <div className="text-center mb-10">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full text-white bg-yellow-500 hover:brightness-110 rounded py-1 px-8"
            >
              変更
            </button>
          )}
        </div>
      </form>

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
