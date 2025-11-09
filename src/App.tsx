import { useEffect } from "react";
import { useChatStore } from "./store/chatStore";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ChatContainer } from "./components/Chat/ChatContainer";
import "./index.css";

function App() {
  const { loadFromStorage } = useChatStore();

  useEffect(() => {
    // Load persisted state from localStorage
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <ChatContainer />
    </div>
  );
}

export default App;
