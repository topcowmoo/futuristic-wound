// Importing necessary hooks and components from React and other libraries
import { useState } from "react";
import PasswordChangeForm from "../components/PasswordChangeForm";
import { useQuery } from "@apollo/client";
import { GET_ACTIVE_MONSTER } from "../utils/queries";
import MonsterBoxModal from "../components/MonsterBoxModal";
import MyRoom from "../assets/my-room-bg.png";

// Functional component definition
const Closet = () => {
  // Querying for active monster data
  const { loading, data } = useQuery(GET_ACTIVE_MONSTER, {
    pollInterval: 100, // Polling interval set to 100 milliseconds
  });

  // State hook to manage the visibility of the password change form modal
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Function to toggle the visibility of the password change form modal
  const toggleChangePassword = () => {
    setIsChangePasswordOpen((prev) => !prev);
  };

  // Function to close the password change form modal
  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  // State hook to manage the visibility of the monster box modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If data is still loading, display a loading message
  if (loading) return <h2>Loading...</h2>;

  // Extracting active monster data from the query result
  const activeMonster = data?.me?.activeMonster;

  // Function to toggle the visibility of the monster box modal
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // Function to close the monster box modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Rendering component UI
  return (
    <div className="relative flex flex-col items-center justify-center h-[620px] py-2">
      <div className="h-[620px] flex items-center flex-col">
        {/* Background image */}
        <img
          src={MyRoom}
          alt="Home Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        {/* Displaying the active monster image */}
        <div className="flex justify-center items-center mt-60">
          <img
            src={activeMonster.image}
            alt={activeMonster.name}
            className="w-48 h-48 flex justify-center items-center"
          />
        </div>
        {/* Button to open monster box modal */}
        <button
          className="absolute top-36 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-amber-600"
          onClick={toggleModal}
        >
          Monster Box
        </button>
        {/* Render MonsterBoxModal component conditionally based on modal visibility state */}
        {isModalOpen && <MonsterBoxModal onClose={handleCloseModal} />}

        <div className="flex flex-col items-end space-y-8 mt-20">
          <div className="flex flex-col space-y-4">
            {/* Button to open password change form modal */}
            <button
              className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-amber-600"
              onClick={toggleChangePassword}
            >
              Change Password
            </button>
            {/* Render PasswordChangeForm conditionally based on state */}
            {isChangePasswordOpen && (
              <PasswordChangeForm onClose={handleCloseChangePassword} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default Closet;
