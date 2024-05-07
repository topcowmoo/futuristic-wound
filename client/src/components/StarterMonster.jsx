// Importing PropTypes library for type checking
import PropTypes from "prop-types";

// Functional component definition for Monster
const Monster = ({ monster, onMonsterSelect }) => {
  // Rendering component UI
  return (
    <div className="flex flex-col items-center mr-4">
      {/* Display monster image */}
      <img src={monster.image} alt={monster.name} className="w-48 h-48 mb-2" />
      {/* Button to select the monster */}
      <button
        onClick={() => onMonsterSelect(monster._id)} // Call onMonsterSelect function when button is clicked
        className="bg-amber-500 text-white font-bold py-2 px-4 rounded"
      >
        Choose
      </button>
    </div>
  );
};

// PropTypes for type checking and validation
Monster.propTypes = {
  monster: PropTypes.object.isRequired, // Expected prop type: object
  onMonsterSelect: PropTypes.func.isRequired, // Expected prop type: function
};

// Exporting the Monster component
export default Monster;
