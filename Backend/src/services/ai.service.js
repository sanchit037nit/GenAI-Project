import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical interview question."),

        intention: z
          .string()
          .describe("Why the interviewer asks this question."),

        answer: z
          .string()
          .describe("Ideal approach to answer the question."),
      })
    )
    .describe("Technical interview questions."),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral interview question."),

        intention: z
          .string()
          .describe("Purpose behind asking this question."),

        answer: z
          .string()
          .describe("Recommended answer strategy."),
      })
    )
    .describe("Behavioral interview questions."),

  skillGaps: z
    .array(
      z.object({
        skill: z.string(),

        severity: z.enum(["low", "medium", "high"]),
      })
    )
    .describe("Skills missing from candidate profile."),

  preparationPlan: z
    .array(
      z.object({
        day: z.number(),

        focus: z.string(),

        tasks: z.array(z.string()),
      })
    )
    .describe("Day-wise preparation plan."),

  title: z
    .string()
    .describe("Job title."),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report for the following candidate.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const resumePdfSchema = z.object({
    html: z.string().describe("HTML content of the resume."),
  });

  const prompt = `
Generate a professional ATS-friendly resume using the following information.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Requirements:

- Return JSON only.
- JSON should contain one field named "html".
- HTML should be clean and professional.
- Tailor the resume for the provided job.
- Keep it ATS friendly.
- Use simple colors.
- Make it look like a real resume.
- Maximum length should be around 1-2 pages.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

export {
  generateInterviewReport,
  generateResumePdf,
};