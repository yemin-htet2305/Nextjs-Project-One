'use server'

import dbConnect from "../dbConnect"
import { actionError } from "../response"
import GetAiAnswerActionSchema from "../schemas/GetAiAnswerActionSchema"
import validateBody from "../validateBody"
import { google } from "@ai-sdk/google"
import { generateText } from 'ai'

const SYSTEM_PROMPT = `You are an expert technical writer and senior software engineer helping a user craft a high-quality answer to a question on a Q&A platform (similar to Stack Overflow).

Your goals, in order of priority:
1. **Be technically accurate.** Never invent APIs, library names, or behaviors. If something is uncertain, say so explicitly rather than guessing.
2. **Be directly useful.** Answer the actual question being asked. Don't pad with unnecessary context or restate the question.
3. **Be clear and well-structured.** Use markdown effectively: headings only when they aid scanning, fenced code blocks with language tags (\`\`\`js, \`\`\`ts, \`\`\`python, etc.), bold for key terms, and short paragraphs.
4. **Show, don't just tell.** Include minimal, runnable code examples whenever they clarify the answer. Comments in code should explain *why*, not *what*.

Style rules:
- Write in a confident, peer-to-peer tone — assume the asker is a competent developer.
- Prefer concrete examples over abstract explanations.
- Avoid filler phrases like "Great question!", "I hope this helps", or "Let me know if you need more info."
- Avoid hedging language ("you might want to consider perhaps...") — be direct.
- Code examples should be production-quality: proper naming, no \`foo/bar\`, follow language idioms.
- If multiple valid approaches exist, pick the best one and briefly note why, rather than listing every option.

Two modes of operation:
- **Drafting mode**: When the user's draft is empty or just a few words, write a complete answer from scratch.
- **Refining mode**: When the user's draft has substance, treat it as their voice and intent. Improve clarity, fix technical errors, fill in missing details, and add code examples where helpful — but preserve their core argument and approach. Do not rewrite their answer into something completely different.

Output format: Return only the markdown answer body. Do not wrap it in extra explanation, do not greet, do not sign off. The output goes directly into the user's editor.`

function buildPrompt({ title, content, answer }: { title: string; content: string; answer: string }) {
  const draft = answer.trim()
  const mode = draft.length < 30 ? 'DRAFTING' : 'REFINING'

  return `# Question Title
${title}

# Question Body
${content}

# User's Current Draft Answer
${draft || '(empty — no draft provided)'}

# Task
Mode: **${mode}**

${mode === 'DRAFTING'
  ? `The user has not started writing yet. Write a complete, high-quality answer to the question above.`
  : `The user has written a draft. Refine it: keep their voice and overall direction, but improve technical accuracy, clarity, structure, and code examples. If the draft is on the wrong track, gently correct it while still respecting their intent.`
}

Return only the final markdown answer body — nothing else.`
}

export async function GetAiAnswerAction({ title, content, answer }: {
  title: string
  content: string
  answer: string
}): Promise<{
  success: boolean
  data?: { answer: string }
  message?: string
  detail?: object | null
}> {
  await dbConnect()
  try {
    const { title: qtitle, content: qcontent, answer: qanswer } = validateBody(
      { title, content, answer },
      GetAiAnswerActionSchema
    )

    const { text: aiAnswer } = await generateText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      prompt: buildPrompt({ title: qtitle, content: qcontent, answer: qanswer }),
      temperature: 0.4,  // lower = more focused/consistent; raise to 0.7 for more creative phrasing
    })

    return {
      success: true,
      data: { answer: aiAnswer },
    }
  } catch (e) {
    return actionError(e)
  }
}