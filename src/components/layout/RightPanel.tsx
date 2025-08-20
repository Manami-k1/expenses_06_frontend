"use client";
import { useEffect } from "react";
import { css } from "../../../styled-system/css";
import {
  useSelectedDateStore,
  useCalendarStore,
  useTransactionStore,
} from "@/store/zustand";
import { Button, Input } from "../common";
import { useForm } from "react-hook-form";
import {
  Category,
  useCategoriesStore,
} from "@/store/zustand/useCategoriesStore";
import { CategoryDotLabel } from "../features/category/CategoryDotLabel";
import { useSnackbar } from "notistack";
import { TransactionList } from "../features/transaction/TransactionList";

const style = css({
  width: "calc((100% - 580px) * 0.55)",
  p: "30px 20px",
  minWidth: "300px",
  maxW: "380px",
  m: "0 auto",
});
export const RightPanel = () => {
  const { dailyTransactions, totalDaySummary, reloadData } =
    useTransactionStore();
  console.log(totalDaySummary);
  const { selectedDate } = useSelectedDateStore();
  const { calendar } = useCalendarStore();
  const { categories, reloadCategories } = useCategoriesStore();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: { color: "#b4dfe3" },
  });

  const onSubmit = (data: Category) => {
    console.log(data);
    addCategory(data);
  };

  const addCategory = async (data: Category) => {
    try {
      const response = await fetch("http://localhost:8080/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          name: data.name,
          color: data.color,
        }),
      });
      const newTransaction = await response.json();
      console.log(newTransaction);

      await reloadCategories();
      enqueueSnackbar("カテゴリを追加しました", { variant: "success" });
    } catch (error) {
      console.error("カテゴリー追加失敗:", error);
      enqueueSnackbar("カテゴリの追加に失敗しました", { variant: "error" });
    }
  };

  const deleteCategory = async (categoryId: number) => {
    const res = await fetch(
      `http://localhost:8080/categories/${categoryId}/has-transactions`
    );
    const hasTransactions = await res.json();

    if (hasTransactions) {
      const confirmed = window.confirm(
        "このカテゴリには関連する取引があります。削除してもよろしいですか？"
      );
      if (!confirmed) return;
    }
    try {
      await fetch(`http://localhost:8080/categories/${categoryId}`, {
        method: "DELETE",
      });
      await reloadCategories();
      enqueueSnackbar("カテゴリを削除しました", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("カテゴリの削除に失敗しました", { variant: "error" });
    }
  };

  useEffect(() => {
    reloadData();
  }, [selectedDate, calendar, reloadData]);

  useEffect(() => {
    reloadCategories();
  }, [reloadCategories]);
  return (
    <div className={style}>
      <TransactionList />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css({ w: "180px", m: "50px auto" })}>
          <p className={css({ fontWeight: "bold" })}>カテゴリを追加</p>
          <div
            className={css({
              display: "flex",
              rowGap: "12",
              flexDirection: "column",
              pt: "24px",
              pb: "28px",
            })}
          >
            <Input
              {...register("name", { required: "カテゴリ名は必須です" })}
              placeholder="日用品"
            />
            <Input
              type="color"
              {...register("color", { required: "色は必須です" })}
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                width: "auto",
                height: "32px",
              }}
            />
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
            <Button variant="successText">キャンセル</Button>
          </div>
        </div>
      </form>
      <div
        className={css({
          bg: "#F9F9F9",
          overflowY: "auto",
          pt: "8px",
          pb: "16px",
          h: "160",
          borderRadius: "14",
        })}
      >
        {categories.filter((c) => c.id !== 1).length === 0 ? (
          <div
            className={css({
              px: "6px",
              py: "2px",
              fontWeight: "bold",
              fontSize: "sm",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              w: "100%",
              h: "100%",
            })}
          >
            データがありません
          </div>
        ) : (
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            })}
          >
            {categories
              .filter((c) => c.id !== 1)
              .map((c, i) => (
                <div
                  key={i}
                  className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <CategoryDotLabel category={c} editable={true} />
                  <Button
                    variant="itemDelete"
                    type="button"
                    onClick={() => deleteCategory(c.id)}
                  >
                    削
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
