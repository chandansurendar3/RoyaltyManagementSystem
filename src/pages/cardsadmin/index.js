import React from "react";
import "./style.css";
import { admincardsData } from "../../Data/Data";

import Card from "../card";

const Cardsadmin = () => {
  return (
    <div className="Cards">
      {admincardsData.map((admincardsData, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={admincardsData.title}
              color={admincardsData.color}
              barValue={admincardsData.barValue}
              value={admincardsData.value}
              png={admincardsData.png}
              series={admincardsData.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export { Cardsadmin };
