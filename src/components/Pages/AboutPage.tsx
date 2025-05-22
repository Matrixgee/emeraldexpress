import { Award, Clock, Globe, Heart, Package, Shield, Target, Truck } from 'lucide-react';
import FAQ from './FAQ';
import aboutbg from "../../assets/aboutbg.jpg"
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";



const AboutPage = () => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }, []);

      const offer = [
        {
          icon: Award,
          title: "Industry Recognition",
          description: "Winner of multiple logistics excellence awards and consistently rated as a top logistics provider by industry publications."
        },
        {
          icon: Truck,
          title: "Advanced Fleet",
          description: "State-of-the-art vehicles equipped with GPS tracking, temperature control, and real-time monitoring systems."
        },
        {
          icon: Clock,
          title: "Support",
          description: "Round-the-clock customer support team ready to assist with any questions or concerns about your shipments."
        }
      ];

    const mission = [
        {
          icon: Target,
          title: "Customer First",
          description: "Every decision we make is focused on delivering exceptional value to our customers. We listen, adapt, and continuously improve based on your feedback."
        },
        {
          icon: Heart,
          title: "Reliability",
          description: "We build trust through consistent, dependable service that you can count on. Our word is our bond, and we deliver on every promise we make."
        },
        {
          icon: Shield,
          title: "Innovation",
          description: "Continuously improving our services through cutting-edge technology and processes. We embrace change and lead industry transformation."
        }
      ];


    return (
        <div className='overflow-x-hidden'>
            <section className="bg-blue-900 h-[450px] text-white py-16 bg-no-repeat bg-center bg-cover flex justify-center items-center"
                style={{
                    backgroundImage: `url(${aboutbg})`,
                }}
            >
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">About <span className='text-blue-400'>Emerald Express</span></h1>
                        <p className="text-xl max-md:text-[17px] text-blue-100 max-w-4xl mx-auto">
                            At the forefront of the logistics industry, we are driven by a relentless passion for innovation, transforming the way businesses move goods across the globe. Since 2010, we've built a reputation for unmatched reliability, offering cutting-edge solutions that streamline operations, reduce costs, and elevate efficiency. Our commitment to excellence and our forward-thinking approach ensure that we're not just keeping pace with the future of logistics – we're shaping it.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-[30px]">
                        <div data-aos="fade-right" data-aos-delay="800">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-6">
                                Founded in 2010, LogiTrans began as a small local delivery service with a big vision: to revolutionize how businesses handle their logistics needs. Over the years, we've grown into a global network of logistics professionals dedicated to moving your business forward.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Today, we serve thousands of businesses worldwide, from small startups to Fortune 500 companies, providing comprehensive logistics solutions that drive growth and success. Our commitment to excellence and customer satisfaction has made us a trusted partner in the logistics industry.
                            </p>

                        </div>
                        <div className="bg-blue-100 p-8 rounded-lg" data-aos="fade-left" data-aos-delay="800">
                            <Package size={200} className="text-blue-400 mx-auto" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 mt-[20px] lg:grid-cols-4 gap-6 py-[60px] bg-blue-900">
                    <div className="text-center" data-aos="fade-in" data-aos-delay="150">
                        <div className="text-3xl font-bold text-white">50K+</div>
                        <div className="text-blue-600">Happy Customers</div>
                    </div>
                    <div className="text-center" data-aos="fade-in" data-aos-delay="150">
                        <div className="text-3xl font-bold text-white">100+</div>
                        <div className="text-blue-600">Countries Served</div>
                    </div>
                    <div className="text-center" data-aos="fade-in" data-aos-delay="150">
                        <div className="text-3xl font-bold text-white">1M+</div>
                        <div className="text-blue-600">Packages Delivered</div>
                    </div>
                    <div className="text-center" data-aos="fade-in" data-aos-delay="150">
                        <div className="text-3xl font-bold text-white">99.9%</div>
                        <div className="text-blue-600">On-Time Delivery</div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">What Sets Us Apart</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Our commitment to excellence goes beyond just moving packages. We're dedicated to providing exceptional service that exceeds expectations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            offer.map((e, i)=>(
                                <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up"
                            data-aos-delay={i*200}>
                            <e.icon className="text-blue-900 mb-4" size={40} />
                            <h3 className="text-xl font-semibold text-blue-900 mb-3">{e.title}</h3>
                            <p className="text-gray-600">{e.description}</p>
                        </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission & Values</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            We're driven by a clear mission and guided by core values that shape every interaction and decision we make.
                        </p>
                    </div>
                    <div className="bg-blue-900 text-white p-8 rounded-lg mb-12 text-center" >
                        <Target className="mx-auto mb-4 text-blue-200" size={48} />
                        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                        <p className="text-xl max-md:text-[17px] text-blue-100 max-w-4xl mx-auto">
                            To connect businesses and people worldwide through reliable, innovative, and sustainable logistics solutions that drive economic growth and improve lives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {
                        mission.map((e, i)=>(
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center" data-aos="fade-up"
                            data-aos-delay={i*200}>
                            <e.icon className="text-blue-900 mx-auto mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-blue-900 mb-3">{e.title}</h3>
                            <p className="text-gray-600">{e.description}</p>
                        </div>
                        ))
                       }
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right" data-aos-delay="800">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">Commitment to Sustainability</h2>
                            <p className="text-gray-600 mb-6">
                                We recognize our responsibility to protect the environment for future generations. That's why we've implemented comprehensive sustainability initiatives across all our operations.
                            </p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Carbon-neutral delivery options with electric and hybrid vehicles</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Eco-friendly packaging materials and recycling programs</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Route optimization to reduce fuel consumption and emissions</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Partnerships with environmental organizations and offset programs</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-blue-100 p-8 rounded-lg" data-aos="fade-left" data-aos-delay="800">
                            <Globe size={200} className="text-blue-400 mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
            <FAQ />
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl max-md:text-2xl font-bold mb-4">Ready to Experience the LogiTrans Difference?</h2>
                    <p className="text-xl max-md:text-[17px] text-blue-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who trust us with their logistics needs. Let's discuss how we can help your business grow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                            Get Started Today
                        </button>
                        <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300">
                            Contact Our Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage
