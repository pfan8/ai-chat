interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
}

const ALLOWED_METHOD = "POST";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-5-mini";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 2000;

export const onRequest = async ({ request, env }: { request: Request; env: Record<string, unknown> }) => {
  if (request.method !== ALLOWED_METHOD) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: ALLOWED_METHOD },
    });
  }

  try {
    const body = (await request.json()) as RequestBody;
    const { messages } = body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request format: messages array required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = env.OPENAI_API_KEY as string | undefined;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY binding" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openaiResponse = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS,
      }),
    });

    if (!openaiResponse.ok) {
      const errorPayload = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", errorPayload);

      return new Response(
        JSON.stringify({
          error:
            errorPayload?.error?.message ??
            `OpenAI request failed with status ${openaiResponse.status}`,
        }),
        {
          status: openaiResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await openaiResponse.json();
    const assistantMessage: string =
      data?.choices?.[0]?.message?.content ?? "No response generated";

    return new Response(
      JSON.stringify({
        content: assistantMessage,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat function error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
