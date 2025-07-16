import Link from "next/link";

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

export default function HomePage() {
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
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Choose by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/categories/${cat.title}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Are You a Designer or Architect?
        </h2>
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

