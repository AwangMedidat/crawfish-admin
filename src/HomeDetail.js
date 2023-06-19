import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards/Cards";
import axios from "axios";

function HomeDetail() {
  const { id } = useParams();
  const [namaKolam, setNamaKolam] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8008/kolamId/${id}`)
      .then((res) => {
        console.log(res, "<<< data kolam by id");
        if (res.data.Status === "Success") {
          setNamaKolam(res.data.data[0].nama_kolam);
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="AppGlass">
      <Sidebar />
      <div className="MainDash">
        {<h1>{`Detail ${namaKolam}`}</h1>}
        <Cards />
      </div>
    </div>
  );
}

export default HomeDetail;
