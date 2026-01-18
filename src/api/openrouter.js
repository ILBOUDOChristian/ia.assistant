/**
 * OpenRouter API integration for Vite/React
 */

const API_KEY = "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";
const MODEL = "openai/gpt-oss-120b:free";
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
// Updated: 2026-01-18 - New API Key deployed

/**
 * Sends a message to the OpenRouter API.
 * @param {Array} messages - Array of message objects (e.g., [{role: "user", content: "..."}])
 * @returns {Promise<Object>} - The API response
 */
export const chatCompletion = async (messages) => {
    if (!API_KEY) {
        throw new Error("OpenRouter API Key is missing. Please check your .env file.");
    }

    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": "https://ilboudochristian.github.io/brandbrain-ai",
                "X-Title": "BrandBrain AI - ILBOUDO Christian",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
                reasoning: {
                    enabled: true
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error?.message || `API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("OpenRouter API Error:", error);
        throw error;
    }
};
