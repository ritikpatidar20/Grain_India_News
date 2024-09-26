import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../components/helper';

const EditBlog = () => {
    const { id: blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    const [prevImage, setPrevImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${BASE_URL}/api/v1/blog/blogg?id=${blogId}`,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                              'Authorization': `Bearer ${token}`
                      },
                      withCredentials:true
                        }
                  );
                setBlogData(response.data.data);
                setPrevImage(response.data.data.blogImage);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [blogId]);

    const handleEditBlog = async () => {
        const formData = new FormData();
        formData.append('heading', blogData.heading);
        formData.append('detail', blogData.detail);
        formData.append('prevString', prevImage);
        if (blogData.blogImage) {
            formData.append('blogImage', blogData.blogImage);
        }

        try {
            setIsUploading(true);
            const token = localStorage.getItem("accessToken");
            await axios.put(`${BASE_URL}/api/v1/blog/updateBlog?id=${blogId}`, formData, {
               headers: {
                            'Content-Type': 'multipart/form-data',
                              'Authorization': `Bearer ${token}`
                      },
                withCredentials:true,
            });
            toast.success('Blog updated successfully!');
        } catch (error) {
            toast.error('Error editing blog!');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBlogData({ ...blogData, blogImage: file });
        setFilePreview(URL.createObjectURL(file));
    };

    return (
        <div className="max-w-lg mx-auto p-5 bg-white border border-gray-300 rounded-lg shadow">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">Edit Blog</h3>
            {filePreview ? (
                <img src={filePreview} alt="Preview" className="w-[300px] h-[250px] max-w-xs mx-auto mb-4 border border-gray-300 rounded-md" />
            ) : (
                <img src={prevImage} alt="Current" className="w-[300px] h-[250px] max-w-xs mx-auto mb-4 border border-gray-300 rounded-md" />
            )}
            <input
                type="file"
                onChange={handleImageChange}
                className="mb-4 block w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <input
                type="text"
                placeholder="Heading"
                value={blogData.heading || ''}
                onChange={(e) => setBlogData({ ...blogData, heading: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:ring focus:ring-blue-200"
            />
            <textarea
                placeholder="Detail"
                value={blogData.detail || ''}
                onChange={(e) => setBlogData({ ...blogData, detail: e.target.value })}
                rows="8"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:ring focus:ring-blue-200"
            />
            <div className="flex justify-between">
                <Link to="/admin/edit-blog" className="bg-red-500 font-semibold text-gray-100 px-4 py-2 rounded-md hover:bg-red-600 ">
                    Cancel
                </Link>
                <button 
                    onClick={handleEditBlog}
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Edit Blog'}
                </button>
            </div>
        </div>
    );
};

export default EditBlog;
