// app/vendors/page.js
import VendorCardWithSlideshow from '@/components/VendorCardWithSlideshow';

async function getVendors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch vendors');
  }

  return res.json();
}

export default async function VendorsPage() {
  const vendors = await getVendors();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Explore Our Designers</h1>

      {vendors.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCardWithSlideshow key={vendor._id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <p>No vendors found.</p>
      )}
    </div>
  );
}
