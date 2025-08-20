import { css } from "styled-system/css";
import { TransactionType } from "../layout/LeftPanel";

type TransactionTypeToggleProps = {
  transactionType: TransactionType;
  onChangeTransactionType: (value: "income" | "expense") => void;
};
export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  transactionType,
  onChangeTransactionType,
}) => {
  const style = css({
    borderRadius: "6",
    fontSize: "xs",
    color: "white",
    fontWeight: "bold",
    p: "4",
    w: "32px",
  });
  const label = transactionType === "expense" ? "支出" : "収入";
  const handleToggle = () => {
    const newValue = transactionType === "income" ? "expense" : "income";
    onChangeTransactionType(newValue);
  };
  return (
    <button
      onClick={handleToggle}
      type="button"
      className={style}
      style={{
        background: transactionType === "income" ? "#A6CED7" : "#EAABAB",
      }}
    >
      {label}
    </button>
  );
};
