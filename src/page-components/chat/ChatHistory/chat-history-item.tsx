import { FC } from "react";
import { Avatar } from "src/components/Avatar";
import { AVATAR_SIZE_VARIANTS } from "src/components/Avatar/constants";

interface ChatHistoryItemProps {
  chat: { id: number; name: string; last_message: any; type: number };
  isSelected: boolean;
}

export const ChatHistoryItem: FC<ChatHistoryItemProps> = ({
  chat,
  isSelected,
}) => {
  const formatCreatedAt = (createdAt: string) => {
    const messageDate = new Date(createdAt);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString("en-GB");
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center overflow-hidden rounded-lg p-4 ${
        isSelected ? "border border-gray-300" : "hover:bg-gray-50"
      }`}
      style={{ height: "80px" }}
    >
      <Avatar />
      <div className="flex-1 overflow-hidden">
        <div className="text-black text-lg font-semibold">{chat.name}</div>
        <div
          className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500"
          style={{ maxHeight: "40px" }}
        >
          {chat?.last_message?.content}
        </div>
      </div>
      {/* Время */}
      <div className="text-sm text-gray-400">
        {chat?.last_message?.created_at &&
          formatCreatedAt(chat?.last_message.created_at)}
      </div>
    </div>
  );
};
