import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
// const socket = io.connect("http://localhost:8008");

function Home() {
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
      <MainDash />
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

export default Home;
