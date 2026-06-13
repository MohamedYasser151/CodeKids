import React,{useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // استبدال useHistory بـ useNavigate
import style from './css/levels.module.css'
import back from './videos/1.mp4'
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import data from './tests/testshtml/data';
import lockImg from './image/padlock.png'
const LevelSelection = () => {
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

  // const handleLevelClick = (level) => {
  //   if (level === 'level2') {
  //     const level1Score = localStorage.getItem('level1Score');

  //     // التحقق إذا كانت النتيجة 7 أو أكثر لفتح المستوى الثاني
  //     if (level1Score && Number(level1Score) >= 7) {
  //       navigate('/Level2'); // فتح المستوى الثاني
  //     } else {
  //       alert('لا يمكنك فتح المستوى الثاني حتى تحصل على 7 نقاط أو أكثر في المستوى الأول.');
  //     }
  //   } else {
  //     navigate('/Level1'); // فتح المستوى الأول
  //   }
  // };
  // useEffect(() => {
  
  //   const login = Cookies.get('loginkids');
  //   if (login !== 'true') {
      
  //     navigate('/');
  //   }
  // }, [navigate]);
  return (
    <div className={style.alllevels}>
  <video className={style.videoBackground} autoPlay muted loop>
    <source src={back} type="video/mp4" />
  </video>
  <section className="py-4 container">
  <div className="row d-flex justify-content-center">
    {data.map((item, i) => (
      <div key={item.id} className="col-6 col-md-4 col-lg-2 d-flex justify-content-center mb-5">
        <div className={style.cards}>
          {item.link === "#" ? (
            <div className={style.locked}>
              <img 
                src={lockImg}
                alt="Locked" 
                className={style.lockImg}
              />
            </div>
          ) : (
            <NavLink to={item.link} className={style.link}>
              <h6>{item.title}</h6>
            </NavLink>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

</div>

  );
};

export default LevelSelection;
