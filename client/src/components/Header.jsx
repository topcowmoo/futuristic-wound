import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const Header = ({ currentPage }) => {
  console.log(currentPage);
  // const [pageTitle, setPageTitle] = useState("");
  const pageHeaders = {
    closet: {
      title: "Monster Closet",
    },
    dungeon: {
      title: "Dungeon Mode",
    },
    shop: {
      title: "Shop",
    },
    starter: {
      title: "Select Your Starter",
    },
    homes: {
      title: "Baketomo",
    },
    adventures: {
      title: "Adventure Mode",
    },
  };

  // useEffect(() => {
  //   console.log({ currentPage });
  //   setPageTitle(pageHeaders[currentPage]);
  // }, [currentPage]);
  const pageTitle = pageHeaders[currentPage];

  return (
    <header>
      <div className="w-[375px] h-[100px] shrink-0 [background:#FEAA02] rounded-[0px_0px_30px_30px] fixed">
        <h1>{pageTitle ? pageTitle.title : "Default Title"}</h1>
        <Link to="/homes">Home</Link>
        <Link to="/adventures">Adventures</Link>
        <Link to="/closet">Closet</Link>
      </div>
      <div className="w-[375px] h-[110px] shrink-0 [background:#023047] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[0px_0px_30px_30px] fixed -z-10"></div>
    </header>
  );
};

export default Header;
