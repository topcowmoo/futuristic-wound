
import PropTypes from 'prop-types';

const Monster = ({ monster, onMonsterSelect }) => {
    return (
        <div className="flex flex-col items-center mr-4">
            <img src={monster.image} alt={monster.name} className="w-48 h-48 mb-2" />
            <button onClick={() => onMonsterSelect(monster._id)} className="bg-amber-500 text-white font-bold py-2 px-4 rounded">Choose</button>
        </div>
    );
}

// Monster.propTypes = {
//     monster: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired
//     }).isRequired,
//     onMonsterSelect: PropTypes.func.isRequired
// };

export default Monster;
