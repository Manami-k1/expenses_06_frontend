import { css } from "styled-system/css";
type SumBoxStyle = {
  children: React.ReactNode;
  color?: string;
};

export const SumBox: React.FC<SumBoxStyle> = ({ children, color }) => {
  const sumBoxStyle = css({
    borderRadius: "14px",
    color: "#ffffff",
    width: "100%",
    padding: "0 12px",
    height: "94px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--sum-box-bg)",
    rowGap: "6px",

    "& > span": {
      fontSize: "13px",
      fontWeight: "bold",
    },
    "& > p": {
      fontSize: "22px",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: "22px",
      "& > span": {
        fontSize: "0.86em",
      },
    },
  });
  return (
    <div
      className={sumBoxStyle}
      style={{ "--sum-box-bg": color } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
