import { FC, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatHistory } from "src/page-components/chat/ChatHistory/chat-history";
import { ChatWindow } from "src/page-components/chat/ChatWindow";
import { Avatar } from "src/components/Avatar";
import { TextInput } from "src/components/FormField/TextInput";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useUserStore from "src/stores/user-store";
import { ReactComponent as BellIcon } from "src/assets/icons/bell.svg";

interface Avatar {
  id: number;
  user_id: number;
  type: string;
  path: string;
  created_at: string;
}

interface LastMessage {
  content: string;
  created_at: string;
  status: number;
  user_id: number;
}

export interface ChatData {
  id: number;
  avatar: Avatar;
  last_message: LastMessage;
  name: string;
  type: number;
}

export const Chat: FC = () => {
  const user = useUserStore((state) => state.user);

  const [chats, setChats] = useState<ChatData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const activeChatIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Keep ref in sync with state
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  useEffect(() => {
    const socket = io("http://localhost:3100");
    setSocket(socket);

    socket.on("connect", () => {
      socket.emit("get_chats", { userId: user.id });
    });

    socket.on("chat_list", (chats) => {
      setChats(chats);
    });

    socket.on("chat_history", ({ messages, chatInfo }) => {
      setMessages(messages);
    });

    socket.on("new_message", (message) => {
      console.log("Active chat id (ref): ", activeChatIdRef.current);
      console.log("Message chat id: ", message.chat_id);

      if (activeChatIdRef.current === message.chat_id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        setChats((prevChats) => {
          return prevChats.map((chat) => {
            if (chat.id === message.chat_id) {
              return {
                ...chat,
                last_message: message,
              };
            }
            return chat;
          });
        });
      }
    });

    socket.on("disconnect", () => {});

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user.id]);

  const handleChatSelect = (chatId: number) => {
    console.log("Chat selected:", chatId);
    setActiveChatId(chatId);
    setActiveChat(chats.find((c) => c.id === chatId) || null);
    if (socket) {
      socket.emit("join", {
        chatId,
        userId: user.id,
        role: "user",
        type: "member",
      });
    }
  };

  const sortedChats = chats.sort((a, b) => {
    if (a.name === "Company Name") return -1; // Ensure "Company" is always first
    if (b.name === "Company Name") return 1;

    const aDate = new Date(a.last_message?.created_at || 0);
    const bDate = new Date(b.last_message?.created_at || 0);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <PageWrapper mainClassName="flex gap-10">
      <ChatHistory chats={sortedChats} onChatSelect={handleChatSelect} />
      {activeChatId && (
        <ChatWindow
          messages={messages}
          userId={user.id}
          socket={socket}
          userRole={user.role}
          chatId={activeChatId}
          activeChat={activeChat}
        />
      )}
    </PageWrapper>
  );
};
