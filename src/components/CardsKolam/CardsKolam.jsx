import React from "react";
import "./CardsKolam.css";
import { cardsData, cardsDataKolam } from "../../Data/Data";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import Card from "../Card/Card";
import CardKolam from "../CardKolam/CardKolam";

const CardsKolam = () => {
  return (
    <div className="Cards">
      {cardsDataKolam.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <CardKolam
              id={card.id}
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsKolam;
