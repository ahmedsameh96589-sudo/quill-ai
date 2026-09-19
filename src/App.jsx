import { Footer } from "./components/layout/Footer.jsx";
import { Navbar } from "./components/layout/Navbar.jsx";
import { FAQ } from "./components/sections/FAQ.jsx";
import { Features } from "./components/sections/Features.jsx";
import { FinalCTA } from "./components/sections/FinalCTA.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { LogoMarquee } from "./components/sections/LogoMarquee.jsx";
import { Pricing } from "./components/sections/Pricing.jsx";
import { ProductShowcase } from "./components/sections/ProductShowcase.jsx";
import { TestimonialsMarquee } from "./components/sections/TestimonialsMarquee.jsx";

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only rounded-full border border-border-subtle bg-bg-surface px-4 py-2 font-semibold text-text-primary focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <LogoMarquee />
        <Features />
        <ProductShowcase />
        <TestimonialsMarquee />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
