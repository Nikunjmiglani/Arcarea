import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import BookingForm from "./BookingForm";

export default async function ServiceDetail({ params }) {
  await connectMongo();
  const service = await Service.findById(params.id).populate("vendor", "name email");

  if (!service) return <p>Service not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="mb-2">
        <strong>Price:</strong> ₹{service.price}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {service.category}
      </p>
      <p className="mb-2">
        <strong>Vendor:</strong> {service.vendor.name}
      </p>
      <p className="text-sm text-gray-500">Contact: {service.vendor.email}</p>

      {/* ✅ Booking form rendered correctly */}
      <BookingForm serviceId={params.id} />
    </div>
  );
}
