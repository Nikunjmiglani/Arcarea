import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Service from "@/models/Service";


export default async function VendorPage({ params }) {
  const vendorId = params.vendorId;
  await connectMongo();

  const vendor = await User.findById(vendorId);
  const services = await Service.find({ vendor: vendorId });

  if (!vendor) {
    return <div className="p-6 text-red-500">Vendor not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Vendor Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <img
          src={vendor.image || "/profile-placeholder.png"}
          alt={vendor.name}
          className="w-40 h-40 object-cover rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          <p className="text-gray-700 mt-2">{vendor.bio || "No bio available."}</p>
        </div>
      </div>

      {/* Services by Vendor */}
      <h2 className="text-2xl font-semibold mb-4">Services by {vendor.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {services.map((service) => (
          <div
            key={service._id}
            className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <p className="mt-1 font-medium text-black">₹{service.price}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <h2 className="text-2xl font-semibold mb-4">Request a Booking</h2>
      
    </div>
  );
}
