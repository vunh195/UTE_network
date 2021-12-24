const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is authe page");
});
module.exports = router;
