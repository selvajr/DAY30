import React from "react";
import axios from "axios";

const Navbar = ({ state = 1, data, setData, setLoad, Get }) => {
  const restore = async () => {
    setLoad(true);
    if (data.length == 0) {
      for (let i = 1; i <= 10; i++) {
        setLoad(true);
        await axios
          .get(`https://jsonplaceholder.typicode.com/users/${i}`)
          .then(async (response) => {
            await axios
              .post(
                `https://665eb0331e9017dc16f0ea5e.mockapi.io/users`,
                response.data
              )
              .then((response) => {
                Get();
                setLoad(true);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setLoad(false);
    }
    for (let j = 0; j < data.length; j++) {
      setLoad(true);
      if (j < data.length - 1) {
        setLoad(true);
        await axios
          .delete(
            `https://665eb0331e9017dc16f0ea5e.mockapi.io/users/${data[j].id}`
          )
          .then((response) => {
            Get();
            setLoad(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .delete(
            `https://665eb0331e9017dc16f0ea5e.mockapi.io/users/${data[j].id}`
          )
          .then((response) => {})
          .then(async () => {
            setLoad(true);
            for (let i = 1; i <= 10; i++) {
              setLoad(true);
              await axios
                .get(`https://jsonplaceholder.typicode.com/users/${i}`)
                .then(async (response) => {
                  await axios
                    .post(
                      `https://665eb0331e9017dc16f0ea5e.mockapi.io/users`,
                      response.data
                    )
                    .then((response) => {
                      Get();
                      setLoad(true);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
              setLoad(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setLoad(false);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
          </ul>
          <button className="btn-restore" onClick={restore}>
            Restore old users
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
