import { GoogleGenAI } from "@google/genai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(cleanedText);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
    try{
        const { question } = req.body;

        if (!question) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = conceptExplainPrompt(question);

         const response = await ai.models.generateContent({
           model: "gemini-2.5-flash",
           contents: prompt,
         });

        let rawText = response.text;

        const cleanedText = rawText
          .replace(/^```json\s*/, "") 
          .replace(/```$/, "") 
          .trim(); 

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to generate concept explanation",
            error: error.message,
          });
    }
};

export { generateInterviewQuestions, generateConceptExplanation };
