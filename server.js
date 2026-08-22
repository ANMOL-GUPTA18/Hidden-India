import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/discover-gems', async (req, res) => {
  const { state, budget } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Find 3 lesser-known, hidden tourist gems in ${state || 'India'} suitable for a budget of "${budget || 'Moderate'}". For each, provide the name, a short description, nearby budget/cheapest hotels with approximate cost in INR, best transportation options to reach there, and a high quality Unsplash travel image URL.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tagline: { type: Type.STRING },
              hotel: { type: Type.STRING, description: 'Cheapest hotel/stay name and price per night' },
              transport: { type: Type.STRING, description: 'Nearest railway, airport, or local transit option' },
              imageUrl: { type: Type.STRING }
            },
            required: ['name', 'tagline', 'hotel', 'transport', 'imageUrl']
          }
        }
      }
    });

    const gems = JSON.parse(response.text);
    res.json({ success: true, data: gems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch gems' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Server running on port ${PORT}`));