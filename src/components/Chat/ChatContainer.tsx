import { useChat } from "../../hooks/useChat";
import { useChatStore } from "../../store/chatStore";
import { MessageList } from "./MessageList";
import { InputBox } from "./InputBox";
import { Header } from "../Common/Header";

export function ChatContainer() {
  const { sendMessage, isLoading, error } = useChat();
  const { conversation } = useChatStore((state) => ({
    conversation: state.getCurrentConversation(),
  }));

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  if (!conversation) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header title={conversation.title} />
      <MessageList messages={conversation.messages} isLoading={isLoading} />
      {error && (
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
          <p className="text-sm">{error}</p>
        </div>
      )}
      <InputBox onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
