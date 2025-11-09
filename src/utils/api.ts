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

    const data = (await response.json()) as ChatResponse;

    if (!data?.content || typeof data.content !== "string") {
      throw new Error("Invalid response format from chat API");
    }

    return data.content;
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
}
