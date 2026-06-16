import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok
} from "@fortawesome/free-brands-svg-icons";

import {
  faBook,
  faGamepad,
  faTrophy,
  faStar,
  faLightbulb,
  faBrain,
  faRocket,
  faCode,
  faPuzzlePiece,
   faCalendarCheck,
  faBug, 
  faFire ,
  faGlobe 
  
} from "@fortawesome/free-solid-svg-icons";

import "aos/dist/aos.css";
import style from "./css/home.module.css";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

 const cards = [
  {
    title: "Courses",
    path: "/Courses",
    icon: faBook,
    desc: "Learn Coding"
  },
  {
    title: "Games",
    path: "/Games",
    icon: faGamepad,
    desc: "Coding Games"
  },
  {
    title: "Challenge",
    path: "/Game",
    icon: faPuzzlePiece,
    desc: "Solve Missions"
  },
  {
    title: "Weekly",
    path: "/Weekly",
    icon: faTrophy,
    desc: "Weekly Challenge"
  },
  {
    title: "Monthly",
    path: "/Monthly",
    icon: faStar,
    desc: "Monthly Rewards"
  }
];

  return (
    <div className={style.page}>

      {/* HEADER */}

      <div className={style.header} data-aos="fade-down">
        <h1 className={style.logo}>
  <FontAwesomeIcon
    icon={faRocket}
    className={style.logoIcon}
  />
  Code Kids
</h1>
        <p className={style.sub}>
          Learn • Play • Create
        </p>
      </div>

      {/* CARDS */}

      <div className={style.grid}>

        {cards.map((c, i) => (
          <div
            key={i}
            className={style.card}
            onClick={() => navigate(c.path)}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
          >
<div className={style.icon}>
  <FontAwesomeIcon icon={c.icon} />
</div>

            <h3>{c.title}</h3>

            <p>{c.desc}</p>
          </div>
        ))}

      </div>

      {/* WHY LEARN */}

<section
  className={style.section}
  data-aos="fade-up">
<h2 className={style.sectionTitle}>
  <FontAwesomeIcon
    icon={faLightbulb}
    className={style.bulbIcon}
  />
  Why Learn Coding? | لماذا نتعلم البرمجة؟
</h2>

  <div className={style.infoGrid}>

<div className={style.infoCard}>
  <FontAwesomeIcon
    icon={faBrain}
    className={style.cardIcon}
  />

  <strong>Improves problem solving</strong>

  <span>
    يحسن مهارات حل المشكلات والتفكير بطريقة ذكية
  </span>
</div>

<div className={style.infoCard}>
  <FontAwesomeIcon
    icon={faRocket}
    className={style.cardIcon}
  />

  <strong>Boosts creativity</strong>

  <span>
    يساعد الأطفال على الإبداع وتحويل الأفكار إلى مشاريع
  </span>
</div>

<div className={style.infoCard}>
  <FontAwesomeIcon
    icon={faLightbulb}
    className={style.cardIcon}
  />

  <strong>Develops logical thinking</strong>

  <span>
    ينمي التفكير المنطقي واتخاذ القرارات الصحيحة
  </span>
</div>

<div className={style.infoCard}>
  <FontAwesomeIcon
    icon={faCode}
    className={style.cardIcon}
  />

  <strong>Builds future skills</strong>

  <span>
    يجهز الأطفال لمهارات المستقبل التقنية
  </span>
</div>

  </div>
</section>
      {/* TIPS */}

<section className={style.section} data-aos="fade-up">

 <h2 className={style.sectionTitle}>
  <FontAwesomeIcon
    icon={faFire}
    className={style.titleIcon}
  />
  Programming Tips | نصائح برمجية
</h2>

  <div className={style.infoGrid}>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faCalendarCheck}
        className={style.cardIcon}
      />

      <strong>Practice Every Day</strong>

      <span>
        تدرب يومياً ولو لمدة 10 دقائق فقط
      </span>
    </div>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faGamepad}
        className={style.cardIcon}
      />

      <strong>Learn Through Games</strong>

      <span>
        تعلم البرمجة من خلال الألعاب والتحديات
      </span>
    </div>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faBug}
        className={style.cardIcon}
      />

      <strong>Bugs Help You Learn</strong>

      <span>
        الأخطاء جزء طبيعي من رحلة التعلم
      </span>
    </div>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faTrophy}
        className={style.cardIcon}
      />

      <strong>Never Give Up</strong>

      <span>
        لا تستسلم واستمر في المحاولة
      </span>
    </div>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faLightbulb}
        className={style.cardIcon}
      />

      <strong>Think Before Coding</strong>

      <span>
        خطط للحل قبل كتابة الكود
      </span>
    </div>

    <div className={style.tipCard}>
      <FontAwesomeIcon
        icon={faRocket}
        className={style.cardIcon}
      />

      <strong>Build Your Own Projects</strong>

      <span>
        أنشئ مشاريعك الخاصة لتطوير مهاراتك
      </span>
    </div>

  </div>

</section>

      {/* SOCIAL */}

<section className={style.socialSection} data-aos="zoom-in">

  <h2 className={style.sectionTitle}>
  <FontAwesomeIcon
    icon={faGlobe}
    className={style.globeIcon}
  />
  Follow Code Kids
</h2>

  <div className={style.socialGrid}>

    <a
      href="https://www.instagram.com/codekids.online/"
      target="_blank"
      rel="noreferrer"
      className={`${style.socialCard} ${style.instagram}`}
    >
      <span className={style.glow}></span>
      <div className={style.socialIcon}><FontAwesomeIcon icon={faInstagram} /></div>
      <div>
        <h3>Instagram</h3>
        <p>Photos • Stories • Fun</p>
      </div>
    </a>

    <a
      href="https://www.facebook.com/profile.php?id=61590722672923"
      target="_blank"
      rel="noreferrer"
      className={`${style.socialCard} ${style.facebook}`}
    >
      <span className={style.glow}></span>
      <div className={style.socialIcon}><FontAwesomeIcon icon={faFacebook} /></div>
      <div>
        <h3>Facebook</h3>
        <p>Community • Updates</p>
      </div>
    </a>
    <a
  href="https://www.tiktok.com/@code_kids.online"
  target="_blank"
  rel="noreferrer"
  className={`${style.socialCard} ${style.tiktok}`}
>
  <span className={style.glow}></span>

  <div className={style.socialIcon}>
    <FontAwesomeIcon icon={faTiktok} />
  </div>

  <div>
    <h3>TikTok</h3>
    <p>Videos • Coding Fun</p>
  </div>
</a>

  </div>

</section>

    </div>
  );
}