import React, { useEffect, useState } from "react";
import cn from "classnames";
import useUserStore from "src/stores/user-store";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { UserCard } from "./UserCard";
import { UserDetails } from "./UserDetails";

export default function UserManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCardClick = (userId) => {
    setActiveUserId(userId);
  };

  const handleUserUpdate = () => {
    loadUsers(); // Refresh the users list
  };

  const handleUserDelete = () => {
    setIsOpen(false); // Close the dropdown
    setActiveUserId(null); // Clear active user
    loadUsers(); // Refresh the users list
  };

  const activeUser = users.find((user) => user.id === activeUserId);

  // If the active user is deleted, clear the active user
  useEffect(() => {
    if (activeUserId && !users.find((user) => user.id === activeUserId)) {
      setActiveUserId(null);
    }
  }, [users, activeUserId]);

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
          {activeUser && (
            <UserDetails
              id={activeUserId}
              onUserUpdate={handleUserUpdate}
              onUserDelete={handleUserDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
