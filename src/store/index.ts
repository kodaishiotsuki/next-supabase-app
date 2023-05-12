// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from "zustand";

type User = {
  id: string | undefined;
  email: string | undefined;
};

type State = {
  user: User;
  setUser: (payload: User) => void;
};

// zustandのcreate関数を使って、storeを作成
const useStore = create<State>((set) => ({
  // 初期値
  user: {
    id: "",
    email: "",
  },
  // ユーザー情報をセットする関数
  setUser: (payload) => set({ user: payload }),
}));

export default useStore;
