import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

import Logo from "../assets/baketomo-logo.svg";
import homeBtn from "../assets/home-icon.svg";
import logoutBtn from "../assets/logout-icon.svg";

const Footer = () => {
  const currentPages = useLocation().pathname;

  return (
    <footer className="footer flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/home" className="ml-4">
          <img src={homeBtn} alt="Home Button" className="w-[20px]" />
        </Link>
        <Link onClick={Auth.logout}>
          <img src={logoutBtn} alt="Logout Button" className="w-[20px]" />
        </Link>
      </div>
      <img
        src={Logo}
        alt="Baketomo Logo"
        className="w-[150px] float-right mr-2"
      />
    </footer>
  );
};

export default Footer;
