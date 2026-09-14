import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import { nav, social } from '../lib/data';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { Container } from './ui';

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(nav.map((n) => n.href.slice(1)));
  const { dark, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-sm font-semibold tracking-tight">
          OM<span className="text-accent">.</span>RAJPUT
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-ink"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-surface"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative ${isActive ? 'text-ink' : ''}`}>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-ink transition-colors">
            <Github size={18} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-ink transition-colors">
            <Linkedin size={18} />
          </a>
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="rounded-md border border-border p-2 text-muted hover:text-ink hover:border-accent/40 transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-border bg-canvas"
            aria-label="Primary"
          >
            <Container className="flex flex-col py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-sm uppercase tracking-wide text-muted hover:text-ink border-b border-border/60 last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4">
                <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-ink">
                  <Github size={20} />
                </a>
                <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-ink">
                  <Linkedin size={20} />
                </a>
                <button onClick={toggle} aria-label="Toggle theme" className="ml-auto rounded-md border border-border p-2 text-muted">
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
