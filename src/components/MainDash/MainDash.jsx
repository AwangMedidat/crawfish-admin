import React from "react";
import Cards from "../Cards/Cards";
import CardsKolam from "../CardsKolam/CardsKolam";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      {/* <Cards /> */}
      <CardsKolam />
      {/* <Table /> */}
    </div>
  );
};

export default MainDash;
