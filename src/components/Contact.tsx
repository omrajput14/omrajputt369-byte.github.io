import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailjs as cfg, social } from '../lib/data';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(cfg.serviceId, cfg.templateId, form.current, cfg.publicKey);
      setStatus('sent');
      form.current.reset();
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border-b border-fg/30 bg-transparent py-4 text-lg outline-none placeholder:text-fg/40 focus:border-fg';

  return (
    <section id="contact" className="grid gap-12 border-t border-fg/20 px-6 py-28 sm:px-10 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="t-display text-[clamp(3rem,8vw,7rem)]">Contact</h2>
        <a href={`mailto:${social.email}`} className="mt-8 block text-xl hover:text-accent">{social.email}</a>
        <p className="t-mono mt-2 text-fg/60">{social.location}</p>
        <div className="t-mono mt-10 flex flex-wrap gap-5">
          <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
          <a href={social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp</a>
          <a href={social.twitter} target="_blank" rel="noreferrer" className="hover:text-accent">X</a>
        </div>
      </div>
      <form ref={form} onSubmit={submit} className="flex flex-col gap-2">
        <label className="sr-only" htmlFor="user_name">Name</label>
        <input id="user_name" name="user_name" required placeholder="Your name" className={field} />
        <label className="sr-only" htmlFor="user_email">Email</label>
        <input id="user_email" name="user_email" type="email" required placeholder="Your email" className={field} />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" name="message" required rows={4} placeholder="What are you building?" className={field} />
        <button type="submit" disabled={status === 'sending'} className="t-mono mt-6 self-start rounded-full bg-fg px-8 py-4 text-bg transition-colors hover:bg-accent disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'sent' && <p className="t-mono mt-2 text-accent">Sent — I'll get back to you.</p>}
        {status === 'error' && <p className="t-mono mt-2 text-accent">Something broke — email me directly.</p>}
      </form>
    </section>
  );
}
