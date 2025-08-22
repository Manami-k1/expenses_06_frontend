import { Input } from "@/components/common";
import {
  Category,
  useCategoriesStore,
} from "@/store/zustand/useCategoriesStore";
import { useTransactionStore } from "@/store/zustand/useTransactionStore";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "styled-system/css";

type CategoryDotLabelProps = {
  category: Category;
  editable?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

type FormInputs = {
  name: string;
  color: string;
};

export const CategoryDotLabel: React.FC<CategoryDotLabelProps> = ({
  category,
  editable,
  style,
}) => {
  const { reloadCategories } = useCategoriesStore();
  const { reloadData } = useTransactionStore();
  const labelStyle = css({
    display: "flex",
    alignItems: "center",
    fontSize: "sm",
    pos: "relative",
    height: "fit-content",
  });

  const modalStyle = css({
    boxShadow: "1px 1px 3px #00000033",
    pos: "absolute",
    px: 14,
    py: 10,
    borderRadius: 6,
    background: "#fff",
    zIndex: 10,
  });
  const [selectedField, setSelectedField] = useState<"color" | "name" | "">("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      name: category.name,
      color: category.color,
    },
  });

  const updateCategory = async (data: FormInputs) => {
    console.log("更新データ:", data);
    try {
      await fetch(`http://localhost:8080/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      enqueueSnackbar("カテゴリ名を変更しました", { variant: "success" });
      await reloadCategories();
      await reloadData();
      setSelectedField("");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("カラーを変更しました", { variant: "success" });
    }
  };

  const onValid = async (data: FormInputs) => {
    console.log("成功:", data);
    await updateCategory(data);
  };

  const onInvalid = (errors: any) => {
    console.log("バリデーションエラー:", errors);
    const firstError =
      errors.name?.message || errors.color?.message || "入力エラーがあります";
    reset();
    enqueueSnackbar(firstError, { variant: "error" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onValid, onInvalid)();
    }
  };

  const handleClick = (field: "color" | "name") => {
    setSelectedField(field);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedField("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={labelStyle} style={style} ref={containerRef}>
      <span
        onClick={(e) => {
          if (!editable) return;
          e.stopPropagation();
          handleClick("color");
        }}
        style={{
          width: 20,
          minWidth: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: category.color,
          marginRight: 8,
        }}
      />
      <div
        onClick={(e) => {
          if (!editable) return;
          e.stopPropagation();
          handleClick("name");
        }}
        style={style}
      >
        {category.name}
      </div>

      {editable && selectedField === "name" && (
        <Input
          {...register("name", {
            validate: (value) =>
              value.trim() !== "" || "空白のみの名前は無効です",
          })}
          autoFocus
          onKeyDown={handleKeyDown}
          style={{ position: "absolute", left: "26px", width: "100px" }}
        />
      )}
      {editable && selectedField === "color" && (
        <div className={modalStyle} style={{ bottom: "-50px" }}>
          <Input
            type="color"
            {...register("color")}
            onKeyDown={handleKeyDown}
            style={{ paddingTop: 0, paddingBottom: 0, width: "100px" }}
          />
        </div>
      )}
    </div>
  );
};
