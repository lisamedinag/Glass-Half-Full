const router = require("express").Router();
const axios = require('axios').default;

const { capitalizeText, checkMongoID, isOwner, isAdmin } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")

const Day = require("../models/Day.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model")



// All events
router.get("/:day_id/all-events", (req, res) => {
    const { day_id } = req.params

    Event.find({ date: day_id, isOwner: req.session.currentUser._id })
        .then(allEvents => {

            res.render("calendar/all-events", { events: allEvents, day_id})
        })
        .catch(err => console.log(err))
});

// Single day view
router.get("/day/:day_id", (req, res, next) => {
    const { day_id } = req.params
    console.log(day_id, req.session.currentUser);

    axios.get(`https://zenquotes.io/api/random`)
        .then(quote => {
            Day.findOneAndUpdate({ _id: day_id, quote: null }, { quote: quote.data[0] })
                .then(foundDay => {
                    Event.find({ date: day_id, isOwner: req.session.currentUser._id })
                        .then(allEvents => {
                            console.log(foundDay);
                            foundDay ? (quote = foundDay.quote) : (quote = quote.data[0])
                            res.render("calendar/day", { events: allEvents, day_id, quote })
                        })
                })
        })
        .catch(err => console.log(err))
});


// View single event
router.get("/event/:event_id", (req, res) => {
    const { event_id } = req.params

    Event.findById(event_id)
        .then(event => res.render("calendar/event", event))
        .catch(err => console.log(err))

});

// Create new event 
router.get("/new-event/:day_id", (req, res) => {
    const { day_id } = req.params
    res.render("calendar/new-event", { day_id })
    //.catch(err => console.log(err))
});

// Send info of new event
router.post("/new-event/:date", isLoggedIn, (req, res) => {
    const { category, name, duration, description } = req.body;
    const { date } = req.params

    Event
        // .find(date)
        //if duration de todos eventos + req body duration saltar error (te quedan x minutos/o duracion maximo)
        .create({ category, date, name, duration, description, isOwner: req.session.currentUser._id })
        .then(() => res.redirect(`/calendar/day/${date}`))
        .catch(err => console.log(err))
});

// Edit single event
router.get("/edit-event/:event_id", (req, res) => {
    const { event_id } = req.params

    Event.findById(event_id)
        .then(event => res.render("calendar/edit-event", event))
        .catch(err => console.log(err))

});

// Save changes of single event 
router.post("/edit-event/:event_id", (req, res) => {
    const { event_id } = req.params
    const { category, name, description } = req.body;

    Event.findByIdAndUpdate(event_id, { category, name, description }, { new: true })
        .then(() => res.redirect(`/calendar/event/${event_id}`))
        .catch(err => console.log(err))

});

///???
router.post("/new-event/:date", isLoggedIn, (req, res) => {
    const { category, name, duration, description } = req.body;
    const { date } = req.params

    Event.create({ category, date, name, duration, description, isOwner: req.session.currentUser.id })
        .then(() => res.redirect(`/calendar/day/${date}`))
        .catch(err => console.log(err))
});



module.exports = router;