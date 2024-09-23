import React, { useState } from 'react';

// Dummy data for FAQs
const faqs = [
  { question: "I want to offer my accommodation, how do I start?", answer: "You can start by registering on our platform and following the setup guide." },
  { question: "What information is required for login and registration?", answer: "You will need a valid email address and some basic details to get started." },
  { question: "Do I pay commission or other booking fees?", answer: "No, we do not charge any commissions or hidden fees." },
  { question: "How will you bring me new inquiries from guests?", answer: "We promote your accommodation through our extensive network and marketing strategies." },
  { question: "Who determines the prices and rules of stay that are displayed at check-in?", answer: "You have full control over the pricing and rules of stay." },
  { question: "Is it possible to pay extra for extra services during the subscription period?", answer: "Yes, you can opt for additional services at any time." },
  { question: "Does it interfere with the booking process?", answer: "No, our platform seamlessly integrates with your existing systems." },
  { question: "How do payments from clients for accommodation and services work?", answer: "Clients make payments directly to your account." },
  { question: "How much does a presentation on our platform cost?", answer: "Pricing details can be found on our subscription page." },
  { question: "Is it possible to synchronize the occupancy calendar with another portal?", answer: "Yes, we support calendar synchronization with various platforms." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col  mt-11 p-6 lg:mx-20 lg:flex-row lg:space-x-12">
      {/* Title Section */}
      <div className="mb-6 lg:w-1/3 lg:mb-0">
        <h2 className="lg:text-2xl text-4xl font-bold text-left">Frequently asked questions</h2>
      </div>
      
      {/* FAQ Section */}
      <div className="space-y-4 lg:w-2/3">
        {faqs.map((faq, index) => (
          <div key={index} className="pb-4 border-b border-gray-300">
            <button
              className="flex items-center justify-between w-full font-semibold text-left text-gray-900 focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
