import { Base_URL } from '../../config';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const WriteMessage = ({ onClose }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Message saved:', result);
        alert('Message sent successfully!');
        onClose(); // Close the modal
      } else {
        console.error('Failed to send message:', response.statusText);
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="relative w-full max-w-lg p-4 mx-4 bg-white rounded-lg sm:p-8 sm:mx-auto">
        <button 
          onClick={onClose} 
          className="absolute p-2 text-gray-600 bg-gray-200 rounded-full top-4 right-2 hover:text-gray-900 focus:outline-none"
          aria-label="Close Modal"
        >
          <MdClose className="text-2xl" />
        </button>
        <h2 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4">Contact Me</h2>
        <p className="mb-2 sm:mb-4">
          Fill in your contact details and we will get back to you as soon as possible.
        </p>

        {/* Name Input */}
        <label className="block mb-1 text-sm" htmlFor="name">Name</label>
        <input 
          id="name"
          type="text" 
          placeholder="Enter your name" 
          required 
          className="w-full p-2 mb-3 border-b border-gray-400 sm:mb-4 focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Surname Input */}
        <label className="block mb-1 text-sm" htmlFor="surname">Surname</label>
        <input 
          id="surname"
          type="text" 
          placeholder="Enter your surname" 
          required 
          className="w-full p-2 mb-3 border-b border-gray-400 sm:mb-4 focus:outline-none focus:border-blue-500"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        {/* Email Input */}
        <label className="block mb-1 text-sm" htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          placeholder="Enter your email" 
          required 
          className="w-full p-2 mb-3 border-b border-gray-400 sm:mb-4 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone Input */}
        <label className="block mb-1 text-sm" htmlFor="phone">Phone #</label>
        <input 
          id="phone"
          type="tel" 
          placeholder="Enter your phone number" 
          required 
          className="w-full p-2 mb-3 border-b border-gray-400 sm:mb-4 focus:outline-none focus:border-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Message Textarea */}
        <label className="block mb-1 text-sm" htmlFor="message">Message</label>
        <textarea
          id="message"
          className="w-full h-24 p-2 mb-3 border rounded sm:h-32 sm:mb-4"
          placeholder="Write your message here..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <hr className='my-2'/>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="px-3 py-2 mr-2 text-white bg-gray-500 rounded"
          >
            Close
          </button>
          <button 
            className="px-3 py-2 text-white bg-green-500 rounded"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteMessage;
