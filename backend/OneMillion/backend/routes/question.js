const router = require("express").Router();
const {
  questionAdd,
  getAllQuestions,
  getRandomQuestion,
} = require("../controllers/questionController");
const verify = require("../controllers/validation/tokenVerification");
const verifyParticipToken = require("../controllers/validation/tokenParticpation");
router.get("/", getAllQuestions);
router.get("/random", getRandomQuestion);
router.post("/", verify, questionAdd);
module.exports = router;
