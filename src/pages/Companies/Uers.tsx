import { FC, useState } from "react";
import { ModalWindow } from "src/components/ModalWindow";

interface Props {
  users: any[];
}

export const Users: FC = ({ users }: Props) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div>
        {showAll
          ? users.map((data, index) => <p key={index}>{data.first_name}</p>)
          : users
              .slice(0, 3)
              .map((data, index) => <p key={index}>{data.first_name}</p>)}
        {users.length > 3 && (
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Скрыть" : "Показать всех"}
          </button>
        )}
      </div>
    </>
  );
};
