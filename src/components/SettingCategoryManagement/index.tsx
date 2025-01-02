import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Window } from "src/components/Window";
import useCategoryStore from "src/stores/category-store";
import useProductStore from "src/stores/product-store";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { DeleteEntity } from "../DeleteEntity";
import { AddProduct } from "./AddProduct";
import { CategoryHeader } from "./CategoryHeader";
import { CategoryProducts } from "./CategoryProducts";
import { CategorySidebar } from "./CategorySidebar";

const CategoryManagement: React.FC = () => {
  const [state, setState] = useState({
    isOpen: false,
    isEditMode: false,
    selectedCategory: null as number | null,
    productToDelete: null as number | null,
    categoryToDelete: null as number | null,
    isDeleteProductModalOpen: false,
    isDeleteCategoryModalOpen: false,
    isAddProductModalOpen: false,
    temporaryProducts: [] as any[],
    localProducts: [] as any[],
  });

  const {
    categories,
    fetchAllcategories,
    fetchCategoryDetail,
    categorieDetail,
    isCategoriesUpdated,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();
  const { deleteProduct } = useProductStore();

  useEffect(() => {
    fetchAllcategories();
  }, [fetchAllcategories]);

  useEffect(() => {
    if (isCategoriesUpdated) fetchAllcategories();
  }, [isCategoriesUpdated, fetchAllcategories]);

  useEffect(() => {
    if (categorieDetail?.products) {
      setState((prev) => ({
        ...prev,
        localProducts: categorieDetail.products,
      }));
    }
  }, [categorieDetail]);

  const handleCategoryClick = async (id: number) => {
    if (state.selectedCategory !== id) {
      setState({
        ...state,
        isEditMode: false,
        temporaryProducts: [],
        selectedCategory: id,
      });
      if (id) await fetchCategoryDetail(id);
    }
  };

  const handleDeleteEntity = (
    id: number | null,
    type: "product" | "category"
  ) =>
    setState((prev) => ({
      ...prev,
      [type === "product"
        ? "isDeleteProductModalOpen"
        : "isDeleteCategoryModalOpen"]: true,
      [type === "product" ? "productToDelete" : "categoryToDelete"]: id,
    }));

  const handleAddProduct = (products: any[]) => {
    setState((prev) => ({
      ...prev,
      temporaryProducts: [...prev.temporaryProducts, ...products],
      localProducts: [...prev.localProducts, ...products],
    }));
  };

  const handleSubmit = async () => {
    const { localProducts, temporaryProducts, selectedCategory } = state;
    if (selectedCategory && categorieDetail) {
      await updateCategory(
        selectedCategory,
        categorieDetail.name,
        [...localProducts, ...temporaryProducts].map((p) => p.id)
      );
      setState({ ...state, temporaryProducts: [], isEditMode: false });
      await fetchCategoryDetail(selectedCategory);
    }
  };

  const toggleEditMode = () =>
    setState((prev) => ({
      ...prev,
      isEditMode: !prev.isEditMode,
      localProducts: prev.isEditMode
        ? categorieDetail?.products || []
        : prev.localProducts,
      temporaryProducts: [],
    }));

  return (
    <div className="w-full">
      <button
        className="hover:text-black flex w-full items-center gap-2 py-3 text-left text-gray-700"
        onClick={() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
      >
        <h4>Categories Management</h4>
        <ArrowBottomIcon
          className={cn("ml-2 transition-transform duration-200", {
            "rotate-180": state.isOpen,
          })}
        />
      </button>

      {state.isOpen && (
        <div className="flex gap-6">
          <CategorySidebar
            categories={categories}
            selectedCategory={state.selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />

          <Window className="bg-white relative flex-1 rounded-3xl p-4">
            {!state.selectedCategory ? (
              <div className="flex h-40 items-center justify-center text-gray-500">
                Please select a category
              </div>
            ) : (
              <>
                <CategoryHeader
                  isEditMode={state.isEditMode}
                  toggleEditMode={async () => {
                    if (state.isEditMode) {
                      await handleSubmit();
                    } else {
                      toggleEditMode();
                    }
                  }}
                  handleDeleteEntity={handleDeleteEntity}
                  selectedCategory={state.selectedCategory}
                />
                <CategoryProducts
                  localProducts={state.localProducts}
                  isEditMode={state.isEditMode}
                  handleDeleteEntity={handleDeleteEntity}
                  onOpenAddModal={() =>
                    setState((prev) => ({
                      ...prev,
                      isAddProductModalOpen: true,
                    }))
                  }
                />
              </>
            )}
          </Window>
        </div>
      )}

      <DeleteEntity
        isOpen={state.isDeleteProductModalOpen}
        onClose={() =>
          setState((prev) => ({ ...prev, isDeleteProductModalOpen: false }))
        }
        entityId={state.productToDelete!}
        entityName="Product"
        deleteAction={deleteProduct}
      />
      <DeleteEntity
        isOpen={state.isDeleteCategoryModalOpen}
        onClose={() =>
          setState((prev) => ({ ...prev, isDeleteCategoryModalOpen: false }))
        }
        entityId={state.categoryToDelete!}
        entityName="Category"
        deleteAction={deleteCategory}
      />
      <AddProduct
        isOpen={state.isAddProductModalOpen}
        onClose={() =>
          setState((prev) => ({ ...prev, isAddProductModalOpen: false }))
        }
        onAddProducts={handleAddProduct}
      />
    </div>
  );
};

export default CategoryManagement;
