"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      value: "Gujarat, India",
      copyValue: "Gujarat, India",
      description: "Available for remote contracts",
      clickable: true,
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden"
    >
      {/* Glow Backing */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's connect! I am always open to discussing new software engineering roles, system architectures, or collaborating on high-fidelity web projects."
        />

        <div className="grid lg:grid-cols-12 gap-12 mt-6 items-start">
          {/* Left Column: Contact Cards & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
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
                      Actively seeking backend developer roles or full-stack software engineering
                      positions.
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      onClick={() => isClickable && copyToClipboard(info.copyValue!, index)}
                      className={`border-border/30 bg-card/25 rounded-2xl glass-card transition-all duration-300 relative select-none ${
                        isClickable
                          ? "cursor-pointer hover:border-primary/30 hover:bg-card/40 active:scale-[0.99]"
                          : "cursor-default"
                      }`}
                    >
                      <CardContent className="p-4.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {/* Glowing Icon Frame */}
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
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
                            <AnimatePresence mode="wait">
                              {isCopied ? (
                                <motion.div
                                  key="copied"
                                  initial={{ scale: 0.7, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.7, opacity: 0 }}
                                  className="flex items-center gap-1 text-[10px] font-black text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Copied</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="p-1 rounded-md bg-muted/40"
                                >
                                  <Copy className="w-3.5 h-3.5 text-muted-foreground/40" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card className="border-border/40 bg-card/45 rounded-3xl glass-card overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 font-extrabold text-foreground text-lg">
                  <Send className="w-5 h-5 text-primary" />
                  Send Me a Message
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Fill out the secure form below to initiate correspondence.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                {/* Beautiful Success Overlay Card upon submission completed */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-background/95 dark:bg-card/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                        className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center mb-4 shadow-lg shadow-green-500/5"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </motion.div>

                      <h4 className="text-lg font-black text-foreground mb-2">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-6 font-semibold">
                        Thank you for your message! I will review your request and get back to you
                        shortly.
                      </p>

                      <Button
                        onClick={() => setSubmitStatus("idle")}
                        variant="outline"
                        className="rounded-full text-xs font-bold px-6 py-2.5 h-auto cursor-pointer"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name Input field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold text-foreground/80">
                        Name
                      </Label>
                      <div className="relative rounded-xl border border-border/40 overflow-hidden neon-border-focus transition-all">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          disabled={isSubmitting}
                          className="border-0 bg-transparent text-xs font-semibold px-4.5 py-3.5 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Email Input field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-foreground/80">
                        Email Address
                      </Label>
                      <div className="relative rounded-xl border border-border/40 overflow-hidden neon-border-focus transition-all">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          disabled={isSubmitting}
                          className="border-0 bg-transparent text-xs font-semibold px-4.5 py-3.5 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Input field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs font-bold text-foreground/80">
                      Subject
                    </Label>
                    <div className="relative rounded-xl border border-border/40 overflow-hidden neon-border-focus transition-all">
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                        disabled={isSubmitting}
                        className="border-0 bg-transparent text-xs font-semibold px-4.5 py-3.5 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Message Text area field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-bold text-foreground/80">
                      Message Body
                    </Label>
                    <div className="relative rounded-xl border border-border/40 overflow-hidden neon-border-focus transition-all">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detailed specifics about your role, collaboration scope, or question..."
                        rows={4}
                        required
                        disabled={isSubmitting}
                        className="border-0 bg-transparent text-xs font-semibold px-4.5 py-3.5 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-xl resize-none"
                      />
                    </div>
                  </div>

                  {/* Error Notification Alert */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold p-3.5 rounded-xl shadow-xs"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>
                        An error occurred. Please try again or copy/send directly via email.
                      </span>
                    </motion.div>
                  )}

                  {/* Submit Button Trigger */}
                  <Button
                    type="submit"
                    className="w-full text-xs font-bold rounded-full py-4 h-auto cursor-pointer shadow-md select-none transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2 shrink-0"></div>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
