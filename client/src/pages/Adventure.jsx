import { Link } from "react-router-dom";

import Header from "../components/Header";
import AdventureBG from "../assets/adventure-bg.png";

const Adventure = () => {
  const buttons = [
    ["Shop", "/shop"],
    ["Dungeon", "/dungeon"],
  ];

  return (
    <div className="h-full w-full">
      <div className="h-[620px] flex items-center">
        <img
          src={AdventureBG}
          alt="Adventure Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="flex flex-col space-y-24 ml-10 mt-24">
          {buttons.map(([title, url]) => (
            <Link to={url} key={title}>
              <button className="bg-[#FEAA02] text-white text-2xl px-4 py-2 rounded-lg m-2">
                {title}
              </button>
            </Link>
          ))}
          ;
        </div>
      </div>
    </div>
  );
};

export default Adventure;
