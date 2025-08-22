import React, { useEffect, useRef, useState } from "react";
import { input } from "styled-system/recipes";
import { CategoryDotLabel } from "../features/category/CategoryDotLabel";
import { Category } from "@/store/zustand/useCategoriesStore";
import { css } from "styled-system/css";

type SelectProps = {
  variant?: string;
  options: Category[];
  value?: number;
  onChange?: (value: number) => void;
  styleType?: "input" | "list";
};

export const Select: React.FC<SelectProps> = ({
  variant,
  options,
  value,
  onChange,
  styleType = "input",
}) => {
  const selectWrapStyle = css({
    w: "100%",
    pos: "relative",
  });

  const optionListStyle = css({
    pos: "absolute",
    bg: "#fff",
    px: "10",
    py: "7",
    rowGap: "4",
    display: "grid",
    w: "100%",
    borderRadius: "6px",
    fontSize: "xs",
    boxShadow: "1px 1px 3px #00000033",
    zIndex: 20,
    maxH: "180px",
    overflowY: "scroll",
  });

  const optionItemStyle = css({
    cursor: "pointer",
    padding: "6px",
    borderRadius: "4px",
    _hover: {
      bg: "#f0f0f0",
    },
  });
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(options[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleChangeToggle = () => {
    setToggleOpen(!toggleOpen);
    if (!toggleOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const matched = options.find((o) => o.id === value);
      setSelected(matched || null);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setToggleOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelected = (o: Category) => {
    setSelected(o);
    setToggleOpen(false);
    onChange?.(o.id);
  };
  return (
    <div className={selectWrapStyle} ref={containerRef}>
      <div
        className={styleType === "input" ? input({ variant }) : undefined}
        onClick={handleChangeToggle}
      >
        {selected && (
          <CategoryDotLabel
            category={selected}
            style={styleType === "list" ? { fontSize: "12px" } : undefined}
          />
        )}
      </div>

      {toggleOpen && (
        <div className={optionListStyle}>
          {options.map((o) => (
            <div
              key={o.id}
              className={optionItemStyle}
              onClick={() => handleSelected(o)}
            >
              <CategoryDotLabel
                category={o}
                style={styleType === "list" ? { fontSize: "12px" } : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
