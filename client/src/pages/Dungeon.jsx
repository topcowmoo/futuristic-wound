import DungeonBG from "../assets/dungeon-bg.png";

const Dungeon = () => {
  return (
    <div className="w-full h-full">
      <div className="h-[625px]">
        <img
          src={DungeonBG}
          alt="Dungeon Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="monsters w-[300px] h-[200px]"></div>
        <div className="rps w-[300px] h-[200px]"></div>
      </div>
    </div>
  );
};
export default Dungeon;
