export const UserCard = ({ item, activeUserId, onCardClick }) => {
  return (
    <div className="horizontal-scroll flex h-full flex-nowrap gap-5 overflow-hidden overflow-x-auto p-4">
      {item.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onCardClick(user.id)} // Обробник кліку
          className={`border max-h-80 !w-52 cursor-pointer rounded-10 p-4 ${
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
              {user.role || "Роль не вказана"}
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
