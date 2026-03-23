import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
