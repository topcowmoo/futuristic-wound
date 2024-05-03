import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_MONSTERS } from '../utils/queries';
import { INITIALIZE_MONSTER } from '../utils/mutations';
import Monster from '../components/StarterMonster';
import Auth from "../utils/auth";

const Starterselect = () => {
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
        console.log(token)

        if (!token) {
            return false;
        }
        try {
            console.log(monsterId);
            const { data } = await initMonster({
                variables: { _id: monsterId }
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Choose Your Starter Monster</h1>
            <div className="flex justify-center mt-8">
                {selectedMonsters.map(monster => (
                    <Monster key={monster._id} monster={monster} onMonsterSelect={handleMonsterSelection} />
                ))}
            </div>
        </div>
    );
}

export default Starterselect;
