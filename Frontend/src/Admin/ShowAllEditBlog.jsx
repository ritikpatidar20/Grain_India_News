import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../components/helper';

const ShowAllEditBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token=localStorage.getItem("accessToken");
                const response = await axios.get(`${BASE_URL}/api/v1/blog`,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                          'Authorization': `Bearer ${token}`
                  },
                       
                    withCredentials: true,
                  });
                const blogsArray = Array.isArray(response.data.data.data) ? response.data.data.data : [response.data.data.data];
                setBlogs(blogsArray);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            const token=localStorage.getItem("accessToken");
            await axios.delete(`${BASE_URL}/api/v1/blog/deleteBlog?id=${blogId}`,{
                headers: {
                            'Content-Type': 'multipart/form-data',
                              'Authorization': `Bearer ${token}`
                      },
                withCredentials:true,
            });
            setBlogs(blogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handlePreviewClick = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="p-4">
            <h1 className='text-center text-3xl font-bold mb-4 '>All Edit Blogs</h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                            <img
                                src={blog.blogImage}
                                alt={blog.heading}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.heading}</h3>
                                <p className="text-gray-600 h-20 overflow-hidden mb-5">{blog.detail.slice(0, 100)}...</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handlePreviewClick(blog)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    >
                                        Preview Details
                                    </button>
                                    <Link to={`/admin/edit-blog/${blog._id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300">
                                        Edit
                                    </Link>
                                    <button
                                    style={{backgroundColor: 'red'}}
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No blogs available.</p>
            )}

            {/* Modal for full blog details */}
            {isModalOpen && selectedBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-10/12 md:w-2/3 lg:w-3/5 xl:w-2/3 h-auto overflow-y-auto">
                        <img
                            src={selectedBlog.blogImage}
                            alt={selectedBlog.heading}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">{selectedBlog.heading}</h2>
                        <h4 className="text-lg font-semibold text-gray-600 mb-4">By: {selectedBlog.author || 'GrainIndia News @ Vinod Raghav'}</h4>
                        <p className="text-gray-600">{selectedBlog.detail}</p>
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none text-3xl font-bold w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md transition duration-300 hover:bg-gray-100"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAllEditBlog;
