const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;


//TODO modelo día con quote_id, date 
const daySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now
    },

    quote: Object

  },
  { timestamps: true }
);

module.exports = model("Day", daySchema);