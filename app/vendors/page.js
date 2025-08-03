export default function VendorCardWithSlideshow({ vendor }) {
  if (!vendor) return null; // Prevent build-time crash

  const profileImage =
    (vendor?.profileImage || "").trim() !== ""
      ? vendor.profileImage
      : "/default-profile.png";

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img
        src={profileImage}
        alt={vendor.name || "Vendor"}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-profile.png";
        }}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">{vendor.name || "Unnamed Vendor"}</h2>
        <p className="text-sm text-gray-600">
          {vendor.location || "Location not provided"}
        </p>
        <p className="text-sm mt-2">{vendor.bio || "No bio available."}</p>
      </div>
    </div>
  );
}
