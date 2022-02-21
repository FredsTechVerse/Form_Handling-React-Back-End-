const mongoose = require("mongoose");

const prayerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prayer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Prayer = mongoose.model("Prayer", prayerSchema);
module.exports = Prayer;

// DEFINING SCHEMAS LIKE THIS HELPS YOU NEGATE THAT ISSUE YA NOT HAVING INFO/SENDING EMPTY
// STRINGS.IT WILL SHOUT ALL OVER YOUR FACE.
