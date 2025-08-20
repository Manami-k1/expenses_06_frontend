import { create } from "zustand";

export type Category = {
  id: number;
  name: string;
  color: string;
};

type CategoriesState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  reloadCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  reloadCategories: async () => {
    try {
      const res = await fetch("http://localhost:8080/categories");
      const data = await res.json();
      console.log("reloadCategories data:", data);
      set({ categories: data });
    } catch (error) {
      console.error("カテゴリの取得に失敗しました:", error);
    }
  },
}));
