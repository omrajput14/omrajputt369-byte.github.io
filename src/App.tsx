import { useEffect } from 'react';
import { initSmoothScroll } from './lib/lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { AboutHero } from './components/AboutHero';
import { FeaturedWork } from './components/FeaturedWork';
import { AllWork } from './components/AllWork';
import { Services } from './components/Services';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AboutHero />
        <FeaturedWork />
        <AllWork />
        <Services />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
