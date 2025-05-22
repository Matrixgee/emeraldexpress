import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsSection = () => {
    useEffect(() => {
          AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
          });
        }, []);
  return (
    <section className="bg-blue-900 text-white py-16 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Emily R.",
              quote:
                "This app completely changed the way I manage my tasks. Highly recommended!",
            },
            {
              name: "James W.",
              quote:
                "The user interface is slick, fast, and very intuitive. Excellent support team as well.",
            },
            {
              name: "Sophia T.",
              quote:
                "I’ve tried many platforms, but this one really stands out for its simplicity and power.",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 300}
              className="bg-blue-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <p className="italic mb-4">“{testimonial.quote}”</p>
              <h4 className="font-semibold text-lg">— {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;