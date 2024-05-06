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
      <div className="h-[620px] 2xl:h-[1240px] flex items-center">
        <img
          src={AdventureBG}
          alt="Adventure Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="flex flex-col space-y-24 2xl:space-y-48 ml-10 2xl:ml-20 mt-24 2xl:mt-48">
          {buttons.map(([title, url]) => (
            <Link to={url} key={title}>
              <button className="bg-[#FEAA02] text-white text-2xl 2xl:text-4xl px-4 2xl:px-8 py-2 2xl:py-4 rounded-lg m-2 2xl:m-4">
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
