import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Twitter } from 'lucide-react';
import { emailjs as emailjsConfig, social } from '../lib/data';
import { ActionButton, Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const socialLinks = [
  { href: social.github, label: 'GitHub', icon: Github },
  { href: social.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: social.whatsapp, label: 'WhatsApp', icon: MessageCircle },
  { href: social.twitter, label: 'Twitter', icon: Twitter },
  { href: social.instagram, label: 'Instagram', icon: Instagram },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, formRef.current, emailjsConfig.publicKey);
      setStatus('sent');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="08" eyebrow="Contact" title="Build something useful." description="I'm interested in building software around real-world problems, infrastructure and data-driven systems." />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-6">
            <a href={`mailto:${social.email}`} className="flex items-center gap-3 text-ink hover:text-accent transition-colors">
              <Mail size={18} className="text-muted" />
              {social.email}
            </a>
            <div className="flex items-center gap-3 text-ink">
              <MapPin size={18} className="text-muted" />
              {social.location}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent/40 hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="user_name" className="sr-only">Your name</label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="user_email" className="sr-only">Your email</label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building?"
                  className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <ActionButton type="submit" variant="primary" disabled={status === 'sending'} className="disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </ActionButton>
              {status === 'sent' && <p className="font-mono text-xs text-[rgb(var(--status))]">Sent — I'll get back to you soon.</p>}
              {status === 'error' && <p className="font-mono text-xs text-red-500">Something went wrong — email me directly instead.</p>}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
