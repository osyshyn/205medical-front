import React from "react";

interface AvatarProps {
  avatarPath: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({ avatarPath }) => {
  return (
    <div className="mb-4 h-[180px] w-[180px] overflow-hidden bg-gray-200">
      {avatarPath ? (
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${avatarPath.replace("public\\", "")}`}
          alt="User Avatar"
          className="flex h-full w-full items-center justify-center object-cover"
        />
      ) : (
        <span className="text-sm text-gray-500">No Avatar</span>
      )}
    </div>
  );
};
