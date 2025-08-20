"use client";
import { Button } from "@/components/common/Button";
import { css } from "styled-system/css";
import {
  useCalendarStore,
  useSelectedDateStore,
  useTransactionStore,
} from "@/store/zustand";

const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const Calendar = () => {
  const { calendar, goToNextMonth, goToPrevMonth } = useCalendarStore();
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { dailySummaryList } = useTransactionStore();

  const onSelectedDate = (id: number) => {
    setSelectedDate({
      ...selectedDate,
      year: calendar.year,
      month: calendar.month,
      date: id,
    });
  };

  return (
    <div
      className={css({
        m: "auto",
        w: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      {/* カレンダー（年、月表示） */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "50px 0 36px",
          w: "340px",
        })}
      >
        <Button onClick={goToPrevMonth}>◀︎</Button>
        <div
          className={css({
            display: "flex",
            alignItems: "baseLine",
            fontWeight: "bold",
            columnGap: "10px",
          })}
        >
          <h2 className={css({ fontSize: "month" })}>{calendar.month}月</h2>
          <p className={css({ fontSize: "lg" })}>{calendar.year}</p>
        </div>
        <Button onClick={goToNextMonth}>▶︎</Button>
      </div>
      <div className={css({ display: "flex" })}>
        {week.map((w, i) => (
          <div
            key={i}
            className={css({
              w: "60px",
              h: "20px",
              m: "3px",
              fontWeight: "200",
            })}
            style={{
              color: w === "SAT" ? "#67B5DE" : w === "SUN" ? "#E68784" : "",
            }}
          >
            {w}
          </div>
        ))}
      </div>

      {/* カレンダー（日付表示） */}
      <div>
        {calendar?.dateAndWeeks?.map((dweeks, i) => (
          <div key={i} className={css({ display: "flex" })}>
            {dweeks.map((w, i) => {
              const summary = dailySummaryList.find((s) => s.day === w?.date);
              return (
                <div
                  key={i}
                  className={css({
                    bg: "#F1F1F1",
                    textAlign: "center",
                    p: "3px 6px",
                    w: "60px",
                    h: "72px",
                    m: "3px",
                    fontSize: "sm",
                    outlineOffset: "-2px",
                    outline:
                      w?.date === selectedDate.date &&
                      calendar.year === selectedDate.year &&
                      calendar.month === selectedDate.month
                        ? "2px solid #EB8282"
                        : "none",
                  })}
                  id={w?.date.toString()}
                  onClick={() => w && onSelectedDate(w.date)}
                >
                  <p
                    style={{
                      margin: "auto",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                      height: "24px",
                      lineHeight: "24px",
                      width: "24px",
                      ...(w?.isToday
                        ? {
                            color: "#fff",
                            fontWeight: "bold",
                            background: "#EB8282",
                          }
                        : {}),
                    }}
                  >
                    {w?.date}
                  </p>
                  {summary && (
                    <div
                      className={css({
                        fontSize: "xs",
                        mt: "2px",
                        textAlign: "right",
                      })}
                    >
                      {summary.income !== "0" && (
                        <div className={css({ color: "#47AFD5" })}>
                          ¥{summary.income}
                        </div>
                      )}
                      {summary.expense !== "0" && (
                        <div className={css({ color: "#F27979" })}>
                          ¥{summary.expense}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
