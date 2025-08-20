import { Button } from "@/components/common";
import { useSelectedDateStore, useTransactionStore } from "@/store/zustand";
import { enqueueSnackbar } from "notistack";
import { css } from "styled-system/css";
import { CategoryDotLabel } from "../category/CategoryDotLabel";

export const TransactionList = () => {
  const { dailyTransactions, totalDaySummary, reloadData } =
    useTransactionStore();
  const { selectedDate } = useSelectedDateStore();

  const deleteTransaction = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/transactions/${id}`, {
        method: "DELETE",
      });
      await reloadData();
      enqueueSnackbar("収支項目を削除しました", { variant: "success" });
    } catch (error) {
      console.error("トランザクション削除失敗:", error);
      enqueueSnackbar("収支項目の削除に失敗しました", { variant: "error" });
    }
  };
  return (
    <>
      <div
        className={css({
          fontWeight: "bold",
          textAlign: "center",
          py: "12",
        })}
      >
        {selectedDate.month}月{selectedDate.date}日
      </div>
      <div className={css({ bg: "#F9F9F9" })}>
        <div
          className={css({
            fontSize: "sm",
            maxH: "140px",
            h: "140px",
            overflowY: "auto",
          })}
        >
          {dailyTransactions.length === 0 ? (
            <div
              className={css({
                px: "6",
                py: "2",
                fontWeight: "bold",
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
            dailyTransactions.map((d, i) => (
              <div
                key={i}
                className={css({
                  display: "grid",
                  gridTemplateColumns: "34% 1fr auto",
                  alignItems: "center",
                  px: "10",
                  py: "2",
                  backgroundColor: i % 2 === 1 ? "#ffffff" : undefined,
                })}
              >
                <CategoryDotLabel
                  category={d.category}
                  style={{ fontSize: "12px" }}
                />

                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    px: "6",
                    minW: "min-content",
                  })}
                >
                  <Button
                    variant="itemDelete"
                    type="button"
                    onClick={() => deleteTransaction(d.id)}
                  >
                    削
                  </Button>
                  <p className={css({ fontSize: "xs" })}>{d.name}</p>
                </div>
                <span
                  className={css({
                    color:
                      d.transactionType === "expense" ? "#F27979" : "#47AFD5",
                  })}
                >
                  {d.transactionType === "expense" && "-"}¥{d.price}
                </span>
              </div>
            ))
          )}
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            fontSize: "sm",
            fontWeight: "bold",
            lineHeight: "30px",
            pb: "4",
            borderTop: "3px #CCCCCC solid",
            px: "10",
          })}
        >
          <p>合計</p>
          <p
            className={css({
              color:
                totalDaySummary.net.charAt(0) === "-"
                  ? "#F27979"
                  : totalDaySummary.net === "0"
                    ? "#676767"
                    : "#47AFD5",
              fontWeight: "bold",
            })}
          >
            {totalDaySummary.net.charAt(0) === "-"
              ? `-${"¥" + totalDaySummary.net.slice(1)}`
              : `¥${totalDaySummary.net}`}
          </p>
        </div>
      </div>
    </>
  );
};
