const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./back.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


// =========================================
// GEMINI API
// =========================================

app.post("/api/find-gems", async (req, res) => {

    try {

        const { prompt, budget } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Please enter a state or destination."
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Gemini API key is missing from back.env"
            });
        }


        const aiPrompt = `
You are the AI travel recommendation engine for "Hidden India".

Find exactly 3 lesser-known travel destinations in or near ${prompt}, India.

Budget:
${budget}

For each destination provide:

1. name
2. state
3. tagline
4. hotel
5. transport
6. imageUrl

Return ONLY valid JSON.

Use this exact format:

[
  {
    "name": "Destination Name",
    "state": "State Name",
    "tagline": "Short description",
    "hotel": "Stay name and approximate cost",
    "transport": "Nearest transport connection",
    "imageUrl": "https://images.unsplash.com/photo-..."
  }
]

Do not use markdown.
Do not use code fences.
Do not add explanations outside the JSON.
`;


        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: aiPrompt
                                }
                            ]
                        }
                    ],

                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error("Gemini API error:");
            console.error(data);

            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    "Gemini API request failed."
            });
        }


        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;


        if (!text) {

            console.error("Unexpected Gemini response:");
            console.error(JSON.stringify(data, null, 2));

            return res.status(500).json({
                error: "Gemini returned an empty response."
            });
        }


        let destinations;

        try {

            destinations = JSON.parse(text);

        } catch (parseError) {

            console.error("JSON parsing failed:");
            console.error(text);

            return res.status(500).json({
                error: "Gemini returned invalid JSON."
            });
        }


        if (!Array.isArray(destinations)) {

            return res.status(500).json({
                error: "Gemini response was not an array."
            });
        }


        return res.json({
            destinations
        });

    } catch (error) {

        console.error("SERVER ERROR:");
        console.error(error);

        return res.status(500).json({
            error: error.message || "Internal server error."
        });
    }

});


app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log("      HIDDEN INDIA SERVER");
    console.log("====================================");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("====================================");
    console.log("");

});