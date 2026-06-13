const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("./cloudinary");

const app = express();
const port = 8083;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ================= DB =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codekids",
});

// ================= SIGNUP =================
app.post("/signup", (req, res) => {
  const { username, password, code } = req.body;

  const check = "SELECT * FROM login WHERE username=? OR code=?";

  db.query(check, [username, code], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, (err2, hash) => {
      if (err2) return res.status(500).json(err2);

      const sql =
        "INSERT INTO login (username,password,code) VALUES (?,?,?)";

      db.query(sql, [username, hash, code], (err3) => {
        if (err3) return res.status(500).json(err3);

        res.json({ message: "User created" });
      });
    });
  });
});

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

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

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
        console.log("🔥 CLOUDINARY ERROR REAL:", error);
        return res.status(500).json(error);
      }

      if (!result) {
        console.log("🔥 NO RESULT FROM CLOUDINARY");
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
            console.log("🔥 MYSQL ERROR:", err);
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

  console.log(username);
  console.log(password);

  const sql =
    "SELECT * FROM admins WHERE username=?";

  db.query(sql, [username], (err, result) => {

    console.log(result);

    if (result.length === 0) {

      return res.status(401).json({
        message: "Admin Not Found"
      });

    }

    bcrypt.compare(
      password,
      result[0].password,
      (err2, response) => {

        console.log(response);

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
