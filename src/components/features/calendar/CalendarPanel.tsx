import { css } from "styled-system/css";
import { Calendar } from "./Calendar";

const style = css({
  width: "calc(100% * 5 / 10)",
  minWidth: "400px",
  background: "#FAFAFA",
  padding: "30px",
});

export const CalendarPanel = () => {
  return (
    <div className={style}>
      <Calendar />
    </div>
  );
};
