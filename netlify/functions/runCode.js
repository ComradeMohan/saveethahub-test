import axios from "axios";

export async function handler(event) {
  try {
    if (!event.body) return { statusCode: 400, body: JSON.stringify({ error: "Request body missing." }) };

    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch (error) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON format." }) };
    }

    const { code, language, input } = requestData;
    if (!code || !language) return { statusCode: 400, body: JSON.stringify({ error: "Missing code or language." }) };

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language, // Use provided language
      version: "*",
      files: [{ content: code }],
      stdin: input || "", // Pass input correctly
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Execution Error:", error.message);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
