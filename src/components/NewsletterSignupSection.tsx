import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsletterSignupSection = () => {
    useEffect(() => {
              AOS.init({
                duration: 800,
                easing: "ease-in-out",
                once: true,
                mirror: false,
              });
            }, []);
  return (
    <section className="bg-white text-blue-900 py-16 px-8">
      <div className="max-w-3xl mx-auto text-center" data-aos="fade-in" data-aos-delay="200">
        <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
        <p className="mb-8 text-blue-700">
          Subscribe to our newsletter for the latest updates, features, and tips.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 border-1 border-blue-900 rounded bg-white text-blue-900"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded text-white font-semibold transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignupSection;