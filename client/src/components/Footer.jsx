import Logo from "../assets/baketomo-logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <img
        src={Logo}
        alt="Baketomo Logo"
        className="w-[150px] float-right mr-2"
      />
    </footer>
  );
};

export default Footer;
