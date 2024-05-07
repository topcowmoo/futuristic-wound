import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_MONSTERS } from "../utils/queries";
import { INITIALIZE_MONSTER } from "../utils/mutations";

import Monster from "../components/StarterMonster";
import Auth from "../utils/auth";
import StarterBG from "../assets/starter-bg.png";

import { useNavigate } from "react-router-dom";

const Starterselect = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_MONSTERS);

  const [selectedMonsters, setSelectedMonsters] = useState([]);

  const [initMonster] = useMutation(INITIALIZE_MONSTER);

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
      const allMonsters = data.allMonsters;

      const shuffledMonsters = shuffleArray([...allMonsters]);

      const selectedMonsters = shuffledMonsters.slice(0, 3);
      setSelectedMonsters(selectedMonsters);
    }
  }, [loading, error, data]);

  // Function to handle monster selection
  const handleMonsterSelection = async (monsterId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {

      const { data } = await initMonster({
        variables: { _id: monsterId },
      });
      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-full w-full">
      <div className="h-[620px] flex items-center">
        <img
          src={StarterBG}
          alt="Starter Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="flex justify-center mt-8">
          {selectedMonsters.map((monster) => (
            <Monster
              key={monster._id}
              monster={monster}
              onMonsterSelect={handleMonsterSelection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Starterselect;
