const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")


// User profile page
router.get("/profile/:user_id", isLoggedIn, (req, res, next) => {
    const user_id = req.params._id

    User.findById(user_id)
        .then(user => res.render("user/profile", req.session.currentUser, user))
        .catch(err => console.err(err))
});

//Edit user details
router.get("/profile/edit/:user_id", isLoggedIn, checkRoles("ADMIN", "MOD"), (req, res, next) => {
    const user_id = req.params._id

    User.findById(user_id)
        .then(user => res.render("user/profile", req.session.currentUser, user))
        .catch(err => console.err(err))
    res.render("user/profile-edit", req.session.currentUser)
});


//Get changes
router.post("/profile/edit/:user_id", isLoggedIn, checkRoles("ADMIN", "MOD"), (req, res, next) => {
    const user_id = req.params._id
    const { email, name, description, role } = req.body

    User.findByIdAndUpdate(user_id, { email, name, description, role }, { new: true })
      .then(user => res.redirect(`/user/profile/${user._id}`))
      .catch(err => console.log(err))
});

//Delete
router.get("/profile/delete/:user_id", checkRoles("ADMIN"), (req, res) => {
    const user_id = req.params._id

    User.findByIdAndDelete(id)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})

module.exports = router;