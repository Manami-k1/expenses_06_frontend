import { Button } from "./Button";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

export const Toast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar("Success アイテムの追加に成功しました", { variant });
  };

  return <Button onClick={handleClickVariant("success")}>ボタン</Button>;
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Toast />
    </SnackbarProvider>
  );
}
