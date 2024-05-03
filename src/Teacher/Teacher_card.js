import './Teacher.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange,green,blue,grey } from '@mui/material/colors';
import { useState ,useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Teacher_card
 = ({teacher}) => {
    const navigate = useNavigate();

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Function to update the screen size
    const updateScreenSize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    useEffect(() => {
        // // Add the resize event listener
        // window.addEventListener('resize', updateScreenSize);

        // // Cleanup function to remove the event listener
        // return () => {
        //     window.removeEventListener('resize', updateScreenSize);
        // };
    }, []);
    return ( 
    
    <div className="teacher" onClick={()=>{navigate('/')}} >
    
    <Avatar alt={teacher.firstName} src="/assets/n.png"  sx={{ width: window.innerWidth*0.1,
        height: window.innerWidth*0.1 ,bgcolor: grey[700]}} className='photo_container'/>
    
    
    <div className="info">
        <div className="name">{teacher.firstName} {teacher.lastName}</div>
        <div className="sub_info ">
            <div className="sub_info1 ">
            <div className="email"><div className="Tlabel">Email :</div> {teacher.email}</div>
            
            <div className="number sub_info2"><div className="Tlabel">Phone :</div>  {teacher.phoneNumber}</div>
            </div>
            <div className="sub_info1 " >
            <div className="degree"><div className="Tlabel">Degree :</div>  {teacher.degree}</div>
            <div className="major sub_info2"><div className="Tlabel">Major :</div> {teacher.major}</div>
            </div>
            <div className="sub_info1"><div className="Tlabel">Home institution :</div>  {teacher.homeInstitution}</div>
        
        </div>
        
    </div>
    
               
                <button className="icon-button button1">
                    
                </button>
               
                
           
</div> );
}
 
export default Teacher_card
;