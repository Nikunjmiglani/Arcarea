'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "1. Why should I list my services on ArcArea when Justdial, Sulekha, and others are free?",
    answer: (
      <>
        Unlike general listing portals, ArcArea is a <em>curated, niche marketplace</em> built exclusively for:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Architects</li>
          <li>Interior designers</li>
          <li>Modular & custom furniture makers</li>
        </ul>
        <p className="mt-2">
          We focus on <strong>quality over quantity</strong>. While free sites allow anyone to list, we work only with
          <strong> verified, serious professionals</strong>. This builds client trust and <strong>reduces spam, fake leads, and price hagglers</strong>.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic mt-3 text-gray-600">
          ArcArea delivers real, vastu-aligned, project-ready clients — not random inquiries.
        </blockquote>
      </>
    ),
  },
  {
    question: "2. What makes ArcArea different from other service directories?",
    answer: (
      <>
        ArcArea isn’t a mass listing site. We are a <em>focused platform for design, build, and décor services</em>. Our key differences include:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Vastu-based client onboarding</li>
          <li>Verified seller badges</li>
          <li>Customizable profile portfolio</li>
          <li>Contact unlocking after client intent</li>
          <li>No project commissions</li>
        </ul>
        <p className="mt-2">We bridge the gap between <strong>authentic design professionals and aligned homebuyers</strong>.</p>
      </>
    ),
  },
  {
    question: "3. Why do you charge a listing fee when others don’t?",
    answer: (
      <>
        The nominal listing fee helps us:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Filter out low-quality sellers</li>
          <li>Run paid campaigns to bring genuine clients</li>
          <li>Offer platform support and visibility tools</li>
          <li>Maintain a <strong>clean, premium ecosystem</strong></li>
        </ul>
        <p className="mt-2">
          This small investment helps you <strong>stand apart</strong> from overcrowded free platforms.
          Plus, we never charge a commission on your project value.
        </p>
      </>
    ),
  },
  {
    question: "4. Will my contact details be shared openly?",
    answer: (
      <>
        No. To protect seller privacy and ensure serious leads, we use a <strong>contact unlock model</strong>:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Your brand name and portfolio are visible</li>
          <li>Clients must pay a small fee to unlock your contact details</li>
          <li>You receive only high-quality, serious inquiries</li>
        </ul>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic mt-3 text-gray-600">
          This eliminates time-wasters and increases conversion rates.
        </blockquote>
      </>
    ),
  },
  {
    question: "5. Can I showcase my real company name and branding?",
    answer: (
      <p>
        Absolutely. ArcArea respects your identity. We showcase your <strong>real business name, work samples, logo, and more.</strong><br />
        You’re not just a listing — you’re a <strong>brand</strong>.
      </p>
    ),
  },
  {
    question: "6. Do you take any commission on projects or earnings?",
    answer: <p><strong>No.</strong> ArcArea never takes a cut from your earnings. Your projects, your pricing, your profits — 100% yours.</p>,
  },
  {
    question: "7. What kind of clients will I get through ArcArea?",
    answer: (
      <>
        ArcArea attracts:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Vastu-conscious home owners</li>
          <li>Families planning renovations</li>
          <li>First-time property owners</li>
          <li>Spiritual seekers upgrading their space</li>
          <li>Office and shop remodel projects</li>
        </ul>
        <p className="mt-2">We run niche campaigns to <strong>target serious decision-makers</strong>, not window shoppers.</p>
      </>
    ),
  },
  {
    question: "8. What if a client tries to bypass ArcArea and contact me directly?",
    answer: (
      <>
        We use several strategies to reduce bypassing:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Contact protection behind appointment paywall</li>
          <li>Watermarked portfolios</li>
          <li>Virtual business cards</li>
          <li>Seller loyalty rewards</li>
        </ul>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic mt-3 text-gray-600">
          We also ask all sellers to agree to a no-bypass clause for fairness and sustainability.
        </blockquote>
      </>
    ),
  },
  {
    question: "9. How can I measure performance or track leads?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Monthly profile visit stats</li>
        <li>Lead contact notifications</li>
        <li>Appointment-based tracking</li>
        <li>Review & rating insights</li>
      </ul>
    ),
  },
  {
    question: "10. Is ArcArea suitable for freelancers and new design studios?",
    answer: (
      <>
        Yes! We offer plans for all levels:
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Starter (₹0)</strong> – for freelancers</li>
          <li><strong>Growth (₹1999–₹3999/year)</strong> – for small studios</li>
          <li><strong>Pro (₹9999/year)</strong> – for brands ready to scale</li>
        </ul>
        <p className="mt-2">You can <strong>start free and upgrade</strong> as you grow.</p>
      </>
    ),
  },
  {
    question: "11. How do I join ArcArea as a vendor?",
    answer: (
      <ol className="list-decimal pl-6 space-y-1">
        <li>Visit <a href="https://www.arcarea.in" className="text-blue-600 underline">www.arcarea.in</a></li>
        <li>Click <strong>“List Your Services”</strong></li>
        <li>Upload your portfolio, business details, and choose a plan</li>
        <li>Get verified and go live within 48 hours</li>
      </ol>
    ),
  },
  {
    question: "12. Do you offer any premium support or seller success help?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Seller onboarding guidance</li>
        <li>Listing setup help</li>
        <li>Marketing suggestions</li>
        <li>Priority support for premium sellers</li>
      </ul>
    ),
  },
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">🧩 ArcArea Vendor FAQs</h1>
      <p className="text-center text-lg max-w-3xl mx-auto text-gray-600 mb-12">
        Trusted Marketplace for Architects, Interior Designers, and Custom Furniture Experts
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
            <button
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            >
              <span>❓ {faq.question}</span>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="mt-4 text-gray-700 text-base space-y-2">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-gray-700">
        <p className="italic text-lg">
          ArcArea is not a cost — it’s an investment in qualified visibility, brand trust, and serious client flow.
        </p>
      </div>
    </main>
  );
}


