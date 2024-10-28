import React, { useEffect, useRef } from "react";
import axios from "axios";

const Users = ({ data, update, id, setLoad, handleDelete, }) => {
  const handleUpdate = () => {
    update(id);
  };

  const Remove = useRef(null);
  const handleDel = () => {
    setLoad(true);
    axios
      .delete(`https://665eb0331e9017dc16f0ea5e.mockapi.io/users/${data.id}`)
      .then((response) => {
        setLoad(false);
        handleDelete(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card1" ref={Remove}>
      <div>
        <strong>Name:</strong>&nbsp; {data.name}
      </div>
      <div>
        <strong >Email:</strong>&nbsp; {data.email}
      </div>
      <div>
        <strong>Phone:</strong>&nbsp; {data.phone}
      </div>
      <div>
        <strong> Address:</strong>{" "}
        <div className="gap1">
          <strong>City:</strong>&nbsp; {data.address.city} <br />
          <strong>street:</strong>&nbsp; {data.address.street} <br />
          <strong> zipcode:</strong>&nbsp; {data.address.zipcode}
        </div>
      </div>
      <div>
        <strong>Website:</strong>&nbsp;{" "}
        <a href={data.website}>{data.website}</a>
      </div>
      <div>
        <strong>Currently work in:</strong>&nbsp; {data.company.name}
      </div>
      <div>
        <strong>Our company catch Pharse:</strong>&nbsp;{" "}
        <div className="gap1">
          {data.company.catchPhrase.split(" ").join(", ")}
        </div>
      </div>
      <div className="btn-div">
        <button className="btn-update" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn-del" onClick={handleDel}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Users;
