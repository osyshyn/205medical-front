import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { Window } from "src/components/Window";
import { ReactComponent as ArrowGrayIcon } from "src/assets/icons/arrow-gray.svg";
import { ReactComponent as ArrowPurpleIcon } from "src/assets/icons/arrow-purple.svg";
import { ICategory } from "src/@types/categories";

interface CategorySidebarProps {
  categories: ICategory[] | null;
  selectedCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  return (
    <Window className="bg-white max-h-[520px] w-[312px] rounded-3xl p-4">
      <h3 className="mb-4 font-medium">Categories</h3>
      <div
        className="space-y-2 overflow-y-auto"
        style={{
          maxHeight: "420px",
          paddingRight: "20px", // відступ справа для зсуву скролу
        }}
      >
        {categories?.map((category) => (
          <Link
            key={category.id}
            to="#"
            className={cn("flex justify-between gap-5 border-b pb-3.5 pt-2.5", {
              "border-b-purple-base": selectedCategory === category.id,
            })}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span
              className={cn(
                "line-clamp-1 text-sm font-medium text-gray-regular",
                {
                  "text-purple-base": selectedCategory === category.id,
                }
              )}
            >
              {category.name}
            </span>
            {selectedCategory === category.id ? (
              <ArrowPurpleIcon />
            ) : (
              <ArrowGrayIcon />
            )}
          </Link>
        ))}
      </div>
    </Window>
  );
};
