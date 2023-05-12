"use client";

import { NextPage } from "next";

// データが存在しないときの画面
const NotFound: NextPage = () => {
  return (
    <div>
      <div className="text-center text-5xl font-bold mb-3">404</div>
      <div className="text-center text-xl font-bold">Not Found</div>
    </div>
  );
};

export default NotFound;
