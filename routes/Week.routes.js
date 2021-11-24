const router = require("express").Router();
const { capitalizeText, checkMongoID, isOwner } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")
const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model")


// Teapot/Jar week display
router.get("/week",isLoggedIn, (req, res) => {
    Day.find()
        .then(foundDays => res.render("calendar/week", {foundDays}))
        .catch(err => console.log(err))
})


module.exports = router;