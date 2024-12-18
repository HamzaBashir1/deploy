import { AuthContext } from '../../context/AuthContext';
import { FormContext } from '../../FormContext';
import React, { useContext, useEffect, useState } from 'react'
import { BiCamera, BiPlus } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { GoSignOut, GoSync } from 'react-icons/go';
import { LuCalendarDays } from 'react-icons/lu';
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from 'react-icons/md';
import { RiHotelLine, RiMenu2Fill } from 'react-icons/ri';
import { WiTime10 } from 'react-icons/wi';
import uploadImageToCloudinary from '../../utlis/uploadCloudinary';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Avatar from '../../Shared/Avatar';
import Label from '../../Shared/Label';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Textarea from '../../Shared/Textarea';
import ButtonPrimary from '../../Shared/ButtonPrimary';

const EditProfile = () => {
const { user } = useContext(AuthContext);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };

    // State for form inputs
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [statusMessage, setStatusMessage] = useState('');
  const [photo, setPhoto] = useState(user?.photo || null);
  const [gender, setGender] = useState(user?.gender || "Male");
  const [username, setUsername] = useState(user?.username || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "1990-07-22");
  const [address, setAddress] = useState(user?.address || "");
  const [aboutYou, setAboutYou] = useState(user?.aboutYou || "");
  const [selectedFile, setSelectFile] = useState(user?.photo || null);
  const [isDragging, setIsDragging] = useState(false);

 // Example ISO date fetched after login
 const fetchedDateOfBirth = "2001-08-05T00:00:00.000Z";

 useEffect(() => {
   // Convert ISO date to YYYY-MM-DD format
   if (fetchedDateOfBirth) {
     const formattedDate = new Date(fetchedDateOfBirth).toISOString().split("T")[0];
     setDateOfBirth(formattedDate);
   }
 }, [fetchedDateOfBirth]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    photo: user?.photo || '',
  });

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const data = await uploadImageToCloudinary(file); // Upload image
        if (data?.secure_url) {
          setSelectFile(data.secure_url); // Set uploaded image URL
        } else {
          toast.error('Failed to upload the image. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Network error. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const data = await uploadImageToCloudinary(file); // Upload image
        if (data?.secure_url) {
          setSelectFile(data.secure_url); // Set uploaded image URL
        } else {
          toast.error('Failed to upload the image. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Network error. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

    const [errors, setErrors] = useState({}); // State for validation errors

const validateFields = () => {
  const newErrors = {};

  // Name Validation
  if (!name.trim()) {
    newErrors.name = "Name is required.";
  } else if (name.length > 50) {
    newErrors.name = "Name cannot exceed 50 characters.";
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  // Phone Number Validation
  if (!phoneNumber.trim()) {
    newErrors.phone = "Phone number is required.";
  } else if (!/^\+?\d{1,4}-?\d{3}-?\d{7}$/.test(phoneNumber)) {
    newErrors.phone = "Please enter a valid phone number (e.g., +92-XXX-XXXXXXX).";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Return true if no errors
};

const handleUpdateUser = async () => {
  if (!validateFields()) {
    return; // Stop submission if validation fails
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        photo: selectedFile,
        dateOfBirth,
        username,
        address,
        aboutYou
      }),
    });

    if (response.ok) {
      
        // Update user data in localStorage
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')), // Retrieve existing user data
          name,
          email,         // Update the email
          phoneNumber,   // Update the phone number
          photo: selectedFile, // Update the name
          dateOfBirth,
          username,
          address,
          aboutYou
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!'); // Success toast
      setTimeout(() => {
        window.location.reload(); // Reload the page after a delay for user feedback
      }, 1500);
   
    } else {
      toast.error('Profile not updated '); // Success toast
   
    }
  } catch (error) {
    console.error(error);
   
    setStatusMessage('Network error. Please try again.');
  }
};

  return (
    <div>

      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
            {/* Left Section: Title and Status */}
            <div className="flex flex-col">
              <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Edit Profile</h1>
              <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Edit your Profile</p>
            </div>

            {/* Center Section: Add Accommodation Button */}
            <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            onClick={toggleMenu}
          >
            {/* <CiSearch className="text-xl text-gray-500" /> */}
            <button className="items-center hidden px-4 py-2 text-black bg-white border rounded-lg md:flex hover:bg-gray-100"  onClick={() => updateSelectedpage("AddAccommodation")}>
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2"   onClick={toggleMenu}>
              {user?.photo ? (
                <img 
                  src={user?.photo} 
                  alt="User Profile" 
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
            </div>
          </div>

        </div>

        </div>
        <div>
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Account Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
          <div
            className={`relative rounded-full overflow-hidden flex ${
              isDragging ? 'border-4 border-blue-500' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Image Field */}
            <img
              src={selectedFile || photo || '/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 object-cover"
            />

            {/* Loading Spinner */}
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
                <span className="mt-2 text-xs text-white">Uploading...</span>
              </div>
            )}

            {/* Overlay for Upload/Change */}
            {!loading && (
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
                <span className="mt-1 text-xs">{selectedFile ? 'Change Image' : 'Upload Image'}</span>
              </div>
            )}

            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
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
              <Input value={email} className="mt-1.5"/>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="max-w-lg">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
              <Textarea value={aboutYou} onChange={(e) => setAboutYou(e.target.value)} className="mt-1.5" />
            </div>
            <div className="pt-2">
              <ButtonPrimary 
              onClick={handleUpdateUser} disabled={loading}
              >
                {loading ? "Updating..." : "Update Info"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button 
            className="text-2xl text-gray-600"
            onClick={toggleMenu}
          >
            <MdClose />
          </button>
          <ul className="mt-4 space-y-2 font-medium text-gray-800">
            <li className='flex flex-row gap-2'>
              <div>
                {user?.photo ? (
                  <img 
                    src={user?.photo} 
                    alt="User Profile" 
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <BsPersonCircle className="text-[#292A34] text-xl" />
                )}
              </div>
              <div className='flex flex-col'>
                <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
                <p className='text-xs'>Edit Profile</p>
              </div>
            </li>
            <hr className='my-5' />
             {[
              
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
            ].map(({ icon, text }) => (
              <li key={text}>
                <p
                  className='flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100'
                  onClick={() => handleMenuClick(text)}  // Handle menu click and update selectedpage
                >
                  {icon}
                  <span className="text-sm font-medium">{text}</span>
                </p>
              </li>
            ))}
            <li>
              <button
                onClick={() => {}}
                className='flex items-center w-full gap-4 p-2 text-left text-gray-800 rounded-lg hover:bg-gray-100'
              >
                <GoSignOut />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EditProfile