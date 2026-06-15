import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
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
      icon: "📚",
      desc: "Learn Coding"
    },
    {
      title: "Games",
      path: "/Games",
      icon: "🎮",
      desc: "Coding Games"
    },
    {
      title: "Challenge",
      path: "/Game",
      icon: "🕹️",
      desc: "Solve Missions"
    },
    {
      title: "Weekly",
      path: "/Weekly",
      icon: "🏆",
      desc: "Weekly Challenge"
    },
    {
      title: "Monthly",
      path: "/Monthly",
      icon: "⭐",
      desc: "Monthly Rewards"
    }
  ];

  return (
    <div className={style.page}>

      {/* HEADER */}

      <div className={style.header} data-aos="fade-down">
        <h1 className={style.logo}>🚀 Code Kids</h1>
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
              {c.icon}
            </div>

            <h3>{c.title}</h3>

            <p>{c.desc}</p>
          </div>
        ))}

      </div>

      {/* WHY LEARN */}

<section
  className={style.section}
  data-aos="fade-up"
>
  <h2>💡 Why Learn Coding? | لماذا نتعلم البرمجة؟</h2>

  <div className={style.infoGrid}>

    <div className={style.infoCard}>
      <strong>🧠 Improves problem solving</strong>
      <span>
        يحسن مهارات حل المشكلات والتفكير بطريقة ذكية.
      </span>
    </div>

    <div className={style.infoCard}>
      <strong>🚀 Boosts creativity</strong>
      <span>
        يساعد الأطفال على الإبداع وتحويل الأفكار إلى مشاريع.
      </span>
    </div>

    <div className={style.infoCard}>
      <strong>🎯 Develops logical thinking</strong>
      <span>
        ينمي التفكير المنطقي واتخاذ القرارات الصحيحة.
      </span>
    </div>

    <div className={style.infoCard}>
      <strong>💻 Builds future skills</strong>
      <span>
        يجهز الأطفال لمهارات ووظائف المستقبل التقنية.
      </span>
    </div>

  </div>
</section>
      {/* TIPS */}

<section className={style.section} data-aos="fade-up">

  <h2>🔥 Programming Tips / نصائح برمجية</h2>

  <div className={style.infoGrid}>

    <div className={style.tipCard}>
      🌟 Practice every day  
      <br />
      <span>🌟 تدرب كل يوم</span>
    </div>

    <div className={style.tipCard}>
      🎮 Learn through games  
      <br />
      <span>🎮 تعلم من خلال الألعاب</span>
    </div>

    <div className={style.tipCard}>
      🐞 Bugs help you learn  
      <br />
      <span>🐞 الأخطاء تساعدك على التعلم</span>
    </div>

    <div className={style.tipCard}>
      🏆 Never give up  
      <br />
      <span>🏆 لا تستسلم أبداً</span>
    </div>

    <div className={style.tipCard}>
      💡 Think before coding  
      <br />
      <span>💡 فكر قبل كتابة الكود</span>
    </div>

    <div className={style.tipCard}>
      🚀 Build your own projects  
      <br />
      <span>🚀 اصنع مشاريعك بنفسك</span>
    </div>

  </div>

</section>

      {/* SOCIAL */}

<section className={style.socialSection} data-aos="zoom-in">

  <h2>🌍 Follow Code Kids</h2>

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

  </div>

</section>

    </div>
  );
}