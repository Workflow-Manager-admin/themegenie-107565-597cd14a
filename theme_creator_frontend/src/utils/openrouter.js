// 
// OpenRouter Gemini API Utility for Theme Code Generation
//

/**
 * Calls the OpenRouter Gemini endpoint to generate HTML, CSS, and JS code for a user prompt.
 * @param {string} theme - Theme style for code generation ("Anime", "Disney", etc.)
 * @param {string} idea - User's creative site/app idea or description.
 * @returns {Promise<string>} - The raw response string from the model (to be parsed client-side).
 *
 * Usage in React:
 * import { generateThemeCode } from "../utils/openrouter";
 * const result = await generateThemeCode("Anime", "portfolio for a chef");
 * // The result string will include three blocks labeled ---HTML---, ---CSS---, ---JS---
 */

/**
 * API KEY is sourced only from the environment for security.
 * In React create-react-app, you must prefix with REACT_APP_ to expose to frontend.
 */
const OPENROUTER_KEY = process.env.REACT_APP_OPENROUTER_KEY;
// Debug: Uncomment if you want to verify env variable, but remove in production
// console.log("OpenRouter API KEY detected:", OPENROUTER_KEY);

// PUBLIC_INTERFACE
export async function generateThemeCode(theme, idea) {
  if (!OPENROUTER_KEY) {
    return "❌ Error: OpenRouter API key not set in environment (REACT_APP_OPENROUTER_KEY).";
  }

  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
  const prompt = `You're a frontend web developer AI. Build a "${theme}"-style website based on: "${idea}"

Respond in this exact format:
---HTML---
<html>...</html>
---CSS---
<style>...</style>
---JS---
<script>...</script>`;

  const body = {
    model: "google/gemini-pro",
    messages: [
      {
        role: "system",
        content: "You are a helpful frontend AI.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return "❌ API Error: " + response.status + " - " + (await response.text());
    }

    const data = await response.json();
    // OpenRouter returns results as data.choices[0].message.content
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "No code returned.";
    return text;
  } catch (err) {
    return "❌ Network error: " + err.message;
  }
}

/**
 * Usage in a React component (example):
 *
 * import { generateThemeCode } from "../utils/openrouter";
 * // Inside a handler:
 * const code = await generateThemeCode(theme, idea);
 * // You can then parse the code string for ---HTML---, ---CSS---, ---JS--- sections.
 *
 * // See src/pages/CodeLab.jsx for full integration details with parsing and display.
 */
