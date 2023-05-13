import React, { useEffect, useState } from "react";
import "./Cards.css";
import io from "socket.io-client";
import { cardsData } from "../../Data/Data";
import {
  UilUsdSquare,
  UilMoneyWithdrawal,
  UilTemperaturePlus,
  UilFlask,
  UilTear,
} from "@iconscout/react-unicons";
import Card from "../Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
const socket = io.connect("http://localhost:8008");

const Cards = () => {
  const { id } = useParams();
  const [historyTemperature, setHistoryTemperature] = useState([]);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    ph: 0,
    ppm: 0,
    buzzer_state: 0,
  });

  const suhuKondisi = () => {
    if (sensorData.temperature < 24) {
      return "Suhu dibawah batas Normal";
    } else if (sensorData.temperature > 30) {
      return "Suhu diatas batas Normal";
    } else {
      return "Normal";
    }
  };

  const pHKondisi = () => {
    if (sensorData.ph < 6.5) {
      return "Keasaman dibawah batas Normal";
    } else if (sensorData.ph > 8) {
      return "Keasaman diatas batas Normal";
    } else {
      return "Normal";
    }
  };

  const kadarKondisi = () => {
    if (sensorData.ppm < 3) {
      return "Kadar Air dibawah batas Normal";
    } else {
      return "Normal";
    }
  };

  useEffect(() => {
    socket.on("sensor data", (data) => {
      setSensorData(data);
    });

    const obj = {
      temperature: sensorData.temperature,
      ph: sensorData.ph,
      ppm: sensorData.ppm,
      kolam_id: id,
    };

    if (historyTemperature.length > 6) {
      historyTemperature.shift();
    } else {
      setHistoryTemperature([...historyTemperature, sensorData.temperature]);
    }

    axios
      .post("http://localhost:8008/update-sensor", obj)
      .then((res) => {
        console.log(res, "<<< data baca");
        if (res.data.Status === "Success") {
          // window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="Cards">
      {/* {cardsData.map((card, id) => {
        return ( */}
      <div className="parentContainer" key={1}>
        {/* {historyTemperature && historyTemperature.length > 0 ? (
          historyTemperature.map((e) => {
            return <p>{e} !!</p>;
          })
        ) : (
          <></>
        )} */}
        <Card
          title={"Suhu"}
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
          barValue={sensorData.temperature}
          value={suhuKondisi()}
          png={UilTemperaturePlus}
          series={[
            {
              name: "Suhu",
              data: historyTemperature,
            },
          ]}
        />
      </div>
      <div className="parentContainer" key={2}>
        <Card
          title={"Keasaman"}
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
          barValue={sensorData.ph}
          value={pHKondisi()}
          png={UilFlask}
          series={[
            {
              name: "Keasaman",
              data: [10, 100, 50, 70, 80, 30, 40],
            },
          ]}
        />
      </div>
      <div className="parentContainer" key={2}>
        <Card
          title={"Kadar Air"}
          color={{
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          }}
          barValue={sensorData.ppm}
          value={kadarKondisi()}
          png={UilTear}
          series={[
            {
              name: "Expenses",
              data: [10, 25, 15, 30, 12, 15, 20],
            },
          ]}
        />
      </div>
      {/* );
      })} */}
    </div>
  );
};

export default Cards;
