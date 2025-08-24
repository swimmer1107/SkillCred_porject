
import { GoogleGenAI } from "@google/genai";

const getComprehensivePrompt = (syllabusInput: string, citationStyle: string) => `
You are an academic content generator that uses a multi-step pipeline to transform a syllabus outline or topic keywords into a structured, human-like learning guide.

**Your Internal Workflow:**
1.  **Analyze & Structure:** First, analyze the provided input to identify core topics, subtopics, and logical flow.
2.  **Content Expansion:** Then, for each topic, generate concise explanations, using a student-friendly and slightly conversational tone. Weave in simple examples and analogies to make complex ideas easier to understand.
3.  **Drafting & Formatting:** Next, assemble the expanded content into a complete guide with a title, introduction, sectioned content, a "Key Takeaways" summary, and a "Further Reading" section.
4.  **Refinement:** Finally, polish the entire text for a natural, human-like feel, ensuring varied sentence structure and smooth transitions.

**Input Syllabus/Keywords:**
---
${syllabusInput}
---

**Output Requirements:**
*   **Title:** Create an appropriate title for the guide.
*   **Introduction:** Write a short paragraph to set the context for the topic.
*   **Main Sections:** Organize the content into logical sections with clear headings and subheadings.
*   **Examples / Analogies:** Include simple, practical, or classroom-style examples to clarify points.
*   **Key Takeaways:** Provide a bulleted summary of the most important concepts.
*   **Further Reading / References:** List 3-5 reliable sources (textbooks, research papers, reputable online resources). Format these references using the **${citationStyle}** citation style.

**Tone & Style Guidelines:**
*   **Audience:** Write as if you are a student preparing high-quality notes for classmates. The tone should be academic yet approachable and slightly conversational.
*   **Natural Language:** Use varied sentence lengths and natural connectors (e.g., "for example," "this is especially important because...").
*   **Avoid Clichés:** Do not use robotic concluding phrases like "In conclusion," or "Overall,".

Now, execute your pipeline and generate the complete learning guide in Markdown format. Use '#' for the main title, '##' for section headings, '*' for bullet points, and '**' for bold text.
`;

const getExamNotesPrompt = (syllabusInput: string, citationStyle: string) => `
You are an academic content generator specializing in creating concise study materials for students preparing for exams. Your goal is to distill information into its most essential components.

**Your Internal Workflow:**
1.  **Analyze & Prioritize:** First, analyze the provided input to identify the absolute most critical topics, definitions, formulas, and key concepts that are likely to appear on an exam.
2.  **Summarize & Condense:** Then, for each critical point, generate an extremely brief and direct summary. Use bullet points heavily. Avoid long paragraphs and conversational filler.
3.  **Drafting & Formatting:** Next, assemble the content into a "Quick Study Notes" format. It should include a title, sections for key terms/definitions, core concepts, and a "Further Reading" section.

**Input Syllabus/Keywords:**
---
${syllabusInput}
---

**Output Requirements:**
*   **Title:** Create a title like "Exam Study Notes: [Topic]".
*   **Key Terms & Definitions:** A section with important vocabulary and their concise definitions.
*   **Core Concepts:** A bulleted list summarizing the main ideas, principles, or formulas. Keep explanations to 1-2 sentences maximum.
*   **Further Reading / References:** List 3-5 reliable sources. Format these references using the **${citationStyle}** citation style.

**Tone & Style Guidelines:**
*   **Audience:** Write for a student cramming for an exam. The tone must be direct, dense with information, and extremely focused.
*   **Brevity is Key:** No fluff. No analogies. No long introductions. Get straight to the point.
*   **Structure:** Use headings and bullet points to create a scannable, easy-to-digest document.

Now, execute your pipeline and generate the complete exam study notes in Markdown format. Use '#' for the main title, '##' for section headings, '*' for bullet points, and '**' for bold text.
`;

export async function generateLearningGuide(
    syllabusInput: string, 
    citationStyle: string, 
    contentStyle: string
): Promise<string> {
    // --- Add your API key here ---
    // IMPORTANT: Replace "YOUR_API_KEY_HERE" with your actual Google Gemini API key.
    // Note: For a real application, it's more secure to use environment variables than to hardcode keys.
    const apiKey = "AIzaSyDx4FjGSRP0RhDBdnl-Al97Q0OKSwMZ_a8";

    if (apiKey === "AIzaSyDx4FjGSRP0RhDBdnl-Al97Q0OKSwMZ_a8" || !apiKey) {
        throw new Error("Please replace 'YOUR_API_KEY_HERE' with your actual Google Gemini API key in services/geminiService.ts");
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const prompt = contentStyle === 'Exam Study Notes'
        ? getExamNotesPrompt(syllabusInput, citationStyle)
        : getComprehensivePrompt(syllabusInput, citationStyle);

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("The AI service failed to generate content. This could be due to an invalid API key, network issues, or a problem with the service itself.");
    }
}
