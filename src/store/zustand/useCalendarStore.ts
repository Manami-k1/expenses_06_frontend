// store/calendarStore.ts
import {
  CalendarMonth,
  createCalendar,
  getNextMonth,
  getPrevMonth,
} from "@/utils/calendar";
import { create } from "zustand";
import { useTransactionStore } from "./useTransactionStore";

type CalendarStore = {
  calendar: CalendarMonth;
  setCalendar: (calendar: CalendarMonth) => void;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
};

const today = new Date();
export const useCalendarStore = create<CalendarStore>((set, get) => ({
  calendar: createCalendar(today.getFullYear(), today.getMonth() + 1),
  setCalendar: (calendar: CalendarMonth) => set({ calendar }),
  goToNextMonth: async () => {
    const { calendar } = get();
    const { year, month } = getNextMonth(calendar.year, calendar.month);
    set({ calendar: createCalendar(year, month) });
    await useTransactionStore.getState().reloadData();
    console.log(calendar);
  },

  goToPrevMonth: async () => {
    const { calendar } = get();
    const { year, month } = getPrevMonth(calendar.year, calendar.month);
    set({ calendar: createCalendar(year, month) });
    await useTransactionStore.getState().reloadData();
  },
}));
