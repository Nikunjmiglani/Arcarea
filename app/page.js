import Image from "next/image";
import kitchenImg from "../public/mainpageimg1.jpg";
import factoryImg from "@/public/mainpageimg1.jpg";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { client } from "@/lib/sanity";
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Review from "@/models/Review";
//import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Hero from "@/components/Hero";
import VendorCardWithSlideshow from "@/components/VendorCardWithSlideshow";

export const revalidate = 60;

const timeline = [
  { title: "Consultation & Site Visit", icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/meeting.svg" },
  { title: "Design Finalization", icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/approved.svg" },
  { title: "Material Procurement & Production", icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/production.svg" },
  { title: "On-Site Execution Begins", icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/truck.svg" },
  { title: "Final Handover & Quality Check", icon: "https://dlifeinteriors.com/wp-content/uploads/2023/06/deal.svg" },
];

const categories = [
  { title: "Interior", image: "/interior.jpeg", description: "Residential & Commercial Interior Solutions" },
  { title: "Architecture", image: "/architecture.jpg", description: "Modern, Sustainable Architectural Services" },
  { title: "Furniture", image: "/furniture.jpg", description: "Custom, Modular & Smart Furniture Designs" },
];

const highlights = [
  { title: "1BHK Interior Design", image: "/servicesimg1.jpeg", subcategory: "1BHK Interior Design" },
  { title: "Office Design", image: "/servicesimg5.jpeg", subcategory: "Office Design" },
  { title: "Wall Panel Design", image: "/servicesimg3.jpeg", subcategory: "Wall Panel Design" },
  { title: "Full House Construction", image: "/servicesimg2.jpeg", subcategory: "Full House Construction" },
  { title: "Modular Kitchen Setup", image: "/servicesimg4.jpeg", subcategory: "Modular Kitchen" },
  { title: "Bespoke Furniture", image: "/servicesimg1.jpeg", subcategory: "Bespoke Furniture" },
];

const features = [
  { label: "Vastu-Driven Planning", icon: "🧭" },
  { label: "Across Cities, Beyond Borders", icon: "📍" },
  { label: "Verified Professionals Only", icon: "🤝" },
  { label: "One Point of Contact, Total Control", icon: "🎯" },
  { label: "Zero Commission, 100% Value", icon: "💸" },
  { label: "Modular to Custom — All Under One Roof", icon: "📐" },
  { label: "Clutter-Free Experience", icon: "🕊" },
  { label: "Faster Turnarounds, Assured Delivery", icon: "📆" },
  { label: "Budget-friendly plans", icon: "💰" },
  { label: "Smart, Sustainable, Spiritual", icon: "💡" },
];

async function getBlogs() {
  const query = `*[_type == "blog"] | order(publishedAt desc)[0...10] {
    title,
    "slug": slug.current,
    "image": image.asset->url,
    publishedAt
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors/popular`, {
  cache: "no-store",
});
  const vendors = await res.json();
  const blogs = await getBlogs();

  return (
    <section className="bg-white min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/categories/${cat.title}`}
              className="bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
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

      {/* Features */}
      <section className="bg-white mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold font-mono text-gray-800">Why Choose Us</h2>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex space-x-6 animate-scroll px-6 w-max">
            {[...features, ...features].map((feature, idx) => (
              <div
                key={idx}
                className="min-w-[200px] bg-white rounded-xl p-6 shadow text-center flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <div className="bg-white py-16 px-4 sm:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
          PROJECT COMPLETION IN <span className="text-purple-600">40 WORKING DAYS*</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
          {timeline.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-28 h-28 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                <img src={step.icon} alt={step.title} className="w-12 h-12 object-fill" />
              </div>
              <div className="text-center text-sm sm:text-base font-medium text-gray-800">
                {step.title}
              </div>
              {index !== timeline.length - 1 && (
                <div className="hidden sm:block absolute top-14 right-[-48px]">
                  <svg width="48" height="2" viewBox="0 0 48 2" fill="none">
                    <line x1="0" y1="1" x2="48" y2="1" stroke="#000" strokeWidth="2" />
                    <polygon points="48,0 48,2 52,1" fill="#000" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">🏡 Who is ArcArea?</h1>
            <p className="text-gray-700 mb-3 text-lg leading-relaxed">
              ArcArea is India’s first curated marketplace connecting homeowners with verified architects,
              interior designers, modular furniture manufacturers, and custom furniture experts — all under one
              vastu-aligned platform.
              <br /><br />
              We don’t just list vendors. We build a community of professionals who create homes and spaces
              that are beautiful, functional, and spiritually balanced.
            </p>
          </div>
          <div className="w-full h-full">
            <Image src={kitchenImg} alt="Modern Kitchen Interior" className="rounded-lg shadow-lg" placeholder="blur" priority />
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="w-full h-full order-1 md:order-none">
            <Image src={factoryImg} alt="Factory Production Interior" className="rounded-lg shadow-lg" placeholder="blur" priority />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">🛠 How It Works</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Discover Trusted Experts:</strong> Search by category, location, or need.<br />
              <strong>View Verified Portfolios:</strong> Browse designs and reviews.<br />
              <strong>Unlock Contact:</strong> Pay a small fee to connect directly.<br />
              <strong>Get Value:</strong> Experts offer design + vastu + transparency.<br /><br />
              ✅ ArcArea is where design meets trust — a movement for conscious Indian homes.
            </p>
          </div>
        </div>
      </div>

      

      {/* Highlights */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={`/subcategories/${item.subcategory.replace(/\s+/g, "-")}`}
              className="bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
         {vendors.map(
  (vendor) =>
    vendor.slug && <VendorCardWithSlideshow key={vendor._id} vendor={vendor} />
)}

        </div>
      </div>



      {/* Banner */}
      <div className="w-full">
        <img src="/bannerimg.jpg" alt="Banner" className="w-full h-auto object-cover" />
      </div>

      {/* Blogs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Blogs</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {blogs.map((blog, index) => (
  <Link
    key={index}
    href={`/blog/${blog.slug}`}
    className="min-w-[300px] w-[300px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  >
    {blog.image ? (
      <div className="w-full h-40 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
    ) : (
      <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
    </div>
  </Link>
))}

        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Designer or Architect?</h2>
        <p className="mb-6 text-gray-300">Join our platform and start offering your services to 1000s of users.</p>
        <Link href="/register" className="inline-block bg-white text-black px-6 py-3 rounded hover:bg-gray-200">
          Join as Vendor
        </Link>
      </div>
    </section>
  );
}