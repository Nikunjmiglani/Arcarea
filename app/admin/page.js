'use client';

import { useState, useEffect } from 'react';

export default function AdminAddVendor() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioImages, setPortfolioImages] = useState(['']);
  const [files, setFiles] = useState([]);

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [newServiceName, setNewServiceName] = useState('');

  const [existingVendors, setExistingVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState('');

  const [mode, setMode] = useState('new'); // 'new' or 'existing'

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        setServices(data.services || []);
      } catch {
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchVendorsForService() {
      if (!selectedServiceId) {
        setExistingVendors([]);
        setSelectedVendorId('');
        return;
      }
      try {
        const res = await fetch(`/api/vendors?serviceId=${selectedServiceId}`);
        const data = await res.json();
        setExistingVendors(data.vendors || []);
      } catch {
        setExistingVendors([]);
      }
    }
    fetchVendorsForService();
  }, [selectedServiceId]);

  const addPortfolioImageField = () => {
    setPortfolioImages([...portfolioImages, '']);
  };

  const handlePortfolioImageChange = (index, value) => {
    const updated = [...portfolioImages];
    updated[index] = value;
    setPortfolioImages(updated);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'new' && (!name.trim() || !email.trim())) {
      alert('Please fill vendor name and email.');
      return;
    }
    if (!selectedServiceId && !newServiceName.trim()) {
      alert('Please select or enter a service.');
      return;
    }
    if (mode === 'existing' && !selectedVendorId) {
      alert('Please select a vendor.');
      return;
    }

    const formData = new FormData();

    if (mode === 'new') {
      formData.append('name', name);
      formData.append('email', email);
      portfolioImages.filter((url) => url.trim() !== '').forEach((url) =>
        formData.append('portfolioImages', url)
      );
      files.forEach((file) => formData.append('portfolioImages', file));
    } else {
      formData.append('existingVendorId', selectedVendorId);
    }

    if (selectedServiceId) {
      formData.append('serviceId', selectedServiceId);
    } else {
      formData.append('newServiceName', newServiceName.trim());
    }

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('✅ Operation successful!');
        setName('');
        setEmail('');
        setPortfolioImages(['']);
        setFiles([]);
        setSelectedServiceId('');
        setNewServiceName('');
        setSelectedVendorId('');
      } else {
        const error = await res.text();
        alert('Error: ' + error);
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 space-y-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900">🎯 Admin: Onboard Vendor & Service</h1>

        {/* Mode Toggle */}
        <div className="flex gap-4">
          <button
            onClick={() => setMode('new')}
            type="button"
            className={`flex-1 py-3 font-medium rounded-lg border ${
              mode === 'new'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            ➕ Add New Vendor
          </button>
          <button
            onClick={() => setMode('existing')}
            type="button"
            className={`flex-1 py-3 font-medium rounded-lg border ${
              mode === 'existing'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            👤 Assign Existing Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {mode === 'new' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nikunj Interiors"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Vendor Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. contact@example.com"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">Portfolio Image URLs</label>
                {portfolioImages.map((url, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={url}
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) => handlePortfolioImageChange(idx, e.target.value)}
                    className="w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
                <button
                  type="button"
                  onClick={addPortfolioImageField}
                  className="text-blue-600 mt-1 font-semibold hover:underline"
                >
                  + Add another URL
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">Upload Portfolio Files</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {mode === 'existing' && (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Select Existing Vendor</label>
              <select
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a vendor --</option>
                {existingVendors.length === 0 ? (
                  <option disabled>No vendors found for selected service</option>
                ) : (
                  existingVendors.map((vendor) => (
                    <option key={vendor._id} value={vendor._id}>
                      {vendor.name} ({vendor.email})
                    </option>
                  ))
                )}
              </select>
            </div>
          )}

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Service Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">🛠️ Service Details</h2>
            <p className="text-sm text-gray-500">Link the vendor to an existing service or create a new one.</p>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Select Existing Service</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
              >
                <option value="">-- Select a service --</option>
                {services.length === 0 ? (
                  <option disabled>No services available</option>
                ) : (
                  services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Or Add New Service</label>
              <input
                type="text"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                placeholder="e.g. Luxury Apartment Interior"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition"
            >
              {mode === 'new' ? '🚀 Add Vendor & Service' : '🔗 Assign Vendor to Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
