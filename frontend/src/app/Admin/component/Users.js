"use client";
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useFetchData(`${Base_URL}/users`);

  useEffect(() => {
    if (data) {
      setUsers(data); // Initialize users state
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('User deleted successfully');
        setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from state
      } else {
        // Log result.message or result to debug
        console.error(result.message || 'Failed to delete user');
        toast.error(result.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>

      {loading && <p>Loading users...</p>}
      {error && <p>Error loading users: {error}</p>}

      {!loading && !error && users?.length === 0 && <p>No users found</p>}

      {!loading && !error && users?.length > 0 && (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Email</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Role</th> 
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Phone</th> 
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user._id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td> {/* Display Role */}
                <td className="py-2 px-4">{user.phone || 'N/A'}</td> {/* Display Phone or N/A */}
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default Users;
