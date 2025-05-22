import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className='overflow-x-hidden'>
      {/* Contact Hero */}
      <section className="bg-blue-900 text-white py-20 pt-33"> 
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team for any questions or support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
};


export default ContactPage