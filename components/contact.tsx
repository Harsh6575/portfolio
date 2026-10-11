"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { MAIL_URL, OPEN_TO_NEW_OP } from "@/constants";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Address",
      value: MAIL_URL.slice(7),
      copyValue: MAIL_URL.slice(7),
      description: "Best way to reach me",
      clickable: true,
    },
    {
      icon: MapPin,
      label: "Current Location",
      value: "India",
      copyValue: null,
      description: "Available for remote contracts",
      clickable: false,
    },
    {
      icon: Calendar,
      label: "Typical Response",
      value: "Within 24 hours",
      copyValue: null,
      description: "Usually much faster",
      clickable: false,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
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
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          index="05 — Contact"
          title="Get In Touch"
          subtitle="Not on the job market right now, but always up for a good systems-design conversation or the right project. Reach out."
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-12 mt-6 items-stretch">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Availability Status Card */}
            {OPEN_TO_NEW_OP && (
              <Card className="border-green-500/20 bg-green-500/5 dark:border-green-500/10 dark:bg-green-950/20 rounded-2xl overflow-hidden">
                <CardContent className="p-5 flex gap-3.5 items-start">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mt-1.5 shrink-0" />
                  <div className="space-y-1">
                    <Badge
                      variant="outline"
                      className="border-green-500/40 text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-[9px] rounded-full px-2 py-0.5 bg-green-500/5"
                    >
                      Available for Hire
                    </Badge>
                    <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed font-semibold">
                      Open to full-stack roles - happy to chat.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* List of contact metrics cards with click-to-copy */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                Contact Information
              </h3>

              {contactInfo.map((info, index) => {
                const isClickable = info.clickable && info.copyValue;
                const isCopied = copiedIndex === index;

                return (
                  <div key={index}>
                    <Card
                      onClick={() => isClickable && copyToClipboard(info.copyValue!, index)}
                      className={`border-border bg-card rounded-2xl transition-all duration-200 relative select-none ${
                        isClickable
                          ? "cursor-pointer hover:border-foreground/20 active:scale-[0.99]"
                          : "cursor-default"
                      }`}
                    >
                      <CardContent className="p-4.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {/* Glowing Icon Frame */}
                          <div className="p-2.5 rounded-xl bg-muted text-foreground border border-border">
                            <info.icon className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="font-bold text-foreground/75 text-[10px] uppercase tracking-wider select-none">
                              {info.label}
                            </span>
                            <div className="text-xs sm:text-sm font-bold text-foreground tracking-wide break-all">
                              {info.value}
                            </div>
                            <p className="text-[10px] text-muted-foreground font-medium">
                              {info.description}
                            </p>
                          </div>
                        </div>

                        {/* Copy click triggers visual badges */}
                        {isClickable && (
                          <div className="text-muted-foreground/60 hover:text-foreground shrink-0 pr-1 select-none">
                            {isCopied ? (
                              <div className="flex items-center gap-1 text-[10px] font-black text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </div>
                            ) : (
                              <div className="p-1 rounded-md bg-muted/40">
                                <Copy className="w-3.5 h-3.5 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 h-full">
            <Card className="border-border bg-card rounded-3xl overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 font-extrabold text-foreground text-lg">
                  <Send className="w-5 h-5 text-primary" />
                  Send Me a Message
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Have a role, project, or question in mind? Fill out the form below.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative flex-1 flex flex-col">
                {/* Beautiful Success Overlay Card upon submission completed */}
                {submitStatus === "success" && (
                  <div className="absolute inset-0 bg-background/95 dark:bg-card/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center mb-4 shadow-lg shadow-green-500/5">
                      <CheckCircle className="w-9 h-9" />
                    </div>

                    <h4 className="text-lg font-black text-foreground mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-6 font-semibold">
                      Thanks for reaching out - I&apos;ll get back to you within a day or two.
                    </p>

                    <Button
                      onClick={() => setSubmitStatus("idle")}
                      variant="outline"
                      className="rounded-full text-xs font-bold px-6 py-2.5 h-auto cursor-pointer"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name Input field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold text-foreground/80">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        disabled={isSubmitting}
                        className="text-xs font-semibold px-4.5 py-3.5 h-auto rounded-xl"
                      />
                    </div>

                    {/* Email Input field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-foreground/80">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                        className="text-xs font-semibold px-4.5 py-3.5 h-auto rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Subject Input field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs font-bold text-foreground/80">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                      disabled={isSubmitting}
                      className="text-xs font-semibold px-4.5 py-3.5 h-auto rounded-xl"
                    />
                  </div>

                  {/* Message Text area field */}
                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <Label htmlFor="message" className="text-xs font-bold text-foreground/80">
                      Message Body
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me a bit about the role, project, or what's on your mind..."
                      required
                      disabled={isSubmitting}
                      className="flex-1 min-h-32 text-xs font-semibold px-4.5 py-3.5 rounded-xl resize-none"
                    />
                  </div>

                  {/* Error Notification Alert */}
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold p-3.5 rounded-xl shadow-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>
                        An error occurred. Please try again or copy/send directly via email.
                      </span>
                    </div>
                  )}

                  {/* Submit Button Trigger */}
                  <Button
                    type="submit"
                    className="w-full text-xs font-bold rounded-full py-4 h-auto cursor-pointer shadow-md select-none transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2 shrink-0"></div>
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 mr-2 shrink-0" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
