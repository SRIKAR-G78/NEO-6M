const mongoose = require('mongoose');

const gpsSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  altitude: Number,
  satellites: Number,
  hdop: Number,
  speed: Number,
  course: Number,
  date: String,
  time: String,
  fix: Boolean,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60   // 🔥 auto delete after 1 minute (60 seconds)
  }
});

module.exports = mongoose.model('GPSData', gpsSchema);
