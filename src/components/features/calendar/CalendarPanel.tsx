import { css } from "styled-system/css";

const style = css({
  width: "calc(100% * 5 / 10)",
  minWidth: "400px",
  background: "#fafafa",
  padding: "30px",
});

export const CalendarPanel = () => {
  return <div className={style}></div>;
};
