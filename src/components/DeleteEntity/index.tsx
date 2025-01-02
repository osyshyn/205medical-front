import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Window } from "src/components/Window";

interface DeleteEntityProps<T extends number | string> {
  isOpen: boolean;
  onClose: () => void;
  entityId: T;
  entityName: string;
  deleteAction: (id: T) => Promise<void> | void;
}

export const DeleteEntity = <T extends number | string>({
  isOpen,
  onClose,
  entityId,
  entityName,
  deleteAction,
}: DeleteEntityProps<T>) => {
  const handleDelete = async () => {
    await deleteAction(entityId);
    onClose();
  };

  return (
    <ModalWindow
      onClose={onClose}
      isOpen={isOpen}
      closeButtonClassName="!bg-white-base rounded-full shadow-md"
      className="bg-white max-h-[800px] w-[500px] overflow-hidden rounded-lg p-6"
    >
      <Window>
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Delete {entityName} Confirmation
          </h1>
        </div>
        <p className="mb-8 text-center text-sm text-gray-600">
          Are you sure you want to delete this {entityName.toLowerCase()}? This
          action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="h-10 w-32 rounded-full"
            variant={ButtonVariants.SECONDARY_SQUARE}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="text-white h-10 w-32 rounded-full"
            variant={ButtonVariants.PRIMARY}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Window>
    </ModalWindow>
  );
};
