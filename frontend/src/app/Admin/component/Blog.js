"use client";
import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Base_URL } from '../../config';
import { toast } from 'react-toastify';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { data, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (data) {
      console.log(data); // Check what the data looks like
      setBlogs(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Blog deleted successfully');
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        console.error(result.message || 'Failed to delete blog');
        toast.error(result.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Function to truncate HTML content
  const truncateContent = (content, maxLength) => {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.innerText;

    // Truncate text if it exceeds the maxLength
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Function to handle edit button click
  const handleEdit = (id) => {
    // Navigate to the edit page with the blog ID
    router.push(`/Admin-Edit-Blog/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blog List</h2>

      {loading && <Loading />}
      {error && <Error message={error} />}

      {!loading && !error && blogs.length === 0 && <p>No blogs found</p>}

      {!loading && !error && blogs.length > 0 && (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Title</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Author</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Published Date</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase">Content</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              const truncated = truncateContent(blog.content, 15); // Truncate to 15 characters

              return (
                <tr key={blog._id} className="border-b">
                  <td className="py-2 px-4">{blog.title}</td>
                  <td className="py-2 px-4">{blog.author}</td>
                  <td className="py-2 px-4">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-2 px-4">{truncated}</td>
                  <td className="border p-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(blog._id)} // Handle edit
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
