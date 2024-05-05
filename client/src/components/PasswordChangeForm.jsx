// PasswordChangeForm.jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../utils/mutations';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassword] = useMutation(CHANGE_PASSWORD);

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
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Current Password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default PasswordChangeForm;
