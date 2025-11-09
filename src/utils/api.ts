export interface ChatRequest {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatResponse {
  content: string;
}

/**
 * Send a chat request to the Cloudflare Workers API
 */
export async function sendChatMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>
): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send message");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to read response stream");
    }

    let fullContent = "";
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullContent += chunk;
    }

    return fullContent;
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
}
