const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
const { isAdmin } = require("../utils")


// User profile page
router.get("/:user_id", isLoggedIn, checkRoles('USER', 'MOD', 'ADMIN'), (req, res, next) => {
    const { user_id } = req.params

    User.findById(user_id)
        .then(user => res.render("user/profile", {
            //To be able to check who is logged, if the logged user is the owner or if its the Admin
            // loggedUser: req.session.currentUser,
            isOwn: user_id == req.session.currentUser._id,
            user,
            isAdmin: isAdmin(req.session.currentUser),
        }))
        .catch(err => console.error(err))
});

//Edit user details
router.get("/edit/:user_id", isLoggedIn, checkRoles('USER', 'MOD', 'ADMIN'), (req, res, next) => {
    const { user_id } = req.params

    User.findById(user_id)
        .then(user => res.render("user/profile-edit", {
            //Admins are able to delete users and asign roles so we need to check it
            loggedUser: req.session.currentUser,
            user,
            isAdmin: isAdmin(req.session.currentUser),
        }))
        .catch(err => console.error(err))
});


//Save changes on user details
router.post("/edit/:user_id", isLoggedIn, checkRoles('USER', 'MOD', 'ADMIN'), (req, res, next) => {
    const { user_id } = req.params
    const { email, name, description, username, role } = req.body

    User.findByIdAndUpdate(user_id, { email, name, description, username, role }, { new: true })
        .then(user => res.redirect(`/profile/${user._id}`))
        .catch(err => console.log(err))
});



//Delete
router.get("/delete/:user_id", checkRoles('USER', 'MOD', 'ADMIN'), (req, res) => {
    const { user_id } = req.params

    User.findByIdAndDelete(user_id)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})

module.exports = router;