"use client";

import Link from "next/link";

// ナビゲーション
const Navigation = () => {
  return (
    <header className="border-b py-5">
      <div className="container max-w-screen-xl mx-auto relative flex justify-center items-center">
        <Link href="/" className=" font-bold text-xl cursor-pointer">
          FullStackChannel
        </Link>

        <div className="absolute right-5">
          <div className="flex space-x-4">
            <Link href="/auth/profile">プロフィール</Link>
            <Link href="/auth/login">ログイン</Link>
            <Link href="/auth/signup">サインアップ</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
