// app/page.js

import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { client } from '@/lib/sanity';

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
    image: "/1bhk.jpg",
    subcategory: "1BHK Interior Design",
  },
  {
    title: "Office Design",
    image: "/office.jpg",
    subcategory: "Office Design",
  },
  {
    title: "Wall Panel Design",
    image: "/wall.jpg",
    subcategory: "Wall Panel Design",
  },
  {
    title: "Full House Construction",
    image: "/construction.jpg",
    subcategory: "Full House Construction",
  },
  {
    title: "Modular Kitchen Setup",
    image: "/kitchen.jpg",
    subcategory: "Modular Kitchen",
  },
  {
    title: "Bespoke Furniture",
    image: "/custom.jpg",
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

export default async function HomePage() {
  await connectMongo();
  const vendors = await User.find({ role: "designer" }).limit(6);
  const blogs = await getBlogs();

  return (
    <section className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh]">
        <Image
          src="/vastu-based renovation.png"
          alt="Hero"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-mono mt-7 text-gray-900 mb-5">
          Transform Your Space With Expert Designers
        </h1>
        <p className="text-lg md:text-xl mt-5 text-gray-600 mb-8">
          Connect with top Interior Designers, Architects & Furniture Experts near you.
        </p>
        <Link
          href="/categories"
          className="inline-block bg-black text-white px-10 py-3 rounded-full animate-bounce hover:scale-110 transition-transform duration-200"
        >
          Explore Categories
        </Link>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-12">
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
      <div className="w-full">
        <Image
          src="/interior design marketplace.png"
          alt="Process Steps"
          width={1920}
          height={500}
          className="w-full object-cover"
        />
      </div>

      {/* About Us */}
      <div className="py-20 px-6 mt-5 md:px-12 lg:px-24 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-gray-900 mb-6">What We Do</h2>
          <p className="text-lg text-gray-700 mb-8">
            At <span className="font-semibold text-black">ArcArea</span>, we&rsquo;re redefining how homeowners and businesses connect with trusted
            <span className="font-medium text-black"> interior designers</span>,
            <span className="font-medium text-black"> architects</span>, and
            <span className="font-medium text-black"> space planning experts</span>. Our platform is India&rsquo;s first one-click destination to discover and hire top-rated professionals who can bring your dream spaces to life.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-left text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Why ArcArea?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>✅ Curated & Verified Experts</li>
                <li>✅ Simplified End-to-End Process</li>
                <li>✅ Vastu-Aligned Design Options</li>
                <li>✅ Transparent Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Our Mission</h3>
              <p>
                To bridge the gap between design aspirations and trusted professionals by offering
                a reliable, tech-enabled platform that empowers both clients and creators.
              </p>
            </div>
          </div>

          <p className="mt-10 text-lg text-gray-700">
            Whether you&rsquo;re a designer looking to grow or a homeowner seeking transformation — <span className="font-medium text-black">your journey starts here</span>.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Services</h2>
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

      {/* Banner 2 */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Image src="/banner2.jpg" alt="Banner 2" width={1200} height={400} className="rounded-lg w-full object-cover shadow" />
      </div>

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
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={200}
                className="h-40 w-full object-cover"
              />
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
