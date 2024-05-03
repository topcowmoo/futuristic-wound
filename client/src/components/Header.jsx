import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import CircleBG from "../assets/circles.svg";

const Header = ({ currentPageProp }) => {
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
    adventure: {
      title: "Adventure Mode",
    },
  };

  const pageTitle = pageHeaders[currentPageProp];

  return (
    <header>
      <div className="w-[375px] h-[100px] shrink-0 [background:#FEAA02] rounded-[0px_0px_30px_30px] fixed">
        <img
          src={CircleBG}
          alt="Circle Background"
          className="-top-[25px] fixed w-[375px] h-[100px] overflow-hidden -z-10"
        />
        <h1 className="text-white text-3xl font-bold mt-14 ml-4">
          {pageTitle ? pageTitle.title : ""}
        </h1>
      </div>
      <div className="w-[375px] h-[110px] shrink-0 [background:#023047] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[0px_0px_30px_30px] fixed -z-10"></div>
    </header>
  );
};

export default Header;
