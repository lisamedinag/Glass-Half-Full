const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { type: String,  unique: true },
    password: String,
    name: String, 
    description: String,
    role: {
      type: String,
      enum: ['USER', 'MOD', 'ADMIN'],
      default: 'USER',
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

