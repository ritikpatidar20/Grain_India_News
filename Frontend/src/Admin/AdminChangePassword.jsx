import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async () => {
    // Corrected this line to use newPassword instead of password
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      setTimeout(() => setErrorMessage(''), 3000); // Clears the error message after 3 seconds
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      const token = localStorage.getItem("accessToken");
      await axios.post(`${BASE_URL}/api/v1/admin/changePassword`, {
        oldPassword,
        password: newPassword, // Ensure the correct variable is used here
      },
      {headers: {
                    'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`
      }
    }
      
      );
      setSuccessMessage('Password changed successfully.');
      setTimeout(() => setSuccessMessage(''), 3000); // Clears the success message after 3 seconds
    } catch (error) {
      setErrorMessage('Failed to change password.');
      setTimeout(() => setErrorMessage(''), 3000); // Clears the error message after 3 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Current Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <button
        onClick={handleChangePassword}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-150 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Changing...' : 'Change Password'}
      </button>
    </div>
  );
};

export default ChangePassword;
