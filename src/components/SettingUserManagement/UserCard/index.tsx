import { ROLE_USER } from "src/components/Sidebar/AccountCard/constants";

export const UserCard = ({ item, activeUserId, onCardClick }) => {
  return (
    <div className="horizontal-scroll relative border-b">
      {item.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onCardClick(user.id)}
          className={`max-h-80 !w-52 cursor-pointer rounded-10 border p-4 ${
            user.id === activeUserId ? "border-purple-base" : "border-gray-soft"
          }`}
        >
          <div className="h-36 w-40 overflow-hidden bg-gray-200">
            <img
              src={user.avatar?.path}
              alt="avatar"
              className="flex h-full w-full items-center justify-center object-cover"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-center text-lg font-semibold">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-center text-12 text-gray-500">
              {ROLE_USER[user.role] || "Роль не вказана"}
            </p>
            <p className="text-center text-12 text-gray-500">
              {user.email || "none"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
