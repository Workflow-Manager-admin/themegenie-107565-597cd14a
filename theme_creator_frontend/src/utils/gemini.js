//
// Gemini API helper for code generation
//

// PUBLIC_INTERFACE
/**
 * Generate code for a given theme and idea by calling the Gemini API.
 * @param {string} theme - Theme style for generation (e.g., "Anime", "Disney", "Professional", etc)
 * @param {string} idea - User's description or idea for the site/code.
 * @returns {Promise<string>} Generated code as a string, or error message
 */
export async function generateCode(theme, idea) {
  /** Uses Gemini API to generate code based on theme and idea. */
  const prompt = `
You are an expert web developer specializing in modern HTML, CSS, and JavaScript.
Generate a complete, minimal, and creative single-file web code based on the following theme and description.
Respond ONLY with pure code (no commentary).

Theme: ${theme}
Description: ${idea}

Requirements:
- Use <html>, <head>, <style>, and <body>.
- Styles: Incorporate personality of the theme (e.g., anime, disney, professional).
- Add expressive headings, color, and minimal graphics if fits the theme.
- All code should be in a SINGLE HTML file.
`;

  try {
    // (Replace with appropriate Gemini API endpoint/headers for your environment)
    const response = await fetch("https://generativeai.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error (${response.status}): ${response.statusText}`);
    }
    const data = await response.json();
    // The Gemini API returns generated code inside the 'candidates[0].content.parts[0].text'
    const code =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "// Error: Unable to parse Gemini response.";
    return code;
  } catch (err) {
    return `// Gemini API Error: ${err.message}`;
  }
}
