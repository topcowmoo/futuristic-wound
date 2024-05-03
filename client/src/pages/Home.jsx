import { useQuery } from "@apollo/client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeBG from "../assets/my-room-bg.png";
import { GET_ACTIVE_MONSTER } from "../utils/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ACTIVE_MONSTER);

  if (loading) return <p>Loading...</p>;

  const activeMonster = data.me.activeMonster;


  return (
    <div>
      <h2>Home</h2>
      <p>Name: {activeMonster.name}</p>
      <img src={activeMonster.image} alt={activeMonster.name} />
    </div>
  );
};

export default Home;
