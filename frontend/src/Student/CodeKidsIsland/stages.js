const stages = [

    {
        id: 1,
        name: "Motion",
        x: -5,
        y: 0.55,
        z: 5,

        status: "completed",

        lesson:
            "تعلمنا أساسيات الحركة في البرمجة.",

        explanation:
            "تعلمنا كيف نجعل الشخصية تتحرك باستخدام الأوامر.",

        evaluation:
            "ممتاز ⭐⭐⭐",

        notes:
            "استمر في التدريب!",

        read: true
    },


    {
        id: 2,
        name: "Repeat",
        x: -3,
        y: 0.55,
        z: 0,

        status: "completed",

        lesson:
            "تعلمنا Repeat والتكرار.",

        explanation:
            "استخدمنا التكرار لتنفيذ نفس الأمر أكثر من مرة.",

        evaluation:
            "رائع ⭐⭐",

        notes:
            "حاول استخدام Repeat في التحديات القادمة.",

        read: true
    },


    {
        id: 3,
        name: "Variables",
        x: 0,
        y: 0.55,
        z: -3,

        status: "current",

        lesson:
            "تعلمنا المتغيرات Variables.",

        explanation:
            "المتغير يساعدنا على تخزين البيانات واستخدامها داخل البرنامج.",

        evaluation:
            "جيد جدًا ⭐⭐⭐",

        notes:
            "ركز على أسماء المتغيرات.",

        read: false
    },


    {
        id: 4,
        name: "If",
        x: 5,
        y: 0.55,
        z: -1,

        status: "locked",

        lesson:
            "تعلم If والشروط.",

        explanation:
            "سنتعلم كيف نجعل البرنامج يتخذ قرارًا.",

        evaluation:
            "",

        notes:
            "",

        read: false
    },


    {
        id: 5,
        name: "Final Project",
        x: 7,
        y: 0.55,
        z: 4,

        status: "locked",

        lesson:
            "المشروع النهائي.",

        explanation:
            "سنستخدم كل المهارات التي تعلمناها لإنشاء مشروع كامل.",

        evaluation:
            "",

        notes:
            "",

        read: false
    }

];

export default stages;