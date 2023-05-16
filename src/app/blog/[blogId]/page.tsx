import BlogDetail from "@/app/components/blog/blog-detail";
import { BlogListType } from "@/utils/blog.types";
import { createClient } from "@/utils/supabase-server";
import { notFound } from "next/navigation";
import React from "react";

const BlogDetailPage = async ({
  params,
}: {
  params: {
    blogId: string;
  };
}) => {
  const supabase = createClient();

  //ブログ詳細取得
  const { data: blogData } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();

  // ブログがない場合は404
  if (!blogData) return notFound();

  //プロフィール取得
  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("id", blogData.user_id)
    .single();

  //表示ブログ詳細作成
  const blog: BlogListType = {
    id: blogData.id,
    created_at: blogData.created_at,
    title: blogData.title,
    content: blogData.content,
    user_id: blogData.user_id,
    image_url: blogData.image_url,
    name: profileData!.name,
    avatar_url: profileData!.avatar_url,
  };

  return <BlogDetail blog={blog} />;
};

export default BlogDetailPage;
