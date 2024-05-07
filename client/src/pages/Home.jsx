import { useQuery } from "@apollo/client"; // Importing useQuery hook from Apollo Client
import { GET_ACTIVE_MONSTER } from "../utils/queries"; // Importing GET_ACTIVE_MONSTER query

import HomeBG from "../assets/my-room-bg.png"; // Importing Home Background image

const Home = () => {
  const { loading, data } = useQuery(GET_ACTIVE_MONSTER); // Using useQuery hook to fetch data

  if (loading) return <h2>Loading...</h2>; // Render loading message while data is being fetched

  const activeMonster = data?.me?.activeMonster; // Extracting active monster data from fetched data

  // Render Home component
  return (
    <div>
      <div className="h-full w-full">
        <div className="h-[620px] flex items-center">
          <img
            src={HomeBG}
            alt="Home Background"
            className="fixed w-full h-full object-cover overflow-hidden -z-50"
          />
          <div className="flex justify-center items-center mt-80 mx-auto ">
            <img
              src={activeMonster.image}
              alt={activeMonster.name}
              className="w-80 h-80 flex justify-center items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; // Exporting Home component
