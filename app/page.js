// app/page.js

import Image from "next/image";
import kitchenImg from "../public/mainpageimg1.jpg";
import factoryImg from '@/public/mainpageimg1.jpg'
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { client } from '@/lib/sanity';

import { IoIosArrowDown } from "react-icons/io";
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Hero from "@/components/Hero";

const timeline = [
  {
    title: "Consultation & Site Visit",
    subtitle: "",
    icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/meeting.svg",
  },
  {
    title: "Design Finalization",
    subtitle: "",
    icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/approved.svg",
  },
  {
    title: "Material Procurement & Production",
    subtitle: "",
    icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/production.svg",
  },
  {
    title: "On-Site Execution Begins",
    subtitle: "",
    icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/truck.svg",
  },
  {
    title: "Final Handover & Quality Check",
    subtitle: "",
    icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/deal.svg",
  },
];

const categories = [
  {
    title: "Interior",
    image: "/interior.jpeg",
    description: "Residential & Commercial Interior Solutions",
  },
  {
    title: "Architecture",
    image: "/architecture.jpg",
    description: "Modern, Sustainable Architectural Services",
  },
  {
    title: "Furniture",
    image: "/furniture.jpg",
    description: "Custom, Modular & Smart Furniture Designs",
  },
];

const highlights = [
  {
    title: "1BHK Interior Design",
    image: "/servicesimg1.jpeg",
    subcategory: "1BHK Interior Design",
  },
  {
    title: "Office Design",
    image: "/servicesimg5.jpeg",
    subcategory: "Office Design",
  },
  {
    title: "Wall Panel Design",
    image: "/servicesimg3.jpeg",
    subcategory: "Wall Panel Design",
  },
  {
    title: "Full House Construction",
    image: "/servicesimg2.jpeg",
    subcategory: "Full House Construction",
  },
  {
    title: "Modular Kitchen Setup",
    image: "/servicesimg4.jpeg",
    subcategory: "Modular Kitchen",
  },
  {
    title: "Bespoke Furniture",
    image: "/servicesimg1.jpeg",
    subcategory: "Bespoke Furniture",
  },

];

export const revalidate = 60;

async function getBlogs() {
  const query = `*[_type == "blog"] | order(_createdAt desc)[0...10] {
    title,
    "slug": slug.current,
    "image": mainImage.asset->url
  }`;
  const blogs = await client.fetch(query);
  return blogs;
}
const features = [
  { label: "Vastu-Driven Planning", icon: "🧭" },
  { label: " Across Cities, Beyond Borders", icon: "📍 " },
  { label: "Verified Professionals Only", icon: "🤝 " },
  { label: "One Point of Contact, Total Control", icon: "🎯 " },
  { label: " Zero Commission, 100% Value", icon: "💸 " },
  { label: "Modular to Custom — All Under One Roof", icon: "📐 " },
  { label: " Clutter-Free Experience", icon: "🕊" },
  { label: "Faster Turnarounds, Assured Delivery", icon: "📆 " },
  { label: "Budget-friendly plans", icon: "💰" },
  { label: "Smart, Sustainable, Spiritual", icon: "💡 " },
];

export default async function HomePage() {
  await connectMongo();
  const vendors = await User.find({ role: "designer" }).limit(6);
  const blogs = await getBlogs();

  return (

    <section className="bg-white min-h-screen">
      <div className=" mx-4 sm:mx-20 mt-3"></div>
      <Hero />
      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/categories/${cat.title}`}
              className="bg-white rounded-lg overflow-hidden hover:scale-110 transition-transform duration-200"
            >
              <Image src={cat.image} alt={cat.title} width={400} height={300} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold font-mono text-center text-gray-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-center text-gray-600">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width Banner */}


      <section className="bg-white mb-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold font-mono mb-15 text-gray-800">Why Choose Us</h2>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex space-x-6 animate-scroll px-6 w-max">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="min-w-[200px] bg-white rounded-xl p-6 shadow-md text-center flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-700">{feature.label}</p>
              </div>
            ))}

            {/* Duplicate for seamless looping */}
            {features.map((feature, idx) => (
              <div
                key={idx + features.length}
                className="min-w-[200px] bg-white rounded-xl p-6 shadow-md text-center flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white py-16 px-4 sm:px-8">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
          PROJECT COMPLETION IN{" "}
          <span className="text-purple-600">40 WORKING DAYS*</span>
        </h2>

        {/* Timeline */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-12 sm:gap-0 max-w-7xl mx-auto">
          {timeline.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative w-full sm:w-auto">
              {/* Icon in Circle */}
              <div className="w-28 h-28 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                <img src={step.icon} alt={step.title} className="w-12 h-12 object-fill" />
              </div>

              {/* Step Description */}
              <div className="text-center text-sm sm:text-base font-medium text-gray-800">
                {step.title}
                <br />
                {step.subtitle}
              </div>

              {/* Arrow */}
              {index !== timeline.length - 1 && (
                <div className="hidden sm:block absolute top-14 right-[-48px]">
                  <svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="48" y2="1" stroke="#000" strokeWidth="2" />
                    <polygon points="48,0 48,2 52,1" fill="#000" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-white px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT SECTION */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">
              🏡 Who is ArcArea ?

            </h1>
            <p className="text-gray-700 mb-3 text-lg leading-relaxed">
              ArcArea is India’s first curated marketplace connecting homeowners with verified architects, interior designers, modular furniture manufacturers, and custom furniture experts — all under one vastu-aligned platform.

              We don’t just list vendors. We build a community of professionals who believe in creating homes and spaces that are not only beautiful, but also balanced with energy, function, and purpose.

              Whether you're building a new home, renovating a flat, decorating a small office, or designing a vastu-compliant villa — ArcArea simplifies the entire process by offering pre-screened, experienced experts ready to deliver.

            </p>
          </div>

          {/* IMAGE SECTION */}
          <div className="w-full h-full">
            <Image
              src={kitchenImg}
              alt="Modern Kitchen Interior"
              className="rounded-lg shadow-lg"
              placeholder="blur"
              priority
            />
          </div>

        </div>

        {/* SECTION 2: Image Left, Text Right */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <div className="w-full h-full order-1 md:order-none">
            <Image
              src={factoryImg}
              alt="Factory Production Interior"
              className="rounded-lg shadow-lg"
              placeholder="blur"
              priority
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">
              🛠 How It Works:

            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Discover Trusted Experts
              Search by category, location, or need — find top-rated professionals in interior design, modular furniture, architecture, and more.

              View Verified Portfolios
              Browse stunning work samples, design styles, and real reviews to choose the expert that fits your vision.

              Unlock Contact (When You're Ready)
              Pay a small appointment fee to instantly connect with the vendor. No spam. No fake leads. Only serious conversations.

              Get Value, Not Just Quotes
              Our experts offer design insights, vastu integration, and transparent pricing — so you get more than just cost estimates.

              ✅ ArcArea is where design meets trust.
              It’s not just a marketplace — it’s a movement to bring harmony, creativity, and consciousness into every Indian home.
            </p>
          </div>
        </div>

      </div>

      <TestimonialsCarousel />


      {/* Highlights */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-15 text-gray-800">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={`/subcategories/${item.subcategory.replace(/\s+/g, "-")}`}
              className="bg-white rounded-lg overflow-hidden hover:scale-110 transition-transform duration-200"
            >
              <Image src={item.image} alt={item.title} width={400} height={300} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ContactForm />



      {/* Vendors */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">Popular Vendors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
          {vendors.map((vendor) => (
            <Link
              key={vendor._id}
              href={`/vendors/${vendor._id}`}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/vendor.jpg"
                  alt={vendor.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black">{vendor.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full">
        <img
          src="/bannerimg.jpg"
          alt="Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Blogs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Blogs</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={`/blog/${blog.slug}`}
              className="min-w-[300px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={160}
                  className="w-full object-cover h-40"
                />
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Designer or Architect?</h2>
        <p className="mb-6 text-gray-300">
          Join our platform and start offering your services to 1000s of users.
        </p>
        <Link
          href="/register"
          className="inline-block bg-white text-black px-6 py-3 rounded hover:bg-gray-200"
        >
          Join as Vendor
        </Link>
      </div>
    </section>
  );
}
