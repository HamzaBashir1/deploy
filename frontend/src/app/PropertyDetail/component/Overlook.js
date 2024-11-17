import React, { useState, useEffect, useRef } from "react";
import {
  FaInfoCircle,
  FaCreditCard,
  FaDollarSign,
  FaTimesCircle,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import RulesOfStay from "./RulesOfStay";
import Payments from "./Payments";
import Surcharges from "./Surcharges";
import CancellationTerms from "./CancellationTerms";
import FAQs from "./FAQs";

const ITEMS_TO_SHOW = 3;

const Overlook = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  const items = [
    {
      icon: <FaInfoCircle className="text-2xl text-neutral-600" />,
      text: "Rules of stay",
      description: "Important guidelines and policies for your stay",
      component: <RulesOfStay data={data} />,
    },
    {
      icon: <FaCreditCard className="text-2xl text-neutral-600" />,
      text: "Payments",
      description: "Payment methods and processing information",
      component: <Payments data={data} />,
    },
    {
      icon: <FaDollarSign className="text-2xl text-neutral-600" />,
      text: "Surcharges",
      description: "Additional fees and charges",
      component: <Surcharges data={data} />,
    },
    {
      icon: <FaTimesCircle className="text-2xl text-neutral-600" />,
      text: "Cancellation terms",
      description: "Booking cancellation policies and requirements",
      component: <CancellationTerms />,
    },
    {
      icon: <FaQuestionCircle className="text-2xl text-neutral-600" />,
      text: "Frequently asked questions",
      description: "Common queries and helpful answers",
      component: <FAQs data={data} />,
    },
  ];

  const handleItemClick = (component) => {
    setModalContent(component);
    setModalOpen(true);
  };

  const Modal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
<<<<<<< HEAD
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white rounded-3xl shadow-xl max-w-2xl mx-4 w-full relative overflow-hidden"
        >
          <div className="p-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <FaTimesCircle className="text-2xl" />
            </button>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Details
            </h3>
            <div className="overflow-y-auto max-h-[70vh] pr-2">{content}</div>
          </div>
=======
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="border p-6 rounded-lg shadow-lg max-w-lg mx-4 relative overflow-y-auto max-h-[80vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimesCircle />
          </button>
          <h3 className="text-xl font-bold mb-4">Details</h3>
          <div>{content}</div>
>>>>>>> f88800770ed881f40e51d52e26717815a1ef8332
        </div>
      </div>
    );
  };

  const renderItem = (item, index) => (
    <li
      key={index}
      onClick={() => handleItemClick(item.component)}
      className="group transition-all duration-300"
    >
      <div className="bg-neutral-50 hover:bg-neutral-100 rounded-2xl p-6 cursor-pointer transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow transition-shadow">
            {item.icon}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              {item.text}
            </h3>
            <p className="text-neutral-500">{item.description}</p>
          </div>
          <div className="text-neutral-400 group-hover:text-[#58caaa] transition-colors">
            <FaChevronDown className="text-lg" />
          </div>
        </div>
      </div>
    </li>
  );

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 mb-8 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-neutral-900">
            Don't overlook
          </h2>
          <span className="block mt-3 text-neutral-500 text-lg">
            Read on for good-to-know information about your stay
          </span>
=======
    <div>
      <div className="p-6 my-5 border rounded-lg shadow-lg lg:ml-[18px]">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Don’t overlook</h2>
          <p className="text-gray-600">Read on for good-to-know information</p>
>>>>>>> f88800770ed881f40e51d52e26717815a1ef8332
        </div>

        <ul className="space-y-4">
<<<<<<< HEAD
          {items
            .slice(0, showAllItems ? items.length : ITEMS_TO_SHOW)
            .map(renderItem)}
=======
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item.component)}
              className="flex items-center justify-between p-4 transition rounded-lg cursor-pointer border hover:bg-gray-100"
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
>>>>>>> f88800770ed881f40e51d52e26717815a1ef8332
        </ul>

        {items.length > ITEMS_TO_SHOW && (
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="mt-8 flex items-center space-x-2 text-[#58caaa] hover:text-[#4ab596] font-medium transition-colors"
          >
            <span>
              {showAllItems ? "Show less" : `Show all ${items.length} items`}
            </span>
            {showAllItems ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default Overlook;
