import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/marketing/Hero';
import Services from '@/components/marketing/Services';
import Experience from '@/components/marketing/Experience';
import WhoIAm from '@/components/marketing/WhoIAm';
import HowItWorks from '@/components/marketing/HowItWorks';
import Contact from '@/components/marketing/Contact';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Experience />
        <WhoIAm />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
