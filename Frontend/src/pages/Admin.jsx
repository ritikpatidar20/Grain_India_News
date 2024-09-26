import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineLogout } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {useAuth} from '../AuthContext'
import { BASE_URL } from '../components/helper';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return null;
};

const Admin = () => {
    const navigate = useNavigate();
    const {logout}=useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    // const handleLogoutConfirm = async() => {




        
    //         // Implement logout logic
    
    //         try {
    //             await axios.get(`${BASE_URL}/api/v1/admin/logout`,{
                    
    //                     headers:{
    //                       'Accept': 'application/json, text/plain, */*'
    //                     },
    //                 withCredentials: true
    //               });
    //              logout();
    //              setShowModal(false);
    //             toast.success('Logged out successfully!');
    //             navigate('/'); // Redirects to the home or login page
    //         } catch (error) {
    //             console.error('Error ...:', error);
    //         }
            
        
    // };
    const handleLogoutConfirm = async () => {
        try {
            // Make a request to the backend to handle logout
            const token = localStorage.getItem("accessToken");
            console.log(token);
            await axios.post(`${BASE_URL}/api/v1/admin/logout`,{"mssage":"hello"}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`
              },
                withCredentials: true // Include credentials if required by backend
            });
    
            // Clear tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            logout();
                         setShowModal(false);
            //             toast.success('Logged out successfully!');
            //             navigate('/'); // Redirects to the home or login page
            // Redirect or update the UI to reflect the logged-out state
            navigate('/login');
            toast.success('Logout successful!');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out. Please try again.');
        }
    };
    

    const handleLogoutCancel = () => {
        setShowModal(false);
        toast.error('Logout cancelled');
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col">
                <header className="bg-gray-800 text-white p-4 shadow-md">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </header>

                <div className="flex gap-4">
                    <nav className="w-64 bg-gray-900 text-gray-200 p-4 flex flex-col min-h-[92vh]">
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiFillHome />
                                <Link to="/admin" className="flex-1">Home</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlinePlus />
                                <Link to="/admin/add-image" className="flex-1">Add Carousel Image</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlineDelete />
                                <Link to="/admin/remove-image" className="flex-1">Remove Carousel Image</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <FaImage />
                                <Link to="/admin/all-image" className="flex-1">All Carousel Images</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlinePlus />
                                <Link to="/admin/create-blog" className="flex-1">Create Blog</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <FaImage />
                                <Link to="/admin/all-blog" className="flex-1">All Blogs</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlineEdit />
                                <Link to="/admin/edit-blog" className="flex-1">Edit Blog</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlineLogout />
                                <Link to="/admin/changePassword" className="flex-1">ChangePassword</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                                <AiOutlineLogout />
                                <button onClick={handleLogoutClick} className="flex-1 text-left">Logout</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex-1 p-6">
                        <Outlet /> {/* Renders nested route components */}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleLogoutCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
