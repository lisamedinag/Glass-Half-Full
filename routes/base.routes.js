const router = require("express").Router();

//Home page
router.get("/", (req, res, next) => {
  console.log(req.session.currentUser)
  res.render("index", req.session.currentUser);
});

// // MIDDLEWARE 
// router.use((req, res, next) => {
//   console.log(req.session)
//   req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Necesitas estar logeado para ver esta página' })
// })

// //PROTECTED ROUTES 
// router.get("/profile", (req, res) => {
//   res.render("profile-page", req.session.currentUser)
// })

module.exports = router;
