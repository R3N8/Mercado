"use client";

import { BaseBtn } from "@/components/Buttons/BaseBtn";
import AsideNav from "@/components/Nav";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useToast } from "@/context/ToastContext";
import { validateContactForm } from "@/utils/validateContactForm";
import type {ContactForm} from "@/utils/validateContactForm";


export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateContactForm(form);

    if (error) {
      showToast(error, "error");
      return;
    }

    showToast("Message sent successfully!", "success");
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      <aside>
        <AsideNav />
      </aside>

      <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
      <div className="w-full max-w-xl shadow-xl rounded-xl p-2 md:p-4" style={{background: "var(--color-surface)"}}>
        <h1 className="text-3xl tracking-wider font-bold mb-2" style={{color: "var(--text-secondary)", fontFamily: "var(--font-teachers)"}}>Contact Us</h1>
        <p className="text-xl tracking-wide mb-6" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}>We'd love to hear from you.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}>
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="jane doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none" 
              style={{fontFamily: "var(--font-lato)"}}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              style={{fontFamily: "var(--font-lato)"}}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="add a topic"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none" 
              style={{fontFamily: "var(--font-lato)"}}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}>
              Message
            </label>
            <textarea
              name="message"
              minLength={10}
              maxLength={1200}
              placeholder="what's on your mind?..."
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none" style={{color: "var(--text-secondary)", fontFamily: "var(--font-lato)"}}
            />
          </div>

          <BaseBtn>
            <p>Send Message</p>
            <IoIosSend />
          </BaseBtn>
        </form>
      </div>
      </section>
    </main>
  );
}
