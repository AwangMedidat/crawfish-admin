import React, { useState, useEffect } from "react";
import "./CardsKolam.css";
import { cardsData, cardsDataKolam } from "../../Data/Data";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import Card from "../Card/Card";
import CardKolam from "../CardKolam/CardKolam";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardsKolam = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [dataKolam, setDataKolam] = useState();
  const [namaKolam, setNamaKolam] = useState();
  const [jumlahLobster, setJumlahLobster] = useState();

  axios.defaults.withCredentials = true;

  const handleSubmitKolam = (e) => {
    console.log("test");
    e.preventDefault();
    // console.log("username ", username);
    // console.log("email ", email);
    // console.log("password ", password);
    // // console.log("Banyak Kolam ", banyakKolam);

    const obj = {
      nama_kolam: namaKolam,
      jumlah_lobster: +jumlahLobster,
      user_id: id,
    };

    axios
      .post("http://localhost:8008/add-kolam", obj)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8008/")
      .then((res) => {
        // console.log(res);
        if (res.data.Status === "Success") {
          setAuth(true);
          setId(res.data.data.id);
          // navigate("/");
          axios
            .get(`http://localhost:8008/kolam/${res.data.data.id}`)
            .then((res) => {
              console.log(res, "<<< data kolam");
              if (res.data.Status === "Success") {
                setDataKolam(res.data.data);
              } else {
                alert("Error");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setAuth(false);
          // navigate("/signin");
          setMessage(res.data.Error);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="Cards">
      <div className="btnTambah">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Tambah kolam
        </button>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Form Tambah Kolam
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Nama Kolam</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Kolam 1"
                    onChange={(e) => setNamaKolam(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Jumlah Lobster</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="11"
                    onChange={(e) => setJumlahLobster(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button type="button" onClick={handleSubmitKolam}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {dataKolam && dataKolam.length > 0 ? (
        dataKolam.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <CardKolam
                id={card.id}
                title={card.nama_kolam}
                value={card.jumlah_lobster}
                color={{
                  backGround:
                    "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                  boxShadow: "0px 10px 20px 0px #FDC0C7",
                }}
              />
            </div>
          );
        })
      ) : (
        <div className="btnTambah">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Tambah kolam
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Form Tambah Kolam
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">Nama Kolam</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Kolam 1"
                        onChange={(e) => setNamaKolam(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Jumlah Lobster
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="11"
                        onChange={(e) => setJumlahLobster(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Tutup
                  </button>
                  <button type="button" onClick={handleSubmitKolam}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h4>Tidak Ada Kolam Tersedia</h4>
        </div>
      )}
    </div>
  );
};

export default CardsKolam;
