const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("./cloudinary");

const app = express();
const port = process.env.PORT || 8083;


app.use(cors({
  origin: [
    "https://code-kids-nine.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ================= DB =================
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "codekids",
// });

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "codekids",

//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });


const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
    conn.release();
  }
});

// ================= SIGNUP =================
// app.post("/signup", (req, res) => {
//   const { username, password, code } = req.body;

//   const check = "SELECT * FROM login WHERE username=? OR code=?";

//   db.query(check, [username, code], (err, result) => {
//     if (err) return res.status(500).json(err);

//     if (result.length > 0) {
//       return res.json({ message: "User already exists" });
//     }

//     bcrypt.hash(password, 10, (err2, hash) => {
//       if (err2) return res.status(500).json(err2);

//       const sql =
//         "INSERT INTO login (username,password,code) VALUES (?,?,?)";

//       db.query(sql, [username, hash, code], (err3) => {
//         if (err3) return res.status(500).json(err3);

//         res.json({ message: "User created" });
//       });
//     });
//   });
// });

// REPORTS
app.get("/admin/users", (req, res) => {

  const sql = "SELECT id, username, code FROM login";

  db.query(sql, (err, result) => {

    if (err)
      return res.status(500).json(err);

    res.json(result);

  });

});

// =====================================================
// GET STUDENTS FOR REPORTS
// =====================================================

app.get("/admin/report-students", (req, res) => {

  const sql = `
    SELECT
      id,
      username,
      code
    FROM login
    ORDER BY username ASC
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log("REPORT STUDENTS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to load students"
      });

    }

    res.json({
      success: true,
      students: result
    });

  });

});



// =====================================================
// CREATE LESSON REPORT
// =====================================================

app.post("/admin/reports", (req, res) => {

  const {
    student_id,
    student_code,
    student_name,
    course,
    lesson_title,
    lesson_content,
    what_learned,
    evaluation,
    teacher_notes,
    rating,
    report_date
  } = req.body;


  // ==========================================
  // VALIDATION
  // ==========================================

  if (!student_code) {

    return res.status(400).json({
      success: false,
      message: "Student code is required"
    });

  }


  if (!student_name) {

    return res.status(400).json({
      success: false,
      message: "Student name is required"
    });

  }


  if (!course) {

    return res.status(400).json({
      success: false,
      message: "Course is required"
    });

  }


  if (!lesson_title) {

    return res.status(400).json({
      success: false,
      message: "Lesson title is required"
    });

  }


  // ==========================================
  // RATING VALIDATION
  // ==========================================

  if (
    rating !== null &&
    rating !== undefined &&
    rating !== "" &&
    (
      Number(rating) < 1 ||
      Number(rating) > 5
    )
  ) {

    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5"
    });

  }


  // ==========================================
  // DATE
  // ==========================================

  const finalDate =
    report_date ||
    new Date()
      .toISOString()
      .slice(0, 10);


  // ==========================================
  // INSERT
  // ==========================================

  const sql = `
    INSERT INTO lesson_reports
    (
      student_id,
      student_code,
      student_name,
      course,
      lesson_title,
      lesson_content,
      what_learned,
      evaluation,
      teacher_notes,
      rating,
      report_date
    )

    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;


  const values = [

    student_id || null,

    student_code,

    student_name,

    course,

    lesson_title,

    lesson_content || null,

    what_learned || null,

    evaluation || null,

    teacher_notes || null,

    rating || null,

    finalDate

  ];


  db.query(
    sql,
    values,
    (err, result) => {

      if (err) {

        console.log(
          "CREATE REPORT ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to create report",
          error: err
        });

      }


      res.json({

        success: true,

        message:
          "Lesson report created successfully",

        report_id:
          result.insertId

      });

    }
  );

});



// =====================================================
// GET STUDENT REPORTS
// =====================================================

app.get(
  "/reports/student/:code",
  (req, res) => {

    const { code } =
      req.params;


    const sql = `
      SELECT
        id,
        student_id,
        student_code,
        student_name,
        course,
        lesson_title,
        lesson_content,
        what_learned,
        evaluation,
        teacher_notes,
        rating,
        report_date,
        created_at,
        updated_at

      FROM lesson_reports

      WHERE student_code = ?

      ORDER BY
        report_date DESC,
        id DESC
    `;


    db.query(
      sql,
      [code],
      (err, result) => {

        if (err) {

          console.error(
            "GET REPORTS ERROR:",
            err
          );

          return res.status(500).json({

            success: false,

            message:
              "Failed to load student reports"

          });

        }


        return res.json({

          success: true,

          reports: result

        });

      }
    );

  }
);




// =====================================================
// GET SINGLE REPORT
// =====================================================

app.get("/reports/:id", (req, res) => {

  const { id } = req.params;


  const sql = `
    SELECT *
    FROM lesson_reports
    WHERE id=?
  `;


  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Failed to load report"
        });

      }


      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Report not found"
        });

      }


      res.json({

        success: true,

        report: result[0]

      });

    }
  );

});



// =====================================================
// UPDATE LESSON REPORT
// =====================================================

app.put("/admin/reports/:id", (req, res) => {

  const { id } = req.params;


  const {
    course,
    lesson_title,
    lesson_content,
    what_learned,
    evaluation,
    teacher_notes,
    rating,
    report_date
  } = req.body;


  const sql = `
    UPDATE lesson_reports

    SET
      course=?,
      lesson_title=?,
      lesson_content=?,
      what_learned=?,
      evaluation=?,
      teacher_notes=?,
      rating=?,
      report_date=?

    WHERE id=?
  `;


  db.query(

    sql,

    [
      course,
      lesson_title,
      lesson_content || null,
      what_learned || null,
      evaluation || null,
      teacher_notes || null,
      rating || null,
      report_date,
      id
    ],

    (err) => {

      if (err) {

        console.log(
          "UPDATE REPORT ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to update report"
        });

      }


      res.json({

        success: true,

        message:
          "Report updated successfully"

      });

    }

  );

});
// =====================================================
// DELETE LESSON REPORT
// =====================================================

app.delete("/admin/reports/:id", (req, res) => {

  const { id } = req.params;


  db.query(
    "DELETE FROM lesson_reports WHERE id=?",
    [id],
    (err, result) => {

      if (err) {

        console.log(
          "DELETE REPORT ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to delete report"
        });

      }


      if (result.affectedRows === 0) {

        return res.status(404).json({
          success: false,
          message: "Report not found"
        });

      }


      res.json({

        success: true,

        message:
          "Report deleted successfully"

      });

    }
  );

});

// =====================================================
// GET STUDENT BY CODE
// =====================================================

app.get("/admin/report-student/:code", (req, res) => {

  const { code } = req.params;


  const sql = `
    SELECT
      id,
      username,
      code
    FROM login
    WHERE code=?
    LIMIT 1
  `;


  db.query(
    sql,
    [code],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Database error"
        });

      }


      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Student not found"
        });

      }


      res.json({

        success: true,

        student: result[0]

      });

    }
  );

});
// end REPORTS

// =====================================================
// GET LOGGED-IN STUDENT REPORTS
// =====================================================

app.get(
  "/reports/student/:username/:code",
  (req, res) => {

    const username = decodeURIComponent(
      req.params.username
    );

    const code = req.params.code;

    console.log(
      "REPORT REQUEST:",
      username,
      code
    );

    const sql = `
      SELECT
        id,
        student_id,
        student_code,
        student_name,
        course,
        lesson_title,
        lesson_content,
        what_learned,
        evaluation,
        teacher_notes,
        rating,
        report_date,
        created_at,
        updated_at

      FROM lesson_reports

      WHERE
        student_name = ?
        AND student_code = ?

      ORDER BY
        report_date DESC,
        id DESC
    `;

    db.query(
      sql,
      [
        username,
        code
      ],
      (err, result) => {

        if (err) {

          console.log(
            "GET LOGGED STUDENT REPORTS ERROR:",
            err
          );

          return res.status(500).json({
            success: false,
            message: "Failed to load student reports"
          });

        }


        res.json({

          success: true,

          student: {
            username,
            code
          },

          reports: result

        });

      }
    );

  }
);


// ================= LOGIN =================
app.post("/loginkids", (req, res) => {

  const { username, password, code } = req.body;

  const sql =
    "SELECT * FROM login WHERE username=? AND code=?";

  db.query(
    sql,
    [username, code],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length === 0) {

        return res.json({
          success: false,
          message: "Wrong username or code"
        });

      }

      bcrypt.compare(
        password,
        result[0].password,
        (err2, match) => {

          if (err2)
            return res.status(500).json(err2);

          if (!match) {

            return res.json({
              success: false,
              message: "Wrong password"
            });

          }

          res.json({
            success: true,
            username: result[0].username,
            code: result[0].code
          });

        }
      );

    }
  );

});

// ================= SCORE =================
app.post("/score", (req, res) => {
  const { code, score } = req.body;

  const getUser = "SELECT username FROM login WHERE code=?";

  db.query(getUser, [code], (err, user) => {
    if (err) return res.status(500).json(err);

    if (user.length === 0)
      return res.status(404).json({ message: "Code not found" });

    const name = user[0].username;

    const week = Math.ceil(new Date().getDate() / 7);
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const sql =
      "INSERT INTO scores (code,name,score,week_number,month,year) VALUES (?,?,?,?,?,?)";

    db.query(sql, [code, name, score, week, month, year], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({ message: "Score added", name });
    });
  });
});

// ================= WEEKLY =================
app.get("/weekly", (req, res) => {
  const week = Math.ceil(new Date().getDate() / 7);

  const sql = `
    SELECT name, code, MAX(score) as score
    FROM scores
    WHERE week_number=?
    GROUP BY code, name
    ORDER BY score DESC
    LIMIT 3
  `;

  db.query(sql, [week], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ================= MONTHLY =================
app.get("/monthly", (req, res) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const sql = `
    SELECT name, code, AVG(score) as score
    FROM scores
    WHERE month=? AND year=?
    GROUP BY code, name
    ORDER BY score DESC
    LIMIT 3
  `;

  db.query(sql, [month, year], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ================= VIDEOS =================
const upload = multer({ storage: multer.memoryStorage() });

// upload video

app.post("/videos/upload", upload.single("video"), (req, res) => {



  const { title, description, course } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No video file" });
  }

  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: "video",
      folder: "codekids",
    },
    async (error, result) => {

      if (error) {
        return res.status(500).json(error);
      }

      if (!result) {
        return res.status(500).json({ message: "No result" });
      }

      const sql = `
INSERT INTO videos
(title,description,video_url,course,public_id)
VALUES (?,?,?,?,?)
`;

db.query(
  sql,
  [
    title,
    description,
    result.secure_url,
    course,
    result.public_id
  ],
        (err) => {

          if (err) {
            return res.status(500).json(err);
          }

          return res.json({
            message: "Video uploaded successfully",
            url: result.secure_url,
          });
        }
      );
    }
  );
  

  const bufferStream = streamifier.createReadStream(req.file.buffer);
  bufferStream.pipe(stream);

});






app.delete("/admin/videos/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT public_id FROM videos WHERE id=?",
    [id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length === 0)
        return res.status(404).json({
          message: "Not Found"
        });

      const publicId =
        result[0].public_id;

      if (!publicId) {

        return db.query(
          "DELETE FROM videos WHERE id=?",
          [id],
          (err2) => {

            if (err2)
              return res.status(500).json(err2);

            res.json({
              message: "Deleted"
            });

          }
        );

      }

      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "video" },
        (error) => {

          if (error)
            return res.status(500).json(error);

          db.query(
            "DELETE FROM videos WHERE id=?",
            [id],
            (err3) => {

              if (err3)
                return res.status(500).json(err3);

              res.json({
                message: "Deleted"
              });

            }
          );

        }
      );

    }
  );

});



// get all videos
app.get("/videos/:course", (req, res) => {

  const { course } = req.params;

const sql = "SELECT * FROM videos WHERE LOWER(course) = LOWER(?)";
  db.query(sql, [course], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });

});
// get videos by code
// app.get("/videos/:code", (req, res) => {
//   db.query(
//     "SELECT * FROM videos WHERE code=?",
//     [req.params.code],
//     (err, data) => {
//       if (err) return res.status(500).json(err);
//       res.json(data);
//     }
//   );
// });
// app.get("/videos/:code", (req, res) => {

//   const code = req.params.code;

//   const sql = "SELECT * FROM videos WHERE code=?";

//   db.query(sql, [code], (err, data) => {

//     if (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }

//     res.json(data);

//   });

// });


app.get("/admin/users", (req, res) => {

  const sql = "SELECT id, username, code FROM login";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });

});
app.delete("/admin/users/:id", (req, res) => {

  const sql = "DELETE FROM login WHERE id=?";

  db.query(sql, [req.params.id], (err) => {

    if (err) return res.status(500).json(err);

    res.json({
      message: "User deleted"
    });

  });

});
app.put("/admin/users/:id", (req, res) => {

  const { username, code } = req.body;

  const sql =
    "UPDATE login SET username=?, code=? WHERE id=?";

  db.query(
    sql,
    [username, code, req.params.id],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "User updated"
      });

    }
  );

});





app.get("/admin/videos", (req, res) => {

  db.query(
    "SELECT * FROM videos",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);

    }
  );

});





// app.delete("/admin/videos/:id", (req, res) => {

//   db.query(
//     "DELETE FROM videos WHERE id=?",
//     [req.params.id],
//     (err) => {

//       if (err)
//         return res.status(500).json(err);

//       res.json({
//         message: "Video deleted"
//       });

//     }
//   );

// });

app.put("/admin/videos/:id", (req, res) => {

  const {
    title,
    description,
    course
  } = req.body;

  const sql = `
  UPDATE videos
  SET
  title=?,
  description=?,
  course=?
  WHERE id=?
  `;

  db.query(
    sql,
    [
      title,
      description,
      course,
      req.params.id
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Updated"
      });

    }
  );

});





app.post("/admin/login", (req, res) => {

  const { username, password } = req.body;



  const sql =
    "SELECT * FROM admins WHERE username=?";

  db.query(sql, [username], (err, result) => {


    if (result.length === 0) {

      return res.status(401).json({
        message: "Admin Not Found"
      });

    }

    bcrypt.compare(
      password,
      result[0].password,
      (err2, response) => {


        if (response) {

          return res.json({
            success: true,
            username:
              result[0].username
          });

        }

        return res.status(401).json({
          message: "Wrong Password"
        });

      }
    );

  });

});


app.get("/check-user/:code", (req, res) => {

  const { code } = req.params;

  db.query(
    "SELECT id FROM login WHERE code=?",
    [code],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false
        });
      }

      if (result.length === 0) {
        return res.json({
          success: false
        });
      }

      res.json({
        success: true
      });

    }
  );

});

// ================= START SERVER =================
app.listen(port, () => {
  console.log("Server running on port 8083");
});
