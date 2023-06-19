import "./App.css";
import { useEffect, useState } from "react";

import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignIn from "./components/SignIn/SignIn";

function Home() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8008/`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          navigate("/");
        } else {
          setAuth(false);
          navigate("/signin");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      {auth ? (
        <div className="AppGlass">
          <Sidebar />
          <MainDash />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default Home;
