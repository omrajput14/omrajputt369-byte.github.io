import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-content px-6 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px flex-1 max-w-8 bg-border" />
        <span className="tracking-[0.2em] uppercase">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-2xl text-muted text-base sm:text-lg">{description}</p>}
    </div>
  );
}

const buttonBase =
  'inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants = {
  primary: 'bg-ink text-canvas hover:opacity-85',
  secondary: 'border border-border text-ink hover:border-accent hover:text-accent',
  ghost: 'text-muted hover:text-ink',
};

type Variant = keyof typeof variants;

export function LinkButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a className={`${buttonBase} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

export function ActionButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${buttonBase} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-accent/40 group-hover:text-ink ${className}`}
    >
      {children}
    </span>
  );
}
