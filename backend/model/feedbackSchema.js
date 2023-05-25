const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    comment: String,
    ratings: {
      routeLighting: Number,
      areaPopulation: Number,
      securityCameras: Number,
      lawEnforcementPresence: Number,
      crimeRate: Number,
      sidewalkMaintenance: Number,
      emergencyServices: Number,
      pedestrianCrossings: Number,
      trafficSafety: Number,
      disasterRisk: Number,
    },
  });
  
const Feedback = mongoose.model('Feedback', feedbackSchema);
