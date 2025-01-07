import React, { FC, useEffect } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import useModalWindowStore from "src/stores/modal-window-store";
import useProductStore from "src/stores/product-store";
import { Sizes } from "src/@types/sizes";
import { TypesUsers } from "src/@types/users";
import { Loader } from "../Loader";
import { Show } from "../PrivateRoute/Show";
import { Window } from "../Window";
import { PropertiesCard } from "./PropertiesCard";
import { Tabs } from "./Tabs";

export const ProductDetail: FC = () => {
  const isOpen = useModalWindowStore((state) => state.isOpenProductItem);
  const onClose = useModalWindowStore((state) => state.closeProductItem);
  const id = useModalWindowStore((state) => state.productId);

  const product = useProductStore((state) => state.product_details);
  const loadProduct = useProductStore((state) => state.fetchProductDetails);
  const isLoading = useProductStore((state) => state.isLoadingProductDetail);

  useEffect(() => {
    if (id) {
      loadProduct(+id);
    }
  }, [id, loadProduct]);

  const { photos, name, description, price, down_load_link } = product;

  if (!product && !isLoading) return null;

  console.log("Product: ", product);

  const handleDownload = () => {
    if (down_load_link?.path) {
      const link = document.createElement("a");
      link.href = down_load_link.path.replace("public\\", "/");
      link.download = "instruction.pdf"; // или используйте имя файла из path
      link.click();
    }
  };

  return (
    <ModalWindow
      className="w-3/4"
      onClose={onClose}
      isOpen={isOpen}
      isActivePortal
    >
      {isLoading ? (
        <Loader size={Sizes.XXL} />
      ) : (
        <Window className="flex gap-5 shadow-modal-window">
          <div className="flex flex-1 flex-col gap-2">
            {photos?.map(({ id, path }) => (
              <div key={id} className="flex-1">
                <img className="w-full" src={path} alt={path} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-22 font-semibold uppercase">{name}</p>
                <p className="line-clamp-1 font-medium text-black-soft">
                  {description}
                </p>
              </div>

              <span className="text-2xl font-semibold bg-gradient-text">
                &#36;{price}
              </span>

              <Show onlyFor={TypesUsers.SUB_USER}>
                <Button variant={ButtonVariants.PRIMARY} size={Sizes.S}>
                  Add to Purchase Order
                </Button>
              </Show>

              <PropertiesCard {...product} />
            </div>

            <Tabs {...product} />

            <div className="w-1/2">
              <Button
                className="p-2"
                variant={ButtonVariants.SECONDARY}
                onClick={handleDownload}
              >
                Download Safety Data Sheet
              </Button>
            </div>
          </div>
        </Window>
      )}
    </ModalWindow>
  );
};
