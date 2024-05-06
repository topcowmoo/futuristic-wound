import { Link } from "react-router-dom";

import Adventure from "../assets/adventure-icon.svg";
import Closet from "../assets/monster-closet-icon.svg";

const Navbar = () => {
  const pages = [
    ["Adventure", "/Adventure", Adventure],
    ["Monster Closet", "/Closet", Closet],
  ];

  return (
    <nav className="fixed top-12 mt-4 ml-4 flex z-10 space-x-2">
      {/* Buttons for Navbar */}
      {pages.map(([title, url, icon]) => (
        <div key={url}>
          <Link
            to={url}
            className="px-4 py-2 [background:#FB8500] text-white rounded-lg hover:bg-amber-600"
          >
            <img src={icon} alt={title} className="w-6 h-6 inline mr-2" />
            {title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
