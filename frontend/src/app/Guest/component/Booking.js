"use client";
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import useFetchData from '@/app/hooks/useFetchData';
import { formatDate } from '@/app/utlis/formatDate';

const Booking = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  
  // Track fetched data in state
  const [fetchedReservations, setFetchedReservations] = useState([]);
  const { data, loading, error } = useFetchData(user ? `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/email/${user.email}` : null);

  // Update reservations state when data changes
  useEffect(() => {
    if (data) {
      setFetchedReservations(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No reservations found for this user.</p>;

  if (!fetchedReservations || fetchedReservations.length === 0) {
    return <p>No reservations found for this user.</p>;
  }

  const navigateToPropertyDetail = (accommodationId) => {
    router.push(`/PropertyDetail/${accommodationId}`);
  };

  const isDeleteDisabled = (checkOutDate) => {
    const currentDate = new Date("2025-1-16");
    const checkOut = new Date(checkOutDate);
    const disableDate = new Date(checkOut.getTime() - 48 * 60 * 60 * 1000);
    return disableDate < currentDate;
  };

  const handleDelete = async (reservationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${reservationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // Manually re-fetch data after deletion
        const updatedData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/user/${user._id}`).then(res => res.json());
        setFetchedReservations(updatedData); // Update state with new data
      } else {
        console.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div>
      {/* Table for desktop */}
      <table className="hidden w-full mt-4 text-sm text-left text-gray-500 md:table">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">Check-in</th>
            <th scope="col" className="px-6 py-3">Check-out</th>
            <th scope="col" className="px-6 py-3">Persons</th>
            <th scope="col" className="px-6 py-3">Diet</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Accommodation</th>
            <th scope="col" className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {fetchedReservations.map((reservation) => {
            const accommodationId = reservation.accommodationId || "";
            const isDisabled = isDeleteDisabled(reservation.checkOutDate);

            return (
              <tr key={reservation._id}>
                <td className="px-6 py-4">{formatDate(reservation.checkInDate)}</td>
                <td className="px-6 py-4">{formatDate(reservation.checkOutDate)}</td>
                <td className="px-6 py-4">{reservation.numberOfPersons}</td>
                <td className="px-6 py-4">{reservation.diet}</td>
                <td className="px-6 py-4">€{reservation.totalPrice}</td>
                <td className="px-6 py-4">{reservation.isApproved ? "Approved" : "Pending"}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigateToPropertyDetail(accommodationId)} className="text-blue-500 hover:underline">
                    Accommodation
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    disabled={isDisabled}
                    className={`px-4 py-2 text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Column layout for mobile */}
      <div className="md:hidden">
        {fetchedReservations.map((reservation) => {
          const accommodationId = reservation.accommodationId || "";
          const isDisabled = isDeleteDisabled(reservation.checkOutDate);

          return (
            <div key={reservation._id} className="pb-4 mb-4 border-b">
              <h2 className="my-4 text-lg font-bold">Reservation Details</h2>
              <p><strong>Check-in:</strong> {formatDate(reservation.checkInDate)}</p>
              <p><strong>Check-out:</strong> {formatDate(reservation.checkOutDate)}</p>
              <p><strong>Persons:</strong> {reservation.numberOfPersons}</p>
              <p><strong>Diet:</strong> {reservation.diet}</p>
              <p><strong>Total Price:</strong> €{reservation.totalPrice}</p>
              <p><strong>Status:</strong> {reservation.isApproved ? "Approved" : "Pending"}</p>
              <button onClick={() => navigateToPropertyDetail(accommodationId)} className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 border rounded-xl">
                Accommodation Detail
              </button>
              <button
                onClick={() => handleDelete(reservation._id)}
                disabled={isDisabled}
                className={`mt-2 px-6 py-3 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'} text-white border rounded-xl`}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
