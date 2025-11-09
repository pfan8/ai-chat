import { Plus } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { ConversationItem } from "./ConversationItem";

export function Sidebar() {
  const {
    conversations,
    currentConversationId,
    createConversation,
    setCurrentConversation,
    deleteConversation,
  } = useChatStore();

  const handleNewConversation = () => {
    createConversation();
  };

  return (
    <div className="w-64 flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center gap-2 btn-primary"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
              No conversations yet
            </p>
          ) : (
            conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === currentConversationId}
                onSelect={setCurrentConversation}
                onDelete={deleteConversation}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
