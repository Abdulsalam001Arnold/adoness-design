import { streamText, convertToModelMessages } from "ai";
import type { UIMessage } from "ai";
import { chatModel, ADONESS_SYSTEM_PROMPT } from "@/lib/ai";
import { sendLeadEmail } from "@/lib/resend";
import type { ChatLead } from "@/lib/resend";

export const maxDuration = 30;

interface ChatRequestBody {
  messages: UIMessage[];
}

export async function POST(req: Request): Promise<Response> {
  const { messages }: ChatRequestBody = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: chatModel,
    system: ADONESS_SYSTEM_PROMPT,
    messages: modelMessages,
    onFinish: async ({ text }) => {
      const lead = parseLead(text);
      if (lead) {
        try {
          await sendLeadEmail(lead);
        } catch {
          // Never let an email failure break the chat experience.
        }
      }
    },
  });

  return result.toUIMessageStreamResponse();
}

function parseLead(text: string): ChatLead | null {
  const marker = "LEAD_CAPTURED::";
  const index = text.indexOf(marker);
  if (index < 0) return null;

  try {
    const json = text.slice(index + marker.length).trim();
    const parsed = JSON.parse(json) as Partial<ChatLead>;
    if (
      typeof parsed.name === "string" &&
      typeof parsed.contact === "string" &&
      typeof parsed.message === "string"
    ) {
      return { name: parsed.name, contact: parsed.contact, message: parsed.message };
    }
  } catch {
    return null;
  }
  return null;
}
