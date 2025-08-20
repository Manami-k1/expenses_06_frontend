import { Input } from "@/components/common";
import {
  Category,
  useCategoriesStore,
} from "@/store/zustand/useCategoriesStore";
import { useTransactionStore } from "@/store/zustand/useTransactionStore";
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

  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: category.name,
      color: category.color,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log("更新データ:", data);

    // ✅ 本来はここでバックエンドにPUT送信:
    // await fetch(`http://localhost:8080/categories/${category.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    try {
      await fetch(`http://localhost:8080/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await reloadCategories();
      await reloadData();
      setSelectedField(""); // 閉じる
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
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
          {...register("name")}
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
            // autoFocus
            onKeyDown={handleKeyDown}
            style={{ paddingTop: 0, paddingBottom: 0, width: "100px" }}
          />
        </div>
      )}
    </div>
  );
};
