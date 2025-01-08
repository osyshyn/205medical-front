import React, { FC, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatData } from "src/pages/Chat";
import { Avatar } from "src/components/Avatar";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { ReactComponent as BellIcon } from "src/assets/icons/bell.svg";
import { TypesUsers } from "src/@types/users";

interface Message {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  messages: Message[];
  userId: number;
  socket: Socket | null;
  chatId: number | null;
  activeChat: ChatData | null;
  userRole: number;
}

export const ChatWindow: FC<ChatWindowProps> = ({
  messages,
  userId,
  socket,
  chatId,
  activeChat,
  userRole,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isCompanyChannel = activeChat?.name === "Company Name";

  useEffect(() => {
    // Прокрутка вниз при изменении сообщений
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && chatId && newMessage.trim() !== "") {
      socket.emit("send_message", {
        chatId,
        userId,
        role: "user",
        content: newMessage,
        type: "member",
      });
      setNewMessage("");
    }
  };

  const formatDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    if (isToday) {
      return messageDate.toLocaleTimeString([], options);
    } else {
      const day = messageDate.getDate().toString().padStart(2, "0");
      const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
      const year = messageDate.getFullYear();
      return `${day}.${month}.${year}`;
    }
  };

  return (
    <Window className="flex h-full max-h-162.5 flex-1 flex-col border border-gray-200 p-0 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <Avatar />
          <Title title={activeChat.name} subtitle="" />
        </div>
        <BellIcon />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.user_id === userId ? "justify-end" : "justify-start"}`}
          >
            {msg.user_id !== userId && (
              <Avatar className="mr-2 h-8 w-8 rounded-full" />
            )}
            <div className={`max-w-xs`}>
              <div className="rounded-lg border border-gray-300 px-4 py-2">
                <p>{msg.content}</p>
              </div>
              <div
                className={`mt-2 block text-xs text-gray-400 ${
                  msg.user_id === userId ? "text-right" : "text-left"
                }`}
              >
                {formatDate(msg.created_at)}
              </div>
            </div>
            {msg.user_id === userId && (
              <Avatar className="ml-2 h-8 w-8 rounded-full" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!isCompanyChannel && (
        <div className="flex items-center border-t border-gray-200 p-4">
          <input
            type="text"
            placeholder="Type here..."
            className="h-12 flex-1 rounded-full border border-[#5932EA] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#5932EA]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="text-white ml-2 rounded-full p-2"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5932EA"
              className="h-5 w-5"
            >
              <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      )}
    </Window>
  );
};
