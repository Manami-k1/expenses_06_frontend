"use client";
import { css } from "styled-system/css";
import {
  Button,
  Input,
  Select,
  SumBox,
  TransactionTypeToggle,
} from "../common";
import {
  useCalendarStore,
  useSelectedDateStore,
  useTransactionStore,
  useCategoriesStore,
} from "@/store/zustand";
import { zeroPad } from "@/utils/zeroPad";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
const style = css({
  width: "calc((100% - 580px) * 0.45)",
  minWidth: "300px",
});
export type TransactionType = "income" | "expense";
type Transaction = {
  price: number | null;
  name: string;
  categoryId: number;
  transactionType: TransactionType;
};
export const LeftPanel = () => {
  const { selectedDate } = useSelectedDateStore();
  const { calendar } = useCalendarStore();
  const { categories } = useCategoriesStore();
  console.log(categories);
  const { reloadData, totalMonthSummary } = useTransactionStore();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: { transactionType: "expense", categoryId: 1 },
  });

  const onValid = async (data: Transaction) => {
    console.log("成功:", data);
    await addTransaction(data);
  };

  const onInvalid = (errors: any) => {
    console.log("バリデーションエラー:", errors);
    const firstError =
      errors.price?.message ||
      errors.name?.message ||
      errors.categoryId?.message ||
      "入力エラーがあります";
    enqueueSnackbar(firstError, { variant: "error" });
  };

  // フォーム送信時の処理
  const onSubmit = (data: Transaction) => {
    console.log(data);
    addTransaction(data);
  };

  useEffect(() => {
    (async () => {
      await reloadData();
    })();
  }, [calendar]);
  useEffect(() => {
    useCategoriesStore.getState().reloadCategories();
  }, []);

  const addTransaction = async (data: Transaction) => {
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
      reset();
      await reloadData();
      enqueueSnackbar("収支項目を追加しました", { variant: "success" });
    } catch (error) {
      console.error("トランザクション追加失敗:", error);
      enqueueSnackbar("収支項目の追加に失敗しました", { variant: "error" });
    }
  };
  return (
    <div className={style}>
      <div
        className={css({ bg: "#74839F", height: "210px", p: "86px 0 16px" })}
      >
        <div className={css({ width: "260px", m: "auto" })}>
          <p
            className={css({
              fontSize: "h1",
              fontWeight: "bold",
              color: "#fff",
            })}
          >
            家計簿
          </p>
        </div>
      </div>
      <div className={css({ w: "260px", m: "auto", fontWeight: "bold" })}>
        <div
          className={css({
            display: "flex",
            marginTop: "-50px",
            justifyContent: "space-between",
            columnGap: "16px",
          })}
        >
          <SumBox color="#A6CED7">
            <span>収入</span>
            <p>
              <span>¥&nbsp;</span>
              {totalMonthSummary?.income}
            </p>
          </SumBox>
          <SumBox color="#EAABAB">
            <span>支出</span>
            <p>
              <span>¥&nbsp;</span>
              {totalMonthSummary?.expense}
            </p>
          </SumBox>
        </div>
      </div>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className={css({ w: "180px", m: "80px auto" })}>
          <p className={css({ fontWeight: "bold" })}>収支項目を追加</p>
          <div
            className={css({
              display: "flex",
              rowGap: "12",
              flexDirection: "column",
              pt: "24px",
              pb: "28px",
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
              })}
            >
              <Input
                {...register("price", { required: "値段は必須です" })}
                style={{ width: "calc(100% - 40px)" }}
                placeholder="1000"
                min={0}
                type="number"
              />
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
            </div>
            <Input {...register("name")} placeholder="洗剤" />
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={categories}
                />
              )}
            />
            <p className={css({ textAlign: "right" })}>
              {selectedDate.year}-{zeroPad(selectedDate.month, 2)}-
              {zeroPad(selectedDate.date, 2)}
            </p>
          </div>
          <div
            className={css({
              display: "flex",
              gap: "12",
              m: "auto",
              w: "fit-content",
            })}
          >
            <Button>追加</Button>
            <Button variant="successText" type="button" onClick={() => reset()}>
              キャンセル
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
