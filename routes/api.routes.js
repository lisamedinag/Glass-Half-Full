const router = require('express').Router();
const mongoose = require('mongoose');
const axios = require('axios').default; 
const Event = require('./../models/Event.model')


router.get("/events/:id", (req, res) => {
    Event.find({date: req.params.id}).then(allDailyEvents => res.json(allDailyEvents))
})

module.exports = router;
