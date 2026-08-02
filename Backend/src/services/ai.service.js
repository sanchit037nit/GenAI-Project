import Groq from "groq-sdk";
import puppeteer from "puppeteer";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),

  title: z.string(),
});

function cleanJson(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert technical interviewer.

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill":"",
      "severity":"low | medium | high"
    }
  ],
  "preparationPlan":[
    {
      "day":1,
      "focus":"",
      "tasks":[]
    }
  ],
  "title":""
}

Resume:

${resume}

Self Description:

${selfDescription}

Job Description:

${jobDescription}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
  });

  const text = cleanJson(response.choices[0].message.content);

  const json = JSON.parse(text);

  return interviewReportSchema.parse(json);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",

    printBackground: true,

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

const resumeSchema = z.object({
  html: z.string(),
});

async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert resume writer.

Create a professional ATS-friendly resume.

Return ONLY JSON.

Example:

{
  "html":"<html>...</html>"
}

Requirements:

- Clean HTML

- Professional Design

- ATS Friendly

- Tailwind NOT allowed

- Use inline CSS only

- Keep to one page

Resume:

${resume}

Self Description:

${selfDescription}

Job Description:

${jobDescription}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.2,
  });

  const text = cleanJson(response.choices[0].message.content);

  const json = JSON.parse(text);

  const validated = resumeSchema.parse(json);

  const pdfBuffer = await generatePdfFromHtml(validated.html);

  return pdfBuffer;
}

export {
  generateInterviewReport,
  generateResumePdf,
};