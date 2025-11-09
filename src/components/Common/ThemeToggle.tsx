import { Moon, Sun } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useChatStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
