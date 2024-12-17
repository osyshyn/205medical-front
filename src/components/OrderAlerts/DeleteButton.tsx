import React from "react";
import useAlertsStore from "src/stores/alert-store";

interface DeleteButtonProps {
  alertId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ alertId }) => {
  const deleteAlert = useAlertsStore((state) => state.deleteAlert);

  const handleDelete = () => {
    deleteAlert(alertId);
  };

  return (
    <div
      style={{ cursor: "pointer", fontSize: "20px", color: "#3C3C4399" }}
      onClick={handleDelete}
    >
      &times; {/* Unicode symbol for "×" */}
    </div>
  );
};

export { DeleteButton };
