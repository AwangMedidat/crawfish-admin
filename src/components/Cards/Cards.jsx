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
import { Table } from "antd";
const socket = io.connect("http://localhost:8008");

const Cards = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    ph: 0,
    ppm: 0,
    buzzer_state: 0,
  });

  const suhuKondisi = () => {
    if (sensorData.temperature < 24) {
      return "Suhu dibawah batas normal";
    } else if (sensorData.temperature > 30) {
      return "Suhu diatas batas normal";
    } else {
      return "Normal";
    }
  };

  const pHKondisi = () => {
    if (sensorData.ph < 6.5) {
      return "Keasaman dibawah batas normal";
    } else if (sensorData.ph > 8) {
      return "Keasaman diatas batas normal";
    } else {
      return "Normal";
    }
  };

  const kadarKondisi = () => {
    if (sensorData.ppm < 3) {
      return "Kadar Air dibawah batas normal";
    } else {
      return "Normal";
    }
  };

  const convertToGoodDate = (dateSensor) => {
    const date = new Date(dateSensor);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDate = date.toLocaleString("id-ID", options);
    return formattedDate;
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Suhu",
      dataIndex: "suhu",
      key: "suhu",
    },
    {
      title: "Keasaman",
      dataIndex: "ph",
      key: "ph",
    },
    {
      title: "Kadar Air",
      dataIndex: "ppm",
      key: "ppm",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
  ];

  useEffect(() => {
    socket.on("sensor data", (data) => {
      setSensorData(data);

      const obj = {
        temperature: data.temperature,
        ph: data.ph,
        ppm: data.ppm,
        kolam_id: id,
      };

      axios
        .post("http://localhost:8008/post-sensor", obj)
        .then((res) => {
          if (res.data.Status === "Success Post Sensor") {
          } else {
            alert("Error");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });

    axios
      .get(`http://localhost:8008/history/${id}`)
      .then((res) => {
        console.log(res, "<<< data baca history");
        if (res.data.Status === "Success") {
          let historyArr = res.data.data.map((e, i) => {
            return {
              key: i + 1,
              no: i + 1,
              suhu: e.temperature,
              ph: e.ph,
              ppm: e.ppm,
              tanggal: convertToGoodDate(e.created_at),
            };
          });
          setHistory(historyArr);
        } else {
          // alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  return (
    <div className="Cards">
      <div className="parentContainer" key={1}>
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
              data: [10, 100, 50, 70, 80, 30, 40],
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
      <Table dataSource={history} columns={columns} />
    </div>
  );
};

export default Cards;
