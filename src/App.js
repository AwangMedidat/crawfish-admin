import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
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
    <div className="App">
      <div>
        <p>Temperature: {sensorData.temperature}</p>
        <p>pH: {sensorData.ph}</p>
        <p>PPM: {sensorData.ppm}</p>
        <p>Buzzer State: {sensorData.buzzer_state === "14" ? "On" : "Off"}</p>
      </div>
    </div>
  );
}

export default App;
