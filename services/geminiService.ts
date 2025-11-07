
import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile, CareerSuggestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        careerProfile: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "The title of the suggested career." },
                description: { type: Type.STRING, description: "A detailed description of the career." },
                reasoning: { type: Type.STRING, description: "Why this career fits the user's profile." },
                keyResponsibilities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "A list of key responsibilities for this role." 
                },
            },
            required: ["title", "description", "reasoning", "keyResponsibilities"],
        },
        creativeCareerProfile: {
            type: Type.OBJECT,
            description: "An 'out-of-the-box' or creative career path that blends the user's skills in an unexpected way.",
            properties: {
                title: { type: Type.STRING, description: "The title of the creative career suggestion." },
                description: { type: Type.STRING, description: "A detailed description of this creative career." },
                reasoning: { type: Type.STRING, description: "Why this creative career is an interesting blend of the user's profile." },
                keyResponsibilities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "A list of key responsibilities for this creative role." 
                },
            },
             required: ["title", "description", "reasoning", "keyResponsibilities"],
        },
        recommendedCourses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The name of the recommended course." },
                    platform: { type: Type.STRING, description: "The platform offering the course (e.g., Coursera, Udemy)." },
                    description: { type: Type.STRING, description: "A brief description of what the course covers and why it's recommended." },
                },
                 required: ["title", "platform", "description"],
            },
            description: "A list of 3-5 highly relevant courses to pursue the suggested career."
        },
    },
    required: ["careerProfile", "recommendedCourses"],
};


const buildPrompt = (profile: UserProfile): string => {
    return `
        Analyze the following user profile and act as an expert career counselor. Based on their skills, interests, and passions, provide a primary career suggestion and an additional creative, 'out-of-the-box' career suggestion. Also, recommend a few online courses to help them get started.

        If a resume is provided, use its content to get a more accurate and detailed understanding of the user's experience and skills. The resume content should be considered the primary source of truth if it conflicts with the other fields.

        **User Profile:**
        - **Technical Skills:** ${profile.technicalSkills || 'Not specified'}
        - **Communication Skills:** ${profile.communicationSkills || 'Not specified'}
        - **Interests & Hobbies:** ${profile.interests || 'Not specified'}
        - **Passions:** ${profile.passions || 'Not specified'}

        **Resume Content:**
        ${profile.resume ? `\`\`\`\n${profile.resume}\n\`\`\`` : 'Not provided'}

        Your response must be a JSON object that strictly adheres to the provided schema. Ensure the reasoning for each career suggestion clearly connects back to the user's provided information, including details from the resume if available.
    `;
};

export const generateCareerSuggestion = async (profile: UserProfile): Promise<CareerSuggestion> => {
    const prompt = buildPrompt(profile);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const suggestion = JSON.parse(jsonText) as CareerSuggestion;
        return suggestion;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get career suggestion from AI. Please check your input or try again later.");
    }
};
