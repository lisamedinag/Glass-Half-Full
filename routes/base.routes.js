const router = require("express").Router();

//Home page
router.get("/", (req, res, next) => {
  console.log(req.session.currentUser)
  res.render("index", req.session.currentUser);
});


module.exports = router;
