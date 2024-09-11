import React from 'react';
import { useNavigate } from 'react-router-dom'; // استبدال useHistory بـ useNavigate
import style from './css/levels.module.css'
import back from './videos/1.mp4'
const LevelSelection = () => {
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

  const handleLevelClick = (level) => {
    if (level === 'level2') {
      const level1Score = localStorage.getItem('level1Score');

      // التحقق إذا كانت النتيجة 7 أو أكثر لفتح المستوى الثاني
      if (level1Score && Number(level1Score) >= 7) {
        navigate('/Level2'); // فتح المستوى الثاني
      } else {
        alert('لا يمكنك فتح المستوى الثاني حتى تحصل على 7 نقاط أو أكثر في المستوى الأول.');
      }
    } else {
      navigate('/Level1'); // فتح المستوى الأول
    }
  };

  return (
    <div className={style.alllevels}>
           <video className={style.videoBackground} autoPlay muted loop>
        <source src={back} type="video/mp4" />
      </video>
      <div className={style.buttonsContainer}>
        <button onClick={() => handleLevelClick('level1')}>فتح المستوى الأول</button>
        <button onClick={() => handleLevelClick('level2')}>فتح المستوى الثاني</button>
        <button onClick={() => handleLevelClick('level3')}>فتح المستوى الثالث</button>
        <button onClick={() => handleLevelClick('level4')}>فتح المستوى الرابع</button>
      </div>
    </div>
  );
};

export default LevelSelection;
