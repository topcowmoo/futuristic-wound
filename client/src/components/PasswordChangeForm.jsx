// PasswordChangeForm.jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../utils/mutations';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await changePassword({
        variables: {
          currentPassword,
          newPassword,
        },
      });
      console.log(data); 
      // Reset the input boxes 
      setCurrentPassword('');
      setNewPassword('');
       // Set the success message
      setSuccessMessage('Password changed successfully!');
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button 
          type="submit" 
          className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-amber-600"
        >
          Confirm 
        </button>
      </form>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
    </div>
  );
};

export default PasswordChangeForm;
