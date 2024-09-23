import React, { useState } from 'react';
import { FaInfoCircle, FaCreditCard, FaDollarSign, FaTimesCircle, FaQuestionCircle, FaChevronRight } from 'react-icons/fa';

const Overlook = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const items = [
    { icon: <FaInfoCircle />, text: 'Rules of stay', content: 'Details about the<br/>rules of stay...' },
    { icon: <FaCreditCard />, text: 'Payments', content: 'Information about payment options...' },
    { icon: <FaDollarSign />, text: 'Surcharges', content: 'Details about any additional surcharges...' },
    { icon: <FaTimesCircle />, text: 'Cancellation terms', content: 'Cancellation policies and terms...' },
    { icon: <FaQuestionCircle />, text: 'Frequently asked questions', content: 'Answers to frequently asked questions...' },
  ];

  const handleItemClick = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const Modal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4 relative overflow-y-auto max-h-[80vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimesCircle />
          </button>
          <h3 className="text-xl font-bold mb-4">Details</h3>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-6 my-10 bg-white rounded-lg shadow-lg lg:mr-[440px] lg:ml-[18px]">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Don’t overlook</h2>
          <p className="text-gray-600">Read on for good-to-know information</p>
        </div>

        {/* Information List */}
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item.content)}
              className="flex items-center justify-between p-4 transition rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 text-xl text-gray-600 bg-gray-200 rounded-full">
                  {item.icon}
                </div>
                <span className="text-lg font-semibold">{item.text}</span>
              </div>
              <div className="text-gray-600">
                <FaChevronRight />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Component */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} content={modalContent} />
    </div>
  );
};

export default Overlook;
