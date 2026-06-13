const db = require("../index");

// Add winner
exports.addWeeklyWinner = (req, res) => {
  const { child_id, child_name } = req.body;

  const sql = `
    INSERT INTO weekly_winners 
    (child_id, child_name, week_number, month, year)
    VALUES (?, ?, WEEK(CURDATE()), MONTH(CURDATE()), YEAR(CURDATE()))
  `;

  db.query(sql, [child_id, child_name], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Winner added!", result });
  });
};

// Weekly ranking
exports.getWeekly = (req, res) => {
  const sql = `
    SELECT child_id, child_name, COUNT(*) as wins
    FROM weekly_winners
    WHERE week_number = WEEK(CURDATE())
      AND year = YEAR(CURDATE())
    GROUP BY child_id, child_name
    ORDER BY wins DESC
    LIMIT 3
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Monthly ranking
exports.getMonthly = (req, res) => {
  const sql = `
    SELECT child_id, child_name, COUNT(*) as wins
    FROM weekly_winners
    WHERE month = MONTH(CURDATE())
      AND year = YEAR(CURDATE())
    GROUP BY child_id, child_name
    ORDER BY wins DESC
    LIMIT 3
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

