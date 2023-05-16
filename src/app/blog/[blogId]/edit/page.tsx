import BlogEdit from "@/app/components/blog/blog-edit";
import { createClient } from "@/utils/supabase-server";
import { notFound } from "next/navigation";
import React from "react";

const BlogEditPage = async ({ params }: { params: { blogId: string } }) => {
  const supabase = createClient();

  //ブログ詳細取得
  const { data: blog } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();

  // ブログが存在しない場合
  if (!blog) return notFound();

  return <BlogEdit blog={blog} />;
};

export default BlogEditPage;
