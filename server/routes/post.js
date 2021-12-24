const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("this is post page");
});
module.exports = router;
