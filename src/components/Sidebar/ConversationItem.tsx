import type { Conversation } from "../../types";
import { Trash2 } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      className={`group p-3 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{conversation.title}</p>
          <p
            className={`text-xs ${
              isActive
                ? "text-blue-100"
                : "text-gray-500 dark:text-gray-400"
            } mt-1`}
          >
            {conversation.messages.length} messages
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(conversation.id);
          }}
          className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            isActive
              ? "hover:bg-blue-700"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          title="Delete conversation"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
