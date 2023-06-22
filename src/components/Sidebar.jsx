import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import LogoLobster from "../imgs/lobster-logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import axios from "axios";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  // console.log(window.innerWidth);

  const handleLogout = () => {
    axios
      .get("http://localhost:8008/logout")
      .then((res) => {
        // location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={LogoLobster} alt="logo" />
          <span>
            Craw<span>fish</span>
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <a href="/signin" onClick={handleLogout}>
              <UilSignOutAlt />
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
