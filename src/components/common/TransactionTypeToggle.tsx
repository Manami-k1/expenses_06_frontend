import { TransactionType } from "../layout/LeftPanel";

type TransactionTypeToggleProps = {
  transactionType: TransactionType;
  onChangeTransactionType: (value: "income" | "expense") => void;
};
export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  transactionType,
  onChangeTransactionType,
}) => {
  const label = transactionType === "expense" ? "支出" : "収入";
  const handleToggle = () => {
    const newValue = transactionType === "income" ? "expense" : "income";
    onChangeTransactionType(newValue); // ← ここで新しい値を渡す
  };
  return (
    <button onClick={handleToggle} type="button">
      {label}
    </button>
  );
};
