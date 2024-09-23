"use client";
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import { toast } from 'react-toastify';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const Hosts = () => {
  const [hosts, setHosts] = useState([]);
  const { data, loading, error } = useFetchData(`${Base_URL}/hosts`);

  useEffect(() => {
    if (data) {
      setHosts(data); // Initialize hosts state
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/hosts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Host deleted successfully');
        setHosts(hosts.filter(host => host._id !== id)); // Remove the deleted host from state
      } else {
        console.error(result.message || 'Failed to delete host');
        toast.error(result.message || 'Failed to delete host');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Host List</h2>

      {loading && <Loading/>}
      {error && <Error message={error}/>}

      {!loading && !error && hosts.length === 0 && <p>No hosts found</p>}

      {!loading && !error && hosts.length > 0 && (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Phone Number</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Plan Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Company Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">City</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Country</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">TIN</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">VAT Number</th>
              <th className="border p-2">Delete</th> {/* Add Delete column */}
            </tr>
          </thead>
          <tbody>
            {hosts.map((host) => (
              <tr key={host._id} className="border-b">
                <td className="py-2 px-4">{host.phoneNumber}</td>
                <td className="py-2 px-4">{host.planName}</td>
                <td className="py-2 px-4">{host.companyName}</td>
                <td className="py-2 px-4">{host.city}</td>
                <td className="py-2 px-4">{host.country}</td>
                <td className="py-2 px-4">{host.tin}</td>
                <td className="py-2 px-4">{host.vatNumber}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(host._id)}
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

export default Hosts;
