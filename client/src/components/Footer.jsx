// Importing necessary components and assets from React and other files
import { Link } from "react-router-dom";
import Auth from "../utils/auth"; // Importing authentication utility
import Logo from "../assets/baketomo-logo.svg"; // Importing logo
import homeBtn from "../assets/home-icon.svg"; // Importing home button icon
import logoutBtn from "../assets/logout-icon.svg"; // Importing logout button icon

// Functional component definition
const Footer = () => {
  // Rendering component UI
  return (
    <footer className="footer bg-white py-2 flex justify-between items-center">
      {/* Navigation links */}
      <div className="flex space-x-4">
        {/* Link to home page */}
        <Link to="/home" className="ml-4">
          <img src={homeBtn} alt="Home Button" className="w-[20px]" />
        </Link>
        {/* Logout button */}
        <Link onClick={Auth.logout}>
          <img src={logoutBtn} alt="Logout Button" className="w-[20px]" />
        </Link>
      </div>
      {/* Logo */}
      <img
        src={Logo}
        alt="Baketomo Logo"
        className="w-[150px] float-right mr-2"
      />
    </footer>
  );
};

// Exporting the component
export default Footer;
