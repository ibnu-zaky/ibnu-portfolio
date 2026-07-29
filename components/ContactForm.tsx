"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan.");

      setStatus("success");
      setMessage("Pesan berhasil dikirim! Terima kasih.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Terjadi kesalahan koneksi.");
    }
  };

  return (
    <Reveal delay={2} className="contact-form-wrap" as="div">
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" id="name" name="name" placeholder="Nama Anda" required />
        <input type="email" id="email" name="email" placeholder="Email Anda" required />
        <textarea id="message" name="message" placeholder="Tulis pesan Anda..." required rows={4}></textarea>
        <button type="submit" className="submit-btn" disabled={status === "loading"}>
          {status === "loading" ? "Mengirim..." : "Kirim Pesan ↗"}
        </button>
        {message && (
          <p className={`form-feedback ${status === "success" ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </form>
    </Reveal>
  );
}
