import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { VetraFlagship } from './components/VetraFlagship';
import { Projects } from './components/Projects';
import { Engineering } from './components/Engineering';
import { BuildLog } from './components/BuildLog';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <VetraFlagship />
        <Projects />
        <Engineering />
        <BuildLog />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
