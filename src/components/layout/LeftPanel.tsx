import { css } from "styled-system/css";
import { Button } from "../common/Button";

const style = css({
  width: "calc(100% * 2.5 / 10)",
  minWidth: "300px",
  bgColor: "#ddd",
});
export const LeftPanel = () => {
  return (
    <div className={style}>
      <Button>追加</Button>
      <Button variant="successText">キャンセル</Button>
    </div>
  );
};
