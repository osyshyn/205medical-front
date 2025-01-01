import React from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";

interface CategoryHeaderProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  handleDeleteEntity: (id: number | null, type: "product" | "category") => void;
  selectedCategory: number | null;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  isEditMode,
  toggleEditMode,
  handleDeleteEntity,
  selectedCategory,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="font-medium">Products</h3>
      <div className="flex gap-4">
        {isEditMode ? (
          <Button
            className="h-10 w-36 rounded-20"
            variant={ButtonVariants.PRIMARY}
            onClick={toggleEditMode}
          >
            Submit
          </Button>
        ) : (
          <>
            <Button
              className="h-10 w-52 rounded-20"
              variant={ButtonVariants.SECONDARY}
              onClick={() => handleDeleteEntity(selectedCategory, "category")}
            >
              Delete Category
            </Button>
            <Button
              className="h-10 w-36 rounded-20"
              variant={ButtonVariants.PRIMARY}
              onClick={toggleEditMode}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
