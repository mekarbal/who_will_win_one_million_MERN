const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isValid: {
    type: Boolean,
  },
  online: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("Participant", participantSchema);
