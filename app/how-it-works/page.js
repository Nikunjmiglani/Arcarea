'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const stepsList = [
  { step: '1', title: 'Share Your Dream with Us', img: '/processimg1.avif' },
  { step: '3', title: 'Finalize Your Design, Scope & Budget', img: '/processimg2.avif' },
  { step: '4', title: 'Confirm & Kickstart Execution', img: '/processimg3.avif' },
  { step: '5', title: 'Material Dispatch & Installation', img: '/processimg4.avif' },
  { step: '6', title: 'Move In & Celebrate', img: '/processimg5.avif' },
];

const homeProcess = [
  {
    title: 'Step 1: Let’s Begin Your Journey',
    points: [
      {
        heading: 'Fill the Discovery Form',
        desc: 'Share your requirements, preferences, and goals to help us understand your vision.',
        cta: 'FILL YOUR FORM',
      },
      {
        heading: 'Get Matched with Professionals',
        desc: 'We’ll connect you with verified interior designers, contractors, or furniture makers best suited to your project.',
      },
    ],
    img: '/processimg1.avif',
  },
  {
    title: 'Step 2: Free Consultation with Experts',
    points: [
      {
        heading: 'Discuss Your Vision',
        desc: 'Discuss your vision directly with professionals in a cozy consultation setting.',
      },
      {
        heading: 'Receive Initial Design & Estimate',
        desc: 'Get concept layouts, personalized suggestions, and a ballpark cost estimate.',
      },
    ],
    img: '/processimg2.avif',
  },
  {
    title: 'Step 3: Finalize Your Project Scope & Budget',
    points: [
      {
        heading: 'Select Materials & Preferences',
        desc: 'Choose laminates, marble, and finishes with your vendor for clarity and transparency.',
      },
      {
        heading: 'Request Quotations & Scope of Work',
        desc: 'Get formal quotations and a project work scope. ArcArea ensures no commissions or hidden charges.',
      },
    ],
    img: '/processimg3.avif',
  },
  {
    title: 'Step 4: Confirm & Kickstart Execution',
    points: [
      {
        heading: 'Make Initial Milestone Payment',
        desc: 'Make a direct payment to the professional after agreement to start the work.',
        badge: 'MILESTONE',
      },
      {
        heading: 'On-Site Work Begins',
        desc: 'Workers start execution on-site under vendor supervision. ArcArea does not manage the work directly.',
      },
    ],
    img: '/processimg4.avif',
  },
  {
    title: 'Step 5: Material Dispatch & Installation',
    points: [
      {
        heading: 'Next Milestone Payment & Dispatch',
        desc: 'Once materials are ready, make the next milestone payment for dispatch and delivery.',
        badge: 'MILESTONE',
      },
      {
        heading: 'Installation Begins',
        desc: 'Installers begin setting up as per the approved designs. Vendors coordinate this directly.',
      },
    ],
    img: '/processimg5.avif',
  },
  {
    title: 'Step 6: Move In & Celebrate',
    points: [
      {
        heading: 'Welcome to Your New Space',
        desc: 'Move in to your newly completed home. A true reflection of your style and spirit.',
      },
      {
        heading: 'Celebrate with ArcArea',
        desc: 'Enjoy a free professional photoshoot of your space as part of our #MyArcAreaHome campaign.',
      },
    ],
    img: '/processimg5.avif',
  },
]

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch('https://formspree.io/f/mgvynjpo', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      alert('Thank you! We will contact you shortly.');
      setShowForm(false);
      form.reset();
    } else {
      alert('There was an error. Please try again.');
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Top Banner */}
      <section>
        <Image
          src="/how-it-worksimg.avif"
          alt="How it works"
          width={1920}
          height={600}
          className="w-full h-auto"
        />
      </section>

      {/* 5-Step Overview */}
      <section className="py-16 text-center px-4">
        <h2 className="text-4xl font-bold">
          <span className="text-red-500">|</span> Your dream home in{' '}
          <span className="text-red-500">5 steps!</span>
        </h2>
        <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Looking to design your home interiors? Here&rsquo;s how you can get started.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-6 md:px-16">
          {stepsList.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28">
                <Image
                  src={step.img}
                  alt={step.title}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{step.step}</h3>
              <p className="text-sm text-gray-600">{step.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-12 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition duration-300"
        >
          START YOUR PROJECT NOW
        </button>
      </section>

      {/* Detailed Process */}
      <section className="bg-white py-1 px-4 sm:px-8 space-y-24 max-w-7xl mx-auto">
        {homeProcess.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <ul className="space-y-6">
                  {item.points.map((point, idx) => (
                    <li key={idx}>
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        • {point.heading}
                        {point.badge && (
                          <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                            {point.badge}
                          </span>
                        )}
                      </h4>
                      <p className="text-gray-600 mt-1">{point.desc}</p>
                      {point.cta && (
                        <button
                          onClick={() => setShowForm(true)}
                          className="mt-2 px-4 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full"
                        >
                          {point.cta}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:w-1/2">
                <div className="w-full max-w-md mx-auto relative aspect-[4/3]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            {/* Conditional banners */}
            {index === 1 && (
              <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
                <CheckCircle className="text-white" size={24} />
                Free consultation completed! Let&rsquo;s lock your design.
              </div>
            )}
            {index === 2 && (
              <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
                <CheckCircle className="text-white" size={24} />
                You&rsquo;re halfway there. Your orders are raised!
              </div>
            )}
            {index === 4 && (
              <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
                <CheckCircle className="text-white" size={24} />
                Hurrah! Complete payment has been made!
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Discovery Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Describe your requirements..."
                required
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
