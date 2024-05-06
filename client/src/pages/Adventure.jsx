import { Link } from "react-router-dom";

import Header from "../components/Header";
import AdventureBG from "../assets/adventure-bg.png";
import Shop from "../assets/shop-icon.svg";
import Dungeon from "../assets/cave-icon.svg";

const Adventure = () => {
  const buttons = [
    ["Shop", "/shop", Shop],
    ["Dungeon", "/dungeon", Dungeon],
  ];

  return (
    <div className="h-full w-full">
      <div className="h-[620px] 2xl:h-[1240px] flex items-center">
        <img
          src={AdventureBG}
          alt="Adventure Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="flex flex-row justify-center items-center space-x-24 mx-auto mt-80">
          {buttons.map(([title, url, icon]) => (
            <Link to={url} key={title}>
              <div className="flex flex-col justify-center items-center ">
                <h6 className="text-white font-bold text-xl bg-amber-500 p-2 rounded-xl shadow-lg">
                  {title}
                </h6>
                <img
                  src={icon}
                  alt={title}
                  className="btn ml-2 w-[150px] shadow-xl"
                />
              </div>
            </Link>
          ))}
          ;
        </div>
      </div>
    </div>
  );
};

export default Adventure;
