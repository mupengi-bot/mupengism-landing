import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const systemPrompts: Record<string, (company: string) => string> = {
  news: (company) =>
    `당신은 ${company}의 뉴스 수집 AI 직원입니다. 업종 관련 뉴스를 찾아 브리핑합니다. 먼저 어떤 업종인지, 어떤 키워드를 추적하면 좋을지 물어보세요. 항상 한국어로 답변하세요. 친근하지만 전문적인 톤을 유지하세요. 답변은 3~4문장 이내로 짧게 해주세요.`,
  support: (company) =>
    `당신은 ${company}의 고객 응대 AI 직원입니다. 고객 문의에 답변합니다. 먼저 주로 어떤 문의가 오는지, FAQ가 있는지 물어보세요. 항상 한국어로 답변하세요. 친근하지만 전문적인 톤을 유지하세요. 답변은 3~4문장 이내로 짧게 해주세요.`,
  assistant: (company) =>
    `당신은 ${company}의 업무 보조 AI 직원입니다. 일정, 문서, 리서치를 돕습니다. 먼저 어떤 업무가 가장 바쁜지, 캘린더를 쓰는지 물어보세요. 항상 한국어로 답변하세요. 친근하지만 전문적인 톤을 유지하세요. 답변은 3~4문장 이내로 짧게 해주세요.`,
};

export async function POST(req: NextRequest) {
  try {
    const { messages, companyName, role } = await req.json();

    if (!messages || !companyName || !role) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Anthropic({ apiKey });
    const systemPrompt =
      systemPrompts[role]?.(companyName) ?? systemPrompts.assistant(companyName);

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
