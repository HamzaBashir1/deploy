"use client";

import { useState } from "react";
import Image from "next/image";
import SignupImg from "../../../../public/signup.gif";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import for app directory
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import FormItem from "../../Profile/component/FormItem";
import Input from "../../Shared/Input";
import Select from "../../Shared/Select";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "guest",
    propertyType: "Apartment",
    propertyName: "",
    propertyPrice: "",
    propertyAddress: "",
  });

  const propertyTypes = [
    "Apartment",
    "Flat",
    "Glamping",
    "Cottages",
    "Motels/Hostel",
    "Wooden Houses",
    "Guest Houses",
    "Secluded Accommodation",
    "Hotels",
    "Dormitories",
    "Caves",
    "Campsites",
    "Treehouses",
    "Houseboats",
    "Rooms",
    "Entire Homes",
    "Luxury Accommodation",
  ];

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(
          message || "Registration failed, please try again."
        );
      }

      setLoading(false);
      toast.success(
        "Registration successful! Check your email to verify your account."
      );
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 lg:mx-[300px]">
      <div className="mx-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <Image
                src={SignupImg}
                alt="Signup"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          {/* Signup Form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              {/* Name Field */}
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b focus:outline-none"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b focus:outline-none"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b focus:outline-none"
                  required
                />
              </div>

              {/* Role & Gender Selection */}
              <div className="mb-5 flex items-center justify-between">
                <label>
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="ml-2"
                  >
                    <option value="guest">Guest</option>
                    <option value="host">Host</option>
                  </select>
                </label>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="ml-2"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* Conditional Host Fields */}
              {formData.role === "host" && (
                <>
                  <FormItem label="Choose a property type">
                  <Select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border focus:outline-none"
                  >
                    <option value="">Select a property type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>

                  </FormItem>
                  <FormItem label="Place name">
                    <Input
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      placeholder="Place name"
                      required
                    />
                  </FormItem>
                  <FormItem label="Full Address">
                    <Input
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="Start typing to search for an address"
                      required
                    />
                  </FormItem>
                  <FormItem label="Price">
                    <Input
                      name="propertyPrice"
                      value={formData.propertyPrice}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="0.00"
                      required
                    />
                  </FormItem>
                </>
              )}

              {/* Submit Button */}
              <div className="mt-7">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#58CAAA] text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <PuffLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              {/* Login Redirect */}
              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link href="/login" className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
