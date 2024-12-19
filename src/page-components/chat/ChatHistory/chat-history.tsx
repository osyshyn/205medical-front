import { FC, useState } from "react";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { ChatHistoryItem } from "./chat-history-item";

interface ChatHistoryProps {
  chats: Array<{ id: number; name: string; last_message: any; type: number }>;
  onChatSelect: (chatId: number) => void;
}

export const ChatHistory: FC<ChatHistoryProps> = ({ chats, onChatSelect }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
    onChatSelect(chatId);
  };

  return (
    <Window className="min-w-127.5 bg-white max-h-162.5 max-w-127.5 rounded-xl shadow-lg">
      <Title title="Chat" subtitle="" />
      <div className="mt-2">
        {chats.map((chat) => (
          <div key={chat.id} onClick={() => handleChatSelect(chat.id)}>
            <ChatHistoryItem
              chat={chat}
              isSelected={chat.id === selectedChatId}
            />
          </div>
        ))}
      </div>
    </Window>
  );
};
