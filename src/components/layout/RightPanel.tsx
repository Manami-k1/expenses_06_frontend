import { css } from "../../../styled-system/css";

const style = css({
  width: "calc(100% * 2.6 / 10)",
  minWidth: "300px",
  bgColor: "#333",
});
export const RightPanel = () => {
  return <div className={style}></div>;
};
