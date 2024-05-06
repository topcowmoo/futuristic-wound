import { useQuery } from "@apollo/client";
import { GET_ACTIVE_MONSTER } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_ACTIVE_MONSTER);
  console.log('User data')
  console.log(data)

  if (loading) return <h2>Loading...</h2>;

  const activeMonster = data?.me?.activeMonster;

  return (
    <div className="2xl:container 2xl:mx-auto">
       <div className="h-[625px] 2xl:h-[1250px]">
      <h1 className="text-2xl 2xl:text-4xl">Home</h1>
        <div>
          <div className="flex justify-center items-center mt-48">
            <img src={activeMonster.image} alt={activeMonster.name} className="w-48 h-48 flex justify-center items-center" />
          </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
