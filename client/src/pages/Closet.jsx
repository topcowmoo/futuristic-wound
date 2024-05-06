import { useState } from "react";
import PasswordChangeForm from "../components/PasswordChangeForm";

import { from, useQuery } from "@apollo/client";
import { GET_ACTIVE_MONSTER } from "../utils/queries";

import MonsterBoxModal from "../components/MonsterBoxModal";
import MyRoom from "../assets/my-room-bg.png";

const Closet = () => {
  const { loading, data } = useQuery(GET_ACTIVE_MONSTER, {
    pollInterval:100
  });

  console.log("User data:");
 
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const toggleChangePassword = () => {
    setIsChangePasswordOpen((prev) => !prev);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  // State to track the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <h2>Loading...</h2>;

  // Variable to hold the users active monster data
  const activeMonster = data?.me?.activeMonster;
  console.log(activeMonster);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[620px] py-2">
      <div className="h-[620px] flex items-center flex-col">
        <img
          src={MyRoom}
          alt="Home Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="flex justify-center items-center mt-60">
          <img
            src={activeMonster.image}
            alt={activeMonster.name}
            className="w-48 h-48 flex justify-center items-center"
          />
        </div>
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

export default Closet;
