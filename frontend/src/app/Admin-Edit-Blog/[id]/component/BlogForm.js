"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; 
import { Base_URL } from "../../../config";
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation'; // Correctly import useRouter and useParams
import uploadImageToCloudinary from '../../../utlis/uploadCloudinary.js'; 

// Dynamically import ReactQuill to prevent SSR issues
// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false,
// });

// Custom toolbar for React Quill
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }], // Header options
    [{ 'font': [] }], // Font options
    [{ 'align': [] }], // Text alignment options
    ['bold', 'italic', 'underline'], // Text formatting options
    ['link', 'image'], // Insert link and image
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
    ['clean'], // Remove formatting
    [{ 'color': [] }, { 'background': [] }], // Text color and background color
  ],
};

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);
  const [image, setImage] = useState(''); // State for the uploaded image URL
  const [previewURL, setPreviewURL] = useState(''); // State for the image preview
  const [isEdit, setIsEdit] = useState(false); // Flag to check if we're editing
  const [summary, setSummary] = useState(''); // State for summary
  const [blogType, setBlogType] = useState('customer'); // State for blog type
  const router = useRouter(); // Use the useRouter hook
  const params = useParams(); // Use useParams to get dynamic id

  useEffect(() => {
    const fetchBlogData = async () => {
      if (params.id) {
        setIsEdit(true); // Set the flag for editing
        try {
          const response = await fetch(`${Base_URL}/blog/${params.id}`);
          const result = await response.json();
          if (response.ok) {
            setTitle(result.title);
            setContent(result.content);
            setAuthor(result.author);
            setCategories(result.categories);
            setTagList(result.tags || []);
            setImage(result.image);
            setPreviewURL(result.image);
            setSummary(result.summary || ''); // Initialize summary
            setBlogType(result.blogType || 'customer'); // Initialize blog type
          } else {
            toast.error("Error fetching blog data");
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
          toast.error("Error fetching blog data");
        }
      }
    };

    fetchBlogData();
  }, [params.id]);

  const handleQuillChange = (content) => {
    setContent(content);
  };

  const handleTagInputChange = (e) => {
    setTags(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tags.trim() !== '') {
      e.preventDefault(); // Prevent default action
      setTagList((prevTags) => [...prevTags, tags.trim()]); // Add the new tag to the list
      setTags(''); // Clear the input
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const data = await uploadImageToCloudinary(file); // Upload image to Cloudinary
        setPreviewURL(data.url); // Set the preview URL
        setImage(data.url); // Update the image URL in state
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(''); // Clear the image
    setPreviewURL(''); // Clear the preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { 
      title, 
      content, 
      author, 
      categories, 
      tags: tagList, 
      image, 
      summary, // Include summary in blogData
      blogType // Include blogType in blogData
    };

    try {
      // Edit API request (PUT)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Blog post updated successfully!");
        router.push('/Admin'); // Navigate back to the admin page
      } else {
        console.error('Error:', result.error || result);
        toast.error("Error updating blog post");
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error('Error updating blog post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[1450px] mx-auto">
      <div className="relative">
        {!previewURL && (
          <>
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full opacity-0 cursor-pointer h-full"
            />
            <label
              htmlFor="customFile"
              className="flex items-center justify-center mb-4 h-12 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out shadow-md"
            >
              Upload Featured Image
            </label>
          </>
        )}
      </div>

      {previewURL && (
        <div className="flex flex-col items-center justify-center mt-4">
          <img src={previewURL} alt="Preview" className="object-cover h-60 w-auto" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Remove Image
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded-lg"
      />
      {/* <ReactQuill
        value={content}
        onChange={handleQuillChange}
        modules={modules} // Apply custom modules for toolbar
        placeholder="Write your blog content here..."
        className="mb-14 h-[400px]"
      /> */}
      <textarea
        type="text"
        placeholder="Summary"
        value={summary}
        rows={5}
        onChange={(e) => setSummary(e.target.value)} // New summary input
        required
        className="w-full p-3 mb-4 border rounded-lg"
      />
      <select
        value={blogType}
        onChange={(e) => setBlogType(e.target.value)} // New blog type selection
        className="w-full p-3 mb-4 border rounded-lg"
      >
        <option value="customer">Blog for Customers</option>
        <option value="provider">Blog for Accommodation Providers</option>
      </select>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Categories"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      />

      <div className="flex flex-wrap mb-4">
        {tagList.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <input
        type="text"
        placeholder="Add tags and press Enter"
        value={tags}
        onChange={handleTagInputChange}
        onKeyDown={handleTagKeyDown}
        className="w-full p-3 mb-4 border rounded-lg"
      />

      <div className="flex justify-center my-5">
        <button
          type="submit"
          className="w-48 h-12 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Update Blog
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
