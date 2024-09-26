import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MdDelete, MdPreview, MdClose } from 'react-icons/md';
import { BASE_URL } from '../components/helper';

const ShowAllCarousel = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/crousel`,{
                    
                        headers:{
                          'Accept': 'application/json, text/plain, */*'
                        },
                });
                const blogsArray = Array.isArray(response.data.data.data) ? response.data.data.data : [response.data.data.data];
                setImages(blogsArray); // Adjust according to your API structure
            } catch (error) {
                toast.error('Error fetching images');
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

   

    const handlePreviewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="p-5">
            <h3 className="text-3xl  text-gray-900 font-bold mb-6 text-center">All Carousel Images</h3>
            {images.length === 0 ? (
                <p className="text-gray-500 text-center">No images found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map(image => (
                        <div key={image._id} className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow transform  p-4">
                            <img src={image.cImage} alt={image.name} className="w-full h-48 object-contain bg-gray-100 rounded-md mb-4" />
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">{image.name}</h4>
                            <div className=" flex justify-center items-center">
                            <button
                                    onClick={() => handlePreviewImage(image.cImage)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center w-full"
                                >
                                    <MdPreview className="mr-2 text-xl" />
                                    Preview
                                </button>
                               
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                        <MdClose
                            className="text-2xl text-gray-600 absolute top-2 right-2 cursor-pointer hover:text-gray-800"
                            onClick={closeModal}
                        />
                        <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};





export default ShowAllCarousel
