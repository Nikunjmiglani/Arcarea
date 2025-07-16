import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import Link from "next/link";

export default async function SubcategoryPage({ params }) {
  const subcategorySlug = params.subcategory;
  const subcategory = subcategorySlug.replace(/-/g, " ");

  await connectMongo();

  // Populate vendor details
  const services = await Service.find({ subcategory }).populate("vendor");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Vendors offering: {subcategory}
      </h1>

      {services.length === 0 ? (
        <p className="text-gray-600">No vendors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const vendor = service.vendor;

            return (
              <Link
                key={service._id}
                href={vendor ? `/vendors/${vendor._id}` : "#"}
                className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition block"
              >
                <img
                  src={service.image || "/placeholder.jpg"}
                  alt={service.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-gray-800 font-medium mt-1">
                  ₹{service.price}
                </p>
                <p className="text-sm italic text-gray-500">
                  By {vendor?.name || "Unknown Vendor"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
