import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MdImage, MdTitle, MdDescription, MdUpload, MdRefresh } from 'react-icons/md';
import { BASE_URL } from '../components/helper';
const CreateBlog = () => {
    const [blogData, setBlogData] = useState({ heading: '', detail: '', blogImage: null });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleCreateBlog = async () => {
        if (!blogData.heading) {
            setErrorMessage('Heading is required');
            triggerFadeOut();
            return;
        }

        const formData = new FormData();
        formData.append('heading', blogData.heading);
        formData.append('detail', blogData.detail);
        if (blogData.blogImage) {
            formData.append('blogImage', blogData.blogImage);
        }
        setIsUploading(true);

        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(`${BASE_URL}/api/v1/blog/addBlog`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`
      
                 },
                 withCredentials:true
                
          
                  
            });
            toast.success('Blog created successfully!');
            setErrorMessage('');
            setSuccessMessage('Blog created successfully!');
            clearForm();
            setIsUploading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating blog');
            setErrorMessage(error.response?.data?.message || 'Error creating blog');
            setIsUploading(false);
        }
        triggerFadeOut();
        setIsUploading(false);
    };

    const clearForm = () => {
        setBlogData({ heading: '', detail: '', blogImage: null });
    };

    const triggerFadeOut = () => {
        setTimeout(() => {
            setFadeOut(true);
        }, 2000); // Start fading out after 2 seconds
        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
            setFadeOut(false); // Reset fade-out class for next use
        }, 4000); // Completely remove messages after 4 seconds
    };

    const handleImageChange = (e) => {
        setBlogData({ ...blogData, blogImage: e.target.files[0] });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">Create Blog</h2>
            {errorMessage && <p className={`bg-red-500 text-white p-3 rounded ${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>{errorMessage}</p>}
            {successMessage && <p className={`bg-green-500 text-white p-3 rounded ${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>{successMessage}</p>}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="heading">
                    <MdTitle className="inline-block text-xl mr-2" />
                    Heading for the Blog
                </label>
                <input
                    type="text"
                    id="heading"
                    placeholder="Enter blog title"
                    value={blogData.heading}
                    onChange={(e) => setBlogData({ ...blogData, heading: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="content">
                    <MdDescription className="inline-block text-xl mr-2" />
                    Content for the Blog
                </label>
                <textarea
                    id="content"
                    placeholder="Enter blog content"
                    rows="8"
                    value={blogData.detail}
                    onChange={(e) => setBlogData({ ...blogData, detail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="blogImage">
                    <MdImage className="inline-block text-xl mr-2" />
                    Upload Image for the Blog
                </label>
                <input
                    type="file"
                    id="blogImage"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleCreateBlog}
                    className={`w-48 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform ${isUploading ? 'cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={isUploading}
                >
                    <MdUpload className="inline-block text-xl mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Blog'}
                </button>
                <button
                    onClick={clearForm}
                    className="w-48 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-transform transform hover:scale-105"
                >
                    <MdRefresh className="inline-block text-xl mr-2" />
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CreateBlog;
