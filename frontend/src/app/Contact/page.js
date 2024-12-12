"use client"
import React, { useState } from "react";
import SectionSubscribe2 from "../components/Subscribe";
import Label from "../Shared/Label";
import Input from "../Shared/Input";
import Textarea from "../Shared/Textarea";
import ButtonPrimary from "../Shared/ButtonPrimary";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import FooterNav from "../Shared/FooterNav";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const Page = ({ className = "" }) => {
  // State management for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSend = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/messages/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Message saved:", result);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        console.error("Failed to send message:", response.statusText);
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div
        className={`nc-PageContact overflow-hidden ${className}`}
        data-nc-id="PageContact"
      >
        <div className="mb-24 lg:mb-32">
          <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Contact
          </h2>
          <div className="container max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="max-w-sm space-y-8">
                {info.map((item, index) => (
                  <div key={index}>
                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      {item.title}
                    </h3>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {item.desc}
                    </span>
                  </div>
                ))}
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    🌏 SOCIALS
                  </h3>
                </div>
              </div>
              <div>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSend}>
                  <label className="block">
                    <Label>Full name</Label>
                    <Input
                      name="name"
                      placeholder="Example Doe"
                      type="text"
                      className="mt-1"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className="block">
                    <Label>Email address</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="example@example.com"
                      className="mt-1"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className="block">
                    <Label>Message</Label>
                    <Textarea
                      name="message"
                      className="mt-1"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <div>
                    <ButtonPrimary type="submit" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </ButtonPrimary>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER SECTIONS */}
        <div className="container">
          <SectionSubscribe2 className="py-24 lg:py-32" />
        </div>
      </div>
      <Footer />
      <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  );
};

export default Page;
