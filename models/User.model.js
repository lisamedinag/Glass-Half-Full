const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;


//TODO required email, password, role

const userSchema = new Schema(
  {
    email: { type: String,  unique: true },
    password: String,
    username: String,
    name: String, 
    description: String,
    role: {
      type: String,
      enum: ['USER', 'MOD', 'ADMIN'],
      default: 'USER',
    }
  },
  {
    
    timestamps: true,
    
  }
);

module.exports = model("User", userSchema);

