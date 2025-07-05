//
// OpenRouter Gemini API Utility for Code Generation
//

// PUBLIC_INTERFACE
/**
 * Calls the OpenRouter Gemini endpoint to generate HTML, CSS, and JS code for a user prompt.
 * @param {string} theme - Theme style for code generation ("Anime", "Disney", etc.)
 * @param {string} idea - User's creative site/app idea or description.
 * @returns {Promise<string>} - The raw response string from the model (to be parsed client-side).
 */
export async function generateThemeCode(theme, idea) {
  // Edit your OpenRouter API key here or better yet: move to .env and import it
  const OPENROUTER_API_KEY = ""; // e.g., "your-openrouter-key", ideally set via env

  if (!OPENROUTER_API_KEY) {
    // Fail fast for missing key
    return "❌ Error: OpenRouter API key not set in openrouter.js.";
  }

  // Gemini-1.5 Pro OpenRouter endpoint (more at https://openrouter.ai/docs)
  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
  const prompt = `
Return code for a complete responsive ${theme} website/app implementing the user's idea: "${idea}".
Respond in three blocks.
---HTML---
<html>...</html>
---CSS---
<style>...</style>
---JS---
<script>...</script>
No extra explanation.
`;

  const body = {
    model: "google/gemini-pro", // OpenRouter Gemini endpoint
    messages: [
      {
        role: "system",
        content: "You are an expert AI front-end developer. Respond only with usable code blocks, never with prose or text.",
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
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
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
