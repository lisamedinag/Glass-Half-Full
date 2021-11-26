const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['Work', 'Study', 'Sport', 'Self-care', 'Social', 'Relax'],
    },

    //evento referencia al Day al que pertenece 
    date: { type: mongoose.SchemaTypes.ObjectId, ref: "Day" },

    name: String,

    duration: {
      type: Number,
      enum: [15, 30, 45, 60, 75, 90, 105, 120]
    },

    description: String,

    //startTime: date.now   --  Same as timestamp  createdAt??

    isOwner: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }

  },
  { timestamps: true } //automatically manages createdAt and updatedAt
);


module.exports = model("Event", eventSchema);