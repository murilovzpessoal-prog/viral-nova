import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let result = await model.generateContent("Hello!");
    console.log("Success with gemini-1.5-flash:", result.response.text());
  } catch (e) {
    console.log("Error with gemini-1.5-flash:", e.message);
  }

  try {
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    let result = await model.generateContent("Hello!");
    console.log("Success with gemini-1.5-flash-latest:", result.response.text());
  } catch (e) {
    console.log("Error with gemini-1.5-flash-latest:", e.message);
  }
}
run();
