import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";
import  "../Emploi/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { Popconfirm } from "antd";

import React from "react";

import "./pageStyle.css";


import Tamplate from '../tamplate/tamplate';

import { Checkbox } from "antd";


export default function SystemeParam() {
  const [isShown, setIsShown] = useState(false);

  const onChangeY = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setPersonal(e.target.checked);
  };

  
  const cancel = (e) => {
    console.log(e);
    console.log("Click on No");
  };

  

  const [openSec, setOpenSec] = useState(false);
  const [openGrade, setOpenGrade] = useState(false);
  const [openSeanceType, setOpenSeanceType] = useState(false);
  const [offDayOpen, setOffDayOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = async () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
    setAddingGrade(false);
    setAddingSeanceType(false);
    setAddingOffDay(false);
  };
  //________________________________________________________
  const [addingGrade, setAddingGrade] = useState(false);
  const handleClickAddingGrade = async () => {
    setAddingGrade(true);
  };

  //________________________________________________________
  const [addingSeanceType, setAddingSeanceType] = useState(false);
  const handleClickAddingSeanceType = async () => {
    setAddingSeanceType(true);
  };

  //________________________________________________________
  const [addingOffDay, setAddingOffDay] = useState(false);
  const handleClickAddingOffDay = async () => {
    setAddingOffDay(true);
  };

  //____________________________ Linking Back-front ___________________________

  const [sessions, setSessions] = useState(null);
  const [grades, setGrades] = useState(null);
  const [seanceType, setSeanceType] = useState(null);
  const [offDay, setOffDay] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    const fetchData = async (dataToFetch, setObject) => {
      // dataToFetch = name data in backend
      // const[object,setObject]
      try {
        console.log("Hello from the use effect");

        const token = Cookies.get("token");
        const response = await fetch(
          `http://${apiUrl}:3000/api/v1/${dataToFetch}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setObject(data[dataToFetch]);

        if (!response.ok) {
          console.log("ERROR :", data);
          throw new Error(data.message || "Server Error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData("sessions", setSessions);
    fetchData("positions", setGrades);
    fetchData("seanceTypes", setSeanceType);
    fetchData("offDayTypes", setOffDay);
  }, [isLoading, isFetch]);

  //------------------Creation----------------------------------------------------------------------------

  const [sessionName, setSessionName] = useState("Sem2");
  const [startDate, setStartDate] = useState("2025-01-10");
  const [endDate, setEndDate] = useState("2025-04-10");

  const [amountPerSeance, setAmountPerSeance] = useState(560);
  const [positionName, setPositionName] = useState("MA2");

  const [seanceTypeName, setSeanceTypeName] = useState("Encadrement");
  const [coefficient, setCoefficient] = useState(1.5);

  const [offDayTypeName, setOffDayTypeName] = useState("malade");
  const [personal, setPersonal] = useState(false);

  const mySubmit = async (e, whereToPost, objectToPost) => {
    e.preventDefault();

    console.log(objectToPost);
    console.log(whereToPost);
    setIsLoading(true);
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/${whereToPost}`,
        {
          method: "POST",
          body: JSON.stringify(objectToPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      const data = await response.json();
      console.log(data.data);

      setIsLoading(false);

      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
      console.log("Creation___success__!");
      handleClickClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleting = async (whereDelete, id, setFiltring) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/${whereDelete}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        const data = await response.json();
        console.log("ERROR:", data);
        throw new Error(data.message || "Server Error");
      }

      // Deletion was successful
      console.log("Deleting success!");

      // Update state to trigger re-render
      setIsFetch((prev) => !prev);

      // // Filter out the deleted object
      // setFiltring(prevObjects => prevObjects.filter(object => object._id !== id));

      // console.log('Sessions after deletion:', sessions);
    } catch (error) {
      console.log("Error during deletion:", error.message);
    }
  };

  return (
   
<div >
            <Tamplate/>
    <div className='content'>
      <div className='container-System-param'>
            <div className="cnt" >
              {isOpen && (
                <div className={`popup ${isOpen ? "open" : ""}`}>
                  <div className="popup-content">
                    <div className="icon" onClick={handleClickClose}>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="lg"
                        style={{ color: "#2f4971" }}
                        className="icon2"
                      />
                    </div>
                    <h4>Add Session </h4>
                    <div className="form-Content">
                      <form
                        onSubmit={(e) => {
                          mySubmit(e, "sessions", { sessionName, startDate, endDate });
                        }}
                      >
                        <div className="form-group">
                          <div className="input-param">
                            <span>Name</span>
                            <input
                              type="text"
                              onChange={(e) => setSessionName(e.target.value)}
                              
                            />
                          </div>
                          <div className="input-param">
                            <span>Start </span>
                            <input
                              type="date"
                              onChange={(e) => setStartDate(e.target.value)}
                              
                            />
                          </div>
                          <div className="input-param">
                            <span>End</span>
                            <input
                              type="date"
                              onChange={(e) => setEndDate(e.target.value)}
                              
                            />
                          </div>
                        </div>
                        <div className="container-Btn-Add">
                          <input
                            type="submit"
                            value={isLoading ? "En cours..." : "Add"}
                            name=""
                            className="btn-Add"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {addingGrade && (
                <div className={`popup ${addingGrade ? "open" : ""}`}>
                  <div className="popup-content">
                    <div className="icon" onClick={handleClickClose}>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="lg"
                        style={{ color: "#2f4971" }}
                        className="icon2"
                      />
                    </div>
                    <h4>Grade teacher </h4>
                    <div className="form-Content">
                      <form
                        onSubmit={(e) => {
                          mySubmit(e, "positions", { positionName, amountPerSeance });
                        }}
                      >
                        <div className="form-group">
                          <div className="input-param">
                            <span>Grade Name</span>
                            <input
                              type="text"
                              onChange={(e) => setPositionName(e.target.value)}
                            />
                          </div>
                          <div className="input-param">
                            <span>Amount </span>
                            <input
                              type="number"
                              onChange={(e) => setAmountPerSeance(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="container-Btn-Add">
                          <input
                            type="submit"
                            value={isLoading ? "En cours..." : "Add"}
                            name=""
                            className="btn-Add"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {addingSeanceType && (
                <div className={`popup ${addingSeanceType ? "open" : ""}`}>
                  <div className="popup-content">
                    <div className="icon" onClick={handleClickClose}>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="lg"
                        style={{ color: "#2f4971" }}
                        className="icon2"
                      />
                    </div>
                    <h4>Seance type </h4>
                    <div className="form-Content">
                      <form
                        onSubmit={(e) => {
                          mySubmit(e, "seanceTypes", { seanceTypeName, coefficient });
                        }}
                      >
                        <div className="form-group">
                          <div className="input-param">
                            <span>Seance Name</span>
                            <input
                              type="text"
                              onChange={(e) => setSeanceTypeName(e.target.value)}
                            />
                          </div>
                          <div className="input-param">
                            <span>Coefficient </span>
                            <input
                              type="text"
                              onChange={(e) => setCoefficient(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="container-Btn-Add">
                          <input
                            type="submit"
                            value={isLoading ? "En cours..." : "Add"}
                            name=""
                            className="btn-Add"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {addingOffDay && (
                <div className={`popup ${addingOffDay ? "open" : ""}`}>
                  <div className="popup-content">
                    <div className="icon" onClick={handleClickClose}>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="lg"
                        style={{ color: "#2f4971" }}
                        className="icon2"
                      />
                    </div>
                    <h4>Off day </h4>
                    <div className="form-Content">
                      <form
                        onSubmit={(e) => {
                          mySubmit(e, "offDayTypes", { offDayTypeName, personal });
                        }}
                      >
                        <div className="form-group">
                          <div className="input-param">
                            <span>Name</span>
                            <input
                              type="text"
                              onChange={(e) => setOffDayTypeName(e.target.value)}
                            />
                          </div>
                          <div className="input-param">
                            <span>Personel :</span>
                            <Checkbox 
                            onChange={onChangeY}>

                          </Checkbox>
                          </div>
                        </div>
                        <div className="container-Btn-Add">
                          <input
                            type="submit"
                            value={isLoading ? "En cours..." : "Add"}
                            name=""
                            className="btn-Add"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="sessionY">
                    <div
                      className="line"
                      onClick={() => {
                        setOpenSec(prev => !prev);
                        console.log(openSec);
                      }}
                    >
                      <p id="sess">Sessions</p>
                      <div
                        className="more-icon"
                        onClick={() => {
                          setOpenSec(prev => !prev);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/rmkahxvq.json"
                          trigger="hover"
                          style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                      </div>
                    </div>

                <div className={`details-param ${openSec ? "details-param-Opened" : ''}`}>
                  {!sessions ? (
                      <div className="indic-add">
                        <div className="indication"> no sessions !</div>
                      </div>
                  ) : (
                    sessions.map((item) => {
                      return (
                        <div className="session-card">
                          <div className="name">
                            <span>Name </span>
                            <input type="text" value={item.sessionName} />
                          </div>
                          <div className="from">
                            <span>From</span>
                            <input
                              type="date"
                              value={item.startDate.substring(0, 10)}
                            />
                          </div>
                          <div className="to">
                            <span>To </span>
                            <input type="date" value={item.endDate.substring(0, 10)} />
                          </div>

                          <div className="edit-icon">
                            <lord-icon
                              src="https://cdn.lordicon.com/lecprnjb.json"
                              trigger="hover"
                              colors="primary:#2c4770"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                          <div
                            className="delete-icon"
                            onClick={(e) => {
                              setIsShown(true);
                              e.preventDefault();
                            }}
                          >
                            <Popconfirm
                              title="Delete the session"
                              description="Are you sure to delete this task?"
                              onConfirm={() =>
                                deleting("sessions", item._id, setSessions)
                              }
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <div>
                                <lord-icon
                                  src="https://cdn.lordicon.com/nqtddedc.json"
                                  trigger="hover"
                                  colors="primary:#2c4770"
                                  style={{
                                    width: "22px",
                                    height: "22px",
                                    marginLeft: "8px",
                                  }}
                                ></lord-icon>
                              </div>
                            </Popconfirm>
                          </div>
                        </div>
                      );
                    })
                  )}
                

                  <div style={{ display: "flex", justifyContent: "end"  ,width:'100%'}}>
                    <div className="add-icon" onClick={handleClickOpen}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </div>
                  </div>

                </div>
              </div>

              <div className="sessionY">
                <div className="line"
                        onClick={(e) => {
                          setOpenGrade(!openGrade);
                        }}
                      >
                  <p id="sess">Teacher Grade</p>
                  <div
                    className="more-icon"
                    onClick={(e) => {
                      setOpenGrade(!openGrade);
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/rmkahxvq.json"
                      trigger="hover"
                      style={{ width: "30px", height: "30px" }}
                    ></lord-icon>
                  </div>
                </div>

                <div className={`details-param ${openGrade ? "details-param-Opened" : ''}`}>
                  {!grades ? (
                    <div className="indic-add">
                      <div className="indication"> no grades!</div>
                    </div>
                  ) : (
                    grades.map((item) => {
                      return (
                        <div className="session-card">
                          <div className="name">
                            <span>Name </span>
                            <input type="text" value={item.positionName} />
                          </div>
                          <div className="from">
                            <span>Amount</span>
                            <input type="number" value={item.amountPerSeance} />
                          </div>
                          <div className="edit-and-delete-session-container-horizontal">
                              <div className="edit-icon">
                                <lord-icon
                                  src="https://cdn.lordicon.com/lecprnjb.json"
                                  trigger="hover"
                                  colors="primary:#2c4770"
                                  style={{ width: "22px", height: "22px" }}
                                ></lord-icon>
                              </div>
                              <div
                                className="delete-icon"
                                onClick={(e) => {
                                  setIsShown(true);
                                  e.preventDefault();
                                }}
                              >
                                <Popconfirm
                                  title="Delete the session"
                                  description="Are you sure to delete this task?"
                                  onConfirm={() =>
                                    deleting("positions", item._id, setGrades)
                                  }
                                  onCancel={cancel}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <div>
                                    <lord-icon
                                      src="https://cdn.lordicon.com/nqtddedc.json"
                                      trigger="hover"
                                      colors="primary:#2c4770"
                                      style={{
                                        width: "22px",
                                        height: "22px",
                                        marginLeft: "8px",
                                      }}
                                    ></lord-icon>
                                  </div>
                                </Popconfirm>
                              </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {/* --------------------------------------------------------------------------- */}

              

                  <div style={{display: "flex", justifyContent: "end"  ,width:'100%'}}>
                    <div className="add-icon" onClick={handleClickAddingGrade}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sessionY">
                <div
                  className="line"
                  onClick={() => {
                    setOpenSeanceType(!openSeanceType);
                  }}
                >
                  <p id="sess">Seance Type</p>
                  <div
                    className="more-icon"
                    onClick={() => {
                      setOpenSeanceType(!openSeanceType);
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/rmkahxvq.json"
                      trigger="hover"
                      style={{ width: "30px", height: "30px" }}
                    ></lord-icon>
                  </div>
                </div>

                <div className={`details-param ${openSeanceType ? "details-param-Opened" : ""}`}>
                  <div className="indic-add">
                    {!seanceType && (
                      <div className="indication"> no seance Types !</div>
                    )}
                  </div>
                  {seanceType &&
                    seanceType.map((item) => {
                      return (
                        <div className="session-card">
                          <div className="name">
                            <span>Name </span>
                            <input type="text" value={item.seanceTypeName} />
                          </div>
                          <div className="from">
                            <span>Coefficient</span>
                            <input type="number" value={item.coefficient} />
                          </div>
                          <div className="edit-and-delete-session-container-horizontal">
                          <div className="edit-icon">
                            <lord-icon
                              src="https://cdn.lordicon.com/lecprnjb.json"
                              trigger="hover"
                              colors="primary:#2c4770"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                          <div
                            className="delete-icon"
                            onClick={(e) => {
                              setIsShown(true);
                              e.preventDefault();
                            }}
                          >
                            <Popconfirm
                              title="Delete the seance Type ?"
                              description="Are you sure to delete this task?"
                              onConfirm={() =>
                                deleting("seanceTypes", item._id, setSeanceType)
                              }
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <div>
                                <lord-icon
                                  src="https://cdn.lordicon.com/nqtddedc.json"
                                  trigger="hover"
                                  colors="primary:#2c4770"
                                  style={{
                                    width: "22px",
                                    height: "22px",
                                    marginLeft: "8px",
                                  }}
                                ></lord-icon>
                              </div>
                            </Popconfirm>
                          </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* --------------------------------------------------------------------------- */}

                

                  <div style={{ display: "flex", justifyContent: "end"  ,width:'100%' }}>
                    <div className="add-icon" onClick={handleClickAddingSeanceType}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sessionY">
                <div
                  className="line"
                  onClick={() => {
                    setOffDayOpen(!offDayOpen);
                  }}
                >
                  <p id="sess">Off Day Type</p>
                  <div
                    className="more-icon"
                    onClick={() => {
                      setOffDayOpen(!offDayOpen);
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/rmkahxvq.json"
                      trigger="hover"
                      style={{ width: "30px", height: "30px" }}
                    ></lord-icon>
                  </div>
                </div>

                <div className={`details-param ${offDayOpen ? "details-param-Opened" : ""}`}>
                  <div className="indic-add">
                    {!offDay && <div className="indication"> no off-Days types !</div>}
                  </div>
                  {offDay &&
                    offDay.map((item) => {
                      return (
                        <div className="session-card">
                          <div className="name">
                            <span>Type Name </span>
                            <input type="text" value={item.offDayTypeName} />
                          </div>
                          <div className="from">

                          {item.personal ?  <span>Personel</span> : (<span>Non Personel</span>)} 
                            
                          </div>
                          <div className="edit-and-delete-session-container-horizontal">
                          <div className="edit-icon">
                            <lord-icon
                              src="https://cdn.lordicon.com/lecprnjb.json"
                              trigger="hover"
                              colors="primary:#2c4770"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                          <div
                            className="delete-icon"
                            onClick={(e) => {
                              setIsShown(true);
                              e.preventDefault();
                            }}
                          >
                            <Popconfirm
                              title="Delete Off Day Type ?"
                              description="Are you sure to delete this task?"
                              onConfirm={() =>
                                deleting("offDayTypes", item._id, setOffDay)
                              }
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <div>
                                <lord-icon
                                  src="https://cdn.lordicon.com/nqtddedc.json"
                                  trigger="hover"
                                  colors="primary:#2c4770"
                                  style={{
                                    width: "22px",
                                    height: "22px",
                                    marginLeft: "8px",
                                  }}
                                ></lord-icon>
                              </div>
                            </Popconfirm>
                          </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* --------------------------------------------------------------------------- */}

                  <div style={{ display: "flex", justifyContent: "end"  ,width:'100%' }}>
                    <div className="add-icon" onClick={handleClickAddingOffDay}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
  );
}
