import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { APP_URL } from "@/constants/links";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email clients ignore the site's CSS variables, so the soot and lime tokens from globals.css are repeated as hex.
const soot = "#0f0f0f";
const lime = "#dafa9c";
const muted = "#8f8f8f";
const font = "Figtree, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const label = {
  margin: 0,
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export function EmailTemplate({ name, email, subject, message }: Readonly<EmailTemplateProps>) {
  const host = new URL(APP_URL).host;
  const reply = `mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return (
    <Html lang="en">
      <Head />
      <Preview>{`${name}: ${message.slice(0, 100)}`}</Preview>
      <Body style={{ margin: 0, padding: "32px 16px", backgroundColor: soot, fontFamily: font }}>
        <Container style={{ maxWidth: 560, margin: "0 auto" }}>
          <Text style={{ ...label, color: lime }}>{host} / contact form</Text>
          <Heading
            as="h1"
            style={{ margin: "12px 0 24px", fontSize: 28, lineHeight: 1.15, color: "#ffffff" }}
          >
            {subject}
          </Heading>

          <Section style={{ backgroundColor: "#ffffff", padding: 24 }}>
            <Text style={{ ...label, color: "#5f5f5f" }}>From</Text>
            <Text style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 600, color: soot }}>
              {name}
            </Text>
            <Link
              href={`mailto:${email}`}
              style={{ fontSize: 14, color: soot, textDecoration: "underline" }}
            >
              {email}
            </Link>

            <Text
              style={{
                ...label,
                color: "#5f5f5f",
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid #c9c9c9",
              }}
            >
              Message
            </Text>
            <Text
              style={{
                margin: "8px 0 0",
                fontSize: 16,
                lineHeight: 1.6,
                color: soot,
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </Text>
          </Section>

          <Button
            href={reply}
            style={{
              marginTop: 24,
              padding: "12px 20px",
              backgroundColor: lime,
              color: soot,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Reply to {name}
          </Button>

          <Text
            style={{
              margin: "32px 0 0",
              paddingTop: 16,
              borderTop: "1px solid #3a3a3a",
              fontSize: 12,
              color: muted,
            }}
          >
            Sent from the contact form on{" "}
            <Link href={APP_URL} style={{ color: muted }}>
              {host}
            </Link>
            . Replying to this email goes straight to {email}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
