"use client";
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import useFetchData from '@/app/hooks/useFetchData';
import { formatDate } from '@/app/utlis/formatDate';


const Booking = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { data: fetchedReservations, loading, error } = useFetchData(user ? `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/user/${user._id}` : null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No reservations found for this user.</p>;

  if (!fetchedReservations || fetchedReservations.length === 0) {
    return <p>No reservations found for this user.</p>;
  }

  const navigateToPropertyDetail = (accommodationId) => {
    router.push(`/PropertyDetail/${accommodationId}`);
  };

  return (
    <div>
      {/* Table for desktop */}
      <table className="hidden w-full mt-4 text-sm text-left text-gray-500  md:table">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">Check-in</th>
            <th scope="col" className="px-6 py-3">Check-out</th>
            <th scope="col" className="px-6 py-3">Persons</th>
            <th scope="col" className="px-6 py-3">Diet</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Accommodation</th>
          </tr>
        </thead>
        <tbody>
          {fetchedReservations.map((reservation) => {
            const accommodationId = reservation.accommodationId || "";

            return (
              <tr key={reservation._id}>
                <td className="px-6 py-4">{formatDate(reservation.checkInDate)}</td>
                <td className="px-6 py-4">{formatDate(reservation.checkOutDate)}</td>
                <td className="px-6 py-4">{reservation.numberOfPersons}</td>
                <td className="px-6 py-4">{reservation.diet}</td>
                <td className="px-6 py-4">€{reservation.totalPrice}</td>
                <td className="px-6 py-4">{reservation.isApproved}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigateToPropertyDetail(accommodationId)} className="text-blue-500 hover:underline">
                    Accommodation
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
