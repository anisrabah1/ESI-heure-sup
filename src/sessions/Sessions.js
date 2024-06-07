import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";
import "../Emploi/style.css";
import "./sessY.css";
import { toaster } from "evergreen-ui";
import { format } from 'date-fns';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Popconfirm } from "antd";
import React from "react";
import Tamplate from "../tamplate/tamplate";
import CustomPopup from "./CustomPopup";
import SessionOffDays from "./sessionOffDays";
import DayOff_popup from "../Teacher/teacher_page/dayOff_popup";

export default function Sessions() {
  const [sessionName, setSessionName] = useState("Semester");
  const [startDate, setStartDate] = useState("2025-01-10");
  const [endDate, setEndDate] = useState("2025-04-10");
  const [threshold, setThreshold] = useState(9);
  const [sessions, setSessions] = useState(null);
  const [isFetch, setIsFetch] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSec, setOpenSec] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dayOffClose, set_dayOffClose] = useState(false);
  const [createSessionID, setCreateSessionID] = useState();

    const handleClickOpen = async () => {
        setIsOpen(true);
      };
      const handleClickClose = () => {
        setIsOpen(false);
        setUpdatingSession(false)
        setThreshold(0);

        
      };
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
      }, [isLoading, isFetch]);

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

  const cancel = (e) => {
    console.log(e);
    console.log("Click on No");
  };

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
      toaster.success("done successfully");

      if (!response.ok) {
        console.log("ERROR :", data);
        toaster.danger(data.message || "Server Error");
        throw new Error(data.message || "Server Error");
      }
      console.log("Creation___success__!");

      handleClickClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedSessions, setSelectedSession] = useState(null);

  const [popupTrigger, setPopupTrigger] = useState(false);

  const [updatingSession ,setUpdatingSession]=useState(false);
  const [updatedSession ,setUpdatedSession]=useState(null);

const[sessionName_UP , setSessionName_UP]=useState(null);
const[sessionSeuil_UP , setSessionSeuil_UP]=useState(null);


  const handleToUpdateSession = (item) => {
    console.log("Updating session item:", item);
    if(item){
      setThreshold(item.threshold);
      setUpdatingSession(true);
      setUpdatedSession(item);
      setSessionName(item.sessionName);
      setSessionName_UP(item.sessionName);
      setSessionSeuil_UP(item.threshold);
      setStartDate(item.startDate);
      setEndDate(item.endDate);
      setIsOpen(true);
    }
    
  };


  

const myUpdate = async (wherePatching, objectId, newObject) => {
  try {
    setIsLoading(true);
    const token = Cookies.get("token");
    const response = await fetch(
      `http://${apiUrl}:3000/api/v1/${wherePatching}/${objectId}`,
      {
        method: "PATCH",
        body: JSON.stringify(newObject),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      toaster.danger(data.message || "Server Error");
      throw new Error(data.message || "Server Error");
    }

    console.log("Successfully Updated:", data.data);
    toaster.success("Successfully Updated");
    handleClickClose();
  } catch (error) {
    setIsLoading(false);
    console.log("Update Error:", error.message);
    toaster.danger(error.message || "Update Failed");
  }
};
  

    return(
        <div>
            <Tamplate/>
            <CustomPopup trigger={popupTrigger} setTrigger={setPopupTrigger} session={selectedSessions} />
            <div className="content">
            <div className='container-System-param'>
            <div className="cnt" >

            
                <div className={`popupYY ${isOpen ? "openYY" : ""}`}>
                  <div className="popup-contentYY">
                    <div className="icon" onClick={handleClickClose}>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size="lg"
                        style={{ color: "#2f4971" }}
                        className="icon2"
                      />
                    </div>
                    <h4>{updatingSession? "Mettre à jour":'Ajouter'} Session </h4>
                    <div className="form-Content">
                      <form
                        onSubmit={(e) => {
                          if(!updatingSession){
                          mySubmit(e, "sessions", { sessionName, startDate, endDate ,threshold});}
                          else{
                            e.preventDefault();
                            console.log(threshold)
                            myUpdate('sessions',updatedSession._id,{ sessionName,startDate,endDate,threshold })
                          }
                        }}
                      >
                    <div className="form-group">
                          <div className="input-param">
                            <span>Nom</span>
                            <input
                              type="text"
                              onChange={(e) => setSessionName(e.target.value)}
                              defaultValue={updatingSession ? sessionName_UP :''}
                            />
                          </div>
                        
                          <div className="input-param">
                            <span>Seuil</span>
                            <input
                              type="number"
                              onChange={(e) => setThreshold(e.target.value)}
                           defaultValue={updatingSession ? sessionSeuil_UP:''}
                            />
                            
                      
                            <div className={updatingSession ?"hiden-block" :"input-param" } >
                            <span onClick={()=>console.log(updatingSession)}>Début </span>
                            <input
                              type="date"
                              onChange={(e) => setStartDate(e.target.value)}
                              defaultValue={updatingSession ?  updatedSession.startDate :startDate}
                            />
                          </div>
                          <div className={updatingSession ?"hiden-block" :"input-param" } >
                            <span>Fin</span>
                            <input 
                              type="date"
                              onChange={(e) => setEndDate(e.target.value)}
                              defaultValue={updatingSession ?  updatedSession.endDate :endDate}
                            />
                          </div>
                      </div>
                        </div>
                        <div className="container-Btn-Add" style={{marginTop:'20px'}}>
                          <input
                            type="submit"
                            value={isLoading ? "En cours..." :updatingSession ? "Mettre à jour":'Ajouter'}
                            name=""
                            className="btn-Add"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              




              
               
               
                  {!sessions ? (
                      
                        <div className="indicationYY"> no sessions !</div>
                    
                  ) : (
                    sessions.map((item,index) => {
                      return (
                        <div className="session-cardYY">
                                    <div className="cont-title">
                                    <h3 id="jour-fr-title">{`Session ${index+1}`} </h3>
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
                                                <div style={{ position: 'absolute',right:'4px',top: '13px',}}
>                                                    <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    colors="primary:#2c4770"
                                                    style={{
                                                        width: "28px",
                                                        height: "28x",
                                                        marginLeft: "8px",
                                                    }}
                                        ></lord-icon>
                                    </div>
                                    </Popconfirm>

                                    <div className="edit-icon" 
                                    onClick={(e)=>handleToUpdateSession(item)}

                                    style={{position:'absolute' , right:'2px' , top:'48px'}}>                                
                                      <lord-icon
                                        src="https://cdn.lordicon.com/lecprnjb.json"
                                        trigger="hover"
                                        colors="primary:#2c4770"
                                        style={{ width: "28px", height: "28px" }}
                                      ></lord-icon>
                                    </div>
                                </div>
                          </div>
                            <div className="name-seuil">
                                    <div className="nameYY">
                                        <span onClick={(e)=>console.log(item)}>Nom </span>
                                        <input type="text" value={item.sessionName} />
                                    </div>
                                    <div className="seuilYY">
                                        <span>Seuil </span>
                                        <input type="text" value={item.threshold} />
                                    </div>
                                    
                                    
                          </div>
                          <div className="from-to"> 
                                    <div className="fromYY">
                                        <span>Du</span>
                                        <input
                                        type="date"
                                        value={item.startDate.substring(0, 10)}
                                        />
                                    </div>
                                    <div className="toYY">
                                        <span>A </span>
                                        <input type="date" value={item.endDate.substring(0, 10)} />
                                    </div>
                                    <button 
                                    onClick={(e)=>{
                                      setSelectedSession(item);
                                      setPopupTrigger(true);
                                    }}
                                    className="custom-open-popup-btn"
                                    id="CalculeStatus">Calculer Etat de paiement</button>
                        </div>
                        
{/* __________________________________________OFF Days_____________________ */}
                        <div className="off-Days-Global">
                            <h3 id="jour-fr-title">Les jours fériés </h3>
                            
                            {/* <Teacher_dayOff
                            popup={dayOffPopup}
                            create={sessionCreate}
                            sessionID={item._id}
                            seesionStart={item.startDate.substring(0, 10)}
                            sessionEnd={item.endDate.substring(0, 10)}
                            /> */}
                      <SessionOffDays
                        popup={set_dayOffClose}
                        sessionID={item._id}
                        create={setCreateSessionID}
                      />
                      {dayOffClose && (
                        // eslint-disable-next-line react/jsx-pascal-case
                        <DayOff_popup
                          set_close={set_dayOffClose}
                          id={createSessionID}
                          personal={false}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div
                className="add-icon"
                onClick={handleClickOpen}
                style={{ width: "fit-content" }}
              >
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
  );
}