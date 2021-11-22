const router = require("express").Router();
// const Day = require("../models/Day.model");
const Event = require("../models/Event.model");

// llega a la página con el vaso
router.get("/calendar/day", (req, res, next) => {
    res.render("calendar/day");
});

// el botón + para crear el evento
router.get("/new-event", (req, res) => {
    res.render("calendar/new-event")
});

// página de creación del evento
router.post("/create-event", (req, res) => {
    const { category, name, startTime, endTime } = req.body;

    Event.create({ category, name, startTime, endTime })
      .then(event => res.render("calendar/day", event))
      .catch(err => console.log(err))
  
});

module.exports = router;