import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What shipping options do you offer?",
      answer: "We offer multiple shipping options including same-day delivery, overnight express, 2-day priority, and standard ground shipping. International shipping is available to over 100 countries with various speed options."
    },
    {
      question: "How can I track my package?",
      answer: "You can track your package using our online tracking system by entering your tracking ID on our homepage. You'll receive real-time updates via email and SMS notifications throughout the delivery process."
    },
    {
      question: "What are your shipping rates?",
      answer: "Our shipping rates depend on package size, weight, destination, and delivery speed. We offer competitive pricing with volume discounts for businesses. Use our online calculator or contact us for a custom quote."
    },
    {
      question: "Do you provide insurance for shipments?",
      answer: "Yes, we offer comprehensive insurance coverage for all shipments. Basic coverage is included at no extra cost, and additional coverage options are available for high-value items."
    },
    {
      question: "What if my package is damaged or lost?",
      answer: "We take full responsibility for packages in our care. If your shipment is damaged or lost, we'll investigate immediately and provide compensation according to our insurance policy. Most claims are resolved within 48 hours."
    },
    {
      question: "Do you offer business solutions?",
      answer: "Absolutely! We provide comprehensive business logistics solutions including supply chain management, warehousing, distribution, and custom integration with your existing systems."
    },
    {
      question: "What are your operating hours?",
      answer: "Our customer service is available 24/7. Package pickup and delivery operate Monday-Friday 8AM-6PM, Saturday 9AM-4PM. Emergency and expedited services are available outside regular hours."
    },
    {
      question: "How do I schedule a pickup?",
      answer: "You can schedule a pickup through our website, mobile app, or by calling our customer service. We offer same-day pickup for urgent shipments and regular scheduled pickups for businesses."
    }
  ];

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find answers to common questions about our services</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition duration-300 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-blue-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-900" size={20} />
                ) : (
                  <ChevronDown className="text-blue-900" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ
