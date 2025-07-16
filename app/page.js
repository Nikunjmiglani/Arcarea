import Link from "next/link";
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";

const categories = [
  {
    title: "Interior",
    image: "/interior.jpg",
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

const blogs = [
  { title: "Design Trends 2025", image: "/blogs/blog1.jpg" },
  { title: "Modern Office Spaces", image: "/blogs/blog2.jpg" },
  { title: "Home Decor Tips", image: "/blogs/blog3.jpg" },
  { title: "Maximizing Small Spaces", image: "/blogs/blog4.jpg" },
  { title: "Sustainable Architecture", image: "/blogs/blog5.jpg" },
  { title: "Choosing the Right Furniture", image: "/blogs/blog6.jpg" },
];

export default async function HomePage() {
  await connectMongo();
  const vendors = await User.find({ role: "designer" }).limit(6);

  return (
    <section className="bg-gray-100 min-h-screen pt-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Transform Your Space With Expert Designers
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Connect with top Interior Designers, Architects & Furniture Experts near you.
        </p>
        <Link
          href="/categories"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Explore Categories
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/categories/${cat.title}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={cat.image} alt={cat.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 🔵 Banner 1 - Between Categories and Popular Services */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <img src="/banner1.jpg" alt="Banner 1" className="rounded-lg w-full object-cover shadow" />
      </div>

      {/* Popular Services */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={`/subcategories/${item.subcategory.replace(/\s+/g, "-")}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <img src="/banner2.jpg" alt="Banner 2" className="rounded-lg w-full object-cover shadow" />
      </div>

     

      {/* Popular Vendors */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Link
              key={vendor._id}
              href={`/vendors/${vendor._id}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <img
                src="/vendor.jpg"
                alt={vendor.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{vendor.name}</h3>
              <p className="text-sm text-gray-600">{vendor.email}</p>
            </Link>
          ))}
        </div>
      </div>
       {/* 🔥 Blogs Section (Horizontal Scroll) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Blogs</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Designer or Architect?</h2>
        <p className="mb-6 text-gray-300">Join our platform and start offering your services to 1000s of users.</p>
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
