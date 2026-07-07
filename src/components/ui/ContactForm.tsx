"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { site } from "@/data/site";

/**
 * Contact form. If NEXT_PUBLIC_CONTACT_ENDPOINT is set (Formspree/Web3Forms
 * style endpoint accepting JSON), messages POST there; otherwise it falls
 * back to composing an email in the visitor's mail client.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const inputClasses =
  "w-full rounded-md border border-border bg-surface-2 px-4 py-3 text-[15px] text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!ENDPOINT) {
      // no form backend configured — open the visitor's mail client instead
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your Name"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your.email@example.com"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="How can we collaborate?"
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div aria-live="polite" className="min-h-5 text-center text-sm">
        {status === "sent" && (
          <p className="text-accent">
            Message sent successfully! I will get back to you soon.
          </p>
        )}
        {status === "mailto" && (
          <p className="text-accent">
            Opening your email app — just hit send there.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400">
            Something went wrong — email me directly at {site.email}.
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={reduced ? undefined : { y: -1 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        className="w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-background transition-colors hover:border-accent-strong hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "sending…" : "send message"}
      </motion.button>
    </form>
  );
}
