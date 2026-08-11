const allowedSections = new Set(["headline", "about", "experience", "projects"]);

const rubric = {
  headline: "Score clarity, target-role relevance, searchable keywords, specialization, value proposition, factual proof, readability, and suitable LinkedIn length.",
  about: "Score opening hook, positioning, relevant expertise, career story, quantified proof, value offered, authenticity, readability, and closing direction.",
  experience: "Score scope, action verbs, achievement orientation, quantified impact, role keywords, ownership, scanability, and passive or repetitive language.",
  projects: "Score objective, personal contribution, complexity, relevant skills, measurable outcome, user or business impact, and clarity.",
};

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "summary", "feedback", "rewrite"],
  properties: {
    score: { type: "integer", minimum: 0, maximum: 100 },
    summary: { type: "string" },
    feedback: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["tone", "title", "detail"],
        properties: {
          tone: { type: "string", enum: ["strong", "tip", "fix"] },
          title: { type: "string" },
          detail: { type: "string" },
        },
      },
    },
    rewrite: { type: "string" },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.VITE_LINKEDIN) return res.status(503).json({ error: "Groq AI service is not configured" });

  const { section, text, targetRole = "", industry = "" } = req.body || {};
  if (!allowedSections.has(section) || typeof text !== "string" || text.trim().length < 20) {
    return res.status(400).json({ error: "A valid section and sufficient profile content are required" });
  }

  const prompt = `You are CareerSense's LinkedIn profile editor. Evaluate the user's ${section} section for the target role and industry. ${rubric[section]} Be candid, specific, supportive, and recruiter-focused.

The rewrite is displayed behind a Copy button and MUST be 100% ready to paste directly into LinkedIn. Never include square brackets, parentheses containing instructions, blanks, template labels, TODOs, requests for more information, or phrases such as "add a metric", "insert outcome", or "your role". Never invent metrics, employers, qualifications, tools, clients, achievements, or responsibilities. When the source lacks a number or detail, write a strong qualitative sentence using only the facts that are present. Preserve useful specific details from the source. Return only the finished profile copy in the rewrite field, with no commentary before or after it.

Target role: ${targetRole || "Not supplied"}
Industry: ${industry || "Not supplied"}
Current content:
${text.slice(0, 6000)}`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.VITE_LINKEDIN}` },
      body: JSON.stringify({
        model: process.env.GROQ_LINKEDIN_MODEL || "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: "Return a rigorous LinkedIn profile diagnostic in the required JSON schema." },
          { role: "user", content: prompt },
        ],
        reasoning_effort: "low",
        temperature: 0.25,
        max_completion_tokens: 3000,
        response_format: {
          type: "json_schema",
          json_schema: { name: "linkedin_diagnostic", strict: true, schema: responseSchema },
        },
      }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "Groq analysis failed" });
    const output = data.choices?.[0]?.message?.content;
    if (!output) throw new Error("Groq returned no diagnostic content");
    const result = JSON.parse(output);
    const unfinishedCopy = /\[[^\]]+\]|\b(?:add|insert|include|replace)\s+(?:a|an|your|the)?\s*(?:metric|outcome|detail|number|proof point|skill|specialty)\b/i;
    if (unfinishedCopy.test(result.rewrite)) throw new Error("Groq returned an unfinished rewrite");
    return res.status(200).json({ ...result, source: "AI analysis" });
  } catch {
    return res.status(500).json({ error: "The analysis could not be completed" });
  }
}
