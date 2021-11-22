const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile", req.session.currentUser)
});

router.get("/profile/edit/:user_id", isLoggedIn, (req, res, next) => {
    res.render("user/profile-edit", req.session.currentUser)
});


router.post("/profile/edit/:user_id", isLoggedIn, (req, res, next) => {
    res.render("user/profile-edit", req.session.currentUser)
});

router.get("/profile/delete/:user_id", checkRoles("ADMIN"), (req, res) => {
    const user_id = req.params._id

    User.findByIdAndDelete(id)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})

module.exports = router;