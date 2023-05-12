import { NextPage } from "next";
import React from "react";
import BlogNewButton from "./components/blog/blog-new-button";

const HomePage: NextPage = () => {
  return (
    <div className="h-full">
      <BlogNewButton />
      <div>メインページ</div>
    </div>
  );
};

export default HomePage;
