import { useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Window } from "src/components/Window";
import useUserStore from "src/stores/user-store";

interface AddNotesProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const AddNotes = ({ isOpen, onClose, userId }: AddNotesProps) => {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const addUserNote = useUserStore((state) => state.addUserNote);

  const handleSave = async () => {
    await addUserNote(note, userId, title);
    setNote("");
    setTitle("");
    onClose();
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="!bg-white-base rounded-full shadow-md"
      className="bg-white w-[1000px] rounded-lg p-6"
    >
      <Window className="space-y-4">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-800">Add Notes</h1>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes here"
            className="min-h-[120px] w-full rounded-md border p-3"
          />
        </div>

        <div className="flex justify-between space-x-3 pt-4">
          <Button
            onClick={onClose}
            className="h-10 w-36 rounded-full"
            variant={ButtonVariants.SECONDARY_SQUARE}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="text-white h-10 w-36 rounded-full"
            variant={ButtonVariants.PRIMARY}
          >
            Save
          </Button>
        </div>
      </Window>
    </ModalWindow>
  );
};
