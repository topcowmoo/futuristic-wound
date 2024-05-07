// Importing necessary components and functions from libraries and files
import { X } from "lucide-react"; // Close icon component
import { useQuery, useMutation } from "@apollo/client"; // Hooks for querying and mutating data with Apollo Client
import { CHANGE_MONSTER } from "../utils/mutations"; // Mutation for changing monster
import { GET_SAVED_MONSTERS } from "../utils/queries"; // Query for getting saved monsters
import Auth from "../utils/auth"; // Authentication utility

// Functional component definition
const MonsterBoxModal = ({ onClose }) => {
  // Querying saved monsters data
  const { loading: savedMonstersLoading, data: savedMonstersData } = useQuery(GET_SAVED_MONSTERS);

  // Mutation for changing monster
  const [changeMonster] = useMutation(CHANGE_MONSTER);

  // Function to handle changing monster
  const handleChangeMonster = async (monsterId) => {
    // Get authentication token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If user is not authenticated, return false
    if (!token) {
      return false;
    }

    try {
      // Call the changeMonster mutation with the selected monster's ID
      const response = await changeMonster({ variables: { _id: monsterId } });
      // Refresh the page to reflect changes
      window.location.reload();
      // Close the modal after successfully changing the monster
      // onClose();
    } catch (error) {
      console.error("Error changing monster:", error);
    }
  };

  // Rendering component UI
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-scroll overscroll-auto">
      <div className="mt-10 flex flex-col gap-5 text-amber-700">
        {/* Display saved monsters */}
        <div className="flex flex-wrap justify-center">
          {/* Show loading message while data is being fetched */}
          {savedMonstersLoading ? (
            <p>Loading...</p>
          ) : (
            // Map through saved monsters data and display each monster
            savedMonstersData?.me?.savedMonsters.map((monster) => (
              <div key={monster._id} className="flex flex-col items-center m-4">
                {/* Display monster image */}
                <img
                  src={monster.image}
                  alt={monster.name}
                  className="w-36 h-36"
                />
                {/* Button to select the monster */}
                <button
                  onClick={() => handleChangeMonster(monster._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  Select
                </button>
              </div>
            ))
          )}
          {/* Button to close the modal */}
          <button className="mx-auto" onClick={onClose}>
            <X size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default MonsterBoxModal;
