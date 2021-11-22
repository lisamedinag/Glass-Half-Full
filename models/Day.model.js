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

    quote: { type: mongoose.SchemaTypes.ObjectId, ref: "Quote" }

  },
  { timestamps: true }
);

module.exports = model("Day", daySchema);