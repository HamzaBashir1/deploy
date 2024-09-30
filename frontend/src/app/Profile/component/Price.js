import React, { useRef, useState } from "react";

const Price = ({ priceDetails }) => {
  console.log("Price Details: ", priceDetails);
  const name = priceDetails.name; 
  console.log("name", name);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(
    `Hello Mr. Bashir,\n\nwe are sending you the reservation details.`
  );
  const [email, setEmail] = useState(priceDetails.email); // Set email from priceDetails
  const [error, setError] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
 //
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });
    
    if (response.ok) {
      alert("Email sent successfully!");
      setShowModal(false);
    } else {
      const data = await response.json();
      setError(data.error || "Failed to send email");
    }
  } catch (err) {
    setError("An error occurred while sending email");
  }
};


 //
  // Email sending function
  const sendEmail = async (customMessage) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message: customMessage }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setShowModal(false);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send email");
      }
    } catch (err) {
      setError("An error occurred while sending email");
    }
  };
//
const handleSave = async () => {
  const userr = localStorage.getItem('user');
  if (userr) {
    const users = JSON.parse(userr);
    const userId = users._id;

    // Helper function to format the date to 'YYYY-MM-DD'
    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    // Convert check-in and check-out dates to 'YYYY-MM-DD' format
    const startDate = formatDate(priceDetails.checkInDate);
    const endDate = formatDate(priceDetails.checkOutDate);

    // Create the occupancyCalendarEntry object
    const occupancyCalendarEntry = {
      startDate: startDate, // Use formatted startDate
      endDate: endDate,     // Use formatted endDate
      guestName: priceDetails.name, // Optional guest name
      status: 'book', // Status can be booked, available, or blocked
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${priceDetails.accommodationId._id}/occupancyCalendar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate, // Directly sending startDate and endDate
          endDate: endDate,
          guestName: priceDetails.name,
          status: 'book', // Send the calendar entry
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update occupancy calendar: ${errorData.message}`);
      }

      const result = await response.json();
      console.log('Successfully updated:', result);
      alert('Calendar updated successfully!');
    } catch (error) {
      console.error('Error updating accommodation:', error);
      alert('Failed to update accommodation.');
    }
  } else {
    alert('User not found. Please log in.');
  }
};

  // Function to update the reservation by name and send an email
  const updateReservationByName = async (name, status, emailMessage) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/name/${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApproved: status, // Pass the status (approved/cancelled)
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      const result = await response.json();
      console.log("Updated reservation:", result);
      handleSave(); 
      // Send email after updating the reservation
      sendEmail(emailMessage);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // When "Approve" is clicked
  const handleApproved = () => {
    const congratsMessage = `Hello ${priceDetails.name},\n\nCongratulations! Your reservation for ${priceDetails.accommodationId.name} has been approved. We look forward to your stay from ${priceDetails.checkInDate} to ${priceDetails.checkOutDate}.\n\nBest regards,\nYour Team`;
    updateReservationByName(name, "approved", congratsMessage);
  };

  // When "Cancel" is clicked
  const handleCancel = () => {
    const sorryMessage = `Hello ${priceDetails.name},\n\nWe regret to inform you that your reservation for ${priceDetails.accommodationId.name} has been cancelled. Please contact us for more details.\n\nBest regards,\nYour Team`;
    updateReservationByName(name, "cancelled", sorryMessage);
  };

  return (
    <div className="">
      <div className="max-w-screen-lg p-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Reservation request {priceDetails.userId.name}</h1>
        </div>

        {/* Apartment Info */}
        <div className="flex items-center mb-6">
          <img
            src={priceDetails.accommodationId.images[0] }
            alt="Apartment"
            className="w-16 h-16 mr-4 rounded-full"
          />
          <div>
            <h2 className="font-semibold">
            {priceDetails.accommodationId.name}
            </h2>
            <p>Total Price: €{priceDetails.totalPrice}</p>
          </div>
        </div>

        {/* Reservation Controls */}
        <div className="flex mb-6 space-x-4">
          <button className="px-4 py-2 text-white bg-red-500 rounded-lg">
            Raw
          </button>
          {/* <button className="px-4 py-2 bg-gray-200 rounded-lg">Occupancy</button> */}
          <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={toggleModal}>
            Send to email
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Print</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Download PDF</button>
          
          <button className="gap-2 px-6 py-2 bg-green-600 rounded-lg"
          onClick={handleApproved}
                  >
                    Approve
                  </button>
                  <button className="gap-2 px-6 py-2 bg-red-600 rounded-lg"
                  onClick={handleCancel}
                  >
                    Cancel
                  </button>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          {/* Stay Section */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
              <h3 className="mb-4 text-lg font-semibold">Stay</h3>
              <span className="text-blue-500 cursor-pointer">Edit</span>
            </div>
            <div className="space-y-2">
              <div>Date from - to</div>
              <div>
              
              {new Date(priceDetails.checkInDate).toLocaleDateString()} - {new Date(priceDetails.checkOutDate).toLocaleDateString()}
              </div>
              <div>Number of persons</div>
              <div>{priceDetails.numberOfPersons} adults</div>
              <div>Diet</div>
              <div>{priceDetails.diet || "No special requests"}</div>
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
              <h3 className="mb-4 text-lg font-semibold">Accommodation</h3>
              <span className="text-blue-500 cursor-pointer">Edit</span>
            </div>
            <p>{priceDetails.accommodationId.locationDetails.name}</p>
            <p>{priceDetails.numberOfPersons} adults</p>
          </div>

          {/* Customer Contact Section */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
              <h3 className="mb-4 text-lg font-semibold">Customer Contact</h3>
              <span className="text-blue-500 cursor-pointer">Edit</span>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="font-semibold">Name: </span> {priceDetails.name} {priceDetails.surname}
              </div>
              <div className="flex items-center">
                <span className="font-semibold">Email: </span> {priceDetails.email}
              </div>
              <div className="flex items-center">
                <span className="font-semibold">Phone: </span> {priceDetails.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between">
            <h3 className="mb-4 text-lg font-semibold">Prices</h3>
            <span className="text-blue-500 cursor-pointer">Edit</span>
          </div>
          <div className="space-y-2">
            <div>Accommodation: €{priceDetails.totalPrice - 10}</div>
            <div>Final cleaning: €10</div>
            <div className="font-bold">Total price: €{priceDetails.totalPrice}</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Send reservation to email</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 mx-3 text-white bg-pink-500 rounded-lg"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
