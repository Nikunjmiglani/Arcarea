import Image from 'next/image';
import React from 'react';
import { CheckCircle } from "lucide-react";

const stepsList = [
  { step: "1", title: "Meet Designer", img: "/processimg1.avif" },
  { step: "2", title: "Book Livspace", img: "/processimg2.avif" },
  { step: "3", title: "Execution begins", img: "/processimg3.avif" },
  { step: "4", title: "Final installations", img: "/processimg4.avif" },
  { step: "5", title: "Move in", img: "/processimg5.avif" },
];

const homeProcess = [
  {
    title: "Meet your designer",
    points: [
      {
        heading: "It all begins with a form",
        desc: "Let’s get acquainted. The more we learn about you, the better we can design your home.",
        cta: "FILL YOUR FORM",
      },
      {
        heading: "Get free consultation",
        desc: "Talk to your designer and get personalised designs and quote for your dream home.",
      },
    ],
    img: "/processimg1.avif",
  },
  {
    title: "Book ArcArea",
    points: [
      {
        heading: "Pay the booking amount to seal the deal",
        desc: "Once you're happy with what we’ve proposed, pay 10% of the final quote or Rs.25000 (whichever is higher) to book us.",
        badge: "MILESTONE",
      },
      {
        heading: "Finalise your home design",
        desc: "It's time to deep dive into the nitty-gritties & pick your favorite materials, finishes, etc.",
      },
    ],
    img: "/processimg2.avif",
  },
  {
    title: "Place the order",
    points: [
      {
        heading: "Confirm your order with 60% payment",
        desc: "Finalise the design by making a cumulative 60% payment, and your project is now off to a good start.",
        badge: "MILESTONE",
      },
      {
        heading: "Work commences",
        desc: "Civil work begins on site. Keep a tab on your project status on ‘My Account’.",
      },
    ],
    img: "/processimg3.avif",
  },
];

const page = () => {
  return (
    <main className="bg-white text-gray-800">
      <section>
        <Image src="/how-it-worksimg.avif" alt="How it works" width={1920} height={600} className="w-full h-auto" />
      </section>

      <section className="py-16 text-center px-4">
        <h2 className="text-4xl font-bold">
          <span className="text-red-500">|</span> Your dream home in <span className="text-red-500">5 steps!</span>
        </h2>
        <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Looking to design your home interiors? Here's how you can get started.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-6 md:px-16">
          {stepsList.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28">
                <Image src={step.img} alt={step.title} layout="fill" className="rounded-full" />
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

      <section className="bg-white py-16 px-4 sm:px-8 space-y-24 max-w-7xl mx-auto">
        {homeProcess.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center justify-between gap-10">
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
                <Image src={item.img} alt={item.title} layout="fill" objectFit="contain" />
              </div>
            </div>
          </div>
        ))}

        {/* Midway banner */}
        <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
          <CheckCircle className="text-white" size={24} />
          You're half way there. Your orders are raised!
        </div>

        {/* Final Installations */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold">Final installations</h2>
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2">
                ✅ Pay 100% at intimation of material dispatch
              </h4>
              <p className="text-gray-600 mt-1">
                Once the materials are ready for dispatch, you’ll be intimated. Make the balance payment and we’ll head to the last leg of your project.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2">
                ✅ Installation
              </h4>
              <p className="text-gray-600 mt-1">
                Orders get delivered on-site and installation happens as per design.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image src="/processimg4.avif" alt="Installation" width={500} height={400} className="object-contain mx-auto" />
          </div>
        </div>

        {/* Payment complete callout */}
        <div className="bg-[#5B4257] py-6 px-4 text-white flex items-center justify-center text-lg font-semibold gap-2 rounded-xl">
          <CheckCircle className="text-white" size={24} />
          Hurrah! Complete payment has been made!
        </div>

        {/* Move in! */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">Move in!</h2>
            <p className="text-gray-600">
              Your dream home is now a reality! It’s time to make new memories!
              Do avail the free professional photoshoot session of your #LivspaceHome.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image src="/processimg5.avif" alt="Move In" width={500} height={400} className="object-contain mx-auto" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
