import { NextPage } from "next";

// ローディング
const Loading: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
    </div>
  );
};

export default Loading;
