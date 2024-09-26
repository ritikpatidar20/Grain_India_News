import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiFillHome, AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';

const AdminHome = () => {
  const handleLinkClick = (message) => {
    toast.success(message);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          onClick={() => handleLinkClick('You clicked the Dashboard button')}
        >
          <AiFillHome className="inline-block mr-2" /> Dashboard
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Carousel Image</h2>
          <FaImage className="text-4xl text-blue-500 mb-4" />
          <p className="text-gray-600 mb-4">Upload new images for the carousel.</p>
          <Link 
            to="/admin/add-image" 
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleLinkClick('Navigating to Add Carousel Image')}
          >
            Go to Add Image
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Remove Carousel Image</h2>
          <AiOutlineDelete className="text-4xl text-red-500 mb-4" />
          <p className="text-gray-600 mb-4">Remove existing images from the carousel.</p>
          <Link 
            to="/admin/remove-image" 
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            onClick={() => handleLinkClick('Navigating to Remove Carousel Image')}
          >
            Go to Remove Image
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Carousel Images</h2>
          <FaImage className="text-4xl text-green-500 mb-4" />
          <p className="text-gray-600 mb-4">View all images currently in the carousel.</p>
          <Link 
            to="/admin/all-image" 
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            onClick={() => handleLinkClick('Navigating to All Carousel Images')}
          >
            View All Images
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Blog</h2>
          <AiOutlineEdit className="text-4xl text-yellow-500 mb-4" />
          <p className="text-gray-600 mb-4">Create a new blog post and add content.</p>
          <Link 
            to="/admin/create-blog" 
            className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
            onClick={() => handleLinkClick('Navigating to Create Blog')}
          >
            Create Blog
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Blogs</h2>
          <AiOutlineEdit className="text-4xl text-purple-500 mb-4" />
          <p className="text-gray-600 mb-4">View and manage all the blog posts.</p>
          <Link 
            to="/admin/all-blog" 
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            onClick={() => handleLinkClick('Navigating to All Blogs')}
          >
            View All Blogs
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Blog</h2>
          <AiOutlineEdit className="text-4xl text-teal-500 mb-4" />
          <p className="text-gray-600 mb-4">Edit existing blog posts and make updates.</p>
          <Link 
            to="/admin/edit-blog" 
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
            onClick={() => handleLinkClick('Navigating to Edit Blog')}
          >
            Edit Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
