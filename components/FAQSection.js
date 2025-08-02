'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is Arcarea?',
    answer:
      'Arcarea is a marketplace that connects homeowners and businesses with trusted interior designers and architects for a range of design and planning services.',
  },
  {
    question: 'How do I find a designer or architect?',
    answer:
      'You can browse verified professionals or use our project matching tool to connect with designers and architects that match your requirements.',
  },
  {
    question: 'Do professionals offer free consultations?',
    answer:
      'Many offer a free or discounted initial consultation. Each profile mentions if a consultation fee applies.',
  },
  {
    question: 'How can I join Arcarea as a service provider?',
    answer:
      'Click "Join as a Professional" and create your profile with your portfolio and experience. Once verified, you’ll be listed on the platform.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'We use strong encryption and follow best practices to ensure your data is kept private and secure.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm transition">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`mt-2 text-gray-600 text-sm transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
