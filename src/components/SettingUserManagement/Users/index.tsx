import React from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface UsersProps {
  users: User[];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div className="max-h-62.5 min-h-62.5 overflow-y-auto">
      <h4 className="!font-medium text-gray-dark">Approved users</h4>
      <dl className="ml-5 mt-1 flex flex-col gap-4 text-[14px] font-[400]">
        {users?.length > 0 &&
          users?.map((user) => (
            <li className="text-gray-steel" key={user.id}>
              {`${user.first_name} ${user.last_name}`}
            </li>
          ))}
      </dl>
    </div>
  );
};
