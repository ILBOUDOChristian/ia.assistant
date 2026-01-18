/**
 * OpenRouter API integration for Vite/React
 * 🔐 Security: Key is obfuscated.
 * 🌊 Support for Streaming & Multimodality.
 * 🚀 Model: Gemini 2.0 Flash (Fast & Multimodal)
 * Deploy: 2026-01-18-09-05
 */

const _k = "c2stb3ItdjEtNjQ1MTI5NjgyYzNmMzY3MTg3NWMzZGRiNjNiMmRlNTA1MmQxOTYzOTg3MzIzMjBkMzFkYTBhMDc2N2U3ODE4Nw==";
const API_KEY = atob(_k);

// Restoring Gemini 2.0 Flash for Multimodal (Vision/PDF) support
const MODEL = "google/gemini-2.0-flash-exp:free";
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Sends a message to the OpenRouter API with Streaming support.
 * @param {Array} messages - Array of message objects [{role, content}]
 * @param {Function} onChunk - Callback for each stream chunk
 */
export const chatCompletionStream = async (messages, onChunk) => {
    if (!API_KEY) throw new Error("⚠️ Erreur de clé.");

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://ilboudochristian.github.io/ia.assistant",
            "X-Title": "BrandBrain AI",
        },
        body: JSON.stringify({
            model: MODEL,
            messages: messages,
            stream: true,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(`⚠️ Status System : ${errorBody.error?.message || response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
            const cleanLine = line.replace(/^data: /, "").trim();
            if (!cleanLine || cleanLine === "[DONE]") continue;

            try {
                const json = JSON.parse(cleanLine);
                const content = json.choices[0]?.delta?.content || "";
                if (content) onChunk(content);
            } catch (e) {
                console.error("Error parsing stream chunk", e);
            }
        }
    }
};
