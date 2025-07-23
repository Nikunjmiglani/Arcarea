'use client';

import Link from "next/link";

export default function page() {
  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 text-gray-800">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">📞 Contact ArcArea</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Connect With Verified Interior Designers, Architects, and Custom Furniture Experts Near You
        </p>
      </section>

      {/* Intro */}
      <section className="space-y-4 mb-12 text-center max-w-3xl mx-auto">
        <p>
          At <strong>ArcArea</strong>, we’re committed to transforming how India designs, decorates, and builds vastu-aligned spaces.
        </p>
        <p>
          Whether you&apos;re a homeowner seeking interior consultation, an architect exploring collaboration, or a vendor ready to grow — we’re just one message away.
        </p>
        <p className="italic font-medium">
          Every great project begins with a great conversation.
        </p>
      </section>

      {/* Contact Info */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-2">📌 Get in Touch With the ArcArea Team</h2>
          <p>
            Have questions? Need help choosing the right expert? Want to list your design services? Reach out to us — our support team is here to guide you.
          </p>

          <div className="mt-4 space-y-2">
            <p className="font-medium">🏠 Office Address</p>
            <p>
              ArcArea | Powered by Miggla Industries Pvt. Ltd.<br />
              (Physical office address can be added here)<br />
              Serving PAN India – Delhi, Mumbai, Bangalore, Ahmedabad, Jaipur, Hyderabad & 60+ Cities
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-medium mt-4">📱 Call or WhatsApp</p>
            <p>+91-XXXXXXXXXX<br />Available Mon–Sat | 10:00 AM – 7:00 PM IST</p>
          </div>

          <div className="space-y-1">
            <p className="font-medium mt-4">📧 Email Support</p>
            <p>
              <a href="mailto:support@arcarea.in" className="text-blue-600 underline">support@arcarea.in</a><br />
              For listing, collaboration, or client service queries
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-medium mt-4">🌐 Website</p>
            <p>
              <a href="https://www.arcarea.in" className="text-blue-600 underline">www.arcarea.in</a>
            </p>
          </div>
        </div>

        {/* Popular Queries */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-2xl font-semibold mb-2">✨ Popular Queries We Handle</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Get matched with verified home interior designers near you</li>
            <li>Book a vastu consultation for home or office</li>
            <li>Compare modular kitchen packages</li>
            <li>Hire an architect or turnkey contractor</li>
            <li>List your services as a trusted ArcArea vendor</li>
            <li>Discuss commercial or bulk interior projects</li>
            <li>Explore furniture customization & space-saving solutions</li>
          </ul>
        </div>
      </section>

      {/* Partner Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-3">🤝 Partner With Us</h2>
        <p className="mb-4">
          Are you an Interior Designer, Modular Manufacturer, Custom Furniture Maker, Architect or Vastu Consultant?  
          <br />We invite you to join India’s first vastu-integrated marketplace and grow with qualified leads, branding support, and a zero-commission model.
        </p>
        <p className="font-medium">
          📩 Seller onboarding: <a href="mailto:partners@arcarea.in" className="text-blue-600 underline">partners@arcarea.in</a>
        </p>
      </section>

      {/* Social + CTA */}
      <section className="grid md:grid-cols-2 gap-8 items-start mb-20">
        <div>
          <h2 className="text-2xl font-semibold mb-3">📍 Follow Us for Inspiration & Updates</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>🔹 Instagram: <a href="https://instagram.com/shubhvaas" className="text-blue-600 underline">@shubhvaas</a></li>
            <li>🔹 YouTube: Coming Soon</li>
            <li>🔹 Pinterest: Design Boards Coming Soon</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-white border border-indigo-200 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">📅 Schedule a Free Consultation</h2>
          <p className="mb-4">Want expert advice before starting your project? Choose your next step:</p>
          <div className="space-y-2">
            <Link href="#" className="block w-fit px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              👉 Book a Free Design Call
            </Link>
            <Link href="#" className="block w-fit px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
              👉 Request a Call Back
            </Link>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="text-center text-lg font-medium text-gray-700 italic">
        ArcArea is more than a platform — it’s your design journey partner. <br />
        Let’s build something beautiful, balanced, and truly yours.
      </section>
    </main>
  );
}
