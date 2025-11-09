import type { Message as MessageType } from "../../types";
import { MarkdownRenderer } from "../Markdown/MarkdownRenderer";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-slide-up`}
    >
      <div
        className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none"
        }`}
      >
        {isUser ? (
          <div className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
      </div>
    </div>
  );
}
