import Image from 'next/image';
import Link from 'next/link';
import {
  BedSingle,
  Building,
  MoveRight,
  Palette,
  BedDouble,
  Star,
  Truck,
  Hotel,
  ArrowRight,
  Droplets,
  Box,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Storage Solutions",
    description: "Secure and accessible storage options for short-term or long-term needs, keeping your items safe until you need them.",
    link: "/services/storage",
    icon: <Droplets className="h-8 w-8 text-white" />,
    imageUrl: "https://cdn.prod.website-files.com/66a7bdea450c2940b15cf747/66b441a43cc21ae0f04eee8d_service-24.jpg",
    altText: "Storage solutions",
  },
  {
    id: 2,
    title: "Delivery Services",
    description: "Fast and reliable delivery services tailored to your needs, ensuring your packages reach their destination on time in the fastest time.",
    link: "/services/delivery",
    icon: <Truck className="h-8 w-8 text-white" />,
    imageUrl: "https://cdn.prod.website-files.com/66a7bdea450c2940b15cf747/66b435a443f13cb23d92e9f9_service-16.jpg",
    altText: "Delivery services",
  },
  {
    id: 3,
    title: "Packaging Solutions",
    description: "High-quality packaging materials and services to ensure the safe transport of your goods, no matter the size or weight.",
    link: "/services/packaging",
    icon: <Box className="h-8 w-8 text-white" />,
    imageUrl: "https://cdn.prod.website-files.com/66a7bdea450c2940b15cf747/66b435b84657944f669e0a2c_service-14.jpg",
    altText: "Packaging solutions",
  },
];



export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-[#001a4d] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Hama Nasi</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="#about" className="hover:text-blue-300 transition-colors">About</Link>
            <Link href="#services" className="hover:text-blue-300 transition-colors">Services</Link>
            <Link href="#process" className="hover:text-blue-300 transition-colors">Our Process</Link>
            <Link href="#contact" className="hover:text-blue-300 transition-colors">Contact</Link>
          </div>
          <Link
            href="/signup"
            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-[#001a4d] text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <p className="text-brand-300 font-medium mb-2">START YOUR MOVE NOW!</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your Hassle-<span className="text-brand-400">Free</span> <span className="text-brand-400">Relocation</span> Experts
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Discover the Unmatched Excellence of Hama Nasi,
              Setting New Benchmarks in the Industry
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-md transition-colors text-center sm:text-left"
              >
                Get a quote
              </Link>
              <Link
                href="/login"
                className="bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center sm:justify-start gap-2"
              >
                Start Move <MoveRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="bg-brand-500 rounded-full p-2 mr-3">
                <Star className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Over 1.7K+ Satisfied Customers</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66b4322132ab2a99530a1079_service-12-p-1080.jpg"
                alt="Professional movers helping a customer"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Houses Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium text-gray-700 mb-8 mt-5">Expert Moving Services for All Types of Homes</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <div className="bg-white px-8 py-7 rounded-lg shadow-sm flex items-center gap-2">
              <BedSingle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Bed Sitter</span>
            </div>
            <div className="bg-white px-8 py-7 rounded-lg shadow-sm flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Studio</span>
            </div>
            <div className="bg-white px-8 py-7 rounded-lg shadow-sm flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">One bedroom</span>
            </div>
            <div className="bg-white px-8 py-7 rounded-lg shadow-sm flex items-center gap-2">
              <Hotel className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Two bedroom</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="rounded-lg overflow-hidden h-full">
                <Image
                  src="https://cdn.prod.website-files.com/637251dd2659f1be53baa587/6373d808a38e3f94beb9340c_the-%231-moving-company-in-new-york-movers-x-p-800.jpg"
                  alt="Professional movers in blue uniforms working together"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 bg-[#001a4d] text-white p-10 md:p-16 flex flex-col justify-center">
              <p className="text-blue-300 uppercase tracking-wider mb-2 font-medium">ABOUT US</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                The #1 <span className="text-brand-400 underline decoration-2 underline-offset-4">moving</span> <br className="hidden md:block" />company in the world
              </h2>
              <p className="text-gray-300 mb-8">
                We specialize in efficient and reliable moving services, ensuring a smooth transition for all your needs.
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-block bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3 rounded-md transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#001a4d] uppercase tracking-wider mb-2 font-medium">SELECTED SERVICES</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-700">
              <span className="text-blue-500">Coverage Solution</span> for<br />
              Every Requirement
            </h2>
            <div className="flex justify-center mt-4">
              <div className="relative w-32 h-16">
                <Image src='https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66ae289d8b13f85a591cedf0_arrows.png' width={100} height={100} alt='icon' />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#001a4d] rounded-full w-16 h-16 flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {service.description}
                  </p>
                  <div className="text-center">
                    {/* <Link
                      href={service.link}
                      className="text-blue-600 font-medium flex items-center justify-center gap-2"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link> */}
                  </div>
                </div>
                <div className="relative h-64">
                  <Image
                    src={service.imageUrl}
                    alt={service.altText}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent flex items-center justify-center">
                    {/* <div className="bg-blue-500 rounded-full p-3">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Steps */}
            <div>
              {/* Step 1 */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#001a4d] text-white flex items-center justify-center rounded-full font-bold mr-4">
                    1
                  </div>
                  <h4 className="text-lg font-bold">Request a Quote</h4>
                </div>
                <p className="text-gray-600 ml-14">
                  Download our app for free and access essential relocation tools.
                </p>
              </div>
              {/* Step 2 */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#001a4d] text-white flex items-center justify-center rounded-full font-bold mr-4">
                    2
                  </div>
                  <h4 className="text-lg font-bold">Plan your move</h4>
                </div>
                <p className="text-gray-600 ml-14">
                  Choose from tailored or tiered assignments that fit your goals.
                </p>
              </div>
              {/* Step 3 */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#001a4d] text-white flex items-center justify-center rounded-full font-bold mr-4">
                    3
                  </div>
                  <h4 className="text-lg font-bold">Let&apos;s get it done!</h4>
                </div>
                <p className="text-gray-600 ml-14">
                  Begin crossing off your portfolio aligned with your financial goals.
                </p>
              </div>
            </div>

            {/* Right Column: Heading & Description */}
            <div>
              <h2 className="text-xl text-[#001a4d] uppercase tracking-wider mb-2 font-medium">Our Process</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-700">
                A simple yet <span className="text-blue-500">remarkably</span> effective process
              </h3>
              <p className="text-gray-600 mb-6">
                This approach combines simplicity with effectiveness, streamlining tasks to achieve maximum productivity while maintaining clarity and ease of execution.
              </p>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Image
                    src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66ac39307d23943c324547a1_Team-6-p-500.jpg"
                    alt="Satisfied customer 1"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66ac38e37a7a9145deff15f5_Team-2-p-500.jpg"
                    alt="Satisfied customer 2"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66ac381476773dea666f8961_Team-1-p-500.jpg"
                    alt="Satisfied customer 3"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66ac48b68295788324e1ee07_Team-3-p-500.jpg"
                    alt="Satisfied customer 4"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                  />
                </div>
                <span className="ml-4 text-gray-700 font-medium">Over 17K+ Satisfied Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Get in Touch" Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#0063ff] text-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row md:gap-8 items-center">
            {/* Text Content */}
            <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
              <p className="text-sm uppercase tracking-wide mb-2 font-medium text-blue-200">
                GET IN TOUCH
              </p>
              <h3 className="text-3xl font-bold mb-3">
                <span className="block">Smooth Transitions</span>
                <span className="block">Start Here</span>
              </h3>
              <p className="text-gray-100 mb-4 leading-snug  py-3">
                Set up your appointment today, choosing between meeting in person or virtually.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  href="/login"
                  className="bg-[#001a4d] hover:bg-[#001a4d]/90 text-white px-5 py-2.5 rounded-md transition-colors text-sm"
                >
                  Get Started
                </Link>
                <Link
                  href="/signup"
                  className="bg-transparent border border-white hover:bg-white/10 text-white px-5 py-2.5 rounded-md transition-colors text-sm"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
              <Image
                src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66aa5c42db4da1d9b6e4d98e_Illustation-2.png"
                alt="Two people packing boxes"
                width={400} // Increase width
                height={250} // Increase height
                className="w-full h-auto max-w-[300px]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Side: Heading & Contact Info */}
            <div>
              <p className="text-blue-500 uppercase tracking-wider mb-2 font-medium">
                CONTACT US
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Reach out to us today!
              </h2>
              <p className="text-gray-600 mb-8">
                We are here to assist you with your banking or financial needs. Feel free to reach out to us through any of the following channels.
              </p>

              {/* Contact Information Cards */}
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-gray-700 font-medium">Office Address</p>
                  <p className="text-gray-500">748 15th Karen, Nairobi Kenya</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-gray-700 font-medium">General Inquiries</p>
                  <p className="text-gray-500">contact@example.com</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-gray-700 font-medium">Toll-Free</p>
                  <p className="text-gray-500">+254 7123 456 789</p>
                </div>
              </div>

              {/* Satisfied Customers */}
              <div className="flex items-center mt-8">
                <div className="bg-brand-500 rounded-full p-2 mr-3">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">
                  Over 1.7K+ Satisfied Customers
                </span>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-[#001a4d] text-white p-8 rounded-xl">
              <form className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="(xxx) xxx-xxxx"
                    className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/2">
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Your company"
                      className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <label htmlFor="website" className="block text-sm font-medium mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      placeholder="www.example.com"
                      className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Please type your message here..."
                    className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001a4d] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Top Section with Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold">Hama Nasi</span>
              </div>
              <p className="text-gray-300 mb-6">
                Professional moving and relocation services for residential and commercial clients. We make your move stress-free.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3" />
                  <span>+254 7123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <span>contact@hamanasi.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <span>Karen, Nairobi Kenya</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Our Process', 'Contact Us', 'Get a Quote'].map((item, index) => (
                  <li key={index}>
                    <p className="flex items-center hover:text-blue-300 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {['Residential Moving', 'Commercial Moving', 'Storage Solutions', 'Packing Services', 'Long Distance Moving', 'International Moving'].map((item, index) => (
                  <li key={index}>
                    <p className="flex items-center hover:text-blue-300 transition-colors">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter to receive updates and special offers.
              </p>
              <form className="mb-6">
                <div className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-md text-gray-800 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="flex space-x-4">
                <Link href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Hama Nasi. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}