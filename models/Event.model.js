const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    category : {
      type: String,
      enum: ['Work', 'Study', 'Sport', 'Self-care', 'Social', 'Relax', 'Sleep'],
      // TODO relate a type of category to a color (possibly just front end?)
    },
    
    name: String,
    startTime: Number,
    endTime: Number,
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);