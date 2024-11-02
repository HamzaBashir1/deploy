import { AuthContext } from '@/app/context/AuthContext';
import { FormContext } from '@/app/FormContext';
import React, { useContext, useState } from 'react'
import { BiCamera, BiPlus } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { GoSignOut, GoSync } from 'react-icons/go';
import { LuCalendarDays } from 'react-icons/lu';
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from 'react-icons/md';
import { RiHotelLine, RiMenu2Fill } from 'react-icons/ri';
import { WiTime10 } from 'react-icons/wi';

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

  const [selectedFile, setSelectFile] = useState(null);

  const [loading, setLoading] = useState(false);
  

  

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  
    // Function to handle update
    const handleUpdateUser = async () => {
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
          }),
        });
  
        if (response.ok) {
          setStatusMessage('Profile updated successfully!');
        } else {
          setStatusMessage('Error updating profile. Please try again.');
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
            <CiSearch className="text-xl text-gray-500" />
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
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        <div className="flex flex-row gap-4 bg-white p-3 mb-5 rounded-md items-center">
          <span>1/2</span>
          <h1 className="font-bold text-lg md:text-xl">Photo</h1>
        </div>
        {user?.photo ? (
  <div className="flex flex-col items-center">
    <img
      src={user.photo}
      alt="Current Profile"
      className="object-cover w-32 h-32 rounded-full mb-3"
    />
    <button
      onClick={() => setSelectFile(null)} // Reset selectedFile state to allow a new upload
      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
      Edit Photo
    </button>
  </div>
) : (
  <div className="flex flex-col items-center justify-center w-full sm:w-80 h-40 border-2 border-dashed border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-200 mb-5">
    <input
      type="file"
      onChange={handleFileInputChange}
      className="hidden" // Hide the file input
      id="file-input"
    />
    <label htmlFor="file-input" className="flex flex-col items-center">
      <BiCamera size={30} />
      <p className="mt-2 text-gray-500">Upload a picture</p>
    </label>
  </div>
)}

        <div className="flex flex-row gap-4 bg-white p-3 mb-5 rounded-md items-center">
          <span>2/2</span>
          <h1 className="font-bold text-lg md:text-xl">Personal data</h1>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/3 mb-2 sm:mb-0">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md"
              placeholder="Name"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/3 mb-2 sm:mb-0">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="w-full sm:w-1/3 mb-2 sm:mb-0">Phone</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md"
              placeholder="Phone"
            />
          </div>

          <button
            onClick={handleUpdateUser}
            className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          {statusMessage && <p className="mt-2 text-center text-sm text-gray-600">{statusMessage}</p>}
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

            {/* Menu Items */}
            {/* Add your existing menu items here */}
             {/* Menu items */}
             {[
              
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              { icon: <MdOutlineEmail />, text: 'News' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              { icon: <MdOutlineShowChart />, text: 'Statistics' },
              { icon: <FaRegStar />, text: 'Rating' },
              { icon: <WiTime10 />, text: 'Last minute' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
              { icon: <MdOutlineSubscriptions />, text: 'Subscription' },
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
