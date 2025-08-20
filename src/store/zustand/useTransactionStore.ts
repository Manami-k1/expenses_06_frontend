import { create } from "zustand";
import { useSelectedDateStore } from "./useSelectedDateStore";
import { useCalendarStore } from "./useCalendarStore";

type Category = {
  id: number;
  name: string;
  color: string;
};
type Transaction = {
  id: number;
  name: string;
  price: string;
  category: Category;
  transactionType: string;
  date: string;
};
type DailySummary = {
  day: number;
  income: string;
  expense: string;
};

type Summary = {
  income: string;
  expense: string;
  net: string;
};

type TransactionState = {
  dailyTransactions: Transaction[];
  setDailyTransactions: (list: Transaction[]) => void;

  totalMonthSummary: Summary;
  setTotalMonthSummary: (summary: Summary) => void;

  totalDaySummary: Summary;
  setTotalDaySummary: (summary: Summary) => void;

  dailySummaryList: DailySummary[];
  setDailySummaryList: (list: DailySummary[]) => void;

  reloadData: () => Promise<void>;
};

export const useTransactionStore = create<TransactionState>((set) => ({
  dailyTransactions: [],
  setDailyTransactions: (list) => set({ dailyTransactions: list }),

  totalMonthSummary: { income: "", expense: "", net: "" },
  setTotalMonthSummary: (summary) => set({ totalMonthSummary: summary }),

  totalDaySummary: { income: "", expense: "", net: "" },
  setTotalDaySummary: (summary) => set({ totalDaySummary: summary }),

  dailySummaryList: [],
  setDailySummaryList: (list) => set({ dailySummaryList: list }),
  reloadData: async () => {
    const { selectedDate } = useSelectedDateStore.getState();
    const { calendar } = useCalendarStore.getState();

    const [dailyRes, monthRes, dayRes, dailySummaryRes] = await Promise.all([
      fetch(
        `http://localhost:8080/transactions/daily?year=${selectedDate.year}&month=${selectedDate.month}&day=${selectedDate.date}`
      ),
      fetch(
        `http://localhost:8080/transactions/summary?year=${calendar.year}&month=${calendar.month}`
      ),
      fetch(
        `http://localhost:8080/transactions/summary?year=${selectedDate.year}&month=${selectedDate.month}&day=${selectedDate.date}`
      ),
      fetch(
        `http://localhost:8080/transactions/list?year=${calendar.year}&month=${calendar.month}`
      ),
    ]);

    const dailyData = await dailyRes.json();
    const monthSummary = await monthRes.json();
    const daySummary = await dayRes.json();
    const dailySummaryList = await dailySummaryRes.json();

    set({
      dailyTransactions: dailyData,
      totalMonthSummary: monthSummary,
      totalDaySummary: daySummary,
      dailySummaryList,
    });
  },
}));
