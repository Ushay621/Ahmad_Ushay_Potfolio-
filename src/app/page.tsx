import Navbar from "./navbar/Navbar";
import HomeSection from "./home/page";
import AboutSection from "./about/page";
import ExperienceSection from "./experience/page";
import ResumeSection from "./resume/page";
import FeaturedProjects from "./FeaturedProjects/page";
import ContactSection from "./ContactSection/page";
import SkillsTechnologies from "./SkillsTechnologies/page";
import PortfolioServices from "./PortfolioServices/page";
import Footer from "@/app/components/Footer";
import SwipeableCarousel from "@/app/components/SwipeableCarousel";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <HomeSection />
          <AboutSection />

          {/* Mobile: Show all sections directly */}
          <div className="lg:hidden space-y-8">
            <ExperienceSection />
            <FeaturedProjects />
            <SkillsTechnologies />
            <PortfolioServices />
          </div>

          {/* Desktop/LG: Show carousel */}
          <div className="hidden lg:block">
            <SwipeableCarousel>
              <ExperienceSection />
              <FeaturedProjects />
              <SkillsTechnologies />
              <PortfolioServices />
            </SwipeableCarousel>
          </div>

          <ResumeSection />
          <ContactSection />
        </div>
        <Footer />
      </main>
    </>
  );
}
