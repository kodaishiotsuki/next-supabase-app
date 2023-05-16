"use client";

import { BlogListType } from "@/utils/blog.types";
import React, { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import Loading from "@/app/loading";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

const BlogDetail = ({ blog }: { blog: BlogListType }) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const [myBlog, setMyBlog] = useState(false);
  const [loading, setLoading] = useState(false);

  // ブログ削除
  const deleteBlog = async () => {
    setLoading(true);
    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // ファイル名取得
    const fileName = blog.image_url.split("/").slice(-1)[0];

    // 画像を削除
    await supabase.storage.from("blogs").remove([`${user.id}/${fileName}`]);

    //トップページに遷移
    router.push("/");
    router.refresh();
    setLoading(false);
  };

  // 自分が投稿したブログのみ、編集削除ボタンを表示
  const renderButton = () => {
    if (myBlog) {
      return (
        <div className="flex justify-end">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex items-center space-x-5">
              <Link href={`blog/${blog.id}/edit`}>編集</Link>
              <div className="cursor-pointer" onClick={() => deleteBlog()}>
                削除
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  // 自分が投稿したブログかチェック
  useEffect(() => {
    if (user.id === blog.user_id) {
      setMyBlog(true);
    }
  }, [user, blog.user_id]);

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="mb-1">
          <Image
            src={blog.avatar_url ? blog.avatar_url : "/default.png"}
            className="rounded-full"
            alt="avatar"
            width={70}
            height={70}
          />
        </div>
        <div className="font-bold text-gray-500">{blog.name}</div>
        <div className="text-sm text-gray-500">
          {format(new Date(blog.created_at), "yyyy/MM/dd HH:mm")}
        </div>
      </div>

      <div className="mb-5">
        <div className="text-center font-bold text-3xl mb-5">{blog.title}</div>
        <div className="mb-5">
          <Image
            src={blog.image_url}
            className="rounded-lg aspect-video object-cover"
            alt="image"
            width={1024}
            height={576}
          />
        </div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>

      {renderButton()}
    </div>
  );
};

export default BlogDetail;
