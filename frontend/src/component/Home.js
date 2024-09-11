import React,{useEffect} from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';

import style from './css/home.module.css'

 
function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  
  //   const login = Cookies.get('loginkids');
  //   if (login !== 'true') {
      
  //     navigate('/');
  //   }
  // }, [navigate]);
  return (
    <div className={style.bghome}>
      <div className={style.images}>
       
        <div className={style.image2}>
          <h1>5-7</h1>
        </div>
        
        <NavLink to="/levels" className={style.image1}>
          <h1>8-15</h1>
        </NavLink>
      </div>
    </div>
  )
}

export default Home

