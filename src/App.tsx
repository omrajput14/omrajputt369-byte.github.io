import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { VetraFlagship } from './components/VetraFlagship';
import { Projects } from './components/Projects';
import { Systems } from './components/Systems';
import { Engineering } from './components/Engineering';
import { BuildLog } from './components/BuildLog';
import { About } from './components/About';
import { EngineeringNotes } from './components/EngineeringNotes';
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
        <Systems />
        <Engineering />
        <BuildLog />
        <About />
        <EngineeringNotes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
