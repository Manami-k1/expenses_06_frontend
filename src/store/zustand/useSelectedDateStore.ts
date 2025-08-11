import { create } from "zustand";

type SelectedDate = {
  year: number;
  month: number;
  date: number;
};

type SelectedDateStore = {
  selectedDate: SelectedDate;
  setSelectedDate: (date: SelectedDate) => void;
};

export const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  selectedDate: (() => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
    };
  })(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
