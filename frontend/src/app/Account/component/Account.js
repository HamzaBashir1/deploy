"use client";
import React, { useContext, useState } from "react";
import Label from "../../Shared/Label";
import Avatar from "../../Shared/Avatar";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import Input from "../../Shared/Input";
import Select from "../../Shared/Select";
import Textarea from "../../Shared/Textarea";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utlis/uploadCloudinary";

const Account = () => {
  const { user } = useContext(AuthContext);

  const id = user?._id;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [photo, setPhoto] = useState(user?.photo || null);
  const [gender, setGender] = useState(user?.gender || "Male");
  const [username, setUsername] = useState(user?.username || "");
  const [dob, setDob] = useState(user?.dob || "1990-07-22");
  const [address, setAddress] = useState(user?.address || "");
  const [about, setAbout] = useState(user?.about || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\+?\d{1,4}-?\d{3}-?\d{7}$/.test(phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number (e.g., +92-XXX-XXXXXXX).";

    if (!address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateUser = async () => {
    if (!validateFields()) return;
  
    setLoading(true);
    try {
      const role = localStorage.getItem("role");
      const endpoint = role === "host" ? "hosts" : "users";
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}/${id}`;
      console.log("API Request URL:", url); // Log URL for debugging
  
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          photo,
          gender,
          username,
          dob,
          address,
          about,
        }),
      });
  
      if (response.ok) {
        const updatedUser = {
          ...user,
          name,
          email,
          phoneNumber,
          photo,
          gender,
          username,
          dob,
          address,
          about,
        };
  
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const data = await uploadImageToCloudinary(file); // Upload image
        if (data?.secure_url) {
          setPhoto(data.secure_url); // Set uploaded image URL
        } else {
          toast.error("Failed to upload the image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Account Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overflow-hidden flex">
              <Avatar sizeClass="w-32 h-32" src={photo || '/default-avatar.png'} />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  className="text-white"
                >
                  <path
                    d="M17.5 5H7.5C6.837 5 6.201 5.263 5.732 5.732 5.263 6.201 5 6.837 5 7.5V20m0 0V22.5c0 .663.263 1.299.732 1.768.469.469 1.104.732 1.768.732H22.5c.663 0 1.299-.263 1.768-.732.469-.469.732-1.104.732-1.768V17.5m-20 2.5 5.732-5.732a3.001 3.001 0 0 1 4.268 0L17.5 17.5"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1.5">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div>
              <Label>Username</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="max-w-lg">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1.5"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            <div>
              <Label>About You</Label>
              <Textarea value={about} onChange={(e) => setAbout(e.target.value)} className="mt-1.5" />
            </div>
            <div className="pt-2">
              <ButtonPrimary onClick={handleUpdateUser} disabled={loading}>
                {loading ? "Updating..." : "Update Info"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
