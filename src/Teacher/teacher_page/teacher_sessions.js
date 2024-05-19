import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from '../../APIs';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import CreateEmploi from '../../Emploi/CreateEmploi';


const Teacher_sessions = ({sessionPopup,dayOffPopup,teacherID,sessionCreate,teacherInfos}) => {
    const [session,set_session] = useState([]);
    const apiUrls = new ApiUrls();
    
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
         console.log(` api is here ${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`);
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          
          console.log('cccccccccccccccccccc')
          console.log(data.teacherSessions)
          
          set_session(data.teacherSessions)
          
        } catch (error) {
           console.log(error)
          
        }
  };

    useEffect(()=>{
      fetchData();
    },[])
    return ( 
        <div>
{session && session.map((m)=>(
              
              <div className="session" onClick={()=>console.log(teacherInfos)}>
                 Session {m._id}<br></br>
                 startDate {m.startDate}<br></br>
                 startDate {m.endDate}
                 {/* here is the emploi */}
                 <CreateEmploi sessionId={m._id}  sessionDates={[m.startDate,m.endDate]}  teacherInfos={teacherInfos} seances={session.seances}/>
                 <Teacher_dayOff popup={dayOffPopup} create={sessionCreate} sessionID={m._id} />
              </div>
              
          )) }
          <center>
          <div className="addB" onClick={()=>{
            // set_session([...session,{id:'undefined'}])
            sessionPopup(true);
            }}/>
          </center>
          
        </div>
     );
}
 
export default Teacher_sessions;