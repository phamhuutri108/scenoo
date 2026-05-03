import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FaqSection from "@/components/landing/FaqSection";
import BlogSection from "@/components/landing/BlogSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-grow pt-16">
        <HeroSection />
        <FeaturesSection />
        <FaqSection />
        <BlogSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
