import { EmailTemplate } from "@/components/email-template";
import { MAIL_URL } from "@/constants";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

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
