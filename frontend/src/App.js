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
const Navbars = lazy(()=> import('./component/Navbars.js'))
const Game = lazy(()=> import('./component/game.js'))

const Monthly = lazy(()=> import('./component/Monthly.js'))
const AdminAdd = lazy(()=> import('./component/admin/Admin.js'))
const Weekly = lazy(()=> import('./component/Weekly.js'))
const Games = lazy(()=> import('./component/Game2.js'))
const Level1 = lazy(()=> import('./component/levels15/levels/one.js'))
const Level2 = lazy(()=> import('./component/levels15/levels/two.js'))
const Levels = lazy (()=>import('./component/Levels.js'));
const Testone = lazy (()=>import('./component/tests/testshtml/testone.js'));
const Test1 = lazy (()=>import('./component/tests/testshtml/test1.js'));
const Test2 = lazy (()=>import('./component/tests/testshtml/test2.js'));







const VideoPage = lazy (()=>import('./component/VideoPage.js'));
const VideoPlayer = lazy (()=>import('./component/VideoPlayer.js'));
const UserProtectedRoute = lazy (()=>import('./component/UserProtectedRoute.js'));


const AdminVideo = lazy (()=>import('./component/admin/adminVideo.js'));

const AdminVideosList = lazy (()=>import('./component/admin/AdminVideosList.js'));
const AdminUsers = lazy (()=>import('./component/admin/AdminUsers.js'));
const AdminProtected = lazy (()=>import('./component/admin/AdminProtected.js'));
const HomeAdmin = lazy (()=>import('./component/admin/HomeAdmin.js'));
const LoginAdmin = lazy (()=>import('./component/admin/loginAdmin.js'));




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


          <Route path="/Games" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <UserProtectedRoute>

          <Games/>
                    </UserProtectedRoute>

          </React.Suspense>
          }/>

          <Route path="/videos/:course" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <UserProtectedRoute>

          <VideoPage/>
                    </UserProtectedRoute>

          </React.Suspense>
          }/>







          <Route path="/Courses" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <UserProtectedRoute>

          <VideoPlayer/>
                    </UserProtectedRoute>

          </React.Suspense>
          }/>

         
      

      <Route path="/Monthly" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <UserProtectedRoute>

          <Monthly/>
                    </UserProtectedRoute>

          </React.Suspense>
          }/>

      <Route path="/Weekly" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <UserProtectedRoute>

          <Weekly/>
                    </UserProtectedRoute>

          </React.Suspense>
          }/>






{/* admin */}


          <Route path="/AdminVideosList" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <AdminProtected>

          <AdminVideosList/>
                    </AdminProtected>

          </React.Suspense>
          }/>

          <Route path="/AdminUsers" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <AdminProtected>

          <AdminUsers/>
                    </AdminProtected>

          </React.Suspense>
          }/>



 <Route path="/adminVideo" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <AdminProtected>

          <AdminVideo/>
                    </AdminProtected>

          </React.Suspense>
          }/>

      <Route path="/AdminAdd" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>
          <AdminProtected>

          <AdminAdd/>
                    </AdminProtected>

          </React.Suspense>
          }/>

      <Route path="/LoginAdmin" element={
           <React.Suspense fallback={<Loading/>}>

          <LoginAdmin/>
          </React.Suspense>
          }/>

     

      <Route path="/HomeAdmin" element={
           <React.Suspense fallback={<Loading/>}>
          <AdminProtected>
          <HomeAdmin/>
          </AdminProtected>

          </React.Suspense>
          }/>






{/* admin end*/}











        <Route path="/home" element={
           <React.Suspense fallback={<Loading/>}>
          {/* <Navbars/> */}
          <UserProtectedRoute>
          <Home/>
          </UserProtectedRoute>
          </React.Suspense>
          }/>
        <Route path="/Game" element={
           <React.Suspense fallback={<Loading/>}>
          <Navbars/>

          <Game/>
          </React.Suspense>
          }/>
      

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
     <Route path='/test1' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Test1/>
            {/* <FooterRma2/> */}
            </React.Suspense>
        }/>
     <Route path='/test2' element={
          <React.Suspense fallback={<Loading/>}>
            {/* <NavbarRam/> */}
            <Test2/>
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
