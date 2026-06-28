import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resendSetup = apiKey ? new Resend(apiKey) : null;

/** Inbox that receives chatbot leads + contact enquiries. */
const LEAD_INBOX = process.env.GMAIL_USER ?? "hello@adonessdesigns.com";
const MAIL_FROM =
  process.env.LEAD_EMAIL_FROM ?? "Adoness Assistant <onboarding@resend.dev>";

export interface ChatLead {
  name: string;
  contact: string;
  message: string;
}

export interface ContactEnquiry {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Emails a chatbot-captured lead to Bidemi's inbox via Resend.
 * No-ops silently when Resend is not configured so the chat stream never breaks.
 */
export async function sendLeadEmail(lead: ChatLead): Promise<void> {
  if (!resendSetup) return;

  await resendSetup.emails.send({
    from: MAIL_FROM,
    to: LEAD_INBOX,
    subject: `New chatbot lead — ${lead.name}`,
    html: `
      <h2>New lead from the Adoness chatbot</h2>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(lead.contact)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(lead.message)}</p>
    `,
  });
}

/**
 * Emails a contact-form enquiry to Bidemi's inbox via Resend.
 * Throws when Resend is not configured so the API route can surface an error.
 */
export async function sendContactEmail(enquiry: ContactEnquiry): Promise<void> {
  if (!resendSetup) {
    throw new Error("Email service is not configured.");
  }

  await resendSetup.emails.send({
    from: MAIL_FROM,
    to: LEAD_INBOX,
    replyTo: enquiry.email,
    subject: `New enquiry from ${enquiry.name} — Adoness`,
    html: `
      <h2>New enquiry from the Adoness contact form</h2>
      <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(enquiry.message)}</p>
    `,
  });
}
