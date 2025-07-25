'use client';
import Image from 'next/image';
import React from 'react';
import { CheckCircle } from 'lucide-react';

const stepsList = [
  { step: '1', title: 'Share Your Dream with Us', img: '/processimg1.avif' },
  { step: '2', title: 'Finalize Your Design & Budget', img: '/processimg2.avif' },
  { step: '3', title: 'Confirm & Kickstart Execution', img: '/processimg3.avif' },
  { step: '4', title: 'Material Dispatch & Installation', img: '/processimg4.avif' },
  { step: '5', title: 'Move in', img: '/processimg5.avif' },
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
        desc: 'Have a free consultation with experts and explore ideas tailored to your needs.',
      },
      {
        heading: 'Receive Initial Design & Estimate',
        desc: 'Get concept layouts, personalized suggestions, and a ballpark cost estimate.',
      },
    ],
    img: '/processimg2.avif',
  },
  {
    title: 'Step 3: Finalize Scope & Budget',
    points: [
      {
        heading: 'Define Materials, Timelines & Preferences',
        desc: 'Select finishes, materials, and define expectations clearly with your vendor.',
      },
      {
        heading: 'Request Quotations & Scope of Work',
        desc: 'Ask your chosen expert for a formal quotation and work plan. No commissions or hidden charges by ArcArea.',
      },
    ],
    img: '/processimg3.avif',
  },
  {
    title: 'Step 4: Confirm Your Order & Start Execution',
    points: [
      {
        heading: 'Make Initial Milestone Payment',
        desc: 'Agree on terms and pay the initial amount directly to the professional to start your project.',
        badge: 'MILESTONE',
      },
      {
        heading: 'Site Work Commences',
        desc: 'Vendor begins execution and shares regular progress updates. ArcArea does not manage site work.',
      },
    ],
    img: '/processimg4.avif',
  },
  {
    title: 'Step 5: Material Dispatch & Installation',
    points: [
      {
        heading: 'Next Milestone Payment & Dispatch',
        desc: 'Once materials are ready, make the next payment to enable dispatch and on-site delivery.',
        badge: 'MILESTONE',
      },
      {
        heading: 'Installation Begins',
        desc: 'Vendors handle installation directly as per the finalized design.',
      },
    ],
    img: '/processimg5.avif',
  },
  {
    title: 'Step 6: Move In & Celebrate',
    points: [
      {
        heading: 'Your Home is Ready!',
        desc: 'Enjoy your dream space — a true reflection of your lifestyle and taste.',
      },
      {
        heading: 'Celebrate the Completion',
        desc: 'Move in and cherish the journey from dream to reality.',
      },
    ],
    img: '/processimg5.avif',
  },
];

const Page = () => {
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
          Looking to design your home interiors? Here&apos;s how you can get started.
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

        <button className="mt-12 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition duration-300">
          START YOUR PROJECT NOW
        </button>
      </section>

      {/* Detailed Process */}
      <section className="bg-white py-16 px-4 sm:px-8 space-y-24 max-w-7xl mx-auto">
        {homeProcess.map((item, index) => (
          <React.Fragment key={index}>
            {/* Step */}
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
                        <button className="mt-2 px-4 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full">
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

            {/* Banners injected at specific positions */}
            {index === 1 && (
              <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
                <CheckCircle className="text-white" size={24} />
                Free consultation completed! Let’s lock your design.
              </div>
            )}
            {index === 2 && (
              <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
                <CheckCircle className="text-white" size={24} />
                You&apos;re halfway there. Your orders are raised!
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
    </main>
  );
};

export default Page;
