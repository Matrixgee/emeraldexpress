import FeaturesSection from "../../FeaturesSection";
import HeroSection from "../../HeroSection";
import NewsletterSignupSection from "../../NewsletterSignupSection";
import TestimonialsSection from "../../TestimonialsSection";
import TrackingSection from "../../TrackingSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrackingSection />
      <FeaturesSection />
      <TestimonialsSection/>
      <NewsletterSignupSection/>
    </div>
  );
};

export default HomePage