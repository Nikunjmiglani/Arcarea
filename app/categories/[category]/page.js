import Link from "next/link";

const subcategoriesMap = {
  Interior: ["Residential Interior", "Commercial Interior"],
  Architecture: ["Residential Architecture", "Landscape Architecture"],
  Furniture: ["Custom Furniture", "Modular Furniture"],
};

export default function CategoryPage({ params }) {
  const { category } = params;
  const subcategories = subcategoriesMap[category] || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {category} – Choose a Subcategory
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subcategories.map((sub) => (
          <Link
            key={sub}
            href={`/subcategories/${sub.replace(/\s+/g, "-")}`}
            className="p-6 bg-white border rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{sub}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
