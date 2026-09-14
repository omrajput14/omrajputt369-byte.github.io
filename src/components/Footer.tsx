import { Container } from './ui';

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Om Rajput. Built from scratch.</p>
        <p className="font-mono text-xs text-muted">Nashik, Maharashtra</p>
      </Container>
    </footer>
  );
}
