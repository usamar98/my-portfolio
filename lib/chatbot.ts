export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export async function sendChatMessage(
    messages: ChatMessage[]
): Promise<string> {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error("Chat error:", error);
        return "Sorry, I'm having trouble connecting. Please try emailing contact@usama.services";
    }
}
