import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { Certifications } from '@/sections/Certifications';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { StarBackground } from '@/sections/StarBackground';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background — fixed behind everything */}
      <StarBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Visual Effects */}
      <div className="grain-overlay" />
      <div className="vignette" />
    </div>
  );
}

export default App;
