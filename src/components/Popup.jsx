import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Popup = ({
  status,
  id,
  setStatus,
  add,
  setAdd,
  setLoad,
  handleUpdateData,
}) => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(1);
  const nameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const websiteRef = useRef(null);
  const streetRef = useRef(null);
  const suiteRef = useRef(null);
  const cityRef = useRef(null);
  const zipcodeRef = useRef(null);
  const latRef = useRef(null);
  const lanRef = useRef(null);
  const CNameRef = useRef(null);
  const catchPhraseRef = useRef(null);
  const BSRef = useRef(null);

  useEffect(() => {
    if (status && !add) {
      setLoad(true);
      axios
        .get(`https://665eb0331e9017dc16f0ea5e.mockapi.io/users/${id}`)
        .then((response) => {
          nameRef.current.value = response.data.name;
          userNameRef.current.value = response.data.username;
          emailRef.current.value = response.data.email;
          phoneRef.current.value = response.data.phone;
          websiteRef.current.value = response.data.website;
          streetRef.current.value = response.data.address.street;
          suiteRef.current.value = response.data.address.suite;
          cityRef.current.value = response.data.address.city;
          zipcodeRef.current.value = response.data.address.zipcode;
          latRef.current.value = response.data.address.geo.lat;
          lanRef.current.value = response.data.address.geo.lng;
          CNameRef.current.value = response.data.company.name;
          catchPhraseRef.current.value = response.data.company.catchPhrase;
          BSRef.current.value = response.data.company.bs;
          setData(response.data);
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [status]);
  useEffect(() => {
    setLoad(false);
  }, [add]);
  const post = (data) => {
    let upadteddata = data;
    setLoad(true);
    if (add) {
      axios
        .post("https://665eb0331e9017dc16f0ea5e.mockapi.io/users/", upadteddata)
        .then((response) => {
          handleUpdateData(response.data, response.data.id);
          setData([]);
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `https://665eb0331e9017dc16f0ea5e.mockapi.io/users/${id}`,
          upadteddata
        )
        .then((response) => {
          handleUpdateData(response.data, response.data.id);
          setData([]);
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleCancel = () => {
    setStatus(false);
    setData([]);
    setAdd(false);
    setDisplay(1);
  };
  const handleNext = () => {
    if (display != 3) {
      setDisplay(display + 1);
    }
  };
  const handlePre = () => {
    if (display != 1) {
      setDisplay(display - 1);
    }
  };

  const update = () => {
    setLoad(true);
    setData({
      name: nameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      website: websiteRef.current.value,
      address: {
        street: streetRef.current.value,
        suite: suiteRef.current.value,
        city: cityRef.current.value,
        zipcode: zipcodeRef.current.value,
        geo: {
          lat: latRef.current.value,
          lng: lanRef.current.value,
        },
      },
      company: {
        name: CNameRef.current.value,
        catchPhrase: catchPhraseRef.current.value,
        bs: BSRef.current.value,
      },
    });
    handleUpdateData();
    setStatus(false);
    post({
      name: nameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      website: websiteRef.current.value,
      address: {
        street: streetRef.current.value,
        suite: suiteRef.current.value,
        city: cityRef.current.value,
        zipcode: zipcodeRef.current.value,
        geo: {
          lat: latRef.current.value,
          lng: lanRef.current.value,
        },
      },
      company: {
        name: CNameRef.current.value,
        catchPhrase: catchPhraseRef.current.value,
        bs: BSRef.current.value,
      },
    });
    setAdd(false);
    setDisplay(1);
  };
  return (
    <>
      {status && (
        <div className="popup ">
          <button onClick={handlePre}>⇚</button>
          <div className="popup-cont">
            <button className="btn-x" onClick={handleCancel}>
              ❌
            </button>
            <table className={display == 1 ? "" : "hide"}>
              <tbody>
                <tr>
                  <th>Pesonal Details:</th>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input type="text" ref={nameRef} required />
                  </td>
                </tr>
                <tr>
                  <td> User Name:</td>
                  <td>
                    <input type="text" ref={userNameRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input type="text" ref={emailRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    <input type="text" ref={phoneRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Website: </td>
                  <td>
                    <input type="text" ref={websiteRef} required />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={display == 2 ? "" : "hide"}>
              <tbody>
                <tr>
                  <th>Location Details:</th>
                </tr>
                <tr>
                  <td>Street: </td>
                  <td>
                    <input type="text" ref={streetRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Suite: </td>
                  <td>
                    <input type="text" ref={suiteRef} required />
                  </td>
                </tr>
                <tr>
                  <td>City: </td>
                  <td>
                    <input type="text" ref={cityRef} required />
                  </td>
                </tr>
                <tr>
                  <td>zipcode: </td>
                  <td>
                    <input type="text" ref={zipcodeRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Geo-Lat</td>
                  <td>
                    <input type="text" ref={latRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Geo-Lan</td>
                  <td>
                    <input type="text" ref={lanRef} required />
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table className={display == 3 ? "" : "hide"}>
              <tbody>
                <tr>
                  <th>Company Details:</th>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input type="text" ref={CNameRef} required />
                  </td>
                </tr>
                <tr>
                  <td>Catch Phrase:</td>
                  <td>
                    <input type="text" ref={catchPhraseRef} required />
                  </td>
                </tr>
                <tr>
                  <td>BS:</td>
                  <td>
                    <input type="text" ref={BSRef} required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="btn-update" onClick={update}>
                      {add ? "Add" : "Update"}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="btn-cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handleNext}>⇛</button>
        </div>
      )}
    </>
  );
};

export default Popup;
