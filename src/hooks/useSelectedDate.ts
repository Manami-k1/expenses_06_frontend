import { useState } from "react";

export type SelectedDateType = {
  year: number | null;
  month: number | null;
  date: number | null;
};

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDateType>(() => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
    };
  });

  return {
    selectedDate,
    setSelectedDate,
  };
};
