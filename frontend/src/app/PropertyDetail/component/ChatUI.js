"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Base_URL, Socket_base_URL } from '../../config';
import { io } from 'socket.io-client';

const ChatUI = ({ userR }) => {
  console.log(userR)
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const [senderId, setSenderId] = useState(null);

  // Use a ref for socket so it persists across renders
  const socket = useRef();

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize the socket connection and load the senderId from localStorage
  useEffect(() => {
    // Initialize the socket connection only once
    socket.current = io(Socket_base_URL);

    // Load the user from localStorage after component mounts
    const user = localStorage.getItem("user");
    if (user) {
      const users = JSON.parse(user);
      setSenderId(users._id);
    }

    fetchMessages();

    // Listen for incoming messages from the server
    socket.current.on('receive_message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, [userR]);

  // Fetch messages from the server for the current chat
  const fetchMessages = async () => {
    const u = localStorage.getItem("user");
    const s = JSON.parse(u);
    const i = s._id;
  
    // Check if senderId and receiverId (userR) are the same
    if (i === userR) {
      console.log("Cannot fetch messages for the same user.");
      setMessages([]); // Clear the messages state if the IDs are the same
      return; // Exit the function early
    }
  
    console.log("sender", i, "receiver", userR);
  
    try {
      const res = await fetch(`${Base_URL}/getmsg?userId1=${i}&userId2=${userR}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data", data);
      
      // Adjust the filter to check if both user IDs are included in the 'users' array of each message
      const filteredMessages = data.messages.filter((message) => {
        return message.users.includes(i) && message.users.includes(userR);
      });
  
      console.log("filtered", filteredMessages);
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
  // Handle sending the message
  const handleSendMessage = async () => {
     // Check if senderId and userR are the same
  if (senderId === userR) {
    console.log("Cannot send message to yourself.");
    // Optionally, you can show an alert instead of console.log
    alert("You cannot send a message to yourself.");
    return; // Exit the function early
  }

    console.log("s",senderId,"r",userR)
    if (inputMessage.trim()) {
      const newMessage = {
        message: inputMessage,
        users: [senderId, userR],
        sender: senderId,
        reciver:userR
      };

    //   try {
    //     const res = await fetch(` http://localhost:5000/api/addmsg`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newMessage),
    //     });

    //     if (!res.ok) {
    //       throw new Error("Failed to send message");
    //     }

    //     const savedMessage = await res.json();
    //  // Ensure 'messages' is always treated as an array
    //  setMessages((prevMessages) => (Array.isArray(prevMessages) ? [...prevMessages, savedMessage.data] : [savedMessage.data]));

    //     // Clear the input after sending
    //     setInputMessage("");
    //   } catch (error) {
    //     console.error("Error sending message:", error);
    //   }

// ------------
      try {
        // Send the message to the server to store it in the database
        const res = await fetch(`${Base_URL}/addmsg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });

        if (!res.ok) {
          throw new Error("Failed to send message");
        }

        const savedMessage = await res.json();



        // Emit the message using socket.io
        socket.current.emit('send_message', savedMessage.data);
        // setMessages(prevMessages => (Array.isArray(prevMessages) ? [...prevMessages, savedMessage.data] : [savedMessage.data]));

        // Clear the input after sending
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInputMessage(inputMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === senderId ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === senderId
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                <p className="mb-1">{message.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
      <div className="px-4 py-4 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <BsEmojiSmile className="w-6 h-6" />
          </button>
          <div className="relative flex-grow">
            <textarea
              className="w-full py-3 pl-4 text-gray-600 placeholder-gray-600 bg-gray-100 rounded-md resize-none focus:outline-none focus:placeholder-gray-400"
              placeholder="Type your message..."
              rows="1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {showEmojiPicker && (
              <div className="absolute left-0 bottom-12">
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
          >
            <span className="font-bold">Send</span>
            <FiSend className="w-6 h-6 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default ChatUI;
