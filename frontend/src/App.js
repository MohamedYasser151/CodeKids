import React,{useState,useEffect, lazy, Suspense,startTransition } from 'react';

import { Routes,Route,BrowserRouter} from "react-router-dom";



// import Navbars from './component/Navbars';
// import Footer from './component/footer';


// import Signup from './component/Signup'
import Signin from './component/Signin'
import Loading from './component/Loading.js';
// import NotFound from './component/NotFound.js'
// import './component/css/Cards.css'
import './App.css';



const Home = lazy(()=> import('./component/Home.js'))
const Level1 = lazy(()=> import('./component/levels15/levels/one.js'))
const Level2 = lazy(()=> import('./component/levels15/levels/two.js'))
const Levels = lazy (()=>import('./component/Levels.js'));
const Testone = lazy (()=>import('./component/tests/testshtml/testone.js'));

// const IT = lazy(()=> import('./component/it/Employee.js'))
// const  Chatbot = lazy(()=> import('./component/chatbot/chat.js'))
// const  Pages = lazy(()=> import('./component/page.js'))
// const  Department = lazy(()=> import('./component/Department.js'))




const App = ()=>{
 

  return (
    
    <BrowserRouter>
    
    <div className="App">
    
      
   
        <Routes>
      
        <Route path="/" element={<Signin/>}/>
        <Route path="/home" element={<Home/>}/>
      

         {/* <Route path="*" element={
          <div>
          

         <NotFound/>
         </div>
         }/> */}
          
          {/* levels */}
          <Route path='/levels' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Levels/>
            {/* <FooterRma2/> */}
            </React.Suspense>
        }/>

          <Route path='/level1' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Level1/>
            {/* <FooterRma2/> */}
            </React.Suspense>
        }/>
       
          <Route path='/Level2' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Level2/>
            {/* <FooterRma2/> */}
            </React.Suspense>
        }/>
       
          {/* levels end*/}

        

       
     {/* test */}
     <Route path='/testone' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Testone/>
            {/* <FooterRma2/> */}
            </React.Suspense>
        }/>
     {/* test end */}

       

        </Routes>
        
    </div>
    
    </BrowserRouter>
    
  );
}

export default App;
