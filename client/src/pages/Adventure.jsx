// Importing necessary components and assets from React and other files
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AdventureBG from "../assets/adventure-bg.png";
import Shop from "../assets/shop-icon.svg";
import Dungeon from "../assets/cave-icon.svg";

// Functional component definition
const Adventure = () => {
  // Array containing button information for the adventure screen
  const buttons = [
    ["Shop", "/shop", Shop], // Button for accessing the shop
    ["Dungeon", "/dungeon", Dungeon], // Button for accessing the dungeon
  ];

  // Rendering component UI
  return (
    <div className="h-full w-full">
      {/* Displaying adventure background */}
      <div className="h-[620px] flex items-center">
        <img
          src={AdventureBG}
          alt="Adventure Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        {/* Displaying buttons for accessing different sections */}
        <div className="flex flex-row justify-center items-center space-x-24 mx-auto mt-80">
          {buttons.map(([title, url, icon]) => (
            // Linking each button to its respective section
            <Link to={url} key={title}>
              <div className="flex flex-col justify-center items-center ">
                {/* Displaying button title */}
                <h6 className="text-white font-bold text-xl bg-amber-500 p-2 rounded-xl shadow-lg">
                  {title}
                </h6>
                {/* Displaying button icon */}
                <img
                  src={icon}
                  alt={title}
                  className="btn ml-2 w-[150px] shadow-xl"
                />
              </div>
            </Link>
          ))}
          {/* Extra semicolon after map function */}
          ;
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default Adventure;
