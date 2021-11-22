const router = require("express").Router();
const { capitalizeText, checkMongoID, isOwner } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")
const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model")


// llega a la página con el vaso
router.get("/day", (req, res, next) => {
    res.render("calendar/day");
});

// el botón + para crear el evento
router.get("/new-event", (req, res) => {
    res.render("calendar/new-event")
});
// página de creación del evento
router.post("/new-event", isLoggedIn, (req, res) => {
    const { category, date, name, duration, description } = req.body;

    Event.create({ category, date, name, duration, description, isOwner: req.session.currentUser.id})
      .then(() => res.redirect("/calendar/day"))
    //   .catch(err => console.log(err))
});

module.exports = router;