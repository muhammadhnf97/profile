import { useState } from "react";
import { API_URL } from "../lib/api";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setError(
          res.status === 422
            ? "Please check your input and try again."
            : "Something went wrong. Please try again later."
        );
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setError("Could not reach the server. Please try again later.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
        Thanks for reaching out — I'll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          className={inputClasses}
          placeholder="What's on your mind?"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-indigo-600 px-5 py-2.5 font-mono text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
      >
        {status === "submitting" ? "sending…" : "send message →"}
      </button>
    </form>
  );
}
