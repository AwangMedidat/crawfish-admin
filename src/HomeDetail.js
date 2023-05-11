import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards/Cards";
// const socket = io.connect("http://localhost:8008");

function HomeDetail() {
  const { id } = useParams();
  // const [sensorData, setSensorData] = useState({
  //   temperature: 0,
  //   ph: 0,
  //   ppm: 0,
  //   buzzer_state: 0,
  // });

  // useEffect(() => {
  //   socket.on("sensor data", (data) => {
  //     setSensorData(data);
  //   });
  // }, []);
  return (
    <div className="AppGlass">
      <Sidebar />
      <div className="MainDash">
        {<h1>{`Detail Kolam ${id}`}</h1>}
        <Cards />
      </div>
      {/* <MainDash /> */}
      {/* <RightSide/> */}
      {/* <div>
          <p>Temperature: {sensorData.temperature}</p>
          <p>pH: {sensorData.ph}</p>
          <p>PPM: {sensorData.ppm}</p>
          <p>Buzzer State: {sensorData.buzzer_state === "14" ? "On" : "Off"}</p>
        </div> */}
    </div>
  );
}

export default HomeDetail;
