/* =========================================================
   CODE KIDS WORLD STAGES
========================================================= */

const stages = [

    /* =====================================================
       STAGE 1
    ===================================================== */

    {
        id: 1,

        name: "Motion Village",

        x: -5,
        y: 0.5,
        z: 3,

        status: "completed",

        read: false,

        lesson:
            "تعلمنا اليوم أساسيات الحركة وكيف نجعل الشخصية تتحرك باستخدام الأوامر البرمجية.",

        explanation:
            "تعلم الطفل كيفية استخدام الأوامر والتحكم في اتجاه الحركة داخل اللعبة.",

        evaluation:
            "ممتاز 👏",

        notes: [],

        report: {

            attendance: true,

            participation:
                "ممتاز",

            understanding:
                92,

            homework:
                "تم إنجاز النشاط",

            teacherComment:
                "الطفل كان متفاعلاً جداً أثناء الحصة واستطاع تنفيذ النشاط بنفسه."

        }

    },


    /* =====================================================
       STAGE 2
    ===================================================== */

    {
        id: 2,

        name: "Repeat Bridge",

        x: -2,
        y: 0.5,
        z: -3,

        status: "current",

        read: false,

        lesson:
            "تعلمنا اليوم فكرة التكرار وكيف يمكن استخدام repeat لتنفيذ الأمر أكثر من مرة.",

        explanation:
            "بدأ الطفل في فهم كيفية استخدام loops لتقليل تكرار الأوامر البرمجية.",

        evaluation:
            "جيد جداً ⭐",

        notes: [

            {
                id: "note-2-1",

                title:
                    "ملاحظة المدرس",

                text:
                    "الطفل يفهم فكرة التكرار بشكل جيد، ويحتاج فقط إلى بعض التدريب الإضافي.",

                position: {

                    x: 0.5,

                    y: 1.4,

                    z: -4.2

                }

            }

        ],

        report: {

            attendance:
                true,

            participation:
                "جيد جداً",

            understanding:
                84,

            homework:
                "تم إنجاز النشاط",

            teacherComment:
                "الطفل متفاعل جداً، ويحتاج إلى مراجعة بسيطة لفكرة التكرار."

        }

    },


    /* =====================================================
       STAGE 3
    ===================================================== */

    {
        id: 3,

        name: "Variables Cave",

        x: 4,
        y: 0.5,
        z: -5,

        status: "locked",

        read: false,

        lesson:
            "هذه الحصة لم تبدأ بعد.",

        explanation:
            "",

        evaluation:
            "",

        notes: [],

        report: null

    },


    /* =====================================================
       STAGE 4
    ===================================================== */

    {
        id: 4,

        name: "If Forest",

        x: 6,
        y: 0.5,
        z: 1,

        status: "locked",

        read: false,

        lesson:
            "هذه الحصة لم تبدأ بعد.",

        explanation:
            "",

        evaluation:
            "",

        notes: [],

        report: null

    },


    /* =====================================================
       STAGE 5
    ===================================================== */

    {
        id: 5,

        name: "Code Castle",

        x: 0,
        y: 0.5,
        z: -8,

        status: "locked",

        read: false,

        lesson:
            "هذه هي الحصة النهائية في الرحلة.",

        explanation:
            "",

        evaluation:
            "",

        notes: [],

        report: null

    }

];


export default stages;