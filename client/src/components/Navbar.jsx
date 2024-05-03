import { Link } from "react-router-dom";

const Navbar = () => {
  const pages = [
    ["Adventure", "/Adventure"],
    ["Monster Closet", "/Closet"],
  ];

  return (
    <nav className="fixed top-12 mt-4 ml-4 flex z-10 space-x-2">
      {/* Buttons for Navbar */}
      {pages.map(([title, url]) => (
        <div key={url}>
          <Link
            to={url}
            className="px-4 py-2 [background:#FB8500] text-white rounded-lg hover:bg-amber-600"
          >
            {title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
