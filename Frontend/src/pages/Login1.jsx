import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  {useAuth } from '../AuthContext';
 import { BASE_URL } from '../components/helper';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const { username, password } = formData;

    if (!username || !password) {
        setErrorMessage('Both fields are required.');
        setTimeout(() => setErrorMessage(''), 3000);
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/admin/login`, {
            username,
            password,
        }, {
            headers: {
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const { accessToken, refreshToken, user } = response.data;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        login(); // Custom function to set user session if needed
        toast.success('Login successful!');
        navigate('/admin'); // Navigate to the /admin route on successful login
    } catch (error) {
        setErrorMessage('Invalid username/email or password.');
        setTimeout(() => setErrorMessage(''), 3000);
    } finally {
        setIsSubmitting(false);
    }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setErrorMessage('');

  //   const { username, password } = formData;

  //   if (!username || !password) {
  //     setErrorMessage('Both fields are required.');
  //     setTimeout(() => setErrorMessage(''), 3000);
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/v1/admin/login`, {
  //       username,
  //       password,
  //     }, {
  //       headers:{
  //         'Accept': 'application/json, text/plain, */*'
  //       },
  //       withCredentials: true, 
  //     });
  //     login();
  //     toast.success('Login successful!');
  //     navigate('/admin'); // Navigate to the /admin route on successful login
  //   } catch (error) {
  //     setErrorMessage('Invalid username/email or password.');
  //     setTimeout(() => setErrorMessage(''), 3000);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Admin Login</h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="flex items-center border rounded shadow-sm">
              <span className="px-3 text-gray-500">
                <FaUser />
              </span>
              <input
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded shadow-sm">
              <span className="px-3 text-gray-500">
                <FaLock />
              </span>
              <input
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                disabled={isSubmitting}
              />
              <span
                className="px-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
