import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MdCloudUpload, MdCheckCircle, MdError, MdDelete } from 'react-icons/md';
import { BASE_URL } from '../components/helper';
const AddImage = () => {
    const [imageData, setImageData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleAddImage = async () => {
        if (!imageData) {
            toast.error('Image is required');
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(imageData.type)) {
            toast.error('Only .jpg, .jpeg, .webp and .png files are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('cImage', imageData);

        setIsUploading(true);

        

        try {
            const token = localStorage.getItem("accessToken");
            console.log(token);
            await axios.post(`${BASE_URL}/api/v1/crousel/addCrousel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`
              },
                
                withCredentials: true,
            });
            toast.success('Image added successfully!');
            clearForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error uploading image');
            console.error('Error adding image:', error);
        }
        setIsUploading(false);
    };

    const clearForm = () => {
        setImageData(null);
    };

    return (
        <div className='flex justify-center items-center min-h-[90%] bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
                <h2 className='text-3xl font-semibold mb-6 text-gray-700 flex items-center'>
                    <MdCloudUpload className='mr-2 text-blue-600' /> Add Image
                </h2>
                <div className="relative mb-6">
                    <input
                        type="file"
                        onChange={(e) => setImageData(e.target.files[0])}
                        className='block w-full text-gray-700 bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                    {imageData && (
                        <div className="flex items-center mt-2">
                            <MdCheckCircle className='text-green-500 text-xl mr-2' />
                            <span className="text-gray-700">{imageData.name}</span>
                            <MdDelete
                                onClick={clearForm}
                                className='ml-auto text-red-500 text-2xl cursor-pointer hover:text-red-700'
                            />
                        </div>
                    )}
                </div>
                <button
                    onClick={handleAddImage}
                    disabled={isUploading}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white text-lg font-semibold transition duration-300
                        ${imageData ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                        ${isUploading ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                >
                    {isUploading ? (
                        <span>Uploading...</span>
                    ) : (
                        <>
                            <MdCloudUpload className='mr-2 text-2xl' />
                            {imageData ? 'Upload Image' : 'Choose a file first'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddImage;
