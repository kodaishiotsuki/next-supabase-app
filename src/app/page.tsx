import { NextPage } from "next";
import React, { Suspense } from "react";
import BlogNewButton from "./components/blog/blog-new-button";
import Loading from "./loading";
import BlogList from "./components/blog/blog-list";

const HomePage: NextPage = () => {
  return (
    <div className="h-full">
      <BlogNewButton />
      {/* 非同期対応 */}
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore*/}
        <BlogList />
      </Suspense>
    </div>
  );
};

export default HomePage;
