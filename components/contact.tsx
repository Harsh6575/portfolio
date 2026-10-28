"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LINKED_IN_URL, MAIL_URL, OPEN_TO_NEW_OP } from "@/constants";
import { useInView } from "@/hooks/use-in-view";

const EMAIL = MAIL_URL.slice(7);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { ref, reveal } = useInView<HTMLDivElement>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-40">
      <h2 className="sr-only">Contact</h2>
      <div ref={ref} className="grid gap-10 px-5 lg:grid-cols-12 lg:gap-x-6 lg:pr-10 lg:pl-[22vw]">
        <p
          {...reveal(
            0,
            "max-w-[26ch] text-lead font-semibold tracking-tight lg:col-span-6 lg:text-head",
          )}
        >
          {OPEN_TO_NEW_OP
            ? "I'm looking for my next full-stack role. If you're hiring, write to me."
            : "Write about a role, a system worth designing, or something you're stuck on."}
        </p>

        <div {...reveal(1, "min-w-0 lg:col-span-4 lg:col-start-8")}>
          <p className="font-semibold">Got something in mind?</p>
          <p className="mt-4 flex flex-col gap-2">
            <a
              href={MAIL_URL}
              className="break-all underline underline-offset-4 hover:no-underline xl:break-normal"
            >
              {EMAIL}
            </a>
            <a
              href={LINKED_IN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:no-underline"
            >
              LinkedIn
            </a>
          </p>
          <p className="mt-4 text-small text-muted-foreground">
            Vadodara, India. I usually reply within a day.
          </p>
        </div>
      </div>

      <div className="column mt-28">
        <h3 className="text-lead font-semibold">Or leave a message here</h3>

        {submitStatus === "success" ? (
          <div role="status" className="mt-8 bg-card p-6">
            <p className="font-semibold">Sent. Thanks for writing.</p>
            <p className="mt-2 text-muted-foreground">
              I&apos;ll get back to you within a day or two.
            </p>
            <Button
              autoFocus
              variant="outline"
              onClick={() => setSubmitStatus("idle")}
              className="mt-6 cursor-pointer"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@company.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                autoComplete="off"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Full-stack role at Acme"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="A bit about the role, the project, or what's on your mind"
                required
                disabled={isSubmitting}
                className="min-h-36 resize-none"
              />
            </div>

            {submitStatus === "error" && (
              <p role="alert" className="text-destructive">
                That didn&apos;t send. Try again, or email me at {EMAIL}.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="self-start cursor-pointer"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
