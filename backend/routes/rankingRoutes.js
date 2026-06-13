const express = require("express");
const router = express.Router();

const {
  addWeeklyWinner,
  getWeekly,
  getMonthly
} = require("../controllers/rankingController");

router.post("/weekly", addWeeklyWinner);
router.get("/weekly", getWeekly);
router.get("/monthly", getMonthly);

module.exports = router;