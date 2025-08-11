"use client";
import { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { useSelectedDateStore } from "@/store";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { useTransactionStore } from "@/store/zustand/useTransactionStore";

const style = css({
  width: "calc(100% * 2.6 / 10)",
  minWidth: "300px",
  // bgColor: "#333",
});
export const RightPanel = () => {
  const { dailyTransactions, reloadData } = useTransactionStore();
  const { selectedDate } = useSelectedDateStore();
  const { calendar } = useCalendarStore();

  const deleteTransaction = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/transactions/${id}`, {
        method: "DELETE",
      });
      await reloadData();
    } catch (error) {
      console.error("トランザクション追加失敗:", error);
    }
  };

  useEffect(() => {
    reloadData();
  }, [selectedDate, calendar]);

  return (
    <div className={style}>
      <div>
        {selectedDate.month}月{selectedDate.date}日
      </div>
      <div className={style}>
        {dailyTransactions.map((d, i) => (
          <p key={i}>
            {d.categoryId}-{d.name}-{d.price}-{d.transactionType}
            <button type="button" onClick={() => deleteTransaction(d.id)}>
              削除
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};
