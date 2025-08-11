"use client";
import { css } from "styled-system/css";
import { Button, Input } from "../common";
import { useSelectedDateStore } from "@/store/zustand/useSelectedDateStore";
import { zeroPad } from "@/utils/zeroPad";
import { useEffect, useState } from "react";
import { TransactionTypeToggle } from "../common/TransactionTypeToggle";
import { Controller, useForm } from "react-hook-form";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { useTransactionStore } from "@/store/zustand/useTransactionStore";
const style = css({
  width: "calc(100% * 2.5 / 10)",
  minWidth: "300px",
});
export type TransactionType = "income" | "expense";
type Transaction = {
  price: number | null;
  name: string;
  categoryId: number | null;
  transactionType: TransactionType;
};
export const LeftPanel = () => {
  const { selectedDate } = useSelectedDateStore();
  const { calendar } = useCalendarStore();
  const { reloadData, totalMonthSummary } = useTransactionStore();
  // const { setTransactionList } = useTransactionStore();
  // const [totalTransaction, setTotalTransaction] = useState({
  //   expense: null,
  //   income: null,
  // });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: { transactionType: "expense" },
  });

  // フォーム送信時の処理
  const onSubmit = (data) => {
    console.log(data);
    addTransaction(data);
  };

  useEffect(() => {
    (async () => {
      await reloadData();
    })();
  }, [calendar]);
  // const getTransaction = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/transactions/summary?year=${calendar.year}&month=${calendar.month}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const addTransaction = async (data) => {
    const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.date).padStart(2, "0")}`;
    try {
      const response = await fetch("http://localhost:8080/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          categoryId: Number(data.categoryId),
          date: formattedDate,
        }),
      });

      const newTransaction = await response.json();
      console.log("登録されたトランザクション:", newTransaction);

      // 追加後に集計を再取得して状態更新
      // const updatedSummary = await getTransaction();
      // setTotalTransaction({
      //   expense: updatedSummary.expense,
      //   income: updatedSummary.income,
      // });
      await reloadData();
    } catch (error) {
      console.error("トランザクション追加失敗:", error);
    }
  };
  const updateTransaction = () => {};
  const deleteTransaction = () => {};
  return (
    <div className={style}>
      <div>支出：{totalMonthSummary?.expense}</div>
      <div>収入：{totalMonthSummary?.income}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input {...register("price", { required: "値段は必須です" })} />
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <TransactionTypeToggle
                transactionType={field.value}
                onChangeTransactionType={field.onChange}
              />
            )}
          />
          <Input {...register("name", { required: "名前は必須です" })} />
          {/* {errors.name && <p>{errors.name.message}</p>} */}
          <Input
            {...register("categoryId", { required: "カテゴリは必須です" })}
          />
          {/* {errors.categoryId && <p>{errors.categoryId.message}</p>} */}
          {selectedDate.year}-{zeroPad(selectedDate.month, 2)}-
          {zeroPad(selectedDate.date, 2)}
        </div>
        <Button>追加</Button>
        <Button variant="successText">キャンセル</Button>
      </form>
    </div>
  );
};
