// Importing necessary components and functions from React Router and other files
import { Link } from "react-router-dom";

// Importing icons for the Navbar buttons
import Adventure from "../assets/adventure-icon.svg";
import Closet from "../assets/monster-closet-icon.svg";

// Functional component definition for Navbar
const Navbar = () => {
  // Array containing page titles, URLs, and corresponding icons for Navbar buttons
  const pages = [
    ["Adventure", "/Adventure", Adventure], // Button for Adventure page
    ["Monster Closet", "/Closet", Closet], // Button for Monster Closet page
  ];

  // Rendering component UI
  return (
    <nav className="fixed top-12 mt-4 ml-4 flex z-10 space-x-2">
      {/* Buttons for Navbar */}
      {pages.map(([title, url, icon]) => (
        <div key={url}>
          {/* Link to each page with corresponding icon and title */}
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

// Exporting the Navbar component
export default Navbar;
