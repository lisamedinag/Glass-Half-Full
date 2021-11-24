const router = require("express").Router();

const { capitalizeText, checkMongoID, isOwner, isAdmin, arrayOfSameEvents } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")

const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model")


// llega a la página con el vaso
router.get("/day/:day_id", (req, res, next) => {
    const { day_id } = req.params
    console.log("Hellooooo")
    Event.find({date:day_id})
        .then(allEvents => {
            console.log(allEvents)
            //arrayOfSameEvents: (allEvents, day_id),
                res.render("calendar/day", {events: allEvents, day_id} )
        })
});

// el botón + para crear el evento
router.get("/new-event/:day_id", (req, res) => {
    const { day_id } = req.params
    res.render("calendar/new-event", {day_id})

});
// página de creación del evento
router.post("/new-event/:date", isLoggedIn, (req, res) => {
    const { category, name, duration, description } = req.body;
    const {date}= req.params

    Event.create({ category, date, name, duration, description, isOwner: req.session.currentUser.id })
        .then(() => res.redirect("/calendar/day/"+date))
    //   .catch(err => console.log(err))
});





module.exports = router;