const db = require("./db");

// add weekly winner
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