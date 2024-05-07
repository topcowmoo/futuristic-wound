// Importing necessary hooks and components from React and Apollo Client
import { useState } from "react";
import { X } from "lucide-react"; // Close icon
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../utils/mutations"; // Mutation for changing password

// Functional component definition for PasswordChangeForm
const PasswordChangeForm = ({ onClose }) => {
  // State variables to store current and new passwords, and success message
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the changePassword mutation with current and new passwords
      const { data } = await changePassword({
        variables: {
          currentPassword,
          newPassword,
        },
      });
      // Reset the input boxes
      setCurrentPassword("");
      setNewPassword("");
      // Set the success message
      setSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // Rendering component UI
  return (
    <div>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-auto overscroll-auto">
        {/* Password change form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Input for current password */}
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          {/* Input for new password */}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          {/* Button to confirm password change */}
          <button
            type="submit"
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-amber-600"
          >
            Confirm
          </button>
          {/* Display success message if password change is successful */}
          {successMessage && (
            <p className="text-green-500 bg-slate-900 bg-opacity-60 p-2 rounded-lg">
              {successMessage}
            </p>
          )}
          {/* Button to close the modal */}
          <button
            className="mx-auto bg-white bg-opacity-20 rounded-full p-2"
            onClick={onClose}
          >
            <X size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Exporting the component
export default PasswordChangeForm;
