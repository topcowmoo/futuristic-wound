import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { useQuery, useMutation } from "@apollo/client"; // Importing useQuery and useMutation hooks from Apollo Client

import { GET_ALL_MONSTERS } from "../utils/queries"; // Importing GraphQL query for retrieving all monsters
import { INITIALIZE_MONSTER } from "../utils/mutations"; // Importing GraphQL mutation for initializing a monster

import Monster from "../components/StarterMonster"; // Importing Monster component
import Auth from "../utils/auth"; // Importing authentication utility
import StarterBG from "../assets/starter-bg.png"; // Importing Starter Background image

import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

const Starterselect = () => {
  const navigate = useNavigate(); // Getting navigate function from useNavigate hook

  const { loading, error, data } = useQuery(GET_ALL_MONSTERS); // Using useQuery hook to fetch all monsters

  const [selectedMonsters, setSelectedMonsters] = useState([]); // State to store selected monsters

  const [initMonster] = useMutation(INITIALIZE_MONSTER); // Using useMutation hook for initializing a monster

  // Function to shuffle array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // useEffect to run once when component mounts
  useEffect(() => {
    if (!loading && !error && data) {
      const allMonsters = data.allMonsters; // Get all monsters from GraphQL response

      const shuffledMonsters = shuffleArray([...allMonsters]); // Shuffle the array of monsters

      const selectedMonsters = shuffledMonsters.slice(0, 3); // Select first three monsters
      setSelectedMonsters(selectedMonsters); // Update selectedMonsters state
    }
  }, [loading, error, data]);

  // Function to handle monster selection
  const handleMonsterSelection = async (monsterId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null; // Get token from local storage

    if (!token) {
      return false; // Return false if token is not available
    }
    try {
      // Initialize the selected monster on the server
      const { data } = await initMonster({
        variables: { _id: monsterId },
      });

      navigate("/Home"); // Navigate to Home page after monster selection
    } catch (error) {
      console.error(error); // Log error if there's an issue
    }
  };

  // Render Starterselect component
  return (
    <div className="h-full w-full">
      {" "}
      {/* Full-width and full-height container */}
      <div className="h-[620px] flex items-center">
        {" "}
        {/* Flex container */}
        <img
          src={StarterBG}
          alt="Starter Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50" // Styling for background image
        />
        <div className="flex justify-center mt-8">
          {" "}
          {/* Flex container for monster selection */}
          {selectedMonsters.map((monster) => (
            <Monster
              key={monster._id}
              monster={monster}
              onMonsterSelect={handleMonsterSelection} // Pass handleMonsterSelection function as prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Starterselect; // Exporting Starterselect component
