"use client";
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import { toast } from 'react-toastify';

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const { data, loading, error } = useFetchData(`${Base_URL}/accommodation`);

  useEffect(() => {
    if (data) {
      setAccommodations(data); // Initialize accommodations state
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/accommodation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Accommodation deleted successfully');
        setAccommodations(accommodations.filter(acc => acc._id !== id)); // Remove the deleted accommodation from state
      } else {
        console.error(result.message || 'Failed to delete accommodation');
        toast.error(result.message || 'Failed to delete accommodation');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Accommodation List</h2>

      {loading && <p>Loading accommodations...</p>}
      {error && <p>Error loading accommodations: {error}</p>}

      {!loading && !error && accommodations?.length === 0 && <p>No accommodations found</p>}

      {!loading && !error && accommodations?.length > 0 && (
        <table className="min-w-[900px] bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Description</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Type</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Price</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Location</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Contact</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Images</th>
              <th className="border p-2">Delete</th> {/* Add Delete column */}
            </tr>
          </thead>
          <tbody>
            {accommodations.map((acc) => (
              <tr key={acc._id} className="border-b">
                <td className="py-2 px-4">{acc._id}</td>
                <td className="py-2 px-4">{acc.name}</td>
                <td className="py-2 px-4">{acc.description}</td>
                <td className="py-2 px-4">{acc.propertyType}</td>
                <td className="py-2 px-4">{acc.price || 'N/A'}</td>
                <td className="py-2 px-4">{acc.location.address || 'N/A'}</td>
                <td className="py-2 px-4">{acc.contactDetails.host || 'N/A'}</td>
                <td className="py-2 px-4">
                  {acc.images.length > 0 ? (
                    <img src={acc.images[0]} alt="Accommodation" className="w-16 h-16 object-cover" />
                  ) : 'No images'}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(acc._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Accommodation;
