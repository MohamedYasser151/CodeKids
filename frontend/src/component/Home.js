import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
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
    { title: "Courses", path: "/Courses", icon: "📚", desc: "Learn coding" },
    { title: "Games", path: "/Games", icon: "🎮", desc: "Play & fun" },
    { title: "Games", path: "/Game", icon: "🕹️", desc: "Play & fun" },
    // { title: "Videos", path: "/videoplayer", icon: "🎥", desc: "Watch lessons" },
    { title: "Weekly", path: "/Weekly", icon: "🏆", desc: "Challenges" },
    { title: "Monthly", path: "/Monthly", icon: "⭐", desc: "Rewards" }
  ];

  const tips = [
    "🎯 اكمل درس اليوم لتربح نجمة",
    "🚀 10 دقائق برمجة يومياً تصنع فرق",
    "🎮 التعلم يصبح ممتع مع الألعاب",
    "🏆 اجمع XP وافتح مستويات جديدة",
    "💡 لا تتوقف، كل خطوة مهمة",
    "🔥 شاهد فيديو جديد اليوم"
  ];

  return (
    <div className={style.page}>

      <div className={style.layout}>

        {/* MAIN */}
        <div className={style.main}>

          <div className={style.header} data-aos="fade-down">
            <h1 className={style.logo}>🚀 Code Kids</h1>
            <p className={style.sub}>Learn • Play • Create</p>
          </div>

          <div className={style.grid}>

            {cards.map((c, i) => (
              <div
                key={c.title}
                className={style.card}
                onClick={() => navigate(c.path)}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className={style.icon}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}

          </div>

        </div>

        {/* SIDE SCROLL FEED */}
        <div className={style.side} data-aos="fade-left">

          <h2 className={style.sideTitle}>🔥 Daily Tips</h2>

          <div className={style.scrollFeed}>

            {tips.map((t, i) => (
              <div
                key={i}
                className={style.feedCard}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {t}
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}