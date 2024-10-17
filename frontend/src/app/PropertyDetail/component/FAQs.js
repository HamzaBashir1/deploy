import React, { useState } from 'react';

const FAQs = ({data}) => {

  const name = data?.name || "N/A";
  const wifi = data?.wifi || "N/A";
  const arrivalAndDeparture = data?.arrivalAndDeparture || {};
  const diet = data?.diet || "N/A";
  const smoking = data?.smoking || "N/A";
  const pets = data?.pets || "N/A";
  const loudMusic = data?.loudMusic || "N/A";
  const parking = data?.parking || "N/A"; 

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: `Can I park in the accommodation "${name}"?`,
      answer:
        `${name}" accommodation, the following parking options ${parking} are available to guests: ${wifi}.`
    },
    {
      question: `What catering options does the accommodation "${name}" provide?`,
      answer: `The accommodation offers ${diet} facilities`,
    },
    {
      question: `What are the house rules in "${name}"?`,
      answer: `Guests must respect , pets${pets}, and smoking${smoking}`,
    },
    {
      question:
        `How is arrival and departure (check-in - check-out) at "${name}"?`,
      answer: `Check-in is from ${arrivalAndDeparture?.arrivalFrom || "N/A"} to ${arrivalAndDeparture?.arrivalTo || "N/A"}, and check-out is from ${arrivalAndDeparture?.departureFrom || "N/A"} to ${arrivalAndDeparture?.departureTo || "N/A"}.`,
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Frequently asked questions</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b mb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex justify-between w-full py-4 text-lg font-semibold focus:outline-none"
          >
            {faq.question}
            <span>{activeIndex === index ? '−' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="pl-4 pb-4 text-gray-700">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
