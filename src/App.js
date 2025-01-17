import Home from './Home/Home';
import Teachers from './Teacher/teachers_page/Teachers';

import { useState ,useEffect } from 'react';


import './App.css';

import Log_in from './loginPage/Log-in'

import {BrowserRouter, Route, Switch,Routes } from 'react-router-dom';
import CreateEmploi from './Emploi/CreateEmploi';
import SystemeParam from './Sys_param/SystemParam';



import Loading from './loading';
import Teacher_info from './Teacher/teacher_page/Teacher_info';

function App() {
  const [search,setSearch]=useState([])
  useEffect(()=>{
    console.log(search)
  },[search])
  return (
    
    <div>
      
      <BrowserRouter>
        <Routes>
        <Route path='/test' element={<Loading/>}/>
        <Route path='/main' element={<Home/>}/> 
        <Route path='teachers' element={<Teachers search={search} setSearch={setSearch}/>}/>
        <Route path='/teacher/:id' element={<Teacher_info search={search} setSearch={setSearch}/>}/>
        <Route path='creatEmploi' element={<CreateEmploi/>}></Route>
        <Route path='/systemParam' element={<SystemeParam/>}></Route>
        <Route index path='/' element={<Log_in/>}></Route>
        </Routes>
      
      
      </BrowserRouter>
    </div>
    
  );
}

export default App;
