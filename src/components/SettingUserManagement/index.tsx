import React, { useEffect, useState } from "react";
import cn from "classnames";
import useUserStore from "src/stores/user-store";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { UserCard } from "./UserCard";
import { UserDetails } from "./UserDetails";

export default function UserManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null); // Зберігає ID активного користувача
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCardClick = (userId) => {
    setActiveUserId(userId);
  };

  const activeUser = users.find((user) => user.id === activeUserId);

  return (
    <div className="w-full">
      <button
        className="hover:text-black flex w-full items-center gap-2 py-3 text-left text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>User Management</h4>
        <ArrowBottomIcon
          className={cn("ml-2 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <>
          <div className="max-w-[1400px]">
            <UserCard
              item={users}
              activeUserId={activeUserId}
              onCardClick={handleCardClick}
            />
          </div>

          {/* Деталі користувача */}
          {activeUser && <UserDetails id={activeUserId} />}
        </>
      )}
    </div>
  );
}
