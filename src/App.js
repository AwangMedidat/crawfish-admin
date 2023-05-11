import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards/Cards";
import Home from "./Home";
import HomeDetail from "./HomeDetail";
import SignUp from "./components/SignUp/SignUp";
const socket = io.connect("http://localhost:8008");

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    ph: 0,
    ppm: 0,
    buzzer_state: 0,
  });

  useEffect(() => {
    socket.on("sensor data", (data) => {
      setSensorData(data);
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        {/* <div className="AppGlass">
          <Sidebar />
          <MainDash /> */}
        {/* <RightSide/> */}
        {/* <div>
          <p>Temperature: {sensorData.temperature}</p>
          <p>pH: {sensorData.ph}</p>
          <p>PPM: {sensorData.ppm}</p>
          <p>Buzzer State: {sensorData.buzzer_state === "14" ? "On" : "Off"}</p>
        </div> */}
        {/* </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<HomeDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
