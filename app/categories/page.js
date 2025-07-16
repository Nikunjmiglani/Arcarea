import Link from "next/link";

const categories = [
  {
    title: "Interior",
    image: "/interior.jpg",
    description: "Residential & Commercial Interior Services",
  },
  {
    title: "Architecture",
    image: "/architecture.jpg",
    description: "Structural, Residential, and Landscape Architecture",
  },
  {
    title: "Furniture",
    image: "/furniture.jpg",
    description: "Custom, Modular, and Smart Furniture Solutions",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
  );
}
