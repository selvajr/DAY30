import { useReducer, useState } from "react";
import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import Popup from "./components/Popup";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState(0);
  const [load, setLoad] = useState(false);
  const Get = () => {
    setLoad(true);
    axios
      .get("https://665eb0331e9017dc16f0ea5e.mockapi.io/users/")
      .then((response) => {
        setData(response.data);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (response) => {
    Get();
  };
  useEffect(() => {
    Get();
  }, []);
  const Add = () => {
    setAdd(true);
    setStatus(true);
    setLoad(true);
  };
  const handleUpdateData = (updateddata, id) => {
    if (add) {
      Get();
    } else {
      setData(data.map((data) => (data.id === id ? updateddata : data)));
    }
  };
  const update = (val) => {
    setId(val);
    setStatus(true);
  };
  return (
    <>
      <div className={load ? "loader-cont" : "hide"}>
        <div className="loader"></div>
      </div>
      <Navbar
        state={data.length}
        setData={setData}
        data={data}
        setLoad={setLoad}
        Get={Get}
      />
      <div className="cont1">
        {data.map((data, ind) => (
          <Users
            key={ind}
            id={data.id}
            update={update}
            data={data}
            setLoad={setLoad}
            handleDelete={handleDelete}
          />
        ))}
        <Popup
          setLoad={setLoad}
          status={status}
          add={add}
          setStatus={setStatus}
          setAdd={setAdd}
          id={id}
          handleUpdateData={handleUpdateData}
        />
        <button className="add-btn" onClick={Add}>
          ➕
        </button>
      </div>
    </>
  );
};

export default App;
