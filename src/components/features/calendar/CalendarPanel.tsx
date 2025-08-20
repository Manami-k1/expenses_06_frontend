import { css } from "styled-system/css";
import { Calendar } from "./Calendar";

const style = css({
  width: "580px",
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
