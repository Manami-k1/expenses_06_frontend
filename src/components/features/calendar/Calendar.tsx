"use client";
import { Button } from "@/components/common/Button";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { useSelectedDateStore } from "@/store/zustand/useSelectedDateStore";
import { useTransactionStore } from "@/store/zustand/useTransactionStore";
import { useEffect, useMemo } from "react";
import { css } from "styled-system/css";

const week = ["月", "火", "水", "木", "金", "土", "日"];

export const Calendar = () => {
  // const today = new Date();
  // const [calendar, setCalendar] = useState<CalendarMonth>(() => {
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + 1;
  //   return createCalendar(year, month);
  // });
  const { calendar, setCalendar, goToNextMonth, goToPrevMonth } =
    useCalendarStore();
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
          p: "20px 0",
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
              textAlign: "center",
              w: "60px",
              h: "20px",
              m: "3px",
            })}
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
                    bg: !w ? "#E9E9E9" : w?.isToday ? "#f9e3e3" : "#F1F1F1",
                    textAlign: "center",
                    p: "3px",
                    w: "60px",
                    h: "72px",
                    m: "3px",
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
                  {w?.date}
                  {summary && (
                    <div className={css({ fontSize: "xs", mt: "4px" })}>
                      {summary.income > 0 && (
                        <div className={css({ color: "green" })}>
                          +{summary.income}
                        </div>
                      )}
                      {summary.expense > 0 && (
                        <div className={css({ color: "red" })}>
                          -{summary.expense}
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
