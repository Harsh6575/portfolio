import { EmailTemplate } from "@/components/email-template";
import { MAIL_URL } from "@/constants";
import { isRateLimited } from "@/lib/rate-limit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body: unknown): string | null {
  if (typeof body !== "object" || body === null) {
    return "Invalid request body";
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return "Invalid name";
  }
  if (typeof email !== "string" || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return "Invalid email";
  }
  if (typeof subject !== "string" || subject.trim().length === 0 || subject.length > 200) {
    return "Invalid subject";
  }
  if (typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
    return "Invalid message";
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const validationError = validateBody(body);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
      console.error("Missing RESEND_API_KEY environment variable");
      return Response.json(
        { error: "Email service is temporarily unavailable. Please email directly." },
        { status: 503 },
      );
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: MAIL_URL.slice(7),
      subject: `${subject} - from ${name}`,
      replyTo: email,
      react: EmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
