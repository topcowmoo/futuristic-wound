import { X } from 'lucide-react';
import { useQuery, useMutation } from "@apollo/client";
import { CHANGE_MONSTER } from "../utils/mutations";
import { GET_SAVED_MONSTERS } from "../utils/queries";
import Auth from "../utils/auth";

const MonsterBoxModal = ({ onClose }) => {
   
    const { loading: savedMonstersLoading, data: savedMonstersData } = useQuery(GET_SAVED_MONSTERS);
  
    
    const [changeMonster] = useMutation(CHANGE_MONSTER);



    const handleChangeMonster = async (monsterId) => {

        
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
            return false;
          }

          console.log("Selected Monster ID:");
          console.log(monsterId);
        try {
            // Call the changeMonster mutation with the selected monster's ID
           const response = await changeMonster({ variables: {_id: monsterId } });

            console.log("Mutation response:");
            console.log(response);
             // Refresh the page
            window.location.reload();
            // Close the modal after successfully changing the monster
            // onClose();
        } catch (error) {
            console.error("Error changing monster:", error);
        }
    };

  

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-auto overscroll-auto">
            <div className="mt-10 flex flex-col gap-5 text-amber-700 ">
                <button className="place-self-end" onClick={onClose}><X size={30}/></button>
                {/* Display saved monsters */}
                <div className="flex flex-wrap justify-center">
                    {savedMonstersLoading ? (
                        <p>Loading...</p>
                    ) : (
                        savedMonstersData?.me?.savedMonsters.map((monster) => (
                            <div key={monster._id} className="flex flex-col items-center m-4">
                                <img src={monster.image} alt={monster.name} className="w-36 h-36" /> 
                                <button onClick={() => handleChangeMonster(monster._id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Select</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonsterBoxModal;
