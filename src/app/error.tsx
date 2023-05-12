"use client";

import { NextPage } from "next";

// エラー画面
const Error: NextPage = () => {
  return (
    <div>
      <div className="text-center text-5xl font-bold mb-3">500</div>
      <div className="text-center text-xl font-bold">Server Error</div>
    </div>
  );
};

export default Error;
