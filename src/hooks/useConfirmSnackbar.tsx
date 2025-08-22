import { useSnackbar } from "notistack";
import { Button } from "@/components/common";

export function useConfirmSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const confirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const key = enqueueSnackbar(message, {
        variant: "warning",
        persist: true,
        action: () => (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="itemEdit"
              onClick={() => {
                closeSnackbar(key);
                resolve(true);
              }}
            >
              はい
            </Button>
            <Button
              variant="itemDelete"
              onClick={() => {
                closeSnackbar(key);
                resolve(false);
              }}
            >
              いいえ
            </Button>
          </div>
        ),
      });
    });
  };

  return { confirm };
}
