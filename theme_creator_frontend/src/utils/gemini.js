//
// Gemini API helper for code generation - new "generateThemeCode" implementation
//

// PUBLIC_INTERFACE
/**
 * Generates site code (HTML, CSS, JS) for a given theme + idea using the new Gemini API.
 * @param {string} theme - Theme style for code generation.
 * @param {string} idea - User's creative idea/description.
 * @param {function} setResult - Callback to set the generated result (string).
 * @returns {Promise<void>}
 */
export async function generateThemeCode(theme, idea, setResult) {
  const prompt = `
Return THREE blocks:

---HTML---
<full html>

---CSS---
<full css>

---JS---
<full js>

Theme: ${theme}. Idea: ${idea}. Responsive. No extra words.
  `;

  try {
    const response = await fetch("https://gemini-2-5-pro.p.rapidapi.com/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "634766b73bmsh0a7fe01b023896ep1fa5d9jsn10ea21f3f7a7",
        "X-RapidAPI-Host": "gemini-2-5-pro.p.rapidapi.com"
      },
      body: JSON.stringify({ prompt })
      // mode: "cors"  // optional, default is fine
    });

    const data = await response.json();
    const text =
      data.generatedContent ||
      data.choices?.[0]?.message?.content ||
      "No content returned.";

    setResult(text);
  } catch (err) {
    console.error(err);
    setResult("\u274C Error: " + err.message);
  }
}
