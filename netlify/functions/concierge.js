/* =========================================================
   Hidden India Concierge — serverless function
   (Powered by Google Gemini's free tier)

   This is the ONLY place your Gemini API key ever lives.
   It never reaches the browser. The frontend (chat.js) calls
   this function; this function calls generativelanguage.googleapis.com.

   Env var required (set in Netlify dashboard or `netlify env:set`):
       GEMINI_API_KEY

   Get a free key at: https://aistudio.google.com/apikey
   (No credit card required for the free tier.)

   Model: gemini-3.5-flash-lite is used here specifically because it
   carries a much higher free-tier daily request quota than the full
   gemini-3.6-flash model (which is capped at just 20 requests/day on
   free tier as of testing this). If you hit a 404 "model not found"
   error, Google has likely renamed/retired it — check
   https://ai.google.dev/gemini-api/docs/models for the current name.
   If you hit 429 rate-limit errors again, either wait for the daily
   reset or add a billing account in Google AI Studio (very cheap
   per request, removes the daily cap entirely).
========================================================= */

const destinations = require("./destinations-data.json");

const MODEL = "gemini-3.5-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `
You are "Hidden India Concierge AI" — a warm, concise travel concierge whose
job is to move tourists away from overcrowded hotspots and toward one specific
lesser-known destination from the database below, based on whatever the
traveller describes (a mood, an activity, an adjective, a craft, anything —
not just a fixed list of categories).

DESTINATION DATABASE (JSON):
${JSON.stringify(destinations)}

Rules:
- Recommend exactly ONE destination from the database above. Never invent a
  destination that isn't in the database.
- If the traveller's message is too vague to pick anything meaningful yet
  (e.g. "hi", "hello", one word with no clear preference), do NOT guess —
  set "destination" to null and ask ONE short, specific clarifying question
  in "reply" instead.
- "matchPercent" is your confidence this destination fits what they described,
  as an integer 0-100. Only recommend a destination when this is 70+.
- Keep "reply" to 1-2 warm, natural sentences. No markdown, no bullet points,
  no emoji spam (at most one).
- Respond with ONLY raw JSON — no markdown code fences, no commentary before
  or after — matching exactly this shape:

{
  "reply": "string",
  "matchPercent": 0,
  "destination": {
    "name": "string",
    "state": "string",
    "description": "string",
    "pressure": "LOW | MODERATE | HIGH",
    "gem": 0,
    "community": 0,
    "jobsSupported": 0,
    "bestTime": "string",
    "access": "string"
  }
}

or, when you need to ask a clarifying question instead:

{
  "reply": "string",
  "matchPercent": 0,
  "destination": null
}
`.trim();


exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }

    let body;
    try {
        body = JSON.parse(event.body || "{}");
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }

    const { message, history } = body;

    if (!message || typeof message !== "string") {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing 'message' string" }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Server is missing GEMINI_API_KEY. Set it in your Netlify site's environment variables."
            })
        };
    }

    // Keep history short — just enough for follow-up context, not a full transcript
    const trimmedHistory = Array.isArray(history) ? history.slice(-8) : [];

    // Gemini uses "contents" with roles "user"/"model" (not "assistant"),
    // and each message's text goes in a "parts" array.
    const contents = [
        ...trimmedHistory.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
        })),
        { role: "user", parts: [{ text: message }] }
    ];

    try {

        const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents,
                generationConfig: {
                    maxOutputTokens: 1500,
                    // Ask Gemini to return raw JSON directly — skips the
                    // markdown-fence-stripping headache entirely.
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.log("GEMINI ERROR:", errText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "Gemini API error", detail: errText })
            };
        }

        const data = await response.json();

        const rawText = (data.candidates || [])
            .flatMap(c => (c.content && c.content.parts) || [])
            .map(part => part.text || "")
            .join("")
            .trim();

        let parsed;
        try {
            const cleaned = rawText.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            // Model didn't return clean JSON — surface something usable rather than failing silently
            parsed = { reply: rawText || "Sorry, I couldn't process that. Could you rephrase?", matchPercent: 0, destination: null };
        }

        return {
            statusCode: 200,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(parsed)
        };

    } catch (err) {

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Function error", detail: err.message })
        };

    }

};